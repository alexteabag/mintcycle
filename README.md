# Mint Cycle Prototype
![github_mcLogo](https://github.com/alexteabag/mintcycle/assets/93482528/92ed8e72-3718-41d7-9b7a-3178b8facfe8)


Mint Cycle is a Solana-powered solution that reward users in combating climate change, with Solana token and a dynamic NFT that represents the user's identity.


## Prepreparation steps before running the file:
1) Install solana following the steps here: **[Solana Docs](https://docs.solana.com/getstarted/local)**

2) Open command prompt and install related Python libraries using:
   - **pip install opencv-python matplotlib numpy**
   - **pip install pip install fastapi**
   - **pip install "uvicorn[standard]"**
  
3) Run "**git clone https://github.com/alexteabag/mintcycle**"

## Run Prototype
### Running User app
1) Create a file with name ".env" in "mintcycle/user_mobile/frontend" folder and paste the following:
    NEXT_PUBLIC_CANDY_MACHINE_ID=xoHu51ZiYBPLWvv3KBtRtCY8cr4vnMfvN81g5Da8FKk
    NEXT_PUBLIC_NFT_COLLECTION_ID=AY1uSDu6Ndmre8CeHBJmsn75GiNLTCncSXY2Sd3sbKZh

2) Open command prompt and run the following commands:
   - cd "mintcycle/user_mobile/frontend"
   - Run "**npm install**"
   - Run "**npm run dev**"


### Running vending machine
1) Open command prompt and run the following commands:
   - **cd "mintcycle/Detect_bottle_model""**
   - **venv\Scripts\activate**
   - **uvicorn main:app --reload**

2) Create a file with name ".env" in "mintcycle/vending_machine/frontend" folder and paste the following:
    NEXT_PUBLIC_CANDY_MACHINE_ID=BNRJtE638KXCiR3QKbPbxiV8dCdTtFtyVyV5WoUKq7kn
    NEXT_PUBLIC_NFT_COLLECTION_ID=HcPehSjMnqFuEZHsfz447takG3tHp4zqvpCecapasFey

3) Open command prompt and run the following commands:
   - cd "mintcycle/vending_machine/frontend" 
   - Run "**npm install**"
   - Run "**npm run dev**"
