# Sora2API

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.119.0-green.svg)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/docker-supported-blue.svg)](https://www.docker.com/)

**A fully featured OpenAI-compatible API service that provides a unified interface for Sora**

</div>

---


## ✨ Feature Highlights

### Core Capabilities
- 🎨 **Text-to-Image** – Generate images from textual descriptions
- 🖼️ **Image-to-Image** – Transform uploaded images with creative variations
- 🎬 **Text-to-Video** – Produce videos from text prompts
- 🎥 **Image-to-Video** – Generate videos based on supplied images
- 📊 **Multi-Aspect Support** – Landscape, portrait, and additional sizes
- 🎭 **Video Character Feature** – Create characters and generate videos with them
- 🎬 **Remix Mode** – Continue creation based on existing videos
- 🎥 **Storyboard Mode** – Produce multi-shot storyboard videos

### Advanced Features
- 🔐 **Token Management** – Multiple token support with round-robin load balancing
- 🌐 **Proxy Support** – HTTP and SOCKS5 proxy compatibility
- 📝 **Detailed Logging** – Full request/response logging
- 🔄 **Asynchronous Processing** – Efficient async task handling
- 💾 **Data Persistence** – SQLite database storage
- 🎯 **OpenAI Compatibility** – Fully compatible with the OpenAI API format
- 🛡️ **Secure Auth** – API Key validation and permission management
- 📱 **Web Admin UI** – Intuitive management console

---

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose (recommended)
- or Python 3.8+

### Option 1: Docker Deployment (Recommended)

#### Standard Mode (no proxy)

```bash
# Clone the project
git clone https://github.com/TheSmallHanCat/sora2api.git
cd sora2api

# Start the service
docker-compose up -d

# View logs
docker-compose logs -f
```

#### WARP Mode (with proxy)

```bash
# Start with the WARP proxy
docker-compose -f docker-compose.warp.yml up -d

# View logs
docker-compose -f docker-compose.warp.yml logs -f
```

### Option 2: Local Deployment

```bash
# Clone the project
git clone https://github.com/TheSmallHanCat/sora2api.git
cd sora2api

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the service
python main.py
```

### First Launch

After the service starts, visit the admin console to complete the initial configuration:

- **URL**: http://localhost:8000
- **Username**: `admin`
- **Password**: `admin`

⚠️ **Important**: Change the password immediately after your first login!

---

### Quick Reference

| Feature | Model | Notes |
|--------|-------|-------|
| Text-to-Image | `gpt-image*` | Provide `content` as a string |
| Image-to-Image | `gpt-image*` | Provide a `content` array + `image_url` |
| Text-to-Video | `sora2-*` | Provide `content` as a string |
| Image-to-Video | `sora2-*` | Provide a `content` array + `image_url` |
| Video Styles | `sora2-*` | Include `{style_id}` in the prompt, e.g. `{anime}prompt` |
| Create Character | `sora2-*` | Use a `content` array + `video_url` |
| Character Video Generation | `sora2-*` | Use a `content` array + `video_url` + text |
| Remix | `sora2-*` | Include the Remix ID inside `content` |
| Storyboard | `sora2-*` | Use the format ```[duration_s]prompt``` inside `content` |
| Prompt Enhancement | `prompt-enhance-*` | Expand simple prompts into detailed cinematic prompts |
---

### API Usage

#### Basics (OpenAI-standard format, streaming required)

- **Endpoint**: `http://localhost:8000/v1/chat/completions`
- **Auth**: Add `Authorization: Bearer YOUR_API_KEY` to the headers
- **Default API Key**: `han1234` (please change it)

#### Supported Models

**Image Models**

| Model | Description | Size |
|-------|-------------|------|
| `gpt-image` | Text-to-image (square) | 360×360 |
| `gpt-image-landscape` | Text-to-image (landscape) | 540×360 |
| `gpt-image-portrait` | Text-to-image (portrait) | 360×540 |

**Video Models**

**Standard Edition (Sora2)**

| Model | Duration | Orientation | Description |
|-------|----------|-------------|-------------|
| `sora2-landscape-10s` | 10 s | Landscape | Text/Image-to-video |
| `sora2-landscape-15s` | 15 s | Landscape | Text/Image-to-video |
| `sora2-landscape-25s` | 25 s | Landscape | Text/Image-to-video |
| `sora2-portrait-10s` | 10 s | Portrait | Text/Image-to-video |
| `sora2-portrait-15s` | 15 s | Portrait | Text/Image-to-video |
| `sora2-portrait-25s` | 25 s | Portrait | Text/Image-to-video |

**Pro Edition (ChatGPT Pro subscription required)**

| Model | Duration | Orientation | Description |
|-------|----------|-------------|-------------|
| `sora2pro-landscape-10s` | 10 s | Landscape | Pro-quality text/image-to-video |
| `sora2pro-landscape-15s` | 15 s | Landscape | Pro-quality text/image-to-video |
| `sora2pro-landscape-25s` | 25 s | Landscape | Pro-quality text/image-to-video |
| `sora2pro-portrait-10s` | 10 s | Portrait | Pro-quality text/image-to-video |
| `sora2pro-portrait-15s` | 15 s | Portrait | Pro-quality text/image-to-video |
| `sora2pro-portrait-25s` | 25 s | Portrait | Pro-quality text/image-to-video |

**Pro HD Edition (ChatGPT Pro subscription, high-definition)**

| Model | Duration | Orientation | Description |
|-------|----------|-------------|-------------|
| `sora2pro-hd-landscape-10s` | 10 s | Landscape | Pro HD text/image-to-video |
| `sora2pro-hd-landscape-15s` | 15 s | Landscape | Pro HD text/image-to-video |
| `sora2pro-hd-portrait-10s` | 10 s | Portrait | Pro HD text/image-to-video |
| `sora2pro-hd-portrait-15s` | 15 s | Portrait | Pro HD text/image-to-video |

> **Note:** Pro-series models require a ChatGPT Pro subscription (`plan_type: chatgpt_pro"`). Requests without an eligible account will fail.

**Prompt Enhancement Models**

Expand simple prompts into detailed cinematic prompts, including scene settings, camera movements, lighting effects, storyboard descriptions, etc.

| Model | Extension Level | Duration | Description |
|------|---------|------|------|
| `prompt-enhance-short-10s` | Short | 10 s | Generate concise enhanced prompts |
| `prompt-enhance-short-15s` | Short | 15 s | Generate concise enhanced prompts |
| `prompt-enhance-short-20s` | Short | 20 s | Generate concise enhanced prompts |
| `prompt-enhance-medium-10s` | Medium | 10 s | Generate medium-length enhanced prompts |
| `prompt-enhance-medium-15s` | Medium | 15 s | Generate medium-length enhanced prompts |
| `prompt-enhance-medium-20s` | Medium | 20 s | Generate medium-length enhanced prompts |
| `prompt-enhance-long-10s` | Detailed | 10 s | Generate detailed enhanced prompts |
| `prompt-enhance-long-15s` | Detailed | 15 s | Generate detailed enhanced prompts |
| `prompt-enhance-long-20s` | Detailed | 20 s | Generate detailed enhanced prompts |

**Features:**
- Support for streaming and non-streaming responses
- Automatically generate prompts containing professional cinematic terms like PRIMARY, SETTING, LOOK, CAMERA, LIGHT, etc.
- Includes detailed storyboard descriptions (timeline, camera movement, focus, lighting)
- Can be used directly for video generation models

#### Request Examples

**Text-to-Image**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image",
    "messages": [
      {
        "role": "user",
        "content": "A cute little kitten"
      }
    ],
    "stream": true
  }'
