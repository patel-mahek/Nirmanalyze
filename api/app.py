# from typing import Union

# from fastapi import FastAPI,APIRouter
# # from .utils.routes.llm import router as llm_router
# app = FastAPI()
# app.include_router(llm_router)
import tempfile
from fastapi import FastAPI, Query, UploadFile, File, HTTPException, Body, Form
from fastapi.responses import JSONResponse
from urllib.parse import quote_plus
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import date
import logging
from bson import ObjectId
import cloudinary.uploader
import os
from dotenv import load_dotenv
import google.generativeai as genai
from google.ai.generativelanguage_v1beta.types import content
import json
load_dotenv()  # take environment variables from .env.
from typing import List, Optional
from PIL import Image
import requests
from io import BytesIO

logging.basicConfig(level=logging.INFO)
origins = ["http://localhost:3000"]
app = FastAPI()

username = os.environ.get("MONGO_USERNAME")
print(username)
password = os.environ.get("MONGO_PASSWORD")
encoded_username = quote_plus(username)
encoded_password = quote_plus(password)
MONGO_URL = os.getenv("MONGO_URL", f"mongodb+srv://{encoded_username}:{encoded_password}@cluster0.mcrhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
client = AsyncIOMotorClient(MONGO_URL)

db = client.get_database("backend")
projects_collection = db["projects"]

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key="AIzaSyBmUfmA9alBsBgYARkekoeCbL2LGJsAY6k")

