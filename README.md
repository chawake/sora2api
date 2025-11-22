# Sora2API

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.119.0-green.svg)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/docker-supported-blue.svg)](https://www.docker.com/)

**A fully featured OpenAI-compatible API service that provides a unified interface for Sora**

</div>

---

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Usage Guide](#usage-guide)
  - [Quick Reference](#quick-reference)
  - [Admin Dashboard](#admin-dashboard)
  - [API Calls](#api-calls)
  - [Video Character Feature](#video-character-feature)
- [FAQ](#faq)
- [License](#license)

---

## ✨ Features

### Core Features
- 🎨 **Text-to-Image** – Generate images from text descriptions
- 🖼️ **Image-to-Image** – Apply creative transformations based on an uploaded image
- 🎬 **Text-to-Video** – Generate videos from text descriptions
- 🎥 **Image-to-Video** – Generate related videos from an image
- 📊 **Multiple Aspect Ratios** – Landscape, portrait, and more
- 🎭 **Video Character Feature** – Create characters and generate character videos
- 🎬 **Remix Feature** – Continue creation based on an existing video

### Advanced Features
- 🔐 **Token Management** – Manage multiple tokens with round-robin load balancing
- 🌐 **Proxy Support** – HTTP and SOCKS5 proxies
- 📝 **Detailed Logging** – Full request/response logs
- 🔄 **Asynchronous Processing** – Efficient async task handling
- 💾 **Data Persistence** – SQLite database storage
- 🎯 **OpenAI Compatible** – Fully compatible with the OpenAI API format
- 🛡️ **Secure Authentication** – API key verification and permission management
- 📱 **Web Admin UI** – Intuitive management dashboard

---

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose (recommended)
- Or Python 3.8+

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
# Start with WARP proxy
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

### First Run

After the service starts, open the admin dashboard to perform the initial configuration:

- **URL**: http://localhost:8000
- **Username**: `admin`
- **Password**: `admin`

⚠️ **Important**: Please change the password immediately after your first login!

---

### Quick Reference

| Feature              | Model          | Notes                                        |
|----------------------|----------------|----------------------------------------------|
| Text-to-Image        | `sora-image*`  | Use `content` as a string                    |
| Image-to-Image       | `sora-image*`  | Use `content` as an array + `image_url`      |
| Text-to-Video        | `sora-video*`  | Use `content` as a string                    |
| Image-to-Video       | `sora-video*`  | Use `content` as an array + `image_url`      |
| Create Character     | `sora-video*`  | Use `content` as an array + `video_url`      |
| Character Video      | `sora-video*`  | Use `content` as an array + `video_url` + text |
| Remix                | `sora-video*`  | Include Remix ID in `content`                |

---

### API Calls

#### Basics (OpenAI-compatible format, streaming required)

- **Endpoint**: `http://localhost:8000/v1/chat/completions`
- **Authentication**: Add `Authorization: Bearer YOUR_API_KEY` to the request headers
- **Default API key**: `han1234` (change it in production)

#### Supported Models

**Image Models**

| Model                  | Description                 | Size    |
|------------------------|-----------------------------|---------|
| `sora-image`           | Text-to-image (default)     | 360×360 |
| `sora-image-landscape` | Text-to-image (landscape)   | 540×360 |
| `sora-image-portrait`  | Text-to-image (portrait)    | 360×540 |

**Video Models**

| Model                         | Duration | Orientation | Description                       |
|------------------------------|----------|-------------|-----------------------------------|
| `sora-video-10s`             | 10s      | Landscape   | Text-to-video / image-to-video   |
| `sora-video-15s`             | 15s      | Landscape   | Text-to-video / image-to-video   |
| `sora-video-landscape-10s`   | 10s      | Landscape   | Text-to-video / image-to-video   |
| `sora-video-landscape-15s`   | 15s      | Landscape   | Text-to-video / image-to-video   |
| `sora-video-portrait-10s`    | 10s      | Portrait    | Text-to-video / image-to-video   |
| `sora-video-portrait-15s`    | 15s      | Portrait    | Text-to-video / image-to-video   |

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
        "content": "A cute little cat"
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
        "content": "A small cat running on the grass"
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

**Video Remix (continue creation from an existing video)**

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Authorization: Bearer han1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-video-landscape-10s",
    "messages": [
      {
        "role": "user",
        "content": "https://sora.chatgpt.com/p/s_68e3a06dcd888191b150971da152c1f5 change to an ink painting style"
      }
    ]
  }'
```

### Video Character Feature

Sora2API supports **video character generation**.

#### Feature Description

- **Character Creation**: If there is only a video and no prompt, the service automatically extracts character information and returns the character name.
- **Character Generation**: If both a video and a prompt are provided, upload the video to create a character, then use that character plus the prompt to generate a video.

#### API Calls (OpenAI-compatible format, streaming required)

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
            "text": "Make the character perform a dancing move"
          }
        ]
      }
    ],
    "stream": true
  }'
```

#### Python Code Example

```python
import requests
import base64

# Read the video file and encode it as Base64
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

# Handle streaming responses
for line in response.iter_lines():
    if line:
        print(line.decode("utf-8"))
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

Thanks to all contributors and users for your support!

---

## 📞 Contact

- Issues: [GitHub Issues](https://github.com/TheSmallHanCat/sora2api/issues)
- Discussions: [GitHub Discussions](https://github.com/TheSmallHanCat/sora2api/discussions)

---

**⭐ If this project is helpful to you, please give it a Star!**
