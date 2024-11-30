from typing import Union

from fastapi import FastAPI,APIRouter
from .utils.routes.llm import router as llm_router
app = FastAPI()
app.include_router(llm_router)



