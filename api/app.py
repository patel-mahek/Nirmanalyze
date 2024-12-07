# from typing import Union

# from fastapi import FastAPI,APIRouter
# # from .utils.routes.llm import router as llm_router
# app = FastAPI()
# app.include_router(llm_router)

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
load_dotenv()  # take environment variables from .env.
from typing import Optional

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

# cloudinary.config(
#     cloud_name="dpo5eucgd",
#     api_key="839315133223158",
#     api_secret="TytvTg637mczR1W5SAvSefRZxPM",
# )
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

# @app.post("/project/images")
# async def add_images(
#     project_name: str = Query(...),
#     phase_name: str = Query(...),
#     activity_name: str = Query(...),
#     files: list[UploadFile] = File(...),
#     metadata: dict = Body(...)
# ):

#     uploaded_images = []
#     for file in files:
#         upload_result = cloudinary.uploader.upload(file.file)
#         uploaded_images.append({"url": upload_result["url"]})
    
#     print("Images object", uploaded_images)

#     # Find the phase and activities in the project
#     project = projects_collection.find_one({"projectName": project_name})
#     if not project:
#         raise HTTPException(status_code=404, detail="Project not found")

#     phase = next((p for p in project["progress"]["phases"] if p["phaseName"] == phase_name), None)
#     if not phase:
#         raise HTTPException(status_code=404, detail="Phase not found")

#     activities = next((a for a in phase["activities"] if a["activityName"] == activity_name), None)
#     if not activities:
#         raise HTTPException(status_code=404, detail="Activity not found")

#     # Combine data for AI model
#     response_data = {
#         "images": uploaded_images,
#         **metadata,
#         **activities
#     }
    
#     # Placeholder for AI model integration
#     model_response = response_data  # Replace with actual AI model function

#     return JSONResponse(content=model_response)

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