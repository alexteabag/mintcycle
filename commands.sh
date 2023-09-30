# Launching NFT Collection using Candy Machine V3

solana --verison
solana-keygen --version

chmod 755 sugarCM3
./sugarCM3 --version

pwd

# pubkey: 9Rk7MVrJwAWV5Jupk7poUtyBKmRoP1zNcEF36UmunxKU
# praise bulb swap follow reunion purchase child draw north manual first deer
solana-keygen new --outfile /home/pentec/mint_cycle/create_dynamic_nft/candymachinev3/Owner.json
# pubkey: 8LHizUTC42mqNDJiz3y67VNMV1GP23N6czb3V511TurP
# drip outside nut olive brush genius brief dress source filter frost fantasy
solana-keygen new --outfile /home/pentec/mint_cycle/create_dynamic_nft/candymachinev3/Creator.json

solana config set --keypair /home/pentec/mint_cycle/create_dynamic_nft/candymachinev3/Owner.json
solana config set --url https://metaplex.devnet.rpcpool.com/
solana config get

solana airdrop 2 9Rk7MVrJwAWV5Jupk7poUtyBKmRoP1zNcEF36UmunxKU

# https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbXdNMV80WXVYd1MtbjNUZHJBMVVQNEM0UllXd3xBQ3Jtc0tteHNXd0pKcUZYdnVJclY3SWRkRjRVY0lFY2pvNnYtMTFBbzNnS2YzbGFxckFyQ1p5dFB4Q2Q3UzBzMm83RWppeVk3NWQ3MUMxa0FEeFRGdDVqYVlwdHVWSmxndURhZC00WE16LXJza2gtc1dOcExEVQ&q=https%3A%2F%2Fdocs.metaplex.com%2Fassets%2Ffiles%2Fassets-ff6bd873ecd07b49c86faf3c7aab82d2.zip&v=0KHv1dMV8zU

./sugarCM3 create-config

# ALEX: I changed to devnet from here onwards.. to perform the ./sugarCM3 upload. Because running into errors in metaplex.devnet
./sugarCM3 upload
# Candy machine ID: 5ktQvMFBSp4WtCc5UbsqUEJszquMrPiikaKi5VwNrpFC
# Collection mint ID: 4pkyUs6cNL2ecwKPVAUYga2TcH2ytXKhHg8S78FfaD7c
./sugarCM3 deploy

./sugarCM3 verify
./sugarCM3 guard add
./sugarCM3 guard show

cd KeyStrokes\ Candy\ Machine\ UI\ -\ V1/
npm install
npm run dev