```

**Image-to-Image**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Turn this picture into an oil painting style"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/png;base64,<base64_encoded_image_data>"
            }
          }
        ]
      }
    ],
    "stream": true
  }'
```

**Prompt Enhancement (Streaming)**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "prompt-enhance-medium-10s",
    "messages": [
      {
        "role": "user",
        "content": "kitten"
      }
    ],
    "stream": true
  }'
```

**Prompt Enhancement (Non-streaming)**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "prompt-enhance-long-15s",
    "messages": [
      {
        "role": "user",
        "content": "An orange cat playing on the windowsill"
      }
    ],
    "stream": false
  }'
```
**Text-to-Video**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora2-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "A kitten running across a meadow"
      }
    ],
    "stream": true
  }'
```

**Image-to-Video**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora2-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Let this cat dance"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/png;base64,<base64_encoded_image_data>"
            }
          }
        ]
      }
    ],
    "stream": true
  }'
```

**Video Remix (continue from an existing video)**

* Include the Remix share link or ID directly inside the prompt.

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora2-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "https://sora.chatgpt.com/p/s_68e3a06dcd888191b150971da152c1f5 convert it into an ink-wash style"
      }
    ],
    "stream": true
  }'
```

**Storyboard Videos**

* Example trigger prompt:
  ```[5.0s]A cat skydives from a plane [5.0s]The cat lands [10.0s]The cat runs through a field```
* Or:
  ```text
  [5.0s]A cat skydives from a plane
  [5.0s]The cat lands
  [10.0s]The cat runs through a field
  ```

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora2-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "[5.0s]A cat skydives from a plane [5.0s]The cat lands [10.0s]The cat runs through a field"
      }
    ],
    "stream": true
  }'
```

