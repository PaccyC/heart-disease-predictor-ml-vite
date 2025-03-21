# Heart Disease Prediction

This project consists of a **backend** built with FastAPI and a **client** built with Vite and React.

## Features
- Machine learning model to predict heart disease.
- REST API with FastAPI for predictions.
- Frontend with Vite and React for user interaction.

## Backend

### Prerequisites
- Python 3.10+
- FastAPI
- Uvicorn
- Joblib
- Scikit-learn

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate   # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app  --reload
   ```

### API Endpoints
- `POST /predict` - Takes user input and returns disease prediction.

## Frontend

### Prerequisites
- Node.js 19+
- npm or yarn

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Project
1. Start the backend FastAPI server.
2. Start the frontend React app.
3. Open the frontend URL (usually `http://localhost:5173/`) and interact with the prediction system.

## License
This project is licensed under the MIT License.