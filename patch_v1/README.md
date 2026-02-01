# Sora2API Patch v1 (Watermark & Logs Fix)

This patch package contains the necessary files to apply the following fixes and features to a Sora2API deployment:

1.  **Android API Watermark-Free Logic**: Implements the Android API bridge to fetch watermark-free videos, with robust fallback to "free" (third-party) methods if it fails.
2.  **Debug Logging & Crash Prevention**: Fixes loop/crash issues in video generation and adds detailed traceback logging.
3.  **Manage Panel Updates**: Adds "Method" column to logs, fixes log display, and persists debug settings.

## Contents

*   `src/core/`: Database schema, models, and config logic.
*   `src/services/`: Generation handler (core logic) and new Custom Extractor.
*   `src/api/`: Admin endpoints (logs download, debug).
*   `src/main.py`: Startup logic for DB migration.
*   `static/manage.html`: Updated Management UI.

## Installation Instructions

### 1. Backup
Before applying, backup your existing `src` and `static` directories and your `sora2.db` database.

### 2. Copy Files
Copy the contents of this `patch_v1` folder over your existing installation root. Overwrite all conflicting files.

### 3. Database Migration
No manual SQL execution is required. The `src/core/database.py` and `src/main.py` include logic to automatically migrate your database on the next startup.
*   It will add columns: `parsed_method` etc. to `watermark_free_config`.
*   It will add columns: `watermark_method`, `task_id`, `updated_at` to `request_logs`.
*   It will add column: `debug_enabled` to `admin_config`.

### 4. Restart Service
Restart your Python service (e.g., `systemctl restart sora2api` or `docker restart ...`).
Wait for the logs to show "Database migration check completed".

### 5. Verification
1.  Go to `Yoursite.com/static/manage.html`.
2.  Log in.
3.  Go to "System Config" -> "Debug Settings". You can now toggle Debug Mode and it will save.
4.  Go to "Request Logs". You should see a table with a "Method" column.
5.  Try generating a video. If it uses the Android API successfully, the logs will show `android_success`.

## Note on Translations
This patch includes `static/manage.html` which is **in English**.
If your deployment uses a translated version (e.g., Chinese), you will need to manually merge the changes from `static/manage.html` into your translated file.
**Key Changes in `manage.html`:**
*   Added `logsTableBody` ID (fixed typo).
*   Added `Method` column to Logs Table HTML.
*   Updated `renderLogs` JavaScript function to include the `watermark` column and correct ID selector.
*   Added `toggleDebugMode` logic.

## Dependencies
Ensure your environment supports standard Python libraries. The patch adds usage of `traceback` and `sys` which are built-in. No new `pip install` required unless `sora_custom_extractor.py` requires specific libs (it uses `httpx` etc which should be present).
