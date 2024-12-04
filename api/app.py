# from typing import Union

# from fastapi import FastAPI,APIRouter
# # from .utils.routes.llm import router as llm_router
# app = FastAPI()
# app.include_router(llm_router)

from fastapi import FastAPI, Query, UploadFile, File, HTTPException, Body
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

logging.basicConfig(level=logging.INFO)
origins = ["http://localhost:3000"]
app = FastAPI()

username = "Jeesha"
password = "Khwaaish@09"
encoded_username = quote_plus(username)
encoded_password = quote_plus(password)
MONGO_URL = os.getenv("MONGO_URL", f"mongodb+srv://{encoded_username}:{encoded_password}@cluster0.mcrhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
client = AsyncIOMotorClient(MONGO_URL)

db = client.get_database("backend")
projects_collection = db["projects"]

cloudinary.config(
    cloud_name="dpo5eucgd",
    api_key="839315133223158",
    api_secret="TytvTg637mczR1W5SAvSefRZxPM",
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

#     # Find the phase and activity in the project
#     project = projects_collection.find_one({"projectName": project_name})
#     if not project:
#         raise HTTPException(status_code=404, detail="Project not found")

#     phase = next((p for p in project["progress"]["phases"] if p["phaseName"] == phase_name), None)
#     if not phase:
#         raise HTTPException(status_code=404, detail="Phase not found")

#     activity = next((a for a in phase["activity"] if a["activityName"] == activity_name), None)
#     if not activity:
#         raise HTTPException(status_code=404, detail="Activity not found")

#     # Combine data for AI model
#     response_data = {
#         "images": uploaded_images,
#         **metadata,
#         **activity
#     }
    
#     # Placeholder for AI model integration
#     model_response = response_data  # Replace with actual AI model function

#     return JSONResponse(content=model_response)

@app.post("/project/progress")
async def save_progress(
    project_name: str = Query(..., description="Name of the project"),
    phase_name: str = Query(..., description="Name of the phase"),
    activity_name: str = Query(..., description="Name of the activity"),
    progress_data: dict = Body(..., description="The progress data to be appended")
):
    # Find the project
    project = await projects_collection.find_one({"projectName": project_name})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Locate the phase and activity indices
    for phase_idx, phase in enumerate(project["progress"]["phases"]):
        if phase["phaseName"] == phase_name:
            for activity_idx, activity in enumerate(phase["activity"]):
                if activity["activityName"] == activity_name:
                    # Append to the sub-activity array in the database
                    filter_query = {
                        "projectName": project_name,
                        f"progress.phases.{phase_idx}.activity.{activity_idx}.activityName": activity_name
                    }
                    update_query = {
                        "$push": {
                            f"progress.phases.{phase_idx}.activity.{activity_idx}.sub-activity": progress_data
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

    raise HTTPException(status_code=404, detail="Phase or activity not found")


