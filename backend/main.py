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
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


app.include_router(predict_router)




@app.get("/")
def home():
    return {"message":"Welcome to the Disease Prediction API"}