generation_config = {
  "temperature": 0,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_schema": content.Schema(
    type = content.Type.OBJECT,
    enum = [],
    required = ["subactivity_description_reasoning", "subactivity_status_impact", "predicted_activity_name", "predicted_phase_name", "activity_status_impact", "phase_status_impact", "progress_status_impact", "phase_comments_reasoning", "activity_comments_reasoning", "warningDescription_conflicts", "additional_comments"],
    properties = {
      "subactivity_description_reasoning": content.Schema(
        type = content.Type.STRING,
      ),
      "subactivity_status_impact": content.Schema(
        type = content.Type.NUMBER,
      ),
      "predicted_activity_name": content.Schema(
        type = content.Type.STRING,
      ),
      "predicted_phase_name": content.Schema(
        type = content.Type.STRING,
      ),
      "activity_status_impact": content.Schema(
        type = content.Type.NUMBER,
      ),
      "phase_status_impact": content.Schema(
        type = content.Type.NUMBER,
      ),
      "progress_status_impact": content.Schema(
        type = content.Type.NUMBER,
      ),
      "phase_comments_reasoning": content.Schema(
        type = content.Type.NUMBER,
      ),
      "activity_comments_reasoning": content.Schema(
        type = content.Type.STRING,
      ),
      "warningDescription_conflicts": content.Schema(
        type = content.Type.STRING,
      ),
      "additional_comments": content.Schema(
        type = content.Type.ARRAY,
        items = content.Schema(
          type = content.Type.STRING,
        ),
      ),
    },
  ),
  "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
  system_instruction="You are a road construction project analysis expert. You receive image(s) of a road construction site and respond with an analysis as per the JSON format provided below. Also the response must be in JSON format. Ensure the analysis prioritizes details directly observable in the images before drawing inferences.\n\nNow I am providing you a context which you should use always for analzying along with your knowledge.\nHere is the summary of phases and sub stages and they are in their order from start to finish\nEach phase must have all its sub stages completed before moving to the next phase\n\n1. Clearing Phase: Vegetation Removal, Debris Removal, Topsoil Stripping, Obstruction Removal\n2. Excavation Phase: Bulk Excavation, Grading\n3. Drainage Phase: Pipe or Culvert Installation, Surface Drainage Setup \n4. Earthwork Phase: Backfilling and Layering , Shaping and Grading,compaction\n5. Subgrade Phase: Soil Stabilization,Layer Placement,Compaction of Subgrade\n6. Geogrid Phase:Geogrid Placement,Securing Geogrid\n7. Macadamization Phase: Base Material Placement,Compaction of Base, Leveling and Grading\n8: Paving Phase: Asphalt or Concrete Mixing, Paving, Compaction of Paving Material\n9: Finishing Phase: Road Marking, Signage Installation, Safety Barrier Installation, Landscaping\n\nHere are the details, Use this for identifying and commenting on the phases and activities: \nAnalyze the provided photo to accurately identify the current stage of road construction. Refer to the following detailed phases for classification:\nClearing Phase:\nDescription: Preparing the site by removing vegetation, debris, and obstructions to create a clean foundation for road construction.\nVegetation Removal:\nActivities:\nCutting down trees, shrubs, and other vegetation using chainsaws or heavy equipment.\nUprooting stumps and roots using bulldozers or excavators.\nLoading felled vegetation onto trucks for disposal.\nIndicators:\nLarge piles of cut trees, shrubs, and roots on the cleared site.\nActive use of chainsaws, bulldozers, and trucks.\nA visible cleared area where vegetation has been removed.\nDebris Removal\nActivities:\nCollecting and hauling away rocks, waste materials, or construction debris.\nSorting debris into piles for removal or reuse.\nUsing loaders or trucks to transport debris off-site.\nIndicators:\nPiles of debris neatly arranged or actively being loaded.\nCleared, level areas where debris has been removed.\nTrucks or loaders operating in the area.\nTopsoil Stripping\nActivities:\nScraping and removing the uppermost soil layer (topsoil) using graders or bulldozers.\nPiling the stripped topsoil for later use in landscaping or disposal.\nIndicators:\nExposed subsoil that is visibly darker and free of vegetation.\nTopsoil piles located near the cleared area.\nActive operation of graders or bulldozers.\nObstruction Removal\nActivities:\nBreaking down old foundations, stumps, or structures using excavators or hydraulic breakers.\nTransporting remnants such as concrete blocks or metal pieces off-site using trucks.\nIndicators:\nCleared areas with remnants of removed structures or stumps.\nVisible equipment like excavators or hydraulic breakers actively working.\n\nExcavation Phase\nDescription: Shaping the terrain by removing unsuitable soil or rock to achieve the required depth and profile.\nInitial Excavation\nActivities:\nRemoving unsuitable soil or rocks to achieve the desired depth using excavators.\nMarking excavation boundaries with stakes or spray paint.\nIndicators:\nUneven or rough terrain with visible excavation activity.\nExcavators actively removing and piling soil.\nMarked areas showing planned excavation zones.\nBulk Excavation\nActivities:\nRemoving large soil volumes to achieve a uniform depth for construction.\nLoading excavated soil into dump trucks for transportation.\nIndicators:\nLarge piles of excavated earth near the site.\nDeep trenches or excavation pits visible on-site.\nHeavy machinery like excavators and dump trucks in operation.\nGrading\nActivities:\nShaping the excavated surface to create proper slopes and ensure water drainage.\nUsing graders to smooth and level the terrain.\nIndicators:\nSmooth, sloped surfaces across the construction site.\nGraders actively working to shape the terrain.\nVisible drainage paths formed by sloping.\n\nDrainage Phase\nDescription: Installing systems to manage surface and subsurface water flow for long-term road stability.\nPipe or Culvert Installation\nActivities:\nExcavating trenches to lay stormwater pipes or culverts.\nInstalling and securing pipes or culverts using trenching machinery and manual labor.\nIndicators:\nVisible trenches with installed pipes or culverts.\nMachinery like trenchers and loaders actively operating.\nStockpiles of pipes or culverts near the site.\nSurface Drainage Setup\nActivities:\nDigging channels or ditches to redirect surface water flow.\nCompacting the sides and base of drainage channels for durability.\nIndicators:\nCompleted or ongoing construction of ditches or channels.\nWater flow tests to ensure proper drainage paths.\n\nEarthwork Phase\nDescription: Preparing the ground by backfilling, grading, and compacting layers of soil to ensure stability.\nBackfilling and Layering\nActivities:\nFilling excavated areas with suitable soil or material.\nUsing loaders and trucks to transport fill material to the site.\nIndicators:\nFreshly filled areas with visible layering.\nActive use of loaders, dump trucks, or other earthmoving equipment.\nShaping and Grading\nActivities:\nUsing graders to adjust the terrain to required levels and slopes.\nVerifying levels using survey equipment.\nIndicators:\nSmoothly graded areas with visible slopes.\nSurvey stakes or markers placed to guide grading operations.\nCompaction\nActivities:\nCompacting soil layers using vibratory rollers or compactors to ensure density and stability.\nConducting soil density tests to confirm compaction quality.\nIndicators:\nRoller marks or compacted, firm surfaces across the site.\nVisible compaction equipment operating on layers of soil.\n\nSubgrade Phase\nDescription: Stabilizing and compacting the natural ground to provide a strong foundation for road construction.\nSoil Stabilization\nActivities:\nSpreading stabilizing materials like lime or cement to strengthen the subgrade.\nMixing stabilizers with soil using graders or mixers.\nIndicators:\nVisible patches of stabilizer materials spread across the site.\nMachinery blending stabilizers into the soil.\nLayer Placement\nActivities:\nEvenly spreading materials like sand or fine soil to prepare the subgrade surface.\nLeveling the surface for uniform thickness.\nIndicators:\nLayered subgrade materials visible across the site.\nWorkers or graders leveling the surface.\nSubgrade Compaction\nActivities:\nCompacting the subgrade surface using rollers or compactors.\nVerifying compaction with density and stability tests.\nIndicators:\nFirm, smooth subgrade with compacted surfaces.\nActive operation of compactors or rollers.\n\nGeogrid Phase\nDescription: Reinforcing the subgrade by placing geogrid material to improve load distribution and overall road stability.\nGeogrid Placement\nActivities:\nUnrolling geogrid sheets onto the compacted subgrade surface.\nAligning and securing geogrid sheets to prevent movement during base construction.\nIndicators:\nFully unrolled geogrid sheets evenly spread over the site.\nWorkers actively aligning or securing the geogrid material.\n\nBase/Sub-Base Layer Phase\nDescription: Building the foundational road layers using compacted aggregates for strength and durability.\nBase Material Placement\nActivities:\nSpreading aggregate material (gravel or crushed stone) evenly across the site.\nUsing loaders or spreaders to distribute materials.\nIndicators:\nEvenly spread aggregates covering the site.\nLoaders or spreaders actively operating.\nCompaction of Base\nActivities:\nCompacting base material using heavy rollers.\nConducting density checks to ensure strength.\nIndicators:\nCompact base surface that appears dense and uniform.\nRollers operating across the site.\nLeveling and Grading\nActivities:\nUsing graders to ensure the base layer is level and within tolerance.\nIndicators:\nSmooth, even surfaces ready for paving.\n\nPaving Phase\nDescription: Constructing the road's surface with asphalt or concrete for a smooth and durable finish.\nAsphalt or Concrete Mixing\nActivities:\nPreparing paving materials in on-site or off-site mixing plants.\nTransporting fresh materials to the site using trucks.\nIndicators:\nVisible mixers or trucks delivering fresh asphalt or concrete.\nPaving\nActivities:\nLaying asphalt or concrete using pavers.\nSpreading and leveling the material evenly across the base layer.\nIndicators:\nFreshly laid asphalt or concrete covering the road.\nPavers and workers actively operating.\nCompaction of Paving Material\nActivities:\nCompacting the road surface using rollers for uniform thickness and smoothness.\nIndicators:\nSmooth, hardened surfaces with roller marks.\n\nFinishing Phase\nDescription: Completing construction with safety features, road markings, and landscaping.\nRoad Marking\nActivities:\nPainting lane lines, symbols, or other road markings using marking machines.\nIndicators:\nFreshly painted road markings.\nSignage Installation\nActivities:\nInstalling traffic signs, signals, or barriers.\nIndicators:\nVisible new signs placed along the road.\nSafety Barrier Installation\nActivities:\nSetting up guardrails, fences, or barriers.\nIndicators:\nGuardrails or barriers in place or under construction.\nInstallation equipment present on-site.\nLandscaping\nActivities:\nPlanting vegetation like grass or trees to stabilize nearby slopes.\nIndicators:\nFreshly planted areas near the road.",
)

