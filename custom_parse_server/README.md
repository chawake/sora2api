# Sora Watermark-Free Parse Server

A custom server to extract watermark-free video URLs from Sora posts.

## Quick Start

### 1. Update Security Token
Edit `app.py` and change:
```python
EXPECTED_TOKEN = "your_secure_token_here"
```

### 2. Deploy
```bash
docker-compose up -d
```

### 3. Configure Sora2API
In your `setting.toml`:
```toml
[watermark_free]
watermark_free_enabled = true
parse_method = "custom"
custom_parse_url = "http://localhost:8002"
custom_parse_token = "your_secure_token_here"
```

## API Endpoints

### POST /parse/{post_id}
Extract video URL from Sora post.

**Headers:**
- `Authorization: Bearer your_secure_token_here`

**Response:**
```json
{
  "success": true,
  "post_id": "s_690ce161c2488191a3476e9969911522",
  "video_url": "https://oscdn2.dyysy.com/MP4/s_690ce161c2488191a3476e9969911522.mp4",
  "method": "html_parse"
}
```

### GET /health
Health check endpoint.

## Deployment Options

### Option 1: Local Docker
```bash
cd custom_parse_server
docker-compose up -d
```

### Option 2: Deploy to VPS
```bash
# On your server
git clone your-repo
cd custom_parse_server
docker-compose up -d
```

### Option 3: Cloud Services
- **Railway**: Connect GitHub repo, auto-deploy
- **Render**: Free tier available
- **Heroku**: Paid plan required
- **DigitalOcean App Platform**: Easy deployment

## Security Notes

1. **Change the default token** - Never use "your_secure_token_here"
2. **Use HTTPS** in production
3. **Limit access** with firewall rules
4. **Monitor usage** - Add logging if needed

## Troubleshooting

### Issue: "Video URL not found"
- Check if the post is public
- Verify post_id format (should start with "s_")
- Check if Sora changed their HTML structure

### Issue: "Post not found"
- Verify the post exists on sora.ai
- Check if post was deleted too quickly
- Ensure proper token authentication

### Issue: Connection timeout
- Increase timeout in httpx client
- Check network connectivity
- Verify Sora.ai accessibility

## Advanced Configuration

### Custom URL Patterns
Edit `video_patterns` in `app.py`:
```python
video_patterns = [
    f"https://oscdn2.dyysy.com/MP4/{post_id}.mp4",
    f"https://cdn.sora.ai/videos/{post_id}.mp4",
    # Add your custom patterns
]
```

### Custom JSON Paths
Edit `paths_to_check` in `app.py`:
```python
paths_to_check = [
    ["post", "attachments", 0, "url"],
    # Add your custom JSON paths
]
```
