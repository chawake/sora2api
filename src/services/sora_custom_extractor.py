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

class SoraCustomAPIExtractor:
    """
    Custom watermark-free extractor using official Sora API
    Replaces scraping methods with direct API access using Android credentials
    """
    
    def __init__(self, sora_client, proxy_manager=None):
        self.sora_client = sora_client
        self.proxy_manager = proxy_manager
        self.access_token = None
        self.refresh_token = None
        self.client_id = None  # Will be loaded from config
        
        # Thread safety for token refresh
        self.lock = threading.Lock()
        
        # Initialize curl-cffi session with proper impersonation
        self.session = Session(impersonate="chrome110")
        
        # Set proxy if available
        if self.proxy_manager:
            proxy_url = self.proxy_manager.get_proxy_url()
            if proxy_url:
                self.session.proxies = {"http": proxy_url, "https": proxy_url}
    
    def load_android_credentials(self):
        """Load Android credentials from TOML configuration"""
        try:
            # Import here to avoid circular imports
            from core.config import config
            
            # Load from TOML configuration
            self.access_token = getattr(config, 'SORA_AUTH_TOKEN', None)
            self.refresh_token = getattr(config, 'SORA_REFRESH_TOKEN', None)
            self.client_id = getattr(config, 'SORA_CLIENT_ID', "app_OHnYmJt5u1XEdhDUx0ig1ziv")
            
            if self.access_token or self.refresh_token:
                print("Loaded Android credentials from TOML configuration")
                return True
            else:
                print("Android credentials not configured in TOML")
                return False
            
        except Exception as e:
            print(f"Failed to load Android credentials from TOML: {e}")
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
                
                # Update TOML configuration
                self._save_tokens_to_toml()
                return True
                
            except errors.RequestsError as e:
                print(f"Failed to refresh Android token: {e}")
                raise Exception(f"Failed to refresh Android token: {e}")
    
    def _save_tokens_to_toml(self):
        """Save updated tokens to TOML configuration"""
        try:
            # Import here to avoid circular imports
            from core.config import config
            
            # Update TOML file with new tokens
            config_file = "config/setting.toml"
            
            # Read current TOML content
            import toml
            with open(config_file, 'r') as f:
                toml_data = toml.load(f)
            
            # Update tokens
            if 'android_credentials' not in toml_data:
                toml_data['android_credentials'] = {}
            
            toml_data['android_credentials']['SORA_AUTH_TOKEN'] = self.access_token
            toml_data['android_credentials']['SORA_REFRESH_TOKEN'] = self.refresh_token
            toml_data['android_credentials']['SORA_CLIENT_ID'] = self.client_id
            
            # Write back to TOML file
            with open(config_file, 'w') as f:
                toml.dump(toml_data, f)
            
            print("Android tokens updated in TOML configuration")
            
        except Exception as e:
            print(f"Failed to save tokens to TOML: {e}")
    
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
        if not self.load_android_credentials():
            print("Failed to load Android credentials")
            return None
        
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
