import cv2
from matplotlib import pyplot as plt

import glob
import pandas as pd
import pathlib

config_file = 'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
frozen_model = 'frozen_inference_graph.pb'

model = cv2.dnn_DetectionModel(frozen_model, config_file)

classLabels = []
file_name = 'labels.txt'
with open(file_name, 'rt') as fpt:
    classLabels = fpt.read().rstrip('\n').split('\n')

model.setInputSize(320, 320)
model.setInputScale(1.0 / 127.5)
model.setInputMean((127.5, 127.5, 127.5))
model.setInputSwapRB(True)

img = cv2.imread('bottle.jpg')

ClassIndex, confidence, bbox = model.detect(img, confThreshold=0.5)

font_scale = 3
font = cv2.FONT_HERSHEY_PLAIN  # Corrected the font constant

for ClassInd, conf, boxes in zip(ClassIndex.flatten(), confidence.flatten(), bbox):
    cv2.rectangle(img, boxes, (255, 0, 0), 2)
    cv2.putText(img, classLabels[ClassInd - 1], (boxes[0] + 10, boxes[1] + 40), font, fontScale=font_scale, color=(0, 255, 0), thickness=3)

plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.show()

#webcam

cap = cv2.VideoCapture(1)

if not cap.isOpened():
    cap =cv2.VideoCapture(0)
if not cap.isOpened():
    raise IOError("CAMERA ERROR")
    
font_scale = 3
font = cv2.FONT_HERSHEY_PLAIN
notDetected = True

while notDetected:
    ret,frame = cap.read()
    ClassIndex, confidece, bbox = model.detect(frame, confThreshold = 0.55)
    
    print(ClassIndex)
    
    if(len(ClassIndex)!=0):
        for ClassInd, conf, boxes in zip(ClassIndex.flatten(), confidece.flatten(), bbox):
            print(f"Class Index: {ClassInd}, Confidence: {conf}")
            if(ClassInd<=80):
                cv2.rectangle(frame, boxes,(255, 0, 0), 2)
                cv2.putText(img, classLabels[ClassInd - 1], (boxes[0] + 10, boxes[1] + 40), font, fontScale=font_scale, color=(0, 255, 0), thickness=4)
                
                # Ends when a bottle or a plastic bottle is detected
                if (ClassInd == 44 or ClassInd == 40):
                    # ClassInd 44 = plastic bottle
                    # ClassInd 40 = bottle
                    notDetected = False
                    break
    
    cv2.imshow('Recycle Item @MintCycle', frame)
    
    if cv2.waitKey(2) & 0xff == ord('q'):
        break

# for detecting nft address
    # to be continue..

# open camera
    # to be continue...
    

cap.release()
cv2.destroyAllWindows()


    
    