@app.get("/projects")
async def get_all_projects():
    projects_cursor = projects_collection.find({})
    projects = []
    async for project in projects_cursor:
        project["_id"] = str(project["_id"])
        projects.append(project)
    return projects

@app.get("/project")
async def get_project_by_name(project_name: str):
    project = await projects_collection.find_one({"projectName": project_name})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project["_id"] = str(project["_id"])
    return project

@app.put("/project/details")
async def update_project_details(
    project_name: str = Query(..., description="The name of the project to update"),
    details: dict = Body(..., description="The new details object for the project")
):
    project = await projects_collection.find_one({"projectName": project_name})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    update_result = await projects_collection.update_one(
        {"projectName": project_name},
        {"$set": {"details": details}}
    )
    updated_project = await projects_collection.find_one({"projectName": project_name})
    updated_project["_id"] = str(updated_project["_id"])

    return updated_project

@app.post("/project/progress")
async def save_progress(
    project_name: str = Query(..., description="Name of the project"),
    phase_name: str = Query(..., description="Name of the phase"),
    activity_name: str = Query(..., description="Name of the activities"),
    progress_data: dict = Body(..., description="The progress data to be appended")
):
    # Find the project
    project = await projects_collection.find_one({"projectName": project_name})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Locate the phase and activities indices
    for phase_idx, phase in enumerate(project["progress"]["phases"]):
        if phase["phaseName"] == phase_name:
            for activity_idx, activities in enumerate(phase["activities"]):
                if activities["activityName"] == activity_name:
                    # Append to the subActivities array in the database
                    filter_query = {
                        "projectName": project_name,
                        f"progress.phases.{phase_idx}.activities.{activity_idx}.activityName": activity_name
                    }
                    update_query = {
                        "$push": {
                            f"progress.phases.{phase_idx}.activities.{activity_idx}.subActivities": progress_data
                        }
                    }
                    update_result = await projects_collection.update_one(filter_query, update_query)

                    # Check if the update was successful
                    if update_result.modified_count == 0:
                        raise HTTPException(
                            status_code=400, detail="Failed to append progress data"
                        )

                    # Return the updated project
                    updated_project = await projects_collection.find_one({"projectName": project_name})
                    updated_project["_id"] = str(updated_project["_id"])  # Serialize ObjectId
                    return updated_project

    raise HTTPException(status_code=404, detail="Phase or activities not found")

