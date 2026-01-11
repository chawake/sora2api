# Sora2API

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.119.0-green.svg)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/docker-supported-blue.svg)](https://www.docker.com/)

**A full-featured OpenAI-compatible API service providing a unified interface for Sora**

</div>

---

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
  - [First Run](#first-run)
  - [Quick Reference](#quick-reference)
  - [API Usage](#api-usage)
  - [Video Character Feature](#video-character-feature)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

---

## ✨ Features

### Core Features
- 🎨 **Text-to-Image** - Generate images from text prompts
- 🖼️ **Image-to-Image** - Creative transformations based on uploaded images
- 🎬 **Text-to-Video** - Generate videos from text prompts
- 🎥 **Image-to-Video** - Generate related videos from images
- 📊 **Multiple aspect ratios** - Landscape, portrait, and more
- 🎭 **Video Characters** - Create a character and generate character videos
- 🎬 **Remix** - Continue creating from an existing video

### Advanced Features
- 🔐 **Token Management** - Manage multiple tokens with round-robin load balancing
- 🌐 **Proxy Support** - HTTP and SOCKS5 proxies supported
- 📝 **Detailed Logs** - Complete request/response logging
- 🔄 **Async Processing** - Efficient asynchronous task handling
- 💾 **Persistence** - SQLite-backed data storage
- 🎯 **OpenAI Compatible** - Fully compatible with the OpenAI API format
- 🛡️ **Security & Auth** - API key validation and permission management
- 📱 **Web Admin UI** - An intuitive admin dashboard

---

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose (recommended)
- or Python 3.8+

### Method 1: Docker Deployment (recommended)

#### Standard Mode (No Proxy)

```bash
# Clone the project
git clone https://github.com/TheSmallHanCat/sora2api.git
cd sora2api

# Start the service
docker-compose up -d

# View logs
docker-compose logs -f
```

#### WARP Mode (Using Proxy)

```bash
# Start with WARP proxy
docker-compose -f docker-compose.warp.yml up -d

# View logs
docker-compose -f docker-compose.warp.yml logs -f
```

### Method 2: Local Deployment

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

### First Run

After the service starts, open the admin panel to complete initial setup:

- **URL**: http://localhost:8000
- **Username**: `admin`
- **Password**: `admin`

⚠️ **Important**: Change the password immediately after your first login!

---

### Quick Reference

| Feature | Model | Notes |
|------|------|------|
| Text-to-Image | `sora-image*` | Use `content` as a string |
| Image-to-Image | `sora-image*` | Use a `content` array + `image_url` |
| Text-to-Video | `sora-video*` | Use `content` as a string |
| Image-to-Video | `sora-video*` | Use a `content` array + `image_url` |
| Create Character | `sora-video*` | Use a `content` array + `video_url` |
| Generate Video with Character | `sora-video*` | Use a `content` array + `video_url` + text |
| Remix | `sora-video*` | Include a Remix ID in `content` |
| Video Storyboard | `sora-video*` | Use the ```[duration s]prompt``` format in `content` to trigger |

---

### API Usage

#### Basic Info (OpenAI standard format; streaming required)

- **Endpoint**: `http://localhost:8000/v1/chat/completions`
- **Authentication**: Add `Authorization: Bearer YOUR_API_KEY` to request headers
- **Default API Key**: `han1234` (recommended to change)

#### Supported Models

**Image Models**

| Model | Description | Size |
|------|------|------|
| `sora-image` | Text-to-Image (default) | 360×360 |
| `sora-image-landscape` | Text-to-Image (landscape) | 540×360 |
| `sora-image-portrait` | Text-to-Image (portrait) | 360×540 |

**Video Models**

| Model | Duration | Orientation | Description |
|------|------|------|------|
| `sora-video-10s` | 10s | Landscape | Text-to-Video / Image-to-Video |
| `sora-video-15s` | 15s | Landscape | Text-to-Video / Image-to-Video |
| `sora-video-landscape-10s` | 10s | Landscape | Text-to-Video / Image-to-Video |
| `sora-video-landscape-15s` | 15s | Landscape | Text-to-Video / Image-to-Video |
| `sora-video-portrait-10s` | 10s | Portrait | Text-to-Video / Image-to-Video |
| `sora-video-portrait-15s` | 15s | Portrait | Text-to-Video / Image-to-Video |

#### Request Examples

**Text-to-Image**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-image",
    "messages": [
      {
        "role": "user",
        "content": "A cute kitten"
      }
    ]
  }'
```

**Image-to-Image**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-image",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Turn this image into an oil painting style"
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

**Text-to-Video**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-video-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "A kitten running on the grass"
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
    "model": "sora-video-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "This cat is dancing"
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

**Video Remix (continue creating from an existing video)**

* Include the remix share link or ID in the prompt.

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-video-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "https://sora.chatgpt.com/p/s_68e3a06dcd888191b150971da152c1f5 change to ink-wash painting style"
      }
    ]
  }'
```

**Video Storyboard**

* Example trigger prompt:
  ```[5.0s]The cat skydives from a plane [5.0s]The cat lands [10.0s]The cat runs in a field```
* Or
  ```text
  [5.0s]The cat skydives from a plane
  [5.0s]The cat lands
  [10.0s]The cat runs in a field
  ```

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-video-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "[5.0s]The cat skydives from a plane [5.0s]The cat lands [10.0s]The cat runs in a field"
      }
    ]
  }'
```

### Video Character Feature

Sora2API supports **video character generation**.

#### Overview

- **Character creation**: If you provide only a video (no prompt), the system automatically extracts character information and returns the character name
- **Character-based generation**: If you provide a video + prompt, the system creates a character from the uploaded video and generates using the character + prompt, returning a video

#### API Usage (OpenAI standard format; streaming required)

**Scenario 1: Create a character only (no video generation)**

Upload a video to extract character information and obtain the character name and avatar.

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-video-landscape-10s",
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

Upload a video to create a character, then use that character to generate a new video.

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-video-landscape-10s",
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
            "text": "Have the character do a dance move"
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

# Read the video file and encode to Base64
with open("video.mp4", "rb") as f:
    video_data = base64.b64encode(f.read()).decode("utf-8")

# Create character only
response = requests.post(
    "http://localhost:8000/v1/chat/completions",
    headers={
        "Authorization": "Bearer han1234",
        "Content-Type": "application/json"
    },
    json={
        "model": "sora-video-landscape-10s",
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

# Handle streaming response
for line in response.iter_lines():
    if line:
        print(line.decode("utf-8"))
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

Thanks to all contributors and users for their support!

---

## 📞 Contact

- File an issue: [GitHub Issues](https://github.com/TheSmallHanCat/sora2api/issues)
- Discussions: [GitHub Discussions](https://github.com/TheSmallHanCat/sora2api/discussions)

---

**⭐ If this project helps you, please give it a Star!**