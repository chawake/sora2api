import asyncio
import argparse
import sys
import os

# Add src to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from src.core.database import Database

async def update_sentinel_token(email_or_token, sentinel_token, set_all=False):
    db = Database()
    await db.init_db()  # Ensure tables exist
    
    if set_all:
        print(f"🔄 Updating ALL tokens with sentinel_token...")
        tokens = await db.get_all_tokens()
        count = 0
        for t in tokens:
            await db.update_token(t.id, sentinel_token=sentinel_token)
            count += 1
        print(f"✅ Updated {count} tokens with new sentinel_token.")
        return

    # Find specific token
    token = None
    if "@" in email_or_token:
        token = await db.get_token_by_email(email_or_token)
    else:
        token = await db.get_token_by_value(email_or_token)
    
    if not token:
        print(f"❌ Token/User not found: {email_or_token}")
        return

    print(f"found user: {token.email}")
    await db.update_token(token.id, sentinel_token=sentinel_token)
    print(f"✅ Updated sentinel_token for {token.email}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Update sentinel_token for Sora accounts")
    parser.add_argument("--target", help="Email or Access Token (first few chars) to update", required=False)
    parser.add_argument("--token", help="The full openai-sentinel-token string", required=True)
    parser.add_argument("--all", action="store_true", help="Apply this sentinel token to ALL accounts")

    args = parser.parse_args()
    
    if not args.target and not args.all:
        print("❌ You must specify either --target OR --all")
        sys.exit(1)

    asyncio.run(update_sentinel_token(args.target, args.token, args.all))