@app.post("/projects/add-project")
async def add_project(
    nameOfProject: str = Form(...),
    startDate: str = Form(...),
    location: str = Form(...),
    estimatedEndDate: str = Form(...),
    projectId: str = Form(...),
    builderName: str = Form(...),
    totalLength: int = Form(...),
    roadStretch: str = Form(...),
    teamStrength: int = Form(...),
    startLatitude: float = Form(...),
    startLongitude: float = Form(...),
    endLatitude: float = Form(...),
    endLongitude: float = Form(...),
    type: str = Form(...),
    image: UploadFile = Form(...)  # Mandatory field for image
):
    
    print("Received Form Data:")
    print(nameOfProject, startDate, location, estimatedEndDate, projectId, builderName)
    print(totalLength, roadStretch, teamStrength, startLatitude, startLongitude, endLatitude, endLongitude, type)
    print(f"Image Filename: {image.filename}")
    
    # # Upload image to Cloudinary
    # if image:
    #     try:
    #         cloudinary_result = cloudinary.uploader.upload(image.file)
    #         main_image_url = cloudinary_result["url"]
    #     except Exception as e:
    #         raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")
    # else:
    #     main_image_url = ""
    # Verify image type
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid image format")

    # Upload image to Cloudinary
    try:
        cloudinary_result = cloudinary.uploader.upload(image.file)
        main_image_url = cloudinary_result["url"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    # Create the project JSON
    new_project = {
        "projectName": nameOfProject,
        "type": type,
        "status": "Ongoing",
        "main_image": main_image_url,
        "details": {
            "nameOfProject": nameOfProject,
            "startDate": startDate,
            "location": location,
            "estimatedEndDate": estimatedEndDate,
            "projectId": projectId,
            "builderName": builderName,
            "totalLength": totalLength,
            "roadStretch": roadStretch,
            "teamStrength": teamStrength,
            "startLatitude": startLatitude,
            "startLongitude": startLongitude,
            "endLatitude": endLatitude,
            "endLongitude": endLongitude
        },
        "progress": {
            "percentage": 0,
            "phases": [
            {
                "phaseName": "Clearing Phase",
                "status": 0,
                "startDate": "",
                "endDate": "",
                "activities": [
                    {
                        "activityName": "Vegetation Removal",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Debris Removal",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Topsoil Stripping",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Obstruction Removal",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    }
                ]
            },
            {
                "phaseName": "Excavation Phase",
                "status": 0,
                "startDate": "",
                "endDate": "",
                "activities": [
                    {
                        "activityName": "Initial Excavation",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Bulk Excavation",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Grading",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    }
                ]
            },
            {
                "phaseName": "Drainage Phase",
                "status": 0,
                "startDate": "",
                "endDate": "",
                "activities": [
                    {
                        "activityName": "Installation of Pipes or Culverts",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Surface Drainage Setup",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    }
                ]
            },
            {
                "phaseName": "Earthwork Phase",
                "status": 0,
                "startDate": "",
                "endDate": "",
                "activities": [
                    {
                        "activityName": "Backfilling and Layering",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Shaping and Grading",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Compaction",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    }
                ]
            },
            {
                "phaseName": "Subgrade Phase",
                "status": 0,
                "startDate": "",
                "endDate": "",
                "activities": [
                    {
                        "activityName": "Soil Stabilization",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Layer Placement",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Compaction of Subgrade",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    }
                ]
            },
            {
                "phaseName": "Geogrid Phase",
                "status": 0,
                "startDate": "",
                "endDate": "",
                "activities": [
                    {
                        "activityName": "Geogrid Placement",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Securing Geogrid",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    }
                ]
            },
            {
                "phaseName": "Base/Sub-Base Layer Phase",
                "status": 0,
                "startDate": "",
                "endDate": "",
                "activities": [
                    {
                        "activityName": "Base Material Placement",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Compaction of Base",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Leveling and Grading",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    }
                ]
            },
            {
                "phaseName": "Base/Sub-Base Layer Phase",
                "status": 0,
                "startDate": "",
                "endDate": "",
                "activities": [
                    {
                        "activityName": "Asphalt or Concrete Mixing",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Paving",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Compaction of Paving Material",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    }
                ]
            },
            {
                "phaseName": "Finishing Phase",
                "status": 0,
                "startDate": "",
                "endDate": "",
                "activities": [
                    {
                        "activityName": "Road Marking",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Signage Installation",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Safety Barriers Installation",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    },
                    {
                        "activityName": "Landscaping",
                        "status": 0,
                        "startDate": "",
                        "endDate": "",
                        "roadLength": 0,
                        "subActivities": []
                    }
                ]
            }
        ]
        },
        "team": [],  # Initialize as empty
        "reports": []  # Initialize as empty
    }

    # Insert into MongoDB
    try:
        insert_result = await projects_collection.insert_one(new_project)
        new_project["_id"] = str(insert_result.inserted_id)  # Convert ObjectId to string
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to insert project: {str(e)}")

    return new_project

def upload_to_gemini(path, mime_type=None):

  file = genai.upload_file(path, mime_type=mime_type)
  print(f"Uploaded file '{file.display_name}' as: {file.uri}")
  return file

def func_name(image_urls, description):
# Create the model
    generation_config_new = {
    "temperature": 0,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_schema": content.Schema(
        type = content.Type.OBJECT,
        enum = [],
        required = ["isValid", "reasoning"],
        properties = {
        "isValid": content.Schema(
            type = content.Type.BOOLEAN,
        ),
        "reasoning": content.Schema(
            type = content.Type.STRING,
        ),
        },
    ),
    "response_mime_type": "application/json",
    }

    model_new = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config_new,
    system_instruction="You are a construction project analysis expert. You receive image(s) of a road construction site and respond with an analysis of those images.\n\nNow I am providing you a context which you should use always for analzying along with your knowledge.\nHere is the summary of phases and sub stages and they are in their order from start to finish\nEach phase must have all its sub stages completed before moving to the next phase\n\n1. Clearing Phase: Vegetation Removal, Debris Removal, Topsoil Stripping, Obstruction Removal\n2. Excavation Phase: Bulk Excavation, Grading\n3. Drainage Phase: Pipe or Culvert Installation, Surface Drainage Setup \n4. Earthwork Phase: Backfilling and Layering , Shaping and Grading,compaction\n5. Subgrade Phase: Soil Stabilization,Layer Placement,Compaction of Subgrade\n6. Geogrid Phase:Geogrid Placement,Securing Geogrid\n7. Macadamization Phase: Base Material Placement,Compaction of Base, Leveling and Grading\n8: Paving Phase: Asphalt or Concrete Mixing, Paving, Compaction of Paving Material\n9: Finishing Phase: Road Marking, Signage Installation, Safety Barrier Installation, Landscaping\n\nHere are the details, Use this for identifying and commenting on the phases and activities: \nAnalyze the provided photo to accurately identify the current stage of road construction. Refer to the following detailed phases for classification:\nClearing Phase:\nDescription: Preparing the site by removing vegetation, debris, and obstructions to create a clean foundation for road construction.\nVegetation Removal:\nActivities:\nCutting down trees, shrubs, and other vegetation using chainsaws or heavy equipment.\nUprooting stumps and roots using bulldozers or excavators.\nLoading felled vegetation onto trucks for disposal.\nIndicators:\nLarge piles of cut trees, shrubs, and roots on the cleared site.\nActive use of chainsaws, bulldozers, and trucks.\nA visible cleared area where vegetation has been removed.\nDebris Removal\nActivities:\nCollecting and hauling away rocks, waste materials, or construction debris.\nSorting debris into piles for removal or reuse.\nUsing loaders or trucks to transport debris off-site.\nIndicators:\nPiles of debris neatly arranged or actively being loaded.\nCleared, level areas where debris has been removed.\nTrucks or loaders operating in the area.\nTopsoil Stripping\nActivities:\nScraping and removing the uppermost soil layer (topsoil) using graders or bulldozers.\nPiling the stripped topsoil for later use in landscaping or disposal.\nIndicators:\nExposed subsoil that is visibly darker and free of vegetation.\nTopsoil piles located near the cleared area.\nActive operation of graders or bulldozers.\nObstruction Removal\nActivities:\nBreaking down old foundations, stumps, or structures using excavators or hydraulic breakers.\nTransporting remnants such as concrete blocks or metal pieces off-site using trucks.\nIndicators:\nCleared areas with remnants of removed structures or stumps.\nVisible equipment like excavators or hydraulic breakers actively working.\n\nExcavation Phase\nDescription: Shaping the terrain by removing unsuitable soil or rock to achieve the required depth and profile.\nInitial Excavation\nActivities:\nRemoving unsuitable soil or rocks to achieve the desired depth using excavators.\nMarking excavation boundaries with stakes or spray paint.\nIndicators:\nUneven or rough terrain with visible excavation activity.\nExcavators actively removing and piling soil.\nMarked areas showing planned excavation zones.\nBulk Excavation\nActivities:\nRemoving large soil volumes to achieve a uniform depth for construction.\nLoading excavated soil into dump trucks for transportation.\nIndicators:\nLarge piles of excavated earth near the site.\nDeep trenches or excavation pits visible on-site.\nHeavy machinery like excavators and dump trucks in operation.\nGrading\nActivities:\nShaping the excavated surface to create proper slopes and ensure water drainage.\nUsing graders to smooth and level the terrain.\nIndicators:\nSmooth, sloped surfaces across the construction site.\nGraders actively working to shape the terrain.\nVisible drainage paths formed by sloping.\n\nDrainage Phase\nDescription: Installing systems to manage surface and subsurface water flow for long-term road stability.\nPipe or Culvert Installation\nActivities:\nExcavating trenches to lay stormwater pipes or culverts.\nInstalling and securing pipes or culverts using trenching machinery and manual labor.\nIndicators:\nVisible trenches with installed pipes or culverts.\nMachinery like trenchers and loaders actively operating.\nStockpiles of pipes or culverts near the site.\nSurface Drainage Setup\nActivities:\nDigging channels or ditches to redirect surface water flow.\nCompacting the sides and base of drainage channels for durability.\nIndicators:\nCompleted or ongoing construction of ditches or channels.\nWater flow tests to ensure proper drainage paths.\n\nEarthwork Phase\nDescription: Preparing the ground by backfilling, grading, and compacting layers of soil to ensure stability.\nBackfilling and Layering\nActivities:\nFilling excavated areas with suitable soil or material.\nUsing loaders and trucks to transport fill material to the site.\nIndicators:\nFreshly filled areas with visible layering.\nActive use of loaders, dump trucks, or other earthmoving equipment.\nShaping and Grading\nActivities:\nUsing graders to adjust the terrain to required levels and slopes.\nVerifying levels using survey equipment.\nIndicators:\nSmoothly graded areas with visible slopes.\nSurvey stakes or markers placed to guide grading operations.\nCompaction\nActivities:\nCompacting soil layers using vibratory rollers or compactors to ensure density and stability.\nConducting soil density tests to confirm compaction quality.\nIndicators:\nRoller marks or compacted, firm surfaces across the site.\nVisible compaction equipment operating on layers of soil.\n\nSubgrade Phase\nDescription: Stabilizing and compacting the natural ground to provide a strong foundation for road construction.\nSoil Stabilization\nActivities:\nSpreading stabilizing materials like lime or cement to strengthen the subgrade.\nMixing stabilizers with soil using graders or mixers.\nIndicators:\nVisible patches of stabilizer materials spread across the site.\nMachinery blending stabilizers into the soil.\nLayer Placement\nActivities:\nEvenly spreading materials like sand or fine soil to prepare the subgrade surface.\nLeveling the surface for uniform thickness.\nIndicators:\nLayered subgrade materials visible across the site.\nWorkers or graders leveling the surface.\nSubgrade Compaction\nActivities:\nCompacting the subgrade surface using rollers or compactors.\nVerifying compaction with density and stability tests.\nIndicators:\nFirm, smooth subgrade with compacted surfaces.\nActive operation of compactors or rollers.\n\nGeogrid Phase\nDescription: Reinforcing the subgrade by placing geogrid material to improve load distribution and overall road stability.\nGeogrid Placement\nActivities:\nUnrolling geogrid sheets onto the compacted subgrade surface.\nAligning and securing geogrid sheets to prevent movement during base construction.\nIndicators:\nFully unrolled geogrid sheets evenly spread over the site.\nWorkers actively aligning or securing the geogrid material.\n\nBase/Sub-Base Layer Phase\nDescription: Building the foundational road layers using compacted aggregates for strength and durability.\nBase Material Placement\nActivities:\nSpreading aggregate material (gravel or crushed stone) evenly across the site.\nUsing loaders or spreaders to distribute materials.\nIndicators:\nEvenly spread aggregates covering the site.\nLoaders or spreaders actively operating.\nCompaction of Base\nActivities:\nCompacting base material using heavy rollers.\nConducting density checks to ensure strength.\nIndicators:\nCompact base surface that appears dense and uniform.\nRollers operating across the site.\nLeveling and Grading\nActivities:\nUsing graders to ensure the base layer is level and within tolerance.\nIndicators:\nSmooth, even surfaces ready for paving.\n\nPaving Phase\nDescription: Constructing the road's surface with asphalt or concrete for a smooth and durable finish.\nAsphalt or Concrete Mixing\nActivities:\nPreparing paving materials in on-site or off-site mixing plants.\nTransporting fresh materials to the site using trucks.\nIndicators:\nVisible mixers or trucks delivering fresh asphalt or concrete.\nPaving\nActivities:\nLaying asphalt or concrete using pavers.\nSpreading and leveling the material evenly across the base layer.\nIndicators:\nFreshly laid asphalt or concrete covering the road.\nPavers and workers actively operating.\nCompaction of Paving Material\nActivities:\nCompacting the road surface using rollers for uniform thickness and smoothness.\nIndicators:\nSmooth, hardened surfaces with roller marks.\n\nFinishing Phase\nDescription: Completing construction with safety features, road markings, and landscaping.\nRoad Marking\nActivities:\nPainting lane lines, symbols, or other road markings using marking machines.\nIndicators:\nFreshly painted road markings.\nSignage Installation\nActivities:\nInstalling traffic signs, signals, or barriers.\nIndicators:\nVisible new signs placed along the road.\nSafety Barrier Installation\nActivities:\nSetting up guardrails, fences, or barriers.\nIndicators:\nGuardrails or barriers in place or under construction.\nInstallation equipment present on-site.\nLandscaping\nActivities:\nPlanting vegetation like grass or trees to stabilize nearby slopes.\nIndicators:\nFreshly planted areas near the road.",
    )



    chat_session_new = model_new.start_chat(
    history=[
        {
        "role": "user",
        "parts": [
            *image_urls
        ],
        },
    ]
    )
    prompt_new = f"USER: \"{description}\"\nSYSTEM: \"Verify whether the user's provided description is accurately portrays the type of construction activity depicted in the image provided, if the user description or the image are unrelated to any construction activity, then return false, and also then just describe what you see in the image\"\nUse the context provided in the system instructions as grounding for your reasoning"
    response_new = chat_session_new.send_message(prompt_new)

    print(response_new.text)
    return json.loads(response_new.text)

@app.post("/send-model")
async def send_model(
    project_name: str = Query(..., description="Name of the project"),
    images: List[UploadFile] = File(..., description="Multiple images to upload"),
    description: str = Form(..., description="Description of the images"),
    date: str = Form(..., description="Date of the image"),
    roadlength: float = Form(..., description="Road length in meters"),
    startLatitude: float = Form(..., description="Start latitude"),
    startLongitude: float = Form(..., description="Start longitude"),
    endLatitude: float = Form(..., description="End latitude"),
    endLongitude: float = Form(..., description="End longitude")
):
    # Step 1: Query the project by name
    project = await projects_collection.find_one({"projectName": project_name})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")


    # Step 2: Upload images to Cloudinary and collect URLs
    image_urls = []
    image_urls_cloudinary = []
    
    
    for image in images:
        if not image.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail=f"Invalid file type: {image.filename}")
        try:
            contents = await image.read()
            upload_result = cloudinary.uploader.upload(contents)
            image_urls_cloudinary.append(upload_result["url"])
            await image.seek(0)  # Reset file pointer to read again
            
            with tempfile.NamedTemporaryFile(prefix='img_', suffix='.jpg', delete=False, dir="./api/temp") as temp:
                temp.write(image.file.read())
                temp.close()
                image_urls.append(upload_to_gemini(temp.name, mime_type=image.content_type))
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to upload image {image.filename}: {str(e)}")

    check_description = func_name(image_urls, description)
    
    # Step 3: Extract current project status and current phase
    current_project_status = project.get("progress", {}).get("percentage", 0)
    phases = project.get("progress", {}).get("phases", [])
    current_phase = None
    previous_phase = None

    for phase in phases:
        if phase.get("status") != 100:
            current_phase = phase
            break
        previous_phase = phase

    if not current_phase:
        raise HTTPException(status_code=404, detail="No active phase found in project")

    # Helper function to find the last image URL
    def find_last_image_url(phase):
        activities = phase.get("activities", [])
        if not activities:
            return ""
        last_activity = activities[-1]
        sub_activities = last_activity.get("subActivities", [])
        if not sub_activities:
            return ""
        last_sub_activity = sub_activities[-1]
        images = last_sub_activity.get("images", [])
        if not images:
            return ""
        return images[-1].get("url", "")

    last_image_url = find_last_image_url(previous_phase if current_phase.get("status") == 0 else current_phase)
    
    with tempfile.NamedTemporaryFile(prefix='img_', suffix='.jpg', delete=False, dir="./api/temp") as temp:
        if isinstance(last_image_url, str) and last_image_url:
            response = requests.get(last_image_url)
            
            img = Image.open(BytesIO(response.content))
            img.save(temp.name)
            image_urls.insert(0, upload_to_gemini(temp.name, mime_type="image/jpeg"))
        else:
            image_urls.insert(0, "No Previous Image")
        
    if(check_description["isValid"] == False):
        final_response = {
        "subactivity_description_reasoning": "string",
        "activity_comments_reasoning": "string",
        "activity_status_impact": "number",
        "additional_comments": [""],
        "phase_comments_reasoning": 0,
        "phase_status_impact": 0,
        "predicted_activity_name": "",
        "predicted_phase_name": "",
        "progress_status_impact": 0,
        "subactivity_status_impact": 0,
        "warningDescription_conflicts": "",
        "isValid_userDescription": check_description["isValid"],
        "isValid_userDescription_reasoning": check_description["reasoning"],
        "startLatitude": startLatitude,
        "startLongitude": startLongitude,
        "endLatitude": endLatitude,
        "endLongitude": endLongitude,
        "description": description,
        "images": image_urls_cloudinary,
        "last_image_url": last_image_url,
        "roadlength": roadlength,
        "date": date
        }
        # return {"message": "False desc", "data": final_response}
        return final_response
        
    # Step 4: Prepare the input for the LLM
    current_phase_compact = json.dumps(current_phase).replace('"', '\\"')  # Compact and escape JSON
    prompt = f"""
    \n\nThe below JSON indicates the old progress of the last phase of the project. Assume all the phases mentioned in the system instructions are completed up to this phase:
    \n\n{current_phase_compact}
    \n\nOverall progress of the project is: {current_project_status}%.""".strip()
    chat_session = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [
                    prompt,
                    # image_urls[0],
                    "The following images represent the current progress of the project:",
                    *image_urls[1:]
                ],
            },
        ]
    )

    try:
        # Step 5: Call the LLM
        response = chat_session.send_message(
            f"\n\nThe user describes the images as \"{description}\".\n\nThis is the description of the keys in your response JSON.\n\n\"subactivity_description_reasoning\": \"Describe the current state of the given image, how much work is done, \", \n\"subactivity_status_impact\": \"Give an approximate value as to how it impacts the overall progress of the phase and activity, check the phase and activity status\",\n\"predicted_activity_name\": “Predicted Activity Name”,\n\"predicted_phase_name\": “Predicted Phase Name”\n\"activity_status_impact\": \"Give an approximate value as to how it impacts the overall progress of the phase, check the phase status\",\n\"phase_status_impact\": \"Give an approximate value as to how it impacts the overall progress of the project, check the project status\",\n\"progress_status_impact\": \"Give an approximate value as to how it impacts the overall progress of the project, check the project status\",\n\"phase_comments_reasoning\": \"detailed comments about the phase progress\",\n\"activity_comments_reasoning\": \"detailed comments about the activity progress\",\n\"warningDescription_conflicts\": \"warning description in depth in case of conflicts between the old and new phase, such as the new phase predicted by you is way ahead of the old phase is the phase object, and progress has jumped between phases, or the new phase is somehow depicting a phase even older than the old phase, or keep it empty string, that is ok\",\n“additional_comments” : “add anything more which feels necessary for the user to know, predict more things, can be used for predicting endDate for phase, or comments on road length, or more, can be converted to array of objects for further in depth details.\""
        )
        llm_response = json.loads(response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM processing failed: {str(e)}")
    print (json.dumps(llm_response, indent=2) )

    # Step 6: Combine the LLM response with additional data
    final_response = {
        **llm_response,
        "isValid_userDescription": check_description["isValid"],
        "isValid_userDescription_reasoning": check_description["reasoning"],
        "startLatitude": startLatitude,
        "startLongitude": startLongitude,
        "endLatitude": endLatitude,
        "endLongitude": endLongitude,
        "userDescription": description,
        "images": image_urls_cloudinary,
        "last_image_url": last_image_url,
        "roadlength": roadlength,
        "date": date
    }
    
    print("HELLO AFTER LLM")
    # Step 7: Return the combined response
    # return {"message": "Data processed and response generated", "data": final_response}
    return final_response