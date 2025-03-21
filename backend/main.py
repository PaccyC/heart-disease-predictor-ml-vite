from fastapi import FastAPI
from routes.predict import router as predict_router
from fastapi.middleware.cors import CORSMiddleware


app=FastAPI(title="Disease Prediction API")

origins = [
    "http://localhost:5713", 

    "*",  
]

# Add CORSMiddleware to your FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


app.include_router(predict_router)




@app.get("/")
def home():
    return {"message":"Welcome to the Disease Prediction API"}