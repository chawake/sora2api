from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx
import asyncio
from typing import Optional, Dict

app = FastAPI(title="Sora Watermark-Free Parse Server")
security = HTTPBearer()

# Configuration
SORA_BASE_URL = "https://sora.chatgpt.com"
EXPECTED_TOKEN = "coolify_secure_token_abc123xyz"  # Change this to something secure!

@app.post("/get-sora-link")
async def get_sora_link(request: Dict):
    """Get Sora video link - compatible with existing Sora2API format"""
    
    post_id = request.get("url", "").split("/")[-1]  # Extract from URL like https://sora.chatgpt.com/p/s_123
    token = request.get("token")
    
    # Verify token
    if token != EXPECTED_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    if not post_id or not post_id.startswith("s_"):
        raise HTTPException(status_code=400, detail="Invalid post ID")
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Get the post page
            post_url = f"https://sora.chatgpt.com/project_y/post/{post_id}"
            response = await client.get(post_url)
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=404, 
                    detail=f"Post not found: {post_id}"
                )
            
            # Extract video URL from HTML
            html_content = response.text
            
            # Look for video URL patterns
            video_patterns = [
                f"https://oscdn2.dyysy.com/MP4/{post_id}.mp4",
                f"https://cdn.sora.ai/videos/{post_id}.mp4",
                # Add more patterns as needed
            ]
            
            for pattern in video_patterns:
                if pattern in html_content:
                    return {
                        "status": "success",
                        "url": pattern
                    }
            
            # If no direct URL found, try to extract from JSON data
            # Look for embedded JSON in the HTML
            import json
            import re
            
            # Find JSON patterns in the HTML
            json_patterns = [
                r'window\.__INITIAL_STATE__\s*=\s*({.+?});',
                r'window\.__POST_DATA__\s*=\s*({.+?});',
                r'data-post="({.+?})"',
            ]
            
            for pattern in json_patterns:
                matches = re.findall(pattern, html_content)
                for match in matches:
                    try:
                        data = json.loads(match)
                        # Navigate through JSON to find video URL
                        video_url = extract_video_url_from_json(data, post_id)
                        if video_url:
                            return {
                                "status": "success",
                                "url": video_url
                            }
                    except:
                        continue
            
            raise HTTPException(
                status_code=404, 
                detail="Video URL not found in post"
            )
            
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503, 
            detail=f"Failed to fetch post: {str(e)}"
        )

@app.post("/parse/{post_id}")
async def parse_video_url(
    post_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Parse watermark-free video URL from Sora post"""
    
    # Verify token
    if credentials.credentials != EXPECTED_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Get the post page
            post_url = f"https://sora.chatgpt.com/project_y/post/{post_id}"
            response = await client.get(post_url)
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=404, 
                    detail=f"Post not found: {post_id}"
                )
            
            # Extract video URL from HTML
            html_content = response.text
            
            # Look for video URL patterns
            video_patterns = [
                f"https://oscdn2.dyysy.com/MP4/{post_id}.mp4",
                f"https://cdn.sora.ai/videos/{post_id}.mp4",
                # Add more patterns as needed
            ]
            
            for pattern in video_patterns:
                if pattern in html_content:
                    return {
                        "success": True,
                        "post_id": post_id,
                        "video_url": pattern,
                        "method": "html_parse"
                    }
            
            # If no direct URL found, try to extract from JSON data
            # Look for embedded JSON in the HTML
            import json
            import re
            
            # Find JSON patterns in the HTML
            json_patterns = [
                r'window\.__INITIAL_STATE__\s*=\s*({.+?});',
                r'window\.__POST_DATA__\s*=\s*({.+?});',
                r'data-post="({.+?})"',
            ]
            
            for pattern in json_patterns:
                matches = re.findall(pattern, html_content)
                for match in matches:
                    try:
                        data = json.loads(match)
                        # Navigate through JSON to find video URL
                        video_url = extract_video_url_from_json(data, post_id)
                        if video_url:
                            return {
                                "success": True,
                                "post_id": post_id,
                                "video_url": video_url,
                                "method": "json_parse"
                            }
                    except:
                        continue
            
            raise HTTPException(
                status_code=404, 
                detail="Video URL not found in post"
            )
            
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503, 
            detail=f"Failed to fetch post: {str(e)}"
        )

def extract_video_url_from_json(data: dict, post_id: str) -> Optional[str]:
    """Extract video URL from JSON data"""
    
    # Common JSON paths where video URLs might be stored
    paths_to_check = [
        ["post", "attachments", 0, "url"],
        ["post", "video", "url"],
        ["attachments", 0, "media", "url"],
        ["media", "url"],
        ["video", "src"],
        ["data", "post", "video_url"],
    ]
    
    def navigate_json(obj, path):
        """Navigate nested JSON using path list"""
        current = obj
        for key in path:
            if isinstance(current, dict) and key in current:
                current = current[key]
            elif isinstance(current, list) and key.isdigit() and int(key) < len(current):
                current = current[int(key)]
            else:
                return None
        return current
    
    # Check all paths
    for path in paths_to_check:
        url = navigate_json(data, path)
        if url and post_id in url:
            return url
    
    # Also search for any URL containing the post_id
    def search_for_url(obj):
        if isinstance(obj, dict):
            for value in obj.values():
                result = search_for_url(value)
                if result:
                    return result
        elif isinstance(obj, list):
            for item in obj:
                result = search_for_url(item)
                if result:
                    return result
        elif isinstance(obj, str) and post_id in obj and obj.startswith("http"):
            return obj
        return None
    
    return search_for_url(data)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "sora-parse-server"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
