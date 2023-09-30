from solana.rpc.api import Client
# from solana.transaction import Transaction
from solders.pubkey import Pubkey


LAMPORT_PER_SOL = 500000000

solana_client = Client("https://api.devnet.solana.com")
# solana_client = Client("http://localhost:8899")

solana_client.request_airdrop(Pubkey.from_string("BLzaPuscbc81ZdzWcS8gmPtoNmscq6XMEwrwwrMAYKzD"), LAMPORT_PER_SOL, "processed")
