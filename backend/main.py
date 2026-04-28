from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import time
import uuid
import os
import shutil
from utils import generate_perceptual_hash

app = FastAPI(title="SportSentinel AI API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Database
assets = []
alerts = [
    {
        "id": "1",
        "title": "Unauthorized Highlight - TikTok",
        "platform": "TikTok",
        "similarity": 0.84,
        "timestamp": time.time() - 120,
        "status": "pending"
    },
    {
        "id": "2",
        "title": "Full Match Clip - YouTube",
        "platform": "YouTube",
        "similarity": 0.92,
        "timestamp": time.time() - 600,
        "status": "flagged"
    }
]

@app.get("/")
async def root():
    return {"message": "SportSentinel AI API is live"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "blockchain": "connected", "sentinel_nodes": 12}

# Ensure temp dir exists
os.makedirs("temp_uploads", exist_ok=True)

@app.post("/protect")
async def protect_media(file: UploadFile = File(...)):
    asset_id = str(uuid.uuid4())
    temp_file_path = f"temp_uploads/{asset_id}_{file.filename}"
    
    try:
        # 1. Save the file temporarily
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # 2. Generate perceptual hash (for images)
        try:
            phash_value = generate_perceptual_hash(temp_file_path)
        except Exception:
            phash_value = f"simulated_video_hash_{uuid.uuid4().hex[:16]}"
            
        # 3. Simulate Blockchain Registration
        blockchain_tx = f"0x{uuid.uuid4().hex[:40]}"
        
        new_asset = {
            "id": asset_id,
            "filename": file.filename,
            "timestamp": time.time(),
            "phash": phash_value,
            "blockchain_tx": blockchain_tx,
            "status": "protected"
        }
        assets.append(new_asset)
        
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            
        time.sleep(1.5)
        
        return {
            "message": "Asset protected successfully",
            "asset": new_asset
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/alerts")
async def get_alerts():
    return alerts

@app.get("/stats")
async def get_stats():
    return {
        "protected_assets": len(assets) + 1284,
        "scans_performed": 452900,
        "detections": 42,
        "verification_speed": "1.2s"
    }

# Mount the frontend built files
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(frontend_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_path, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        return FileResponse(os.path.join(frontend_path, "index.html"))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
