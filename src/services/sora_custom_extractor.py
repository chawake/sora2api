"""
Sora Custom API Video Extractor
Based on tibbar213/sora-downloader implementation
Uses Android credentials for direct API access to published posts
"""

import os
import re
import threading
import asyncio
from typing import Optional, Dict
from curl_cffi.requests import Session, errors
from ..core.database import Database

class SoraCustomAPIExtractor:
    """
    Custom watermark-free extractor using official Sora API
    Replaces scraping methods with direct API access using Android credentials
    """
    
    def __init__(self, sora_client, proxy_manager=None, database=None):
        self.sora_client = sora_client
        self.proxy_manager = proxy_manager
        self.access_token = None
        self.refresh_token = None
        self.client_id = None  # Will be loaded from config / database
        self.db: Optional[Database] = database or Database()
        
        # Thread safety for token refresh
        self.lock = threading.Lock()
        
        # Initialize curl-cffi session with proper impersonation
        self.session = Session(impersonate="chrome110")
    
    async def load_android_credentials(self):
        """Load Android credentials from database"""
        try:
            if self.db is None:
                self.db = Database()
            creds = await self.db.get_android_credentials()
            self.access_token = creds.get('sora_auth_token')
            self.refresh_token = creds.get('sora_refresh_token')
            self.client_id = creds.get('sora_client_id') or "app_OHnYmJt5u1XEdhDUx0ig1ziv"
            
            if self.access_token or self.refresh_token:
                print("Loaded Android credentials from database")
                return True
            else:
                print("Android credentials not configured in database")
                return False
            
        except Exception as e:
            print(f"Failed to load Android credentials from database: {e}")
            return False
    
    def refresh_token_if_needed(self):
        """Refresh access token using refresh_token"""
        with self.lock:
            if not self.refresh_token:
                raise Exception("Android refresh token is not available.")
            
            print("Attempting to refresh Android access token...")
            url = "https://auth.openai.com/oauth/token"
            payload = {
                "client_id": self.client_id,
                "grant_type": "refresh_token",
                "redirect_uri": "com.openai.sora://auth.openai.com/android/com.openai.sora/callback",
                "refresh_token": self.refresh_token
            }
            
            try:
                response = self.session.post(url, json=payload, timeout=20)
                response.raise_for_status()
                data = response.json()
                
                # Update tokens
                self.access_token = data['access_token']
                self.refresh_token = data['refresh_token']
                
                print("Successfully refreshed Android access token.")
                
                # Persist updated tokens to database asynchronously (fire-and-forget)
                try:
                    loop = asyncio.get_event_loop()
                    if loop.is_running():
                        loop.create_task(self._save_tokens_to_db())
                except RuntimeError:
                    # No running event loop; skip async DB update
                    pass
                return True
                
            except errors.RequestsError as e:
                print(f"Failed to refresh Android token: {e}")
                raise Exception(f"Failed to refresh Android token: {e}")
    
    async def _save_tokens_to_db(self):
        """Save updated tokens to database"""
        try:
            if self.db is None:
                self.db = Database()
            await self.db.update_android_credentials(
                sora_auth_token=self.access_token or "",
                sora_refresh_token=self.refresh_token or "",
                sora_client_id=self.client_id or "app_OHnYmJt5u1XEdhDUx0ig1ziv"
            )
            print("Android tokens updated in database")
            
        except Exception as e:
            print(f"Failed to save tokens to database: {e}")
    
    def make_sora_api_call(self, post_id: str) -> Dict:
        """Make API call to Sora backend to get published post data"""
        if not self.access_token:
            raise Exception("Android access token not available")
        
        api_url = f"https://sora.chatgpt.com/backend/project_y/post/{post_id}"
        headers = {
            'User-Agent': 'Sora/1.2025.308',
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip',
            'oai-package-name': 'com.openai.sora',
            'authorization': f'Bearer {self.access_token}'
        }
        
        try:
            response = self.session.get(api_url, headers=headers, timeout=20)
            response.raise_for_status()
            return response.json()
            
        except errors.RequestsError as e:
            # If 401/403, try refresh and retry
            if e.response is not None and e.response.status_code in [401, 403]:
                print(f"Android token expired (HTTP {e.response.status_code}). Refreshing...")
                try:
                    self.refresh_token_if_needed()
                    # Retry with new token
                    response = self.session.get(api_url, headers=headers, timeout=20)
                    response.raise_for_status()
                    return response.json()
                except Exception as refresh_error:
                    raise Exception(f"Failed to refresh Android token: {refresh_error}")
            else:
                raise Exception(f"Sora API call failed: {e}")
    
    def extract_clean_video_url(self, post_id: str) -> Optional[str]:
        """Extract clean video URL from published Sora post using Android credentials"""
        try:
            response_data = self.make_sora_api_call(post_id)
            
            # Extract the clean video URL from encodings.source.path
            download_link = response_data['post']['attachments'][0]['encodings']['source']['path']
            
            if download_link:
                print(f"Successfully extracted clean video URL via Android API: {download_link}")
                return download_link
            else:
                print("No download link found in Sora API response")
                return None
                
        except (KeyError, IndexError) as e:
            print(f"Failed to extract download link from Sora API: {e}")
            return None
        except Exception as e:
            print(f"Sora API call failed: {e}")
            return None
    
    async def get_clean_video_url(self, post_id: str) -> Optional[str]:
        """
        Main method to get clean video URL from published post
        Note: This requires post_id from published video, not generation_id
        """
        # Load Android credentials
        if not await self.load_android_credentials():
            print("Failed to load Android credentials")
            return None
        
        # Configure proxy if available
        if self.proxy_manager is not None:
            try:
                proxy_url = await self.proxy_manager.get_proxy_url()
                if proxy_url:
                    self.session.proxies = {"http": proxy_url, "https": proxy_url}
            except Exception as e:
                print(f"Failed to configure proxy for Android extractor: {e}")
        
        # Extract clean URL using Android API
        return self.extract_clean_video_url(post_id)

# Integration class for watermark-free system
class CustomWatermarkFreeExtractor:
    """
    Custom watermark-free extractor using Android credentials
    This replaces the scraping-based custom parse method
    """
    
    def __init__(self, sora_client, proxy_manager=None):
        self.sora_extractor = SoraCustomAPIExtractor(sora_client, proxy_manager)
        self.sora_client = sora_client
        self.proxy_manager = proxy_manager
    
    async def get_watermark_free_url(self, post_id: str) -> Optional[str]:
        """
        Get watermark-free URL using Android credentials and official API
        This is the recommended custom method
        """
        try:
            clean_url = await self.sora_extractor.get_clean_video_url(post_id)
            if clean_url:
                return clean_url
            else:
                print("Custom Android API extraction failed")
                return None
                
        except Exception as e:
            print(f"Custom extraction failed: {e}")
            return None
