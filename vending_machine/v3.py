import cv2
from matplotlib import pyplot as plt

# detect_nft_mint_address
import glob
import pandas as pd
import pathlib

# detecting bottle
from pyzbar.pyzbar import decode
import time

# airdrop
from solana.rpc.api import Client
from solders.pubkey import Pubkey



# for detecting nft address
def detect_nft_mint_address():
    cam = cv2.VideoCapture(0)
    cam.set(5, 640)
    cam.set(6, 480)
    nftAddress = ""
    
    camera = True
    while camera == True:
        sucess, frame = cam.read(0)
        
        for i in decode(frame):
            nftAddress = i.data.decode('utf-8')
            print("NFT Detected!!")
            print("NFT address = ", nftAddress)
            time.sleep(3)
            camera = False
        
        cv2.imshow("Wallet Qr Scanner", frame)
        cv2.waitKey(3)
        

        
        if (camera == False):
            return nftAddress



# for detecting bottle
def detect_bottle():
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
        
        # print(ClassIndex)
        
        if(len(ClassIndex)!=0):
            for ClassInd, conf, boxes in zip(ClassIndex.flatten(), confidece.flatten(), bbox):
                # print(f"Class Index: {ClassInd}, Confidence: {conf}")
                if(ClassInd<=80):
                    cv2.rectangle(frame, boxes,(255, 0, 0), 2)
                    cv2.putText(img, classLabels[ClassInd - 1], (boxes[0] + 10, boxes[1] + 40), font, fontScale=font_scale, color=(0, 255, 0), thickness=4)
                    
                    # Ends when a bottle or a plastic bottle is detected
                    if (ClassInd == 44 or ClassInd == 40):
                        # ClassInd 44 = plastic bottle
                        # ClassInd 40 = bottle
                        print("Bottle detected!!")
                        notDetected = False
                        break
        
        cv2.imshow('Recycle Item @MintCycle', frame)
        
    cap.release()
    cv2.destroyAllWindows()
    return True



# for airdroping solana tokens
def airdrop(nftAddress):
    LAMPORT_PER_SOL = 500000000

    # solana_client = Client("https://api.devnet.solana.com")
    solana_client = Client("http://localhost:8899")

    solana_client.request_airdrop(Pubkey.from_string(nftAddress), LAMPORT_PER_SOL, "processed")
    
    return (0.5, 200)


# Program starts here
print("Place your NFT QR Code address near the camera")
nftAddress = detect_nft_mint_address()

print("Detecting recyclables..")
detected = detect_bottle()

print("Processing reward transaction...")
reward_token, reward_xp = airdrop("BLzaPuscbc81ZdzWcS8gmPtoNmscq6XMEwrwwrMAYKzD")
print("Solana Reward : +", reward_token)
print("Experience NFT increased : +", reward_xp)



    
    