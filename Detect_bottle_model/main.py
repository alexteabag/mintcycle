from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import io
import os
import matplotlib.pyplot as plt
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Enable CORS for your front-end application
origins = ["http://localhost:3000"]  # Replace with your front-end's origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/recognize")
async def recognize_objects(file: UploadFile):
    if not file.content_type.startswith("image/"):
        return JSONResponse(content={"message": "Invalid image format"}, status_code=400)

    image_bytes = await file.read()
    is_plastic_bottle = detect_bottle(image_bytes)

    if is_plastic_bottle:
        return JSONResponse(content={"message": True}, status_code=200)
    else:
        return JSONResponse(content={"message": False}, status_code=200)

# for detecting a plastic bottle
def detect_bottle(image_bytes):
    config_file = 'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
    frozen_model = 'frozen_inference_graph.pb'
    
    # Object detection model
    model = cv2.dnn_DetectionModel(frozen_model, config_file)
    
    classLabels = []
    # cv2.imshow("botlelelle", image_bytes)  # Remove this line
    # print(image_bytes)
    file_name = 'labels.txt'
    with open(file_name, 'rt') as fpt:
        classLabels = fpt.read().rstrip('\n').split('\n')
    
    model.setInputSize(320, 320)
    model.setInputScale(1.0 / 127.5)
    model.setInputMean((127.5, 127.5, 127.5))
    model.setInputSwapRB(True)
    
    # Convert the raw image data to a NumPy array
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Detect objects
    ClassIndex, confidence, bbox = model.detect(img, confThreshold=0.55)
    
    # Perform object detection analysis
    if len(ClassIndex) != 0:
        for ClassInd, conf, boxes in zip(ClassIndex.flatten(), confidence.flatten(), bbox):
            if ClassInd <= 80:
                # Returns 'True' when a plastic bottle is detected
                if ClassInd == 44:
                    print("Plastic bottle detected!!")
                    return True
    
    # Returns 'False' when no plastic bottle is detected
    return False

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)