### Video Style Feature

Sora2API supports **Video Styles**, allowing you to apply preset looks to generated videos.

#### How to Use

Include `{style_id}` anywhere in the prompt. The system will extract the style and apply it automatically.

#### Supported Styles

| Style ID | Display Name | Description |
|----------|--------------|-------------|
| `festive` | Festive | Holiday-inspired style |
| `kakalaka` | 🪭👺 | Chaotic style |
| `news` | News | News broadcast look |
| `selfie` | Selfie | Selfie-style footage |
| `handheld` | Handheld | Handheld footage |
| `golden` | Golden | Golden tone |
| `anime` | Anime | Anime look |
| `retro` | Retro | Retro look |
| `nostalgic` | Vintage | Nostalgic tone |
| `comic` | Comic | Comic-book style |

#### Examples

**Generate a video with the anime style**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora2-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "{anime}A kitten running across a meadow"
      }
    ],
    "stream": true
  }'
```

**Generate a video with the retro style**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora2-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "{retro}City street at night"
      }
    ],
    "stream": true
  }'
```

**Use a style during Remix**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora2-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "{comic}https://sora.chatgpt.com/p/s_68e3a06dcd888191b150971da152c1f5 convert to comic style"
      }
    ],
    "stream": true
  }'
```

**Notes**
- The `{style_id}` tag can appear anywhere in the prompt.
- The system automatically removes the tag from the prompt after extracting the style ID.
- If no style is specified, the default look is used.

### Video Character Feature

Sora2API supports **video character generation**.

#### Feature Overview

- **Character Creation**: Provide only a video (no prompt) to extract the character profile and return its name.
- **Character Generation**: Provide a video plus prompt to upload the character and generate a new video featuring it.

#### API Usage (OpenAI-standard, streaming required)

**Scenario 1: Create a character only (no video output)**

Upload a video to extract the character information and receive the character name and avatar.

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora2-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "video_url",
            "video_url": {
              "url": "data:video/mp4;base64,<base64_encoded_video_data>"
            }
          }
        ]
      }
    ],
    "stream": true
  }'
```

**Scenario 2: Create a character and generate a video**

Upload a video to create the character, then use that character plus a prompt to generate the new video.

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora2-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "video_url",
            "video_url": {
              "url": "data:video/mp4;base64,<base64_encoded_video_data>"
            }
          },
          {
            "type": "text",
            "text": "Make the character perform a dance move"
          }
        ]
      }
    ],
    "stream": true
  }'
```

#### Python Example

```python
import requests
import base64

# Read the video file and encode it as Base64
with open("video.mp4", "rb") as f:
    video_data = base64.b64encode(f.read()).decode("utf-8")

# Create a character only
response = requests.post(
    "http://localhost:8000/v1/chat/completions",
    headers={
        "Authorization": "Bearer han1234",
        "Content-Type": "application/json"
    },
    json={
        "model": "sora2-landscape-10s",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "video_url",
                        "video_url": {
                            "url": f"data:video/mp4;base64,{video_data}"
                        }
                    }
                ]
            }
        ],
        "stream": True
    },
    stream=True
)

# Handle the streaming response
for line in response.iter_lines():
    if line:
        print(line.decode("utf-8"))
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

Thanks to all contributors and users for your support!

---

## 📞 Contact

- Issues: [GitHub Issues](https://github.com/TheSmallHanCat/sora2api/issues)
- Discussions: [GitHub Discussions](https://github.com/TheSmallHanCat/sora2api/discussions)

---

