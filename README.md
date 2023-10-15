**Prepreparation steps before running the file:**
1) Install solana following the steps here: **[Solana Docs](https://docs.solana.com/getstarted/local)**

2) Open desktop command-prompt and install related python libraries using:
   - **pip install opencv-python matplotlib numpy**
   - **pip install pip install fastapi**
   - **pip install "uvicorn[standard]"**
  
3) Run "**git clone https://github.com/alexteabag/mintcycle**"


**Running User app**
1) Create a file with name ".env" in "mintcycle/user_mobile/frontend" folder and paste the following:
    NEXT_PUBLIC_CANDY_MACHINE_ID=xoHu51ZiYBPLWvv3KBtRtCY8cr4vnMfvN81g5Da8FKk
    NEXT_PUBLIC_NFT_COLLECTION_ID=AY1uSDu6Ndmre8CeHBJmsn75GiNLTCncSXY2Sd3sbKZh

2) cd "mintcycle/user_mobile/frontend"
3) Run "**npm install**"
4) Run "**npm run dev**"


**Running vending machine**
1) Create a file with name ".env" in "mintcycle/vending_machine/frontend" folder and paste the following:
    NEXT_PUBLIC_CANDY_MACHINE_ID=BNRJtE638KXCiR3QKbPbxiV8dCdTtFtyVyV5WoUKq7kn
    NEXT_PUBLIC_NFT_COLLECTION_ID=HcPehSjMnqFuEZHsfz447takG3tHp4zqvpCecapasFey

2) cd "mintcycle/vending_machine/frontend" 
3) Run "**npm install**"
4) Run "**npm run dev**"
