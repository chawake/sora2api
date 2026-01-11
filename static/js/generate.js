(() => {
  const $ = (id) => document.getElementById(id);

  const btnSend = $('btnSend');
  const btnClear = $('btnClear');
  const btnCopyLog = $('btnCopyLog'); // May not exist (global log button removed)
  // Legacy log container might not exist, create hidden node as fallback to avoid null reference
  const out =
    $('output') ||
    (() => {
      const el = document.createElement('pre');
      el.id = 'output';
      el.style.display = 'none';
      document.body.appendChild(el);
      return el;
    })();
  const logTaskPanel = $('tabPanelLog');
  const logListContainer = $('logListContainer');
  const logDetailId = $('logDetailId');
  const logDetailStatus = $('logDetailStatus');
  const logDetailMeta = $('logDetailMeta');
  const logDetailContent = $('logDetailContent');
  const btnCopyTaskLog = $('btnCopyTaskLog');
  const previewGrid = $('previewGrid');
  const previewFilterBar = $('previewFilterBar');
  const previewCount = $('previewCount');
  const btnPreviewBatchDownload = $('btnPreviewBatchDownload');
  const previewModal = $('previewModal');
  const previewModalMedia = $('previewModalMedia');
  const previewModalTaskId = $('previewModalTaskId');
  const previewModalStoryboard = $('previewModalStoryboard');
  const previewModalWatermark = $('previewModalWatermark');
  const previewModalMeta = $('previewModalMeta');
  const btnPreviewClose = $('btnPreviewClose');
  const btnPreviewOpenNew = $('btnPreviewOpenNew');
  const btnPreviewCopyLink = $('btnPreviewCopyLink');
  const btnPreviewCopyHtml = $('btnPreviewCopyHtml');
  const previewModalDownload = $('previewModalDownload');
  const btnPreviewLocateTask = $('btnPreviewLocateTask');
  const editStoryboardModal = $('editStoryboardModal');
  const editStoryboardModalBadge = $('editStoryboardModalBadge');
  const editStoryboardModalMeta = $('editStoryboardModalMeta');
  const editStoryboardTextarea = $('editStoryboardTextarea');
  const btnEditStoryboardCancel = $('btnEditStoryboardCancel');
  const btnEditStoryboardRetry = $('btnEditStoryboardRetry');
  const taskList = $('taskList');
  const taskCount = $('taskCount');
  const dropzone = $('dropzone');
  const fileInput = $('file');
  const filePreviewBox = $('filePreviewBox');
  const filePreviewMedia = $('filePreviewMedia');
  const filePreviewName = $('filePreviewName');
  const filePreviewKind = $('filePreviewKind');
  const filePreviewMeta = $('filePreviewMeta');
  const filePreviewHints = $('filePreviewHints');
  const filePreviewList = $('filePreviewList');
  const btnUseRecommendedModel = $('btnUseRecommendedModel');
  const btnClearFiles = $('btnClearFiles');
  const uxBanner = $('uxBanner');
  const toastHost = $('toastHost') || document.getElementById('toastHost');
  const promptBox = $('prompt');
  const tagBar = $('tagBar');
  const roleList = $('roleList');
  const roleSearch = $('roleSearch');
  const roleSearchClear = $('roleSearchClear');
  const roleCountEl = $('roleCount');
  const roleFilterBar = $('roleFilterBar');
  const roleSort = $('roleSort');
  const btnReloadRoles = $('btnReloadRoles');
  const btnRoleDense = $('btnRoleDense');
  const attachedRolesBox = $('attachedRoles');
  const btnClearMainRoles = document.getElementById('btnClearMainRoles');
  const multiGlobalRolesBar = document.getElementById('multiGlobalRolesBar');
  const multiAttachedRolesBox = document.getElementById('multiAttachedRoles');
  const btnMultiClearRoles = document.getElementById('btnMultiClearRoles');
  const storyboardAttachedRolesBox = document.getElementById('storyboardAttachedRoles');
  const btnStoryboardScopeRoles = document.getElementById('btnStoryboardScopeRoles');
  const btnStoryboardClearRoles = document.getElementById('btnStoryboardClearRoles');
  const formStorageKey = 'gen_form_v1';
  const btnClearDone = $('btnClearDone');
  const btnClearAll = $('btnClearAll');
  const taskStorageKey = 'gen_tasks_v1';
  // Role mounting: Isolated by mode to avoid illusion of 'storyboard mount affecting single/same prompt'
  const roleStorageKeyLegacy = 'gen_roles_v1';
  const roleStorageKeyMain = 'gen_roles_main_v1';
  const roleStorageKeyMulti = 'gen_roles_multi_v1';
  const roleStorageKeyStoryboard = 'gen_roles_storyboard_v1';
  const ROLE_UI_KEY = 'gen_role_ui_v2';
  const ROLE_FAV_KEY = 'gen_role_fav_v1';
  const ROLE_USED_KEY = 'gen_role_used_v1';
  const authHeaderKey = 'adminToken';
  const batchPromptList = $('batchPromptList');
  const batchModeBar = $('batchModeBar');
  const batchConcurrencyInput = $('batchConcurrency');
  const btnApplyGlobalCountToAll = $('btnApplyGlobalCountToAll');
  const batchMetaActions = document.getElementById('batchMetaActions');
  const btnExportBatch = $('btnExportBatch');
  const btnImportBatch = $('btnImportBatch');
  const importBatchFile = $('importBatchFile');
  const multiPromptList = document.getElementById('multiPromptList');
  const btnAddPrompt = document.getElementById('btnAddPrompt');
  const multiPromptActions = document.getElementById('multiPromptActions');
  const storyboardBox = document.getElementById('storyboardBox');
  const storyboardTitle = document.getElementById('storyboardTitle');
  const storyboardShotCount = document.getElementById('storyboardShotCount');
  const btnApplyStoryboardCount = document.getElementById('btnApplyStoryboardCount');
  const storyboardSequential = document.getElementById('storyboardSequential');
  const btnStoryboardFromPrompt = document.getElementById('btnStoryboardFromPrompt');
  const btnStoryboardClear = document.getElementById('btnStoryboardClear');
  const storyboardContext = document.getElementById('storyboardContext');
  const storyboardList = document.getElementById('storyboardList');
  const globalCountLabel = document.getElementById('globalCountLabel');
  const uploadCard = document.getElementById('uploadCard');
  const dropzoneWrap = document.getElementById('dropzoneWrap');
  const btnSendPrimary = document.getElementById('btnSendPrimary');
  const btnClearPrimary = document.getElementById('btnClearPrimary');
  const quickModeBar = document.getElementById('quickModeBar');
  const btnOpenMoreModes = document.getElementById('btnOpenMoreModes');
  const quickCountWrap = document.getElementById('quickCountWrap');
  const quickCountInput = document.getElementById('quickCount');
  const quickCountDec = document.getElementById('quickCountDec');
  const quickCountInc = document.getElementById('quickCountInc');
  const quickPlan = document.getElementById('quickPlan');
  const btnToggleAdvanced = $('btnToggleAdvanced');
  const advancedBox = $('advancedBox');
  const btnOnlyRunning = $('btnOnlyRunning');
  const btnPreviewDense = $('btnPreviewDense');
  const btnLogBottom = $('btnLogBottom');
  const concurrencyDec = $('concurrencyDec');
  const concurrencyInc = $('concurrencyInc');
  const rightTabButtons = Array.from(document.querySelectorAll('[data-tab]'));
  const tabPanelTasks = $('tabPanelTasks');
  const tabPanelPreview = $('tabPanelPreview');
  const tabPanelLog = $('tabPanelLog');
  const RIGHT_TAB_KEY = 'gen_right_tab';
  const PREVIEW_SEEN_KEY = 'gen_preview_seen_v1';
  const PREVIEW_FILTER_KEY = 'gen_preview_filter_v1';
  const PREVIEW_DENSE_KEY = 'gen_preview_dense_v1';
  const ADV_OPEN_KEY = 'gen_adv_open';
  const LOG_MAX_CHARS = 4000;
  const LOG_MAX_LINES = 120;
  const LOG_STORE_LIMIT = 20000;
  const DRAFT_KEY = 'gen_prompt_draft_v1';
  let draftTimer = null;
  let previewHintTimer = null;
  let applyingMainFiles = false; // Prevent set files triggering change recursively
  // Advanced settings open by default: Reduce 'expand/collapse' actions (fits high-frequency workflow)
  let advancedOpen = true;
  // "Copies/Default Copies" isolated by mode: Avoid pollution of storyboard default (should be 1)
  let batchConcurrencyByType = {};

  let tasks = [];
  let taskIdCounter = 1;
  let roles = [];
  let roleUi = { query: '', filter: 'all', sort: 'smart', dense: false };
  let roleFavs = new Set(); // username set
  let roleUsed = {}; // { [username]: lastUsedTs }
  let attachedRoles = [];
  let attachedRolesMulti = [];
  let attachedRolesStoryboard = [];
  let multiPrompts = [];
  const multiPromptRoles = {};
  // storyboardShots: { text, count, fileDataUrl, fileName, roles: [], useGlobalRoles?: boolean }
  // useGlobalRoles=false means shot is manually excluded: no longer auto-mount 'Global Roles' (future global changes won't affect it)
  let storyboardShots = [];
  const STORYBOARD_RUN_KEY = 'gen_storyboard_run_v1';
  let storyboardRunCounter = parseInt(localStorage.getItem(STORYBOARD_RUN_KEY) || '0', 10) || 0;
  let tagFilter = '';

  // Upload preview state (for immediate alerts on 'model/orientation/empty prompt')
  let previewObjectUrl = null;
  let lastPreviewSignature = '';
  let lastPreviewInfo = null; // { w, h, orientation, isImage, isVideo }
  let currentRecommendedModel = null;

  const getAuthHeaders = () => {
    const t = localStorage.getItem(authHeaderKey);
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  const escapeAttr = (str = '') =>
    str
      .replace(/"/g, "'")
      .replace(/'/g, '&#39;')
      .replace(/\s+/g, ' ')
      .trim();

  const escapeHtml = (str = '') => {
    const s = String(str || '');
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // Default Avatar: Pure local data URI (avoids external placeholder block/offline issues)
  const DEFAULT_ROLE_AVATAR = (() => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#60a5fa"/><stop offset="1" stop-color="#6366f1"/>' +
      '</linearGradient></defs>' +
      '<rect width="160" height="160" rx="34" fill="url(#g)"/>' +
      '<circle cx="80" cy="66" r="22" fill="rgba(255,255,255,0.92)"/>' +
      '<path d="M46 118c4-18 18-28 34-28s30 10 34 28" fill="none" stroke="rgba(255,255,255,0.92)" stroke-width="10" stroke-linecap="round"/>' +
      '</svg>';
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  })();

  // URL Whitelist: Sora/OpenAI domains or common media extensions
  const isValidMediaUrl = (u) => {
    if (!u) return false;
    const s = u.toString();
    const domainOk = /(?:^https?:\/\/)?(?:videos\.openai\.com|oscdn\d*\.dyysy\.com)/i.test(s);
    const extOk = /\.(mp4|webm|mov|m4v|mpg|mpeg|avi|gif|png|jpg|jpeg|webp)(?:\?|#|$)/i.test(s);
    return domainOk || extOk;
  };

  // ===== Download-friendly naming & Same-origin /tmp rewrite (Solves 'hash name + manual rename' pain point) =====
  const padNum = (n, width = 2) => {
    const v = Math.max(0, parseInt(String(n ?? '0'), 10) || 0);
    const s = String(v);
    return s.length >= width ? s : `${'0'.repeat(width)}${s}`.slice(-width);
  };

  const sanitizeFilename = (name, fallback = 'download') => {
    let s = String(name || '').trim();
    if (!s) return fallback;
    // Remove control chars, avoid Windows/browser save failure
    s = s.replace(/[\u0000-\u001f\u007f]/g, '');
    // Windows forbidden chars: \ / : * ? " < > |
    s = s.replace(/[\\/:*?"<>|]/g, '-');
    // 合并空白
    s = s.replace(/\s+/g, ' ').trim();
    // No trailing dot or space (Windows)
    s = s.replace(/[. ]+$/g, '');
    if (!s) return fallback;
    // Control length, avoid system truncation/failure (conservative)
    if (s.length > 120) s = s.slice(0, 120).trim();
    return s || fallback;
  };

  const mediaExtFromUrl = (url, type = 'video') => {
    const s = String(url || '');
    const m = s.match(/\.([a-zA-Z0-9]{2,6})(?:[?#]|$)/);
    const ext = m ? String(m[1]).toLowerCase() : '';
    const ok = new Set(['mp4', 'mov', 'm4v', 'webm', 'gif', 'png', 'jpg', 'jpeg', 'webp']);
    if (ok.has(ext)) return ext;
    return type === 'image' ? 'png' : 'mp4';
  };

  const normalizeTmpDownloadUrl = (url) => {
    // Goal: Rewrite `http://127.0.0.1:8000/tmp/xxx.mp4` to `/tmp/xxx.mp4`
    // So download works with same-origin and custom filename regardless of access host.
    try {
      const u = new URL(String(url || ''), window.location.href);
      if (u && u.pathname && u.pathname.startsWith('/tmp/')) {
        return u.pathname + (u.search || '');
      }
    } catch (_) {
      /* ignore */
    }
    return String(url || '');
  };

  const buildDownloadFilename = (task, url, type = 'video', ordinal = 1) => {
    const ty = String(type || '').toLowerCase() === 'image' ? 'image' : 'video';
    const ext = mediaExtFromUrl(url, ty);
    const id = task && typeof task.id === 'number' ? task.id : null;

    // Storyboard task: Named by "Title + Shot#/Total + Copy# + TaskID", for easy batch sorting
    if (task && task.storyboard) {
      const sb = task.storyboard || {};
      const run = parseInt(String(sb.run || '0'), 10) || 0;
      const idx = parseInt(String(sb.idx || '0'), 10) || 0;
      const total = parseInt(String(sb.total || '0'), 10) || 0;
      const take = parseInt(String(sb.take || '1'), 10) || 1;
      const takes = parseInt(String(sb.takes || '1'), 10) || 1;

      const titleRaw = String(sb.title || (run ? `StoryboardGroup${run}` : 'Storyboard')).trim();
      const title = sanitizeFilename(titleRaw, run ? `StoryboardGroup${run}` : 'Storyboard');
      const shotPart = idx ? `Shot${padNum(idx, 2)}${total ? `of${padNum(total, 2)}` : ''}` : `Shot${padNum(ordinal, 2)}`;
      const takePart = takes > 1 ? `Take${take}` : '';
      const idPart = id ? `T${id}` : '';
      const parts = [title, shotPart, takePart, idPart].filter(Boolean);
      return `${sanitizeFilename(parts.join('_'), 'Storyboard')}.${ext}`;
    }

    // Normal task: TaskID + Prompt Snippet (Optional)
    const prefix = id ? `Task${id}` : `${ty === 'image' ? 'Image' : 'Video'}${padNum(ordinal, 3)}`;
    const hintRaw = task && task.promptSnippet ? String(task.promptSnippet).trim() : '';
    const hint = hintRaw ? sanitizeFilename(hintRaw.slice(0, 26), '') : '';
    return `${sanitizeFilename(hint ? `${prefix}_${hint}` : prefix, prefix)}.${ext}`;
  };

  const triggerBrowserDownload = (url, filename) => {
    const href = normalizeTmpDownloadUrl(url);
    if (!href) return false;
    try {
      const a = document.createElement('a');
      a.href = href;
      if (filename) a.download = String(filename);
      a.rel = 'noreferrer';
      // No force new tab: Avoid browser 'popup' block
      a.target = '';
      document.body.appendChild(a);
      a.click();
      a.remove();
      return true;
    } catch (_) {
      return false;
    }
  };

  const showToast = (msg, type = 'info', opts = {}) => {
    const host = toastHost || document.body;
    const safeType = ['info', 'success', 'error', 'warn'].includes(type) ? type : 'info';

    const el = document.createElement('div');
    el.className = `toast toast-${safeType}`;

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent =
      opts.title ||
      (safeType === 'success' ? 'Success' : safeType === 'error' ? 'Error' : safeType === 'warn' ? 'Warning' : 'Info');

    const desc = document.createElement('div');
    desc.className = 'desc';
    desc.textContent = String(msg || '');

    el.appendChild(title);
    el.appendChild(desc);

    const duration = typeof opts.duration === 'number' ? opts.duration : 1800;
    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      el.classList.remove('show');
      setTimeout(() => el.parentNode && el.parentNode.removeChild(el), 220);
    };
    const timer = setTimeout(close, duration);

    // Optional action button: For 'light reminders', non-interrupting
    if (opts.action && typeof opts.action === 'object' && opts.action.text && typeof opts.action.onClick === 'function') {
      const actions = document.createElement('div');
      actions.className = 'actions';
      const btn = document.createElement('button');
      btn.className = 'toast-action-btn';
      btn.type = 'button';
      btn.textContent = String(opts.action.text);
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(timer);
        try {
          opts.action.onClick();
        } catch (_) {
          /* ignore */
        }
        close();
      });
      actions.appendChild(btn);
      el.appendChild(actions);
    }

    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));

    el.addEventListener('click', () => {
      clearTimeout(timer);
      close();
    });
  };

  const copyTextSafe = async (text) => {
    const content = text || '';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content);
        return true;
      }
    } catch (_) {
      /* fallback below */
    }
    // Compat HTTP/Insecure: Use hidden textarea
    const ta = document.createElement('textarea');
    ta.value = content;
    ta.setAttribute('readonly', 'readonly');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '-9999px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (_) {
      ok = false;
    }
    ta.parentNode && document.body.removeChild(ta);
    return ok;
  };

  let previewModalState = null; // { url, type, taskId }
  let editStoryboardModalState = null; // { taskId }

  const buildEmbedHtml = (url, type) => {
    const u = String(url || '');
    if (!u) return '';
    return type === 'image'
      ? `<img src='${u}' alt='preview'>`
      : `<video src='${u}' controls playsinline></video>`;
  };

  const closePreviewModal = () => {
    if (!previewModal) return;
    previewModal.classList.remove('open');
    previewModal.setAttribute('aria-hidden', 'true');
    if (previewModalMedia) previewModalMedia.innerHTML = '';
    previewModalState = null;
  };

  const openPreviewModal = (url, type = 'video', taskId = null) => {
    if (!previewModal || !previewModalMedia) return;
    if (!url || !isValidMediaUrl(url)) {
      showToast('Invalid preview link', 'warn');
      return;
    }

    const tid = taskId ? parseInt(String(taskId), 10) : null;
    const t = tid ? tasks.find((x) => x.id === tid) : null;
    const metaText = t && t.meta ? [t.meta.resolution, t.meta.duration, t.meta.info].filter(Boolean).join(' · ') : '';
    const stage = t && t.wmStage ? String(t.wmStage) : '';
    const attempt =
      t && typeof t.wmAttempt === 'number' ? t.wmAttempt : t ? parseInt(String(t.wmAttempt || '0'), 10) || 0 : 0;

    previewModalState = { url: String(url), type: type === 'image' ? 'image' : 'video', taskId: tid };

    // Head: badges
    if (previewModalTaskId) {
      if (tid) {
        previewModalTaskId.style.display = 'inline-flex';
        previewModalTaskId.textContent = `Task ${tid}`;
      } else {
        previewModalTaskId.style.display = 'none';
        previewModalTaskId.textContent = '';
      }
    }
    if (previewModalStoryboard) {
      const sbLabel = t && t.storyboard && t.storyboard.label ? String(t.storyboard.label) : '';
      if (sbLabel) {
        previewModalStoryboard.style.display = 'inline-flex';
        previewModalStoryboard.textContent = sbLabel;
      } else {
        previewModalStoryboard.style.display = 'none';
        previewModalStoryboard.textContent = '';
      }
    }
    if (previewModalWatermark) {
      if (stage) {
        previewModalWatermark.style.display = 'inline-flex';
        previewModalWatermark.textContent =
          stage === 'cancelled'
            ? 'Watermark Cancelled'
            : stage === 'ready'
              ? 'No Watermark'
              : `Removing Watermark${attempt > 0 ? ` · ${attempt}` : ''}`;
      } else {
        previewModalWatermark.style.display = 'none';
        previewModalWatermark.textContent = '';
      }
    }

    // Head: meta line (kept simple; full URL still available via copy/open)
    if (previewModalMeta) {
      previewModalMeta.textContent = (metaText ? `${metaText} · ` : '') + String(url);
    }

    // Actions
    if (previewModalDownload) {
      const href = normalizeTmpDownloadUrl(String(url));
      previewModalDownload.setAttribute('href', href);
      try {
        const filename = buildDownloadFilename(t, href, previewModalState.type, 1);
        previewModalDownload.setAttribute('download', filename);
        previewModalDownload.title = filename;
      } catch (_) {
        // 至少保证有 download 属性（无值时浏览器会用 URL 文件名）
        previewModalDownload.setAttribute('download', '');
        previewModalDownload.title = 'Download';
      }
    }
    if (btnPreviewLocateTask) {
      btnPreviewLocateTask.disabled = !tid;
    }

    // Fallback: If preview modal opens, mark as seen regardless of tab (avoid persistent red dot)
    if (tid) {
      try {
        markPreviewSeen(tid);
      } catch (_) {
        /* ignore */
      }
      updateUnreadDots();
    }

    // Body: media
    previewModalMedia.innerHTML = '';
    if (previewModalState.type === 'image') {
      const img = document.createElement('img');
      img.src = String(url);
      img.alt = 'preview';
      previewModalMedia.appendChild(img);
    } else {
      const v = document.createElement('video');
      v.src = String(url);
      v.controls = true;
      v.autoplay = true;
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      previewModalMedia.appendChild(v);
    }

    // Open
    previewModal.classList.add('open');
    previewModal.setAttribute('aria-hidden', 'false');
  };

  const closeEditStoryboardModal = () => {
    if (!editStoryboardModal) return;
    editStoryboardModal.classList.remove('open');
    editStoryboardModal.setAttribute('aria-hidden', 'true');
    editStoryboardModalState = null;
    if (editStoryboardTextarea) editStoryboardTextarea.value = '';
  };

  const rebuildStoryboardPromptSend = (oldSend, oldShotText, newShotText) => {
    const send = String(oldSend || '');
    const oldShot = String(oldShotText || '');
    const next = String(newShotText || '');
    if (!send) return next;

    const sendTrim = send.replace(/\s+$/, '');
    const oldTrim = oldShot.replace(/\s+$/, '');
    if (oldTrim && sendTrim.endsWith(oldTrim)) {
      return sendTrim.slice(0, sendTrim.length - oldTrim.length) + next;
    }
    if (oldTrim) {
      const idx = sendTrim.lastIndexOf(oldTrim);
      if (idx >= 0) {
        return sendTrim.slice(0, idx) + next + sendTrim.slice(idx + oldTrim.length);
      }
    }
    // Fallback: append as a new final segment, keeping old context intact.
    return sendTrim + (sendTrim ? '\n\n' : '') + next;
  };

  const openEditStoryboardModal = (taskId) => {
    if (!editStoryboardModal || !editStoryboardTextarea) return;
    const tid = taskId ? parseInt(String(taskId), 10) : 0;
    const t = tid ? tasks.find((x) => x.id === tid) : null;
    if (!t || !t.storyboard) {
      showToast('Storyboard task not found', 'warn');
      return;
    }
    const sbLabel = t.storyboard && t.storyboard.label ? String(t.storyboard.label) : '';
    if (editStoryboardModalBadge) {
      if (sbLabel) {
        editStoryboardModalBadge.style.display = 'inline-flex';
        editStoryboardModalBadge.textContent = sbLabel;
      } else {
        editStoryboardModalBadge.style.display = 'none';
        editStoryboardModalBadge.textContent = '';
      }
    }
    if (editStoryboardModalMeta) {
      editStoryboardModalMeta.textContent = sbLabel ? `Modify Prompt (${sbLabel})` : 'Modify Prompt (Current Shot Only)';
    }
    editStoryboardModalState = { taskId: tid };
    editStoryboardTextarea.value = String(t.promptUser || '');
    editStoryboardModal.classList.add('open');
    editStoryboardModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      try {
        editStoryboardTextarea.focus();
        const len = editStoryboardTextarea.value.length;
        editStoryboardTextarea.setSelectionRange(len, len);
      } catch (_) {
        /* ignore */
      }
    }, 0);
  };

  const submitEditStoryboardModal = async () => {
    if (!editStoryboardModalState || !editStoryboardTextarea) return;
    const tid = editStoryboardModalState && editStoryboardModalState.taskId ? parseInt(String(editStoryboardModalState.taskId), 10) : 0;
    const t = tid ? tasks.find((x) => x.id === tid) : null;
    if (!t) {
      closeEditStoryboardModal();
      return;
    }

    const nextShotText = String(editStoryboardTextarea.value || '').trim();
    if (!nextShotText) {
      showToast('Please modify the prompt first (cannot be empty)', 'warn');
      return;
    }

    const apiKey = $('apiKey').value.trim();
    const baseUrl = getBaseUrl();
    if (!apiKey || !baseUrl) {
      showToast('Please enter API Key and Server URL');
      return;
    }

    const nextSend = rebuildStoryboardPromptSend(t.promptSend, t.promptUser, nextShotText);
    closeEditStoryboardModal();
    showToast('Modification submitted, retrying shot...', 'info', { title: 'Shot Retry' });
    await runJobs(
      [
        {
          taskId: tid,
          promptSend: nextSend,
          promptUser: nextShotText,
          file: null,
          model: t.model || $('model').value,
          storyboard: t.storyboard || null
        }
      ],
      apiKey,
      baseUrl,
      1
    );
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const sleepCancellable = async (ms, shouldStop) => {
    const end = Date.now() + Math.max(0, ms || 0);
    while (Date.now() < end) {
      if (shouldStop && shouldStop()) return false;
      const left = end - Date.now();
      await sleep(Math.min(250, Math.max(0, left)));
    }
    return !(shouldStop && shouldStop());
  };

  const formatBytes = (bytes) => {
    const n = Number(bytes) || 0;
    if (n <= 0) return '0B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const idx = Math.min(units.length - 1, Math.floor(Math.log(n) / Math.log(1024)));
    const val = n / Math.pow(1024, idx);
    return `${val.toFixed(idx === 0 ? 0 : 2)}${units[idx]}`;
  };

  const detectOrientation = (w, h) => {
    const ww = Number(w) || 0;
    const hh = Number(h) || 0;
    if (!ww || !hh) return '';
    if (Math.abs(ww - hh) <= 2) return 'square';
    return ww > hh ? 'landscape' : 'portrait';
  };

  const parseModelId = (m = '') => {
    const model = String(m || '');
    const isVideo = model.startsWith('sora-video');
    const isImage = model.startsWith('sora-image');
    const orientation = /portrait/i.test(model) ? 'portrait' : /landscape/i.test(model) ? 'landscape' : '';
    const duration = /15s/i.test(model) ? '15s' : /10s/i.test(model) ? '10s' : '';
    return { isVideo, isImage, orientation, duration };
  };

  const getSelectedModelLabel = () => {
    const sel = $('model');
    return sel && sel.selectedOptions && sel.selectedOptions[0] ? sel.selectedOptions[0].textContent.trim() : $('model')?.value || '';
  };

  const setBannerText = (text) => {
    if (!uxBanner) return;
    const msg = (text || '').trim();
    if (!msg) {
      uxBanner.style.display = 'none';
      uxBanner.textContent = '';
      return;
    }
    uxBanner.textContent = msg;
    uxBanner.style.display = 'block';
  };

  const clearPreviewObjectUrl = () => {
    try {
      if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    } catch (_) {
      /* ignore */
    }
    previewObjectUrl = null;
    lastPreviewSignature = '';
    lastPreviewInfo = null;
  };

  const getImageSize = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth || 0, h: img.naturalHeight || 0 });
      img.onerror = () => resolve(null);
      img.src = src;
    });

  const renderChips = (el, items) => {
    if (!el) return;
    el.innerHTML = '';
    (items || []).forEach((it) => {
      const chip = document.createElement('span');
      const cls = it.kind ? `chip ${it.kind}` : 'chip';
      chip.className = cls;
      chip.textContent = it.text || '';
      el.appendChild(chip);
    });
  };

  const humanizeUpstreamError = (raw) => {
    const text = String(raw?.message || raw?.error?.message || raw || '').trim();

    // Try extracting JSON from "API request failed: 400 - {json}"
    let inner = null;
    const jsonStart = text.indexOf('{');
    if (jsonStart >= 0) {
      const maybe = text.slice(jsonStart);
      try {
        inner = JSON.parse(maybe);
      } catch (_) {
        inner = null;
      }
    }

    const err = inner && inner.error ? inner.error : raw && raw.error ? raw.error : null;
    const code = err && err.code ? String(err.code) : '';
    const param = err && err.param ? String(err.param) : '';
    const msg = err && err.message ? String(err.message) : '';
    const merged = (msg || text || '').trim();

    // Typical: Region restriction (common user confusion)
    const ccFromText = (() => {
      const m = merged.match(/\(([A-Za-z]{2})\)/);
      return m ? m[1] : '';
    })();
    if (
      code === 'unsupported_country_code' ||
      /not available in your country/i.test(merged) ||
      /not available in your country|region not available|Sora.*not available/i.test(merged)
    ) {
      const cc = param || ccFromText || 'Unknown';
      return {
        type: 'error',
        title: 'Region Restriction',
        message: `Sora is not available in your current region (${cc}).\nSolution: Switch proxy/VPN to a supported region.`
      };
    }

    // Typical: Cloudflare challenge (Frequent on Sora web)
    if (/Just a moment|Enable JavaScript and cookies to continue|__cf_bm|cloudflare/i.test(text)) {
      return {
        type: 'error',
        title: 'Cloudflare Blocked',
        message: 'Cloudflare block triggered.\nSolution: Change IP/Proxy or reduce concurrency.'
      };
    }

    // Fallback: Extract error.message from JSON
    if (merged) {
      return {
        type: /warn|limit|blocked|guardrail|violation|unsupported|restricted/i.test(merged) ? 'warn' : 'error',
        title: 'Generation Failed',
        message: merged
      };
    }

    return { type: 'error', title: 'Generation Failed', message: 'Unknown Error (No readable info from upstream)' };
  };

  // Content Policy/Safety Hit: For storyboard fallback (Show 'Modify Prompt' button on error)
  const isContentPolicyViolation = (raw) => {
    const s = String(raw || '').trim();
    if (!s) return false;
    return (
      /Content Policy Violation/i.test(s) ||
      /may violate our content policies/i.test(s) ||
      /content policies?/i.test(s) && /violate|violation/i.test(s) ||
      /Content.*(Policy|Review|Moderation)/.test(s) ||
      /Review failed|Moderation failed|Content non-compliant|Content violation/.test(s)
    );
  };

  const renderFilePreview = async () => {
    if (!filePreviewBox || !filePreviewMedia || !filePreviewName || !filePreviewKind || !filePreviewMeta || !filePreviewHints) return;

    const files = Array.from((fileInput?.files && fileInput.files.length ? fileInput.files : []) || []);
    const promptText = (promptBox?.value || '').trim();
    const modelId = $('model')?.value || '';
    const modelInfo = parseModelId(modelId);

    currentRecommendedModel = null;
    if (btnUseRecommendedModel) btnUseRecommendedModel.style.display = 'none';

    if (!files.length) {
      filePreviewBox.style.display = 'none';
      filePreviewMedia.innerHTML = '';
      filePreviewName.textContent = 'No file selected';
      filePreviewKind.textContent = 'Asset';
      filePreviewMeta.textContent = '';
      renderChips(filePreviewHints, []);
      setBannerText('');
      clearPreviewObjectUrl();
      notifyHeight();
      return;
    }

    filePreviewBox.style.display = 'flex';

    const imgCount = files.filter((f) => (f.type || '').startsWith('image')).length;
    const vidCount = files.filter((f) => (f.type || '').startsWith('video')).length;
    const mixed = imgCount > 0 && vidCount > 0;

    const first = files[0];
    const name = first?.name || 'Untitled';
    filePreviewName.textContent = files.length > 1 ? `${files.length} Files (${name} etc)` : name;

    // Asset Type Tag
    const kindText = mixed ? `Mixed(${imgCount}Img/${vidCount}Vid)` : vidCount ? `Video(${vidCount})` : `Image(${imgCount})`;
    filePreviewKind.textContent = kindText;

    const signature = `${files.length}:${name}:${first.size}:${first.lastModified}:${first.type}`;
    const isImage = (first.type || '').startsWith('image');
    const isVideo = (first.type || '').startsWith('video');
    const needReload = signature !== lastPreviewSignature || !previewObjectUrl || !filePreviewMedia.firstChild;

    let w = 0;
    let h = 0;
    let orientation = '';

    // Media Preview: Recreate objectURL only when file changes (avoids clear/re-render flicker during typing)
    if (needReload) {
      // Clear old preview
      if (previewObjectUrl) {
        try {
          URL.revokeObjectURL(previewObjectUrl);
        } catch (_) {
          /* ignore */
        }
      }
      previewObjectUrl = URL.createObjectURL(first);
      lastPreviewSignature = signature;
      lastPreviewInfo = null;
      filePreviewMedia.innerHTML = '';

      if (isImage) {
        const imgEl = document.createElement('img');
        imgEl.src = previewObjectUrl;
        imgEl.alt = 'upload preview';
        filePreviewMedia.appendChild(imgEl);

        const size = await getImageSize(previewObjectUrl);
        if (size) {
          w = size.w;
          h = size.h;
          orientation = detectOrientation(w, h);
        }
        lastPreviewInfo = { w, h, orientation, isImage: true, isVideo: false };
      } else if (isVideo) {
        const v = document.createElement('video');
        v.src = previewObjectUrl;
        v.controls = true;
        v.muted = true;
        v.playsInline = true;
        v.preload = 'metadata';
        filePreviewMedia.appendChild(v);
        lastPreviewInfo = { w: 0, h: 0, orientation: '', isImage: false, isVideo: true };
        // Attempt to get resolution (non-blocking)
        v.addEventListener(
          'loadedmetadata',
          () => {
            const vw = v.videoWidth || 0;
            const vh = v.videoHeight || 0;
            const o = detectOrientation(vw, vh);
            const base = filePreviewMeta.textContent || '';
            const extra = vw && vh ? ` · ${vw}x${vh}${o ? `(${o === 'portrait' ? 'Vert' : o === 'landscape' ? 'Horiz' : 'Sq'})` : ''}` : '';
            if (extra && !base.includes(`${vw}x${vh}`)) {
              filePreviewMeta.textContent = base + extra;
              notifyHeight();
            }
          },
          { once: true }
        );
      } else {
        filePreviewMedia.innerHTML = `<div style="padding:12px;color:#cbd5e1;font-size:12px;">Cannot preview this file type</div>`;
        lastPreviewInfo = { w: 0, h: 0, orientation: '', isImage: false, isVideo: false };
      }
    } else if (lastPreviewInfo) {
      w = lastPreviewInfo.w || 0;
      h = lastPreviewInfo.h || 0;
      orientation = lastPreviewInfo.orientation || '';
    }

    const sizeText = formatBytes(first.size);
    const dimText = w && h ? `${w}x${h}` : '';
    const orientationText = orientation === 'portrait' ? 'Vert' : orientation === 'landscape' ? 'Horiz' : orientation === 'square' ? 'Sq' : '';
    const modelLabel = getSelectedModelLabel();

    filePreviewMeta.textContent = [
      `Current Model: ${modelLabel}`,
      `File: ${sizeText}`,
      dimText ? `Resolution: ${dimText}${orientationText ? `(${orientationText})` : ''}` : ''
    ]
      .filter(Boolean)
      .join(' · ');

    // Recommended Model: Special hint for "Image First Frame" orientation match (common confusion)
    if (isImage && orientation) {
      if (modelInfo.isVideo) {
        const dur = modelInfo.duration || '15s';
        if (orientation === 'portrait') currentRecommendedModel = `sora-video-portrait-${dur}`;
        if (orientation === 'landscape') currentRecommendedModel = `sora-video-landscape-${dur}`;
        // square not strongly recommended
      } else if (modelInfo.isImage) {
        if (orientation === 'portrait') currentRecommendedModel = 'sora-image-portrait';
        if (orientation === 'landscape') currentRecommendedModel = 'sora-image-landscape';
        if (orientation === 'square') currentRecommendedModel = 'sora-image';
      }
      if (currentRecommendedModel && currentRecommendedModel !== modelId && btnUseRecommendedModel) {
        btnUseRecommendedModel.style.display = 'inline-flex';
      }
    }

    const chips = [];
    if (mixed) chips.push({ text: 'Mixed: Avoid mixing Img/Vid', kind: 'warn' });
    if (modelInfo.isImage && vidCount > 0) chips.push({ text: 'Img Model + Vid Asset: Video ignored', kind: 'warn' });
    if (modelInfo.isVideo && imgCount > 0 && !promptText) chips.push({ text: 'Img First Frame + Empty Prompt: Results may vary', kind: 'warn' });
    if (currentRecommendedModel && currentRecommendedModel !== modelId) chips.push({ text: `Recommended: ${currentRecommendedModel}`, kind: 'info' });
    if (!chips.length) chips.push({ text: 'Ready', kind: 'ok' });
    renderChips(filePreviewHints, chips);

    // Banner: Keep only the most critical line to avoid noise
    if (modelInfo.isVideo && imgCount > 0 && !promptText) {
      setBannerText('Tip: Image uploaded without prompt. Image is "Reference/First Frame". Add action/shot description to avoid random results.');
    } else if (modelInfo.isImage && vidCount > 0) {
      setBannerText('Tip: Video uploaded but model is "Image". Video will be ignored.');
    } else if (mixed) {
      setBannerText('Tip: Mixed assets selected. Recommended to separate batches.');
    } else {
      setBannerText('');
    }

    notifyHeight();
  };

  const showBubble = (msg, anchor) => {
    const host = document.getElementById('logActions') || anchor?.parentElement || document.body;
    const bubble = document.createElement('div');
    bubble.className = 'bubble-toast';
    bubble.textContent = msg;
    host.appendChild(bubble);
    requestAnimationFrame(() => bubble.classList.add('show'));
    setTimeout(() => {
      bubble.classList.remove('show');
      setTimeout(() => bubble.parentNode && bubble.parentNode.removeChild(bubble), 180);
    }, 1200);
  };

  const notifyHeight = () => {
    try {
      const page = document.querySelector('.page');
      const h = page
        ? Math.ceil((page.getBoundingClientRect()?.height || 0) + (page.offsetTop || 0))
        : Math.max(document.documentElement?.scrollHeight || 0, document.body?.scrollHeight || 0);
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'sora-generate-height', height: h }, '*');
      }
    } catch (_) {
      /* ignore */
    }
  };

  // ===== Unread Preview Red Dot: Based on "Task ID seen" =====
  const getCurrentPreviewTaskIds = () =>
    (Array.isArray(tasks) ? tasks : [])
      .filter((t) => t && t.url)
      .map((t) => t.id)
      .filter((id) => typeof id === 'number' && id > 0);

  const prunePreviewSeenTaskIds = () => {
    const existing = new Set((Array.isArray(tasks) ? tasks : []).map((t) => t.id).filter((id) => typeof id === 'number'));
    previewSeenTaskIds = new Set(Array.from(previewSeenTaskIds).filter((id) => existing.has(id)));
  };

  const persistPreviewSeenTaskIds = () => {
    try {
      prunePreviewSeenTaskIds();
      localStorage.setItem(PREVIEW_SEEN_KEY, JSON.stringify(Array.from(previewSeenTaskIds.values())));
    } catch (_) {
      /* ignore */
    }
  };

  const loadPreviewSeenTaskIds = () => {
    try {
      const raw = localStorage.getItem(PREVIEW_SEEN_KEY) || '[]';
      const arr = JSON.parse(raw);
      previewSeenTaskIds = new Set(
        Array.isArray(arr)
          ? arr
            .map((x) => parseInt(String(x), 10))
            .filter((n) => !isNaN(n) && n > 0)
          : []
      );
    } catch (_) {
      previewSeenTaskIds = new Set();
    }
    prunePreviewSeenTaskIds();
  };

  const markPreviewSeen = (taskId) => {
    const id = typeof taskId === 'number' ? taskId : parseInt(String(taskId || '0'), 10);
    if (!id) return;
    previewSeenTaskIds.add(id);
    persistPreviewSeenTaskIds();
  };

  const markAllPreviewsSeen = () => {
    getCurrentPreviewTaskIds().forEach((id) => previewSeenTaskIds.add(id));
    persistPreviewSeenTaskIds();
  };

  const hasUnseenPreviews = () => getCurrentPreviewTaskIds().some((id) => !previewSeenTaskIds.has(id));

  // ===== Preview Filter (All/Video/Image/Storyboard) =====
  const normalizePreviewFilter = (v) => {
    const s = String(v || '').toLowerCase();
    return s === 'video' || s === 'image' || s === 'storyboard' ? s : 'all';
  };
  const previewFilterLabel = (f) =>
    f === 'video' ? 'Video' : f === 'image' ? 'Image' : f === 'storyboard' ? 'Storyboard' : 'All';
  let previewFilter = normalizePreviewFilter(localStorage.getItem(PREVIEW_FILTER_KEY) || 'all');

  const taskMatchesPreviewFilter = (t, f) => {
    const filter = normalizePreviewFilter(f);
    if (!t) return false;
    if (filter === 'all') return true;
    if (filter === 'storyboard') return (t.tag || '') === 'storyboard' || !!t.storyboard;
    const ty = String(t.type || '').toLowerCase();
    return filter === 'video' ? ty === 'video' : filter === 'image' ? ty === 'image' : true;
  };

  const syncPreviewFilterButtons = () => {
    if (!previewFilterBar) return;
    previewFilterBar.querySelectorAll('[data-preview-filter]').forEach((btn) => {
      const val = normalizePreviewFilter(btn.getAttribute('data-preview-filter') || 'all');
      btn.classList.toggle('active', val === previewFilter);
    });
  };

  const setPreviewFilter = (next, opts = {}) => {
    const persist = !(opts && opts.persist === false);
    const render = !(opts && opts.render === false);
    const toast = !!(opts && opts.toast);
    const f = normalizePreviewFilter(next);
    if (f === previewFilter) return;
    previewFilter = f;
    if (persist) {
      try {
        localStorage.setItem(PREVIEW_FILTER_KEY, previewFilter);
      } catch (_) {
        /* ignore */
      }
    }
    syncPreviewFilterButtons();
    if (render) renderPreviews();
    if (toast) showToast(`Preview Filter: ${previewFilterLabel(previewFilter)}`, 'info', { duration: 1400 });
  };

  const updateUnreadDots = () => {
    const setDot = (tab, on) => {
      const btn = rightTabButtons.find((b) => b.getAttribute('data-tab') === tab);
      const dot = btn?.querySelector('.dot');
      btn?.classList.toggle('has-unread', on);
      if (dot) dot.style.display = on ? 'block' : 'none';
    };
    const previewUnread = hasUnseenPreviews() && currentRightTab !== 'preview';
    const logUnread = logVersion > logSeenVersion && currentRightTab !== 'log';
    setDot('tasks', unread.tasks && currentRightTab !== 'tasks');
    setDot('preview', previewUnread);
    setDot('log', logUnread);
  };

  const appendLog = (text) => {
    const line = `[${new Date().toLocaleTimeString()}] ${text}`;
    const existing = (out.textContent || '').split('\n').filter(Boolean);
    existing.push(line);
    const trimmed = existing.slice(-LOG_MAX_LINES).join('\n');
    out.textContent = trimmed.slice(-LOG_MAX_CHARS) + '\n';
    out.scrollTop = out.scrollHeight;
    logVersion += 1;
    if (currentRightTab === 'log') {
      logSeenVersion = logVersion;
    }
    updateUnreadDots();
  };

  const log = (msg) => appendLog(msg);

  const logTask = (taskId, msg) => {
    appendLog(`任务#${taskId} | ${msg}`);
    taskLogBuffer[taskId] = (taskLogBuffer[taskId] || '') + `[${new Date().toLocaleTimeString()}] ${msg}\n`;
    const t = tasks.find((x) => x.id === taskId);
    if (t) {
      const mergedLog = (t.logFull || '') + '\n' + `[${new Date().toLocaleTimeString()}] ${msg}`;
      updateTask(taskId, { logFull: mergedLog });
    }
  };

  const getTaskLogText = (t) => {
    if (!t) return '';
    const merged =
      (taskLogBuffer[t.id] || '')
        .split('\n')
        .filter(Boolean)
        .join('\n') ||
      t.logFull ||
      t.logTail ||
      '';
    return merged.trim();
  };

  const renderLogPanel = () => {
    if (!logListContainer || !logDetailContent) return;
    if (!tasks.length) {
      logListContainer.innerHTML = '<div class="muted" style="padding:12px;">No tasks</div>';
      logDetailId.textContent = '';
      logDetailStatus.textContent = '';
      logDetailMeta.textContent = '';
      logDetailContent.textContent = 'No Logs';
      return;
    }

    // Ensure current selected task is valid
    if (!currentLogTaskId || !tasks.find((t) => t.id === currentLogTaskId)) {
      currentLogTaskId = tasks[0].id;
    }

    // Render left list
    const statusMap = {
      queue: 'Queued',
      running: 'Running',
      retrying: 'Retrying',
      done: 'Completed',
      error: 'Failed',
      stalled: 'Stalled',
      character_done: 'Role Created',
      character_error: 'Role Failed'
    };
    logListContainer.innerHTML = tasks
      .map((t) => {
        const active = t.id === currentLogTaskId;
        const statusText =
          t.type === 'character'
            ? t.status === 'done'
              ? statusMap.character_done
              : statusMap.character_error
            : statusMap[t.status] || 'Unknown';
        const msg = t.message || '';
        return `
          <div class="log-card ${active ? 'active' : ''}" data-logitem="${t.id}" style="cursor:pointer;">
            <div class="log-card-head">
              <span class="task-id-pill">#${t.id}</span>
              <span class="pill-pill ${t.status}">${statusText}</span>
            </div>
            <div class="log-card-body" style="padding:8px 10px;">
              <div class="task-log-title" style="font-weight:600; font-size:13px; margin-bottom:4px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${escapeAttr(t.promptSnippet || '')}">
                ${escapeHtml(t.promptSnippet || '(Empty Prompt)')}
              </div>
              ${msg ? `<div class="muted" style="font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(msg)}</div>` : ''}
            </div>
          </div>
        `;
      })
      .join('');

    logListContainer.querySelectorAll('[data-logitem]').forEach((el) => {
      el.addEventListener('click', () => {
        const id = parseInt(el.getAttribute('data-logitem'), 10);
        if (!isNaN(id)) {
          currentLogTaskId = id;
          renderLogPanel();
        }
      });
    });

    // Render right details
    const current = tasks.find((t) => t.id === currentLogTaskId) || tasks[0];
    if (current) {
      const statusText =
        current.type === 'character'
          ? current.status === 'done'
            ? statusMap.character_done
            : statusMap.character_error
          : statusMap[current.status] || 'Unknown';
      logDetailId.textContent = `#${current.id}`;
      logDetailStatus.textContent = statusText;
      logDetailMeta.textContent =
        (current.meta && [current.meta.resolution, current.meta.duration, current.meta.info].filter(Boolean).join(' · ')) ||
        current.message ||
        '';
      logDetailContent.textContent = getTaskLogText(current) || 'No Logs';
      logDetailContent.scrollTop = logDetailContent.scrollHeight;
    }
  };

  const renderTaskLogContent = renderLogPanel;
  const renderTaskLogList = renderLogPanel;

  const setTaskCount = () => {
    taskCount.textContent = `${tasks.length} Tasks`;
  };

  const renderTasks = () => {
    const baseList = onlyRunning
      ? tasks.filter((t) => t.status === 'running' || t.status === 'retrying' || t.status === 'queue' || t.status === 'stalled')
      : tasks;
    const byTag = tagFilter
      ? baseList.filter((t) => (tagFilter === 'storyboard' ? (t.tag === 'storyboard' || !!t.storyboard) : false))
      : baseList;
    const filtered = statusFilter
      ? byTag.filter((t) =>
        statusFilter === 'running' ? t.status === 'running' || t.status === 'retrying' : t.status === statusFilter
      )
      : byTag;
    const counts = {
      running: tasks.filter((t) => t.status === 'running' || t.status === 'retrying').length,
      queue: tasks.filter((t) => t.status === 'queue').length,
      done: tasks.filter((t) => t.status === 'done').length,
      error: tasks.filter((t) => t.status === 'error').length
    };
    const tagCounts = {
      storyboard: tasks.filter((t) => t.tag === 'storyboard' || !!t.storyboard).length
    };
    const totalCount = tasks.length;
    const hiddenCount = baseList.length - filtered.length;
    const groupBar = `
      <div class="chips" style="margin-bottom:6px;">
        <button class="pill-btn ${statusFilter ? '' : 'active'}" data-filter="">All (${totalCount})</button>
        <button class="pill-btn ${statusFilter === 'running' ? 'active' : ''}" data-filter="running">Running (${counts.running})</button>
        <button class="pill-btn ${statusFilter === 'queue' ? 'active' : ''}" data-filter="queue">Queued (${counts.queue})</button>
        <button class="pill-btn ${statusFilter === 'done' ? 'active' : ''}" data-filter="done">Done (${counts.done})</button>
        <button class="pill-btn ${statusFilter === 'error' ? 'active' : ''}" data-filter="error">Failed (${counts.error})</button>
      </div>
      <div class="chips" style="margin-bottom:6px;">
        <span class="muted" style="padding:6px 2px;">Tags</span>
        <button class="pill-btn ${tagFilter ? '' : 'active'}" data-tag="">All</button>
        <button class="pill-btn ${tagFilter === 'storyboard' ? 'active' : ''}" data-tag="storyboard">Storyboard (${tagCounts.storyboard})</button>
      </div>
      ${hiddenCount > 0 ? `<div class="banner">Hidden ${hiddenCount} non-matching tasks</div>` : ''}
    `;

    const html = filtered
      .map((t) => {
        const statusText =
          t.timedOut
            ? 'Network Timeout'
            : t.type === 'character' && t.status === 'done'
              ? 'Role Created'
              : t.type === 'character' && t.status === 'error'
                ? 'Role Failed'
                : (() => {
                  const retryCount =
                    typeof t.retryCount === 'number' ? t.retryCount : parseInt(String(t.retryCount || '0'), 10) || 0;
                  const statusMap = {
                    queue: 'Queued',
                    running: 'Generating',
                    retrying: `Retrying${retryCount > 0 ? ` · ${retryCount}` : ''}`,
                    done: 'Completed',
                    error: 'Failed',
                    stalled: 'Stalled'
                  };
                  return statusMap[t.status] || 'Unknown';
                })();
        const statusClass = `status ${t.timedOut ? 'timedout' : t.status}`;
        const msg = t.message || '';
        const msgColor = t.status === 'retrying' ? '#b45309' : '#f87171';
        const metaText = t.meta ? [t.meta.resolution, t.meta.duration].filter(Boolean).join(' · ') : '';
        const stepIdx = t.status === 'queue' ? 1 : t.status === 'running' || t.status === 'retrying' ? 2 : 3;
        const stepClass = t.status === 'error' ? 'error' : 'active';
        const missingUrlWarn =
          t.type !== 'character' && t.status === 'done' && !t.url
            ? '<div style="margin-top:6px;font-size:12px;color:#b45309;">Video URL missing, generation may have failed or backend returned no link</div>'
            : '';
        const progress = t.progress ?? (t.status === 'done' ? 100 : 0);
        const safeTitle = escapeAttr(t.promptUser || t.promptSnippet || '-');
        const displayTitle = escapeHtml(t.promptSnippet || '-');
        const safeMsg = escapeHtml(msg);
        const metaChip = metaText ? `<span class="task-meta-chip">${escapeHtml(metaText)}</span>` : '';
        const sb = t.storyboard;
        const policyHit =
          t.status === 'error' &&
          (t.errorKind === 'policy' ||
            isContentPolicyViolation(t.message || '') ||
            isContentPolicyViolation(t.logTail || '') ||
            isContentPolicyViolation(String(t.logFull || '').slice(-800)));
        const canEditStoryboardPrompt = !!(policyHit && sb && sb.label);
        const sbChip =
          sb && sb.label
            ? `<span class="task-tag-chip storyboard" title="${escapeAttr(
              [sb.title, sb.label].filter(Boolean).join(' · ')
            )}">${escapeHtml(sb.label)}</span>`
            : '';
        const sbTitleChip =
          sb && sb.title
            ? `<span class="task-tag-chip" title="${escapeAttr(sb.title)}">${escapeHtml(sb.title)}</span>`
            : '';
        const wmStage = t.wmStage ? String(t.wmStage) : '';
        const wmAttempt =
          typeof t.wmAttempt === 'number' ? t.wmAttempt : parseInt(String(t.wmAttempt || '0'), 10) || 0;
        const wmLabel = wmStage
          ? wmStage === 'cancelled'
            ? 'Watermark Cancelled'
            : wmStage === 'ready'
              ? 'Watermark Free Ready'
              : 'Waiting for Watermark Removal'
          : '';
        const wmChip = wmStage
          ? `<span class="task-tag-chip watermark" title="Removing Watermark">${wmLabel}${wmAttempt > 0 ? ` · ${wmAttempt}` : ''}</span>`
          : '';
        const progressWidth = Math.max(0, Math.min(100, progress));
        if (t.collapsed && t.status === 'done') {
          return `
          <div class="task-card" data-status="${t.status}" data-id="${t.id}">
            <div class="task-main">
              <div class="task-head">
                <div class="task-id-pill">任务 ${t.id}</div>
                ${sbChip}
                ${wmChip}
                <div class="${statusClass}" data-task-status="1">${statusText}</div>
                ${metaChip}
                ${sbTitleChip}
              </div>
              <div class="task-title ellipsis" data-task-title="1" title="${safeTitle}">${displayTitle}</div>
              <div class="muted" style="font-size:12px;">Collapsed. Click to expand.</div>
            </div>
            <div class="task-actions">
              ${t.url ? `<button class="link-btn" data-url="${escapeHtml(t.url)}" data-type="${escapeAttr(t.type || 'video')}">Preview</button>` : ''}
              <button class="link-btn" data-expand="${t.id}">Expand</button>
            </div>
          </div>
        `;
        }
        return `
          <div class="task-card" data-status="${t.status}" data-id="${t.id}">
            <div class="task-main">
            <div class="task-head">
              <div class="task-id-pill">任务 ${t.id}</div>
              ${sbChip}
              ${wmChip}
              <div class="${statusClass}" data-task-status="1">${statusText}</div>
              ${metaChip}
              ${sbTitleChip}
            </div>
              <div class="task-title ellipsis" data-task-title="1" title="${safeTitle}">${displayTitle}</div>
              <div data-task-msg="1" style="font-size:12px;color:${msgColor};${msg ? '' : 'display:none;'}">${safeMsg}</div>
              ${missingUrlWarn}
              <div>
                <div class="progress-shell" data-task-progress-shell="1" role="progressbar" aria-label="Task Progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progressWidth}">
                  <div class="progress-bar" data-task-progress-bar="1" style="width:${progressWidth}%;"></div>
                </div>
                <div class="progress-info">
                  <span data-task-progress-text="1">Progress: ${progress}%</span>
                  <span class="muted">Queue · Gen · Done</span>
                </div>
                <div class="task-steps">
                  <div class="task-step ${stepIdx >= 1 ? stepClass : ''}"></div>
                  <div class="task-step ${stepIdx >= 2 ? stepClass : ''}"></div>
                  <div class="task-step ${stepIdx >= 3 ? stepClass : ''}"></div>
                </div>
              </div>
            </div>
            <div class="task-actions">
              ${t.url ? `<button class="link-btn" data-url="${escapeHtml(t.url)}" data-type="${escapeAttr(t.type || 'video')}">Preview</button>` : ''}
              ${t.status === 'running' && t.wmCanCancel && t.remoteTaskId
            ? `<button class="link-btn" data-cancel-wm="${t.id}" ${t.wmCancelling ? 'disabled' : ''}>${t.wmCancelling ? 'Cancelling...' : 'Cancel Wait'
            }</button>`
            : ''
          }
              ${canEditStoryboardPrompt ? `<button class="link-btn" data-edit-storyboard="${t.id}">Modify Prompt</button>` : ''}
              ${t.status === 'retrying' &&
            t.retryMode === 'submit' &&
            (typeof t.retryCount === 'number' ? t.retryCount : parseInt(String(t.retryCount || '0'), 10) || 0) >= 3
            ? `<button class="link-btn" data-abort-retry="${t.id}">Abort Retry</button>`
            : ''
          }
              ${t.timedOut || t.status === 'error' || (!t.url && t.status === 'done') ? `<button class="link-btn" data-retry="${t.id}">Retry</button>` : ''}
              ${t.status === 'stalled' ? `<button class="link-btn" data-continue="${t.id}">Continue</button>` : ''}
              ${t.promptUser ? `<button class="link-btn" data-reuse="${t.id}">Reuse Prompt</button>` : ''}
              <button class="link-btn" data-log="${t.id}">View Log</button>
            </div>
          </div>
        `;
      })
      .join('');
    taskList.innerHTML = groupBar + (html || '<div class="muted">No Tasks</div>');

    const flashCard = (btn) => {
      const card = btn.closest('.task-card');
      if (!card) return;
      card.classList.add('flash', 'flash-bg');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => card.classList.remove('flash', 'flash-bg'), 800);
    };
    const smoothFocus = (el) => {
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (el.focus) el.focus({ preventScroll: true });
      el.classList.add('flash-bg');
      setTimeout(() => el.classList.remove('flash-bg'), 600);
    };
    const flashPreview = (url, info = null) => {
      setRightTab('preview');
      try {
        // If current filter hides target, auto-switch to visible filter (avoids 'Clicked but Empty' issue)
        const tid = info && typeof info.taskId === 'number' ? info.taskId : null;
        const hintType = info && info.type ? String(info.type) : '';
        const t = tid ? tasks.find((x) => x.id === tid) : tasks.find((x) => x && x.url === url);
        const desired =
          t && ((t.tag || '') === 'storyboard' || t.storyboard)
            ? 'storyboard'
            : String((t && t.type) || hintType || '').toLowerCase() === 'image'
              ? 'image'
              : 'video';
        if (t && !taskMatchesPreviewFilter(t, previewFilter)) {
          setPreviewFilter(desired, { toast: true });
        } else {
          // Fallback: Ensure DOM rebuilt with current filter
          renderPreviews();
        }
      } catch (_) {
        renderPreviews();
      }

      requestAnimationFrame(() => {
        const cards = Array.from(previewGrid.querySelectorAll('.preview-card'));
        const target = cards.find((c) => {
          const media = c.querySelector('video,img');
          return media && media.getAttribute('src') === url;
        });
        const el = target || previewGrid;
        cards.forEach((c) => c.classList.remove('spotlight'));
        el.classList.add('spotlight');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => el.classList.remove('spotlight'), 1300);
      });
    };

    taskList.querySelectorAll('.link-btn[data-url]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        const type = btn.getAttribute('data-type');
        const card = btn.closest('.task-card');
        const tid = card ? parseInt(card.getAttribute('data-id'), 10) : null;
        flashPreview(url, { taskId: !isNaN(tid) ? tid : null, type });
        flashCard(btn);
      });
    });
    taskList.querySelectorAll('[data-reuse]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-reuse'), 10);
        const t = tasks.find((x) => x.id === id);
        if (t && t.promptUser) {
          promptBox.value = t.promptUser;
          analyzePromptHints();
          showToast('Prompt filled');
          smoothFocus(promptBox);
          flashCard(btn);
        }
      });
    });
    taskList.querySelectorAll('[data-edit-storyboard]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-edit-storyboard'), 10);
        if (!id) return;
        openEditStoryboardModal(id);
        flashCard(btn);
      });
    });
    taskList.querySelectorAll('[data-abort-retry]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-abort-retry'), 10);
        const ctl = taskRetryControls.get(id);
        if (ctl) {
          ctl.cancelled = true;
          try {
            if (typeof ctl.abortFetch === 'function') ctl.abortFetch();
          } catch (_) {
            /* ignore */
          }
        }
        updateTask(id, { status: 'error', message: 'Auto-retry aborted (Click "Retry" to restart)' });
        showToast('Auto-retry aborted', 'warn', { title: 'Aborted' });
        flashCard(btn);
      });
    });
    taskList.querySelectorAll('[data-retry]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = parseInt(btn.getAttribute('data-retry'), 10);
        const t = tasks.find((x) => x.id === id);
        const apiKey = $('apiKey').value.trim();
        const baseUrl = getBaseUrl();
        if (!apiKey || !baseUrl) {
          showToast('Please enter API Key and Server URL');
          return;
        }
        if (!t) {
          showToast('Task not found, cannot retry', 'error', { title: 'Retry Failed', duration: 2600 });
          return;
        }
        const job = {
          taskId: id,
          promptSend: t.promptSend || '',
          promptUser: t.promptUser || '',
          // Allow "Empty Prompt + Asset Only" retry: Assets kept in memory (lost on refresh)
          file: t._inputFile || null,
          fileDataUrl: t._inputFileDataUrl || null,
          model: t.model || $('model').value,
          storyboard: t.storyboard || null
        };
        if (!job.promptSend && !job.file && !job.fileDataUrl) {
          showToast('Task has no reusable prompt/asset, retrying anyway (may fail)', 'warn', {
            title: 'Empty Retry',
            duration: 4200
          });
        } else if (!job.promptSend && (job.file || job.fileDataUrl)) {
          showToast('Empty prompt retry: submitting with assets only (Allowed)', 'info', { title: 'Retrying', duration: 2200 });
        } else {
          showToast('Retrying task...', 'info');
        }
        await runJobs(
          [job],
          apiKey,
          baseUrl,
          1
        );
        flashCard(btn);
      });
    });
    taskList.querySelectorAll('[data-continue]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = parseInt(btn.getAttribute('data-continue'), 10);
        const t = tasks.find((x) => x.id === id);
        const apiKey = $('apiKey').value.trim();
        const baseUrl = getBaseUrl();
        if (!apiKey || !baseUrl) {
          showToast('Please enter API Key and Server URL');
          return;
        }
        if (!t) {
          showToast('Task not found, cannot continue', 'error', { title: 'Continue Failed', duration: 2600 });
          return;
        }
        const job = {
          taskId: id,
          promptSend: t.promptSend || '',
          promptUser: t.promptUser || '',
          file: t._inputFile || null,
          fileDataUrl: t._inputFileDataUrl || null,
          model: t.model || $('model').value,
          storyboard: t.storyboard || null
        };
        if (!job.promptSend && !job.file && !job.fileDataUrl) {
          showToast('Task has no reusable prompt/asset, continuing anyway (may fail)', 'warn', {
            title: 'Empty Continue',
            duration: 4200
          });
        } else if (!job.promptSend && (job.file || job.fileDataUrl)) {
          showToast('Empty prompt continue: submitting with assets only (Allowed)', 'info', { title: 'Continuing', duration: 2200 });
        } else {
          showToast('Continuing task...', 'info');
        }
        await runJobs(
          [job],
          apiKey,
          baseUrl,
          1
        );
        flashCard(btn);
      });
    });
    taskList.querySelectorAll('[data-log]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-log'), 10);
        const t = tasks.find((x) => x.id === id);
        if (t) {
          currentLogTaskId = t.id;
          renderTaskLogList();
          renderTaskLogContent();
          setRightTab('log');
          smoothFocus(logTaskPanel || out);
        } else {
          showToast('Task Log Not Found');
        }
        flashCard(btn);
      });
    });
    taskList.querySelectorAll('[data-cancel-wm]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = parseInt(btn.getAttribute('data-cancel-wm'), 10);
        const t = tasks.find((x) => x.id === id);
        if (!t || !t.remoteTaskId) {
          showToast('Missing task_id, cannot cancel watermark wait');
          return;
        }
        const apiKey = $('apiKey').value.trim();
        const baseUrl = getBaseUrl();
        if (!apiKey || !baseUrl) {
          showToast('Please enter API Key and Server URL');
          return;
        }
        if (t.wmCancelling) return;

        updateTask(id, { wmCancelling: true });
        try {
          const resp = await fetch(
            `${baseUrl}/v1/tasks/${encodeURIComponent(t.remoteTaskId)}/watermark/cancel`,
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + apiKey,
                'Content-Type': 'application/json'
              }
            }
          );
          if (!resp.ok) {
            throw new Error('HTTP ' + resp.status);
          }
          showToast('Watermark cancel request sent', 'success');
        } catch (e) {
          updateTask(id, { wmCancelling: false });
          showToast(`Cancel failed: ${e?.message || String(e)}`, 'error');
        }
        flashCard(btn);
      });
    });
    taskList.querySelectorAll('[data-expand]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-expand'), 10);
        updateTask(id, { collapsed: false });
      });
    });
    taskList.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-filter') || '';
        statusFilter = statusFilter === target ? '' : target;
        renderTasks();
      });
    });
    taskList.querySelectorAll('[data-tag]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tag') || '';
        tagFilter = tagFilter === target ? '' : target;
        renderTasks();
      });
    });

    setTaskCount();
    updateTaskBubble();
    // Log Panel: Update only when viewing to avoid re-rendering log list on every streaming chunk
    if (currentRightTab === 'log') renderLogPanel();
    // Sync task state to Admin Console (Task Orb/Drawer), throttled to avoid cross-iframe redraws on every chunk
    schedulePostTaskState({ immediate: true });
  };

  const renderPreviews = () => {
    if (!previewGrid) return;
    const fullList = tasks.filter((t) => t && t.url && isValidMediaUrl(t.url));
    const list = fullList.filter((t) => taskMatchesPreviewFilter(t, previewFilter));
    previewGrid.innerHTML = '';
    // Prevent URL dedup set from growing indefinitely (Memory usage protection)
    try {
      const limit = 1200;
      while (previewKnown.size > limit) {
        const first = previewKnown.values().next().value;
        previewKnown.delete(first);
      }
    } catch (_) {
      /* ignore */
    }

    if (previewCount) {
      const nextText = !fullList.length
        ? ''
        : `Showing ${list.length}/${fullList.length}${previewFilter === 'all' ? '' : ` · ${previewFilterLabel(previewFilter)}`}`;
      const prevText = previewCountLastText || (previewCount.textContent || '');
      if (prevText !== nextText) {
        previewCount.textContent = nextText;
        previewCountLastText = nextText;
        try {
          const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (reduce) throw new Error('reduced-motion');
          if (nextText) {
            // Light debounce: Avoid excess redraw flicker noise
            if (previewCountFlashTimer) clearTimeout(previewCountFlashTimer);
            previewCount.classList.remove('count-flash');
            void previewCount.offsetWidth;
            previewCount.classList.add('count-flash');
            previewCountFlashTimer = setTimeout(() => {
              try {
                previewCount.classList.remove('count-flash');
              } catch (_) { }
              previewCountFlashTimer = null;
            }, 1900);
          }
        } catch (_) {
          /* ignore */
        }
      }
    }

    if (fullList.length === 0) {
      // Empty Preview: Clear dedup set; Unread dot controlled by 'seen task IDs'
      previewGrid.innerHTML = '<div class="muted" style="padding:12px;">No previews. Will appear here after generation.</div>';
      previewsHydrated = true;
      updateUnreadDots();
      return;
    }

    if (list.length === 0) {
      previewGrid.innerHTML =
        '<div class="muted" style="padding:12px;">No results for current filter. Switch to "All".</div>';
      previewsHydrated = true;
      updateUnreadDots();
      return;
    }

    // Tasks are stored newest-first (unshift). We render oldest-first and prepend each card,
    // so the final DOM order stays newest-first.
    list
      .slice()
      .reverse()
      .forEach((t) => {
        const metaText = t.meta ? [t.meta.resolution, t.meta.duration, t.meta.info].filter(Boolean).join(' · ') : '';
        addPreviewCard(t.url, t.type, false, metaText || null, t.id);
      });

    previewsHydrated = true;
    updateUnreadDots();
  };

  const addPreviewCard = (url, type = 'video', push = true, meta = null, taskId = null) => {
    if (!url || !isValidMediaUrl(url)) return false;
    const exists = Array.from(previewGrid.querySelectorAll('.preview-card')).some((card) => {
      const el = card.querySelector('video,img');
      const src = el ? el.getAttribute('src') : '';
      return src === url;
    });
    if (exists) return false;
    const isNew = !previewKnown.has(url);
    previewKnown.add(url);
    const card = document.createElement('div');
    card.className = 'preview-card';
    try {
      // Set maintains insertion order: Keep recent URLs only, avoid unbound growth
      const limit = 1200;
      while (previewKnown.size > limit) {
        const first = previewKnown.values().next().value;
        previewKnown.delete(first);
      }
    } catch (_) {
      /* ignore */
    }
    if (previewsHydrated && isNew) {
      card.classList.add('preview-new');
      setTimeout(() => {
        try {
          card.classList.remove('preview-new');
        } catch (_) { }
      }, 3600);
    }
    // Escape URLs for HTML attributes/text (avoid `&bar` style entity decoding).
    const safeUrlAttr = escapeHtml(url);
    const safeUrlText = safeUrlAttr;
    if (type === 'image') {
      card.innerHTML = `<img src="${safeUrlAttr}" alt="preview">`;
    } else {
      card.innerHTML = `<video src="${safeUrlAttr}" autoplay muted loop playsinline></video>`;
    }
    if (taskId) {
      const wrap = document.createElement('div');
      wrap.style.position = 'absolute';
      wrap.style.top = '10px';
      wrap.style.left = '10px';
      wrap.style.zIndex = '2';
      wrap.style.display = 'flex';
      wrap.style.flexDirection = 'column';
      wrap.style.gap = '6px';

      const badge = document.createElement('div');
      badge.className = 'task-id-pill'; // Unified badge style
      badge.textContent = `Task ${taskId}`;
      badge.style.cursor = 'pointer';
      badge.title = 'Click to locate task card';
      wrap.appendChild(badge);

      const t = tasks.find((x) => x.id === taskId);
      const sbLabel = t && t.storyboard && t.storyboard.label ? String(t.storyboard.label) : '';
      if (sbLabel) {
        const sb = document.createElement('div');
        sb.className = 'task-tag-chip storyboard';
        sb.textContent = sbLabel;
        wrap.appendChild(sb);
      }
      const wmStage = t && t.wmStage ? String(t.wmStage) : '';
      const wmAttempt =
        t && typeof t.wmAttempt === 'number' ? t.wmAttempt : t ? parseInt(String(t.wmAttempt || '0'), 10) || 0 : 0;
      if (wmStage) {
        const wm = document.createElement('div');
        wm.className = 'task-tag-chip watermark';
        wm.textContent =
          wmStage === 'cancelled'
            ? 'Watermark Cancelled'
            : wmStage === 'ready'
              ? 'No Watermark'
              : `Removing Watermark${wmAttempt > 0 ? ` · ${wmAttempt}` : ''}`;
        wrap.appendChild(wm);
      }
      card.style.position = 'relative';
      card.appendChild(wrap);

      // Clicking the task badge focuses the corresponding task card.
      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        setRightTab('tasks');
        requestAnimationFrame(() => {
          const el = taskList?.querySelector(`.task-card[data-id="${taskId}"]`);
          if (!el) return;
          el.classList.add('spotlight');
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => el.classList.remove('spotlight'), 1300);
        });
      });
    }
    const info = document.createElement('div');
    info.className = 'preview-info';
    const downloadHrefRaw = normalizeTmpDownloadUrl(url);
    const downloadHref = escapeHtml(downloadHrefRaw);
    let downloadName = '';
    try {
      const t = taskId ? tasks.find((x) => x.id === taskId) : null;
      downloadName = buildDownloadFilename(t, downloadHrefRaw, type, 1);
    } catch (_) {
      downloadName = '';
    }
    info.innerHTML = `
      <span class="preview-url muted" title="${safeUrlAttr}">${safeUrlText}</span>
      ${meta ? `<span class="chip">${escapeHtml(meta)}</span>` : ''}
      <div class="preview-actions">
        <button class="link-btn" data-open="1">View</button>
        ${taskId ? `<button class="link-btn" data-focus-task="${taskId}">Locate Task</button>` : ''}
        <a class="link-btn" href="${downloadHref}" download="${escapeHtml(downloadName || '')}" rel="noreferrer" title="${escapeHtml(
      downloadName || 'Download'
    )}">Download</a>
        <button class="link-btn" data-copy="${safeUrlAttr}">Copy Link</button>
      </div>
    `;
    card.appendChild(info);
    previewGrid.prepend(card);

    // If viewing Preview tab, mark new preview as seen (avoids reappearing red dot)
    if (taskId && currentRightTab === 'preview') {
      markPreviewSeen(taskId);
    }
    updateUnreadDots();

    // Click to Play/Pause support even with native controls hidden
    if (type !== 'image') {
      const v = card.querySelector('video');
      if (v) {
        v.controls = false;
        v.addEventListener('click', () => {
          if (v.paused) v.play();
          else v.pause();
        });
      }
    }

    card.querySelectorAll('[data-copy]').forEach((btn) => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(
          () => showToast('Link Copied'),
          () => showToast('Copy Failed')
        );
      });
    });

    card.querySelectorAll('[data-focus-task]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tid = parseInt(btn.getAttribute('data-focus-task') || '0', 10);
        if (!tid) return;
        setRightTab('tasks');
        requestAnimationFrame(() => {
          const el = taskList?.querySelector(`.task-card[data-id="${tid}"]`);
          if (!el) return;
          el.classList.add('spotlight');
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => el.classList.remove('spotlight'), 1300);
        });
      });
    });

    card.querySelectorAll('[data-open]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPreviewModal(url, type, taskId);
      });
    });

    if (push) {
      // 预览仅用于展示，不写回任务
    }
    return isNew;
  };

  const syncRoleCardToLibrary = (card) => {
    if (!card) return;
    const username = card.username || card.display_name || '';
    if (!username) return;
    const exists = roles.some((r) => (r.username || r.display_name) === username);
    if (exists) return;
    roles.unshift({
      username,
      display_name: card.display_name || username,
      description: card.bio || card.instruction_set || card.description || '',
      avatar_path: card.avatar || card.avatar_url || ''
    });
    renderRoles();
  };

  const persistTasks = () => {
    const compact = tasks
      .slice(0, 20)
      .map(
        ({
          id,
          status,
          promptSnippet,
          promptUser,
          promptSend,
          url,
          type,
          message,
          meta,
          logTail,
          logFull,
          progress,
          collapsed,
          tag,
          storyboard
        }) => ({
          id,
          status,
          promptSnippet,
          promptUser,
          promptSend,
          url,
          type,
          message,
          meta,
          logTail,
          logFull: (logFull || '').slice(-LOG_MAX_CHARS),
          progress,
          collapsed: !!collapsed,
          tag: tag || '',
          storyboard: storyboard || null
        })
      );
    localStorage.setItem(taskStorageKey, JSON.stringify(compact));
  };

  const loadTasksFromStorage = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(taskStorageKey) || '[]');
      if (Array.isArray(saved)) {
        tasks = saved.map((t) => {
          const base = {
            ...t,
            promptUser: t.promptUser ?? t.promptFull ?? '',
            promptSend: t.promptSend ?? t.promptFull ?? '',
            promptFull: undefined,
            logFull: t.logFull || '',
            collapsed: !!t.collapsed,
            tag: t.tag || '',
            storyboard: t.storyboard || null
          };
          if (base.status === 'running' || base.status === 'queue') {
            return { ...base, status: 'stalled', message: 'Task interrupted by refresh, click Continue or Retry', progress: base.progress ?? 0 };
          }
          return base;
        });
        if (tasks.length) {
          taskIdCounter = Math.max(...tasks.map((t) => t.id)) + 1;
          if (currentLogTaskId === null) currentLogTaskId = tasks[0].id;
        }
      }
    } catch (_) {
      tasks = [];
    }
  };

  const persistRoles = () => {
    try {
      localStorage.setItem(roleStorageKeyMain, JSON.stringify(attachedRoles));
    } catch (_) {
      /* ignore */
    }
  };

  const persistRolesMulti = () => {
    try {
      localStorage.setItem(roleStorageKeyMulti, JSON.stringify(attachedRolesMulti));
    } catch (_) {
      /* ignore */
    }
  };

  const persistRolesStoryboard = () => {
    try {
      localStorage.setItem(roleStorageKeyStoryboard, JSON.stringify(attachedRolesStoryboard));
    } catch (_) {
      /* ignore */
    }
  };

  const loadRolesFromStorage = () => {
    // Main Prompt (Single/Same) Global Mount: Compat legacy key, avoid loss on upgrade
    try {
      const rawMain = localStorage.getItem(roleStorageKeyMain);
      const rawLegacy = localStorage.getItem(roleStorageKeyLegacy);
      const parsed = JSON.parse((rawMain || rawLegacy || '[]').toString());
      attachedRoles = Array.isArray(parsed) ? parsed : [];
      // First migration: Write legacy to main, then read main only
      if (!rawMain && rawLegacy) {
        try {
          localStorage.setItem(roleStorageKeyMain, JSON.stringify(attachedRoles));
        } catch (_) {
          /* ignore */
        }
      }
    } catch (_) {
      attachedRoles = [];
    }

    // Multi-Prompt/Storyboard: Independent 'Global Roles' per mode
    try {
      const parsed = JSON.parse((localStorage.getItem(roleStorageKeyMulti) || '[]').toString());
      attachedRolesMulti = Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      attachedRolesMulti = [];
    }
    try {
      const parsed = JSON.parse((localStorage.getItem(roleStorageKeyStoryboard) || '[]').toString());
      attachedRolesStoryboard = Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      attachedRolesStoryboard = [];
    }
  };

  const addTask = (promptSnippet, promptUser, promptSend, extra = null) => {
    const modelId = extra && extra.model ? String(extra.model) : '';
    const modelInfo = parseModelId(modelId);
    const t = {
      id: taskIdCounter++,
      status: 'queue',
      model: modelId,
      promptSnippet,
      promptUser: promptUser || '',
      promptSend: promptSend || '',
      url: null,
      // Preset mediaType: Choose correct img/video component in preview (avoids 'Gen Image but apply Video logic')
      // Will be corrected after streaming real URL.
      type: modelInfo.isImage ? 'image' : modelInfo.isVideo ? 'video' : 'video',
      meta: null,
      logTail: '',
      logFull: '',
      // Retry UX (submit retry / manual retry). Kept lightweight and persisted.
      retryMode: '',
      retryCount: 0,
      // Used to decide whether to show special “edit storyboard prompt” button, etc.
      errorKind: '',
      // Sora task_id (from backend) - used for watermark-free cancel endpoint.
      remoteTaskId: null,
      // Watermark-free waiting UI state (filled from streaming delta.wm).
      wmStage: '',
      wmAttempt: 0,
      wmCanCancel: false,
      wmCancelling: false,
      // Task Tag/Group: For 'Storyboard' filter and numbering
      tag: extra && extra.storyboard ? 'storyboard' : '',
      storyboard: extra && extra.storyboard ? extra.storyboard : null
    };
    tasks.unshift(t);
    // High freq addTask under streaming/concurrency: Throttle render & persist to avoid lag
    scheduleRender({ tasks: true, previews: false });
    // Placeholder card creation is critical: Persist immediately to avoid loss on refresh
    schedulePersistTasks({ immediate: true });
    if (currentRightTab !== 'tasks') {
      unread.tasks = true;
    }
    updateUnreadDots();
    return t.id;
  };

  const collapseTimers = new Map();
  // Task-level 'Auto-retry/Abort retry' handle (Avoid UI decoupling)
  // Map<taskId, { cancelled: boolean, abortFetch: null | (() => void) }>
  const taskRetryControls = new Map();

  // ===== Render/Persist Throttling (Critical: Avoid lag from full redraw on every chunk) =====
  let renderQueued = false;
  let needRenderTasks = false;
  let needRenderPreviews = false;

  const scheduleRender = (opts = { tasks: true, previews: false }) => {
    if (opts && opts.tasks) needRenderTasks = true;
    if (opts && opts.previews) needRenderPreviews = true;
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(() => {
      renderQueued = false;
      const doTasks = needRenderTasks;
      const doPreviews = needRenderPreviews;
      needRenderTasks = false;
      needRenderPreviews = false;
      if (doTasks) renderTasks();
      if (doPreviews) renderPreviews();
      updateUnreadDots();
    });
  };

  let persistTasksTimer = null;
  const schedulePersistTasks = (opts = { immediate: false }) => {
    if (opts && opts.immediate) {
      if (persistTasksTimer) clearTimeout(persistTasksTimer);
      persistTasksTimer = null;
      persistTasks();
      return;
    }
    if (persistTasksTimer) return;
    // Slight delay to merge multiple updateTask into one localStorage write
    persistTasksTimer = setTimeout(() => {
      persistTasksTimer = null;
      persistTasks();
    }, 400);
  };

  // ===== Task Card "Incremental DOM Update" (Critical: Avoid full redraw on every chunk) =====
  let taskDomSyncQueued = false;
  const taskDomSyncMap = new Map(); // Map<taskId, taskSnapshot>

  const syncTaskCardDom = (t) => {
    if (!taskList || !t) return;
    const id = parseInt(String(t.id || '0'), 10) || 0;
    if (!id) return;
    const card = taskList.querySelector(`.task-card[data-id="${id}"]`);
    if (!card) return;

    // Progress Bar (Update value/width only, no full card rebuild)
    const progress = Math.max(0, Math.min(100, parseInt(String(t.progress ?? (t.status === 'done' ? 100 : 0)), 10) || 0));
    const bar = card.querySelector('[data-task-progress-bar="1"]');
    if (bar) bar.style.width = `${progress}%`;
    const shell = card.querySelector('[data-task-progress-shell="1"]');
    if (shell) shell.setAttribute('aria-valuenow', String(progress));
    const pText = card.querySelector('[data-task-progress-text="1"]');
    if (pText) pText.textContent = `Progress: ${progress}%`;

    // Task Message (Frequent changes in running/retrying, update only this line)
    const msgEl = card.querySelector('[data-task-msg="1"]');
    if (msgEl) {
      const msg = String(t.message || '');
      if (msg) {
        msgEl.textContent = msg;
        msgEl.style.display = '';
        msgEl.style.color = t.status === 'retrying' ? '#b45309' : '#f87171';
      } else {
        msgEl.textContent = '';
        msgEl.style.display = 'none';
      }
    }
  };

  const scheduleTaskCardDomSync = (taskId, taskSnapshot) => {
    if (!taskList) return;
    const id = parseInt(String(taskId || '0'), 10) || 0;
    if (!id) return;
    taskDomSyncMap.set(id, taskSnapshot);
    if (taskDomSyncQueued) return;
    taskDomSyncQueued = true;
    requestAnimationFrame(() => {
      taskDomSyncQueued = false;
      taskDomSyncMap.forEach((t) => {
        try {
          syncTaskCardDom(t);
        } catch (_) {
          /* ignore */
        }
      });
      taskDomSyncMap.clear();
    });
  };

  // Log Tab: Update only when viewing, merged via rAF, avoid redraw on every logFull
  let logPanelSyncQueued = false;
  const scheduleLogPanelSync = () => {
    if (logPanelSyncQueued) return;
    logPanelSyncQueued = true;
    requestAnimationFrame(() => {
      logPanelSyncQueued = false;
      try {
        if (currentRightTab === 'log') renderLogPanel();
      } catch (_) {
        /* ignore */
      }
    });
  };

  const updateTask = (id, patch) => {
    const idx = tasks.findIndex((t) => t && t.id === id);
    if (idx < 0) return;
    const base = tasks[idx];
    const merged = { ...base, ...patch };
    // Correct status if subsequent message indicates Role Card success
    if (patch.message && /Role Created|Role Card Created/.test(patch.message)) {
      merged.status = 'done';
      merged.type = merged.type || 'character';
    }
    // Merge Log: Keep full log & truncate
    if (patch.logTail !== undefined) {
      merged.logTail = patch.logTail;
    }
    if (patch.logFull !== undefined) {
      merged.logFull = (patch.logFull || '').slice(-LOG_STORE_LIMIT);
    }
    if (patch.timedOut !== undefined) {
      merged.timedOut = patch.timedOut;
    }
    tasks[idx] = merged;
    const changed = merged;
    if (patch.status === 'done' && changed && !changed.collapsed) {
      if (!collapseTimers.has(id)) {
        const timer = setTimeout(() => {
          tasks = tasks.map((t) => (t.id === id ? { ...t, collapsed: true } : t));
          collapseTimers.delete(id);
          scheduleRender({ tasks: true, previews: false });
          schedulePersistTasks();
        }, 3000);
        collapseTimers.set(id, timer);
      }
    }
    // Task list updates almost every time, but Preview Wall only on url/meta/tag changes
    const affectsPreview =
      patch.url !== undefined ||
      patch.type !== undefined ||
      patch.meta !== undefined ||
      patch.wmStage !== undefined ||
      patch.wmAttempt !== undefined ||
      patch.storyboard !== undefined ||
      patch.tag !== undefined;

    // "Full Task List Redraw" is expensive: Use "Incremental DOM" for streaming, leave full render for structural changes
    const patchKeys = patch && typeof patch === 'object' ? Object.keys(patch) : [];
    const onlyLogPatch =
      patchKeys.length > 0 && patchKeys.every((k) => k === 'logFull' || k === 'logTail');
    const heavyKeys = new Set([
      'status',
      'url',
      'type',
      'meta',
      'tag',
      'storyboard',
      'collapsed',
      'retryMode',
      'retryCount',
      'timedOut',
      'wmStage',
      'wmAttempt',
      'wmCanCancel',
      'wmCancelling',
      'remoteTaskId'
    ]);
    let needFullTasksRender = patchKeys.some((k) => heavyKeys.has(k));
    // Fallback: Status correction via message (e.g. "Role Created")
    if ((merged && merged.status) !== (base && base.status)) needFullTasksRender = true;
    if ((merged && !!merged.timedOut) !== (base && !!base.timedOut)) needFullTasksRender = true;

    if (needFullTasksRender) {
      scheduleRender({ tasks: true, previews: affectsPreview });
      schedulePostTaskState({ immediate: true });
    } else {
      // Incremental: Update progress/msg only (No UI lag, no event rebind)
      const needDom = patch.progress !== undefined || patch.message !== undefined;
      if (needDom) scheduleTaskCardDomSync(id, merged);
      if (affectsPreview) scheduleRender({ tasks: false, previews: true });
      // Log Tab: Refresh only when viewing (Updating logFull every entry is laggy)
      if (
        currentRightTab === 'log' &&
        (patch.logFull !== undefined || patch.logTail !== undefined || patch.message !== undefined)
      ) {
        scheduleLogPanelSync();
      }
      // Sync to Admin Drawer: No logFull/logTail needed (Drawer doesn't show log), avoid useless cross-iframe redraw
      if (!onlyLogPatch) schedulePostTaskState({ immediate: false });
    }
    // Sync memory log buffer for copy/display
    if (patch.logFull !== undefined || patch.logTail !== undefined) {
      const logText =
        (patch.logFull || patch.logTail || taskLogBuffer[id] || '').slice(-LOG_STORE_LIMIT);
      taskLogBuffer[id] = logText;
    }
    schedulePersistTasks();
  };

  const updateTaskBubble = () => {
    const running = tasks.filter((t) => t.status === 'running' || t.status === 'retrying' || t.status === 'queue').length;
    const total = tasks.length;
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'task_count', running, total }, '*');
      }
    } catch (_) { }
  };

  // Task List State (For Admin Drawer): Throttled send, avoid triggering parent re-render on every chunk
  let postTaskStateTimer = null;
  const postTaskStateNow = () => {
    try {
      if (!(window.parent && window.parent !== window)) return;
      const summary = tasks.map((t) => ({
        id: t.id,
        status: t.status,
        prompt: t.promptSnippet,
        url: t.url,
        meta: t.meta,
        message: t.message,
        progress: t.progress ?? 0,
        tag: t.tag || '',
        storyboard: t.storyboard || null
      }));
      window.parent.postMessage({ type: 'task_state', tasks: summary }, '*');
    } catch (_) {
      /* ignore */
    }
  };
  const schedulePostTaskState = (opts = { immediate: false }) => {
    const immediate = !!(opts && opts.immediate);
    if (immediate) {
      if (postTaskStateTimer) clearTimeout(postTaskStateTimer);
      postTaskStateTimer = null;
      postTaskStateNow();
      return;
    }
    if (postTaskStateTimer) return;
    postTaskStateTimer = setTimeout(() => {
      postTaskStateTimer = null;
      postTaskStateNow();
    }, 450);
  };

  // 右侧 tab 切换
  let currentRightTab = localStorage.getItem(RIGHT_TAB_KEY) || 'tasks';
  const unread = { tasks: false, preview: false, log: false };
  let onlyRunning = false;
  let densePreview = localStorage.getItem(PREVIEW_DENSE_KEY) === '1';
  let statusFilter = '';
  // Preview Unread: Use "Seen Task IDs" set, prevent red dot flicker on URL change/redraw
  let previewSeenTaskIds = new Set();
  let logVersion = 0;
  let logSeenVersion = 0;
  const previewKnown = new Set(); // Prevent duplicate cards for same URL
  let previewsHydrated = false;
  let previewCountLastText = '';
  let previewCountFlashTimer = null;
  let currentLogTaskId = null;
  let taskLogBuffer = {};
  const setRightTab = (tab) => {
    currentRightTab = tab;
    localStorage.setItem(RIGHT_TAB_KEY, tab);
    rightTabButtons.forEach((btn) => btn.classList.toggle('active', btn.getAttribute('data-tab') === tab));
    rightTabButtons.forEach((btn) => btn.classList.toggle('has-unread', unread[btn.getAttribute('data-tab')] && tab !== btn.getAttribute('data-tab')));
    tabPanelTasks.classList.toggle('active', tab === 'tasks');
    tabPanelPreview.classList.toggle('active', tab === 'preview');
    tabPanelLog.classList.toggle('active', tab === 'log');
    if (tab === 'tasks') unread.tasks = false;
    if (tab === 'preview') markAllPreviewsSeen();
    if (tab === 'log') {
      logSeenVersion = logVersion;
      renderTaskLogList();
      renderTaskLogContent();
    }
    unread[tab] = false;
    updateUnreadDots();
  };

  // Core: Execute a batch of tasks (concurrency supported)
  const runJobs = async (jobs, apiKey, baseUrl, concurrency = 1) => {
    if (!jobs || !jobs.length) return;
    const poolSize = Math.min(concurrency, jobs.length);
    let cursor = 0;

    const runJob = async (job) => {
      const promptSend = job.promptSend ?? job.prompt ?? '';
      const promptUser = job.promptUser ?? job.prompt ?? '';

      const promptSnippet = promptUser.slice(0, 80) || (job.file ? job.file.name : '(空提示)');
      const extra = { storyboard: job.storyboard || null, model: job.model };

      // Task Warm-start: Create placeholder first, avoid log conflicts & enhance 'object permanence'
      // "Retry/Continue" keeps position: Reuses existing taskId, updates status in-place.
      let taskId =
        typeof job.taskId === 'number' ? job.taskId : parseInt(String(job.taskId || ''), 10) || null;
      if (taskId && !tasks.find((t) => t && t.id === taskId)) {
        taskId = null;
      }

      if (!taskId) {
        taskId = addTask(promptSnippet, promptUser, promptSend, extra);
      } else {
        // If same task running (e.g. repeated Retry clicks), abort old first, then start new.
        const prev = taskRetryControls.get(taskId);
        if (prev) {
          prev.cancelled = true;
          try {
            if (typeof prev.abortFetch === 'function') prev.abortFetch();
          } catch (_) { }
        }
        taskLogBuffer[taskId] = '';
        updateTask(taskId, {
          status: 'queue',
          progress: 0,
          timedOut: false,
          message: 'Preparing...',
          model: job.model,
          // Refresh media type on reuse: avoids video preview logic if switching to image model
          type: parseModelId(job.model).isImage ? 'image' : 'video',
          promptSnippet,
          promptUser,
          promptSend,
          url: null,
          meta: null,
          logTail: '',
          logFull: '',
          retryMode: 'manual',
          retryCount: 0,
          errorKind: '',
          remoteTaskId: null,
          wmStage: '',
          wmAttempt: 0,
          wmCanCancel: false,
          wmCancelling: false
        });
        if (extra && extra.storyboard) {
          updateTask(taskId, { tag: 'storyboard', storyboard: extra.storyboard });
        }
      }

      // Placeholder state: Immediate "Queued" feedback, avoids confusion about missing tasks.
      updateTask(taskId, { status: 'queue', model: job.model, errorKind: '', progress: 0, timedOut: false, message: 'Preparing...' });

      // Record input assets for this task (allows "Empty Prompt Retry/Continue").
      // Note: Keep in memory only, avoid huge dataURL in localStorage (prevents lag/quota error).
      try {
        const tRef = tasks.find((x) => x && x.id === taskId);
        if (tRef) {
          if (job.file) {
            tRef._inputFile = job.file;
            tRef._inputFileName = job.file.name || '';
            if (tRef._inputFileDataUrl) tRef._inputFileDataUrl = null;
          } else if (job.fileDataUrl) {
            tRef._inputFile = null;
            tRef._inputFileName = '';
            tRef._inputFileDataUrl = job.fileDataUrl;
          }
          tRef._inputHasFile = !!(job.file || job.fileDataUrl);
        }
      } catch (_) {
        /* ignore */
      }

      const contentArr = [];
      if (promptSend) contentArr.push({ type: 'text', text: promptSend });

      // Read file (may be slow)
      try {
        if (job.file) {
          logTask(taskId, `Reading file: ${job.file.name}`);
          const dataUrl = await fileToDataUrl(job.file);
          if ((job.file.type || '').startsWith('video')) {
            contentArr.push({ type: 'video_url', video_url: { url: dataUrl } });
          } else {
            contentArr.push({ type: 'image_url', image_url: { url: dataUrl } });
          }
        } else if (job.fileDataUrl) {
          const url = job.fileDataUrl;
          const isVideo = url.startsWith('data:video') || /\.(mp4|mov|m4v|webm)$/i.test(url);
          if (isVideo) {
            contentArr.push({ type: 'video_url', video_url: { url } });
          } else {
            contentArr.push({ type: 'image_url', image_url: { url } });
          }
        }
      } catch (_) {
        updateTask(taskId, { status: 'error', message: 'Read file failed (Retry or change file)', progress: 0 });
        showToast('Read file failed (Retry or change file)', 'error', { title: 'Read Failed', duration: 4200 });
        return;
      }

      const body = {
        model: job.model,
        stream: true,
        messages: [
          {
            role: 'user',
            content: contentArr.length ? contentArr : promptSend
          }
        ]
      };

      // Manual "Retry/Continue" must switch tag to "Retrying" in-place (drop fail tag)
      if (job.taskId) {
        updateTask(taskId, { status: 'retrying', retryMode: 'manual', retryCount: 0, progress: 0, message: '' });
      } else {
        updateTask(taskId, { status: 'running', retryMode: '', retryCount: 0, progress: 0, message: '' });
      }

      const url = `${baseUrl}/v1/chat/completions`;
      const isRetryable = (errMsg) =>
        /timeout|timed out|HTTP\s*5\d\d|503|502|504|bad gateway|gateway time-out|ENETUNREACH|ECONNRESET|ECONNABORTED|ETIMEDOUT|Failed to connect|network|cloudflare|curl|connection closed|closed abruptly/i.test(
          errMsg || ''
        );

      const retryCtl = { cancelled: false, abortFetch: null };
      taskRetryControls.set(taskId, retryCtl);

      try {
        // Submission Phase: Don't fail easily (Auto-retry, show "Abort Retry" after 3 attempts)
        const MAX_RETRY = 9999;
        for (let attempt = 1; attempt <= MAX_RETRY + 1; attempt++) {
          let lastChunk = '';
          let contentAccumulated = '';  // Accumulate all content fields
          let characterCreated = false;
          let characterCardInfo = null;
          let hadError = false;
          let finished = false;
          let logBufferAttempt = '';
          let watermarkWaitSeen = false; // once seen, disable the 10-min hard timeout and rely on explicit cancel
          let progressMarkerSeen = false; // once seen, do NOT auto-resubmit (avoid duplicates)
          const controller = new AbortController();
          retryCtl.abortFetch = () => controller.abort();
          const HARD_TIMEOUT = 600000; // 10 分钟总超时
          let hardTimer = null;
          const clearTimers = () => {
            if (hardTimer) clearTimeout(hardTimer);
          };

          try {
            if (retryCtl.cancelled) {
              updateTask(taskId, { status: 'error', message: 'Auto-retry aborted (Click Retry to restart)' });
              return;
            }
            // attempt=1: Normal generation (or first manual retry)
            // attempt>1: Auto-retry for "Submission failed" errors
            if (attempt > 1) {
              updateTask(taskId, {
                status: 'retrying',
                retryMode: 'submit',
                retryCount: attempt - 1,
                timedOut: false,
                progress: 0
              });
            } else if (job.taskId) {
              updateTask(taskId, { status: 'retrying', retryMode: 'manual', retryCount: 0, timedOut: false, progress: 0 });
            } else {
              updateTask(taskId, { status: 'running', timedOut: false, progress: 0 });
            }

            const resp = await fetch(url, {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + apiKey,
                'Content-Type': 'application/json',
                Accept: 'text/event-stream'
              },
              body: JSON.stringify(body),
              signal: controller.signal
            });

            if (!resp.ok || !resp.body) {
              throw new Error('HTTP ' + resp.status);
            }

            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let mediaUrl = null;
            // Inference by model default: Avoid mismatch if URL has no ext (Image task but Video preview)
            let mediaType = parseModelId(job.model).isImage ? 'image' : 'video';
            let mediaMeta = null;

            hardTimer = setTimeout(() => controller.abort(), HARD_TIMEOUT);

            logTask(taskId, 'Connected, receiving stream...');
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value, { stream: true });
              lastChunk = chunk || lastChunk;
              chunk.split(/\n\n/).forEach((line) => {
                if (!line.startsWith('data:')) return;
                const data = line.replace(/^data:\s*/, '');
                if (data === '[DONE]') {
                  logTask(taskId, '[DONE]');
                  finished = true;
                  return;
                }
                logTask(taskId, data);
                logBufferAttempt = (logBufferAttempt + data + '\n').slice(-LOG_STORE_LIMIT);
                try {
                  const obj = JSON.parse(data);
                  const choice = (obj.choices && obj.choices[0]) || {};
                  const delta = choice.delta || {};
                  if (obj.error) {
                    const pretty = humanizeUpstreamError(obj.error);
                    const errMsg = pretty.message || obj.error.message || obj.error.code || 'Generation Failed';
                    // Auto-retry only for "Submission Fail/Net Glitch (No Progress)"; Avoid double-order
                    if (isRetryable(errMsg) && !progressMarkerSeen && !watermarkWaitSeen) {
                      const retryErr = new Error(errMsg);
                      retryErr.__submitRetryable = true;
                      throw retryErr;
                    }
                    // Content Policy Hit: No auto-retry, provide fallback to "Modify Prompt"
                    if (isContentPolicyViolation(errMsg)) {
                      hadError = true;
                      const isSb = !!(job.storyboard && job.storyboard.label);
                      const msg = isSb ? 'Content Policy Check Failed (Modify shot prompt and retry)' : 'Content Policy Check Failed (Adjust prompt and retry)';
                      updateTask(taskId, {
                        status: 'error',
                        errorKind: 'policy',
                        message: msg,
                        logTail: lastChunk,
                        logFull: logBufferAttempt,
                        progress: 0
                      });
                      showToast(msg, 'warn', { title: 'Policy Violation', duration: 5200 });
                      return;
                    }
                    hadError = true;
                    updateTask(taskId, { status: 'error', message: errMsg, logTail: lastChunk, logFull: logBufferAttempt });
                    showToast(errMsg || 'Generation Failed', pretty.type === 'warn' ? 'warn' : 'error', {
                      title: pretty.title || 'Generation Failed',
                      duration: 4200
                    });
                    return;
                  }
                  const rc = delta.reasoning_content || (choice.message && choice.message.content) || '';

                  // Watermark-free waiting (structured, from backend delta.wm)
                  if (delta && delta.wm && typeof delta.wm === 'object') {
                    const wm = delta.wm || {};
                    const stage = wm.stage ? String(wm.stage) : '';
                    const attempt =
                      typeof wm.attempt === 'number' ? wm.attempt : parseInt(String(wm.attempt || '0'), 10) || 0;
                    const canCancel = !!wm.can_cancel;
                    const remoteTaskId = wm.task_id ? String(wm.task_id) : '';
                    const patch = { wmStage: stage, wmAttempt: attempt, wmCanCancel: canCancel };
                    if (remoteTaskId) patch.remoteTaskId = remoteTaskId;
                    updateTask(taskId, patch);

                    // Once we enter watermark-free waiting, do not enforce the 10-min hard timeout.
                    if (!watermarkWaitSeen) {
                      watermarkWaitSeen = true;
                      if (hardTimer) {
                        clearTimeout(hardTimer);
                        hardTimer = null;
                      }
                    }
                  }

                  // Parse embedded JSON in delta.content (character_card)
                  const rawContent =
                    delta.content ||
                    (choice.message && choice.message.content) ||
                    obj.content ||
                    '';
                  const finishReason = choice.finish_reason || choice.native_finish_reason || delta.finish_reason;
                  const deltaContent = typeof delta.content === 'string' ? delta.content : '';
                  const deltaReasoning = typeof delta.reasoning_content === 'string' ? delta.reasoning_content : '';

                  // Accumulate content fields
                  if (deltaContent) {
                    contentAccumulated += deltaContent;
                  }

                  // Policy Check: Sora may return as reasoning/content (not always obj.error)
                  const policyText = [deltaReasoning, deltaContent, rc, rawContent].filter(Boolean).join('\n');
                  if (!hadError && isContentPolicyViolation(policyText)) {
                    hadError = true;
                    const isSb = !!(job.storyboard && job.storyboard.label);
                    const msg = isSb ? 'Content Policy Check Failed (Modify shot prompt and retry)' : 'Content Policy Check Failed (Adjust prompt and retry)';
                    updateTask(taskId, {
                      status: 'error',
                      errorKind: 'policy',
                      message: msg,
                      logTail: lastChunk,
                      logFull: logBufferAttempt,
                      progress: 0
                    });
                    showToast(msg, 'warn', { title: 'Policy Violation', duration: 5200 });
                    return;
                  }
                  const characterFailHit =
                    /角色卡创建失败|Character creation failed/i.test(deltaContent) ||
                    /角色卡创建失败|Character creation failed/i.test(deltaReasoning) ||
                    /角色卡创建失败|Character creation failed/i.test(rawContent || '') ||
                    (/character_card/i.test(rawContent || '') && finishReason === 'STOP' && !characterCreated && !mediaUrl);
                  if (!hadError && characterFailHit) {
                    const msg =
                      (deltaContent || deltaReasoning || rawContent || 'Character Creation Failed')
                        .replace(/^❌\s*/, '')
                        .trim();
                    hadError = true;
                    updateTask(taskId, {
                      status: 'error',
                      type: 'character',
                      message: msg,
                      logTail: lastChunk,
                      logFull: logBufferAttempt,
                      progress: 0
                    });
                    return;
                  }
                  let innerObj = null;
                  if (typeof rawContent === 'string' && rawContent.trim().startsWith('{')) {
                    try {
                      innerObj = JSON.parse(rawContent);
                    } catch (_) {
                      innerObj = null;
                    }
                  }

                  if (typeof rc === 'string' && /(blocked|guardrail|违规|不支持|限制)/i.test(rc)) {
                    hadError = true;
                    const pretty = humanizeUpstreamError(rc);
                    updateTask(taskId, {
                      status: 'error',
                      message: pretty.message || rc.trim(),
                      logTail: lastChunk,
                      logFull: logBufferAttempt
                    });
                    showToast(pretty.message || rc.trim(), pretty.type === 'warn' ? 'warn' : 'error', {
                      title: pretty.title || 'Generation Failed',
                      duration: 4200
                    });
                    return;
                  }
                  // Character Card Event: Mark as success directly
                  const cardPayload = obj.event === 'character_card' || obj.card ? obj : innerObj && innerObj.event === 'character_card' ? innerObj : null;
                  if (!cardPayload && typeof data === 'string' && data.includes('"character_card"')) {
                    try {
                      const temp = JSON.parse(data);
                      if (temp && (temp.event === 'character_card' || temp.card)) {
                        cardPayload = temp;
                      }
                    } catch (_) { }
                  }
                  if (cardPayload && (cardPayload.event === 'character_card' || cardPayload.card)) {
                    const card = cardPayload.card || {};
                    characterCreated = true;
                    characterCardInfo = card;
                    syncRoleCardToLibrary(card);
                    showToast(`Character Created: @${card.username || card.display_name || 'User'}`);
                    updateTask(taskId, {
                      status: 'done',
                      type: 'character',
                      message: `Character Created: @${card.username || 'User'}`,
                      meta: { display: card.display_name || card.username || '' },
                      logTail: lastChunk,
                      logFull: logBufferAttempt
                    });
                    return;
                  }
                  // Progress: Structured field or percentage in reasoning_content
                  const currentProgress =
                    tasks.find((t) => t.id === taskId && !isNaN(parseFloat(t.progress)))?.progress ?? 0;
                  let progressVal = null;
                  const pctMatch = data.match(/(\d{1,3})%/);
                  if (pctMatch) progressMarkerSeen = true;
                  if (obj.progress !== undefined && !isNaN(parseFloat(obj.progress))) {
                    progressVal = parseFloat(obj.progress);
                    progressMarkerSeen = true;
                  }
                  if (obj.delta && typeof obj.delta.reasoning_content === 'string') {
                    const m = obj.delta.reasoning_content.match(/(\d{1,3})%/);
                    if (m) progressVal = Math.max(progressVal ?? 0, parseFloat(m[1]));
                    if (m) progressMarkerSeen = true;
                  }
                  if (!progressVal && pctMatch) {
                    progressVal = Math.min(100, parseFloat(pctMatch[1]));
                  }
                  if (!isNaN(progressVal)) {
                    const merged = Math.max(currentProgress, progressVal);
                    updateTask(taskId, { progress: merged });
                  }

                  // 结构化字段优先
                  const output0 = (obj.output && obj.output[0]) || null;
                  const deltaOut0 = (delta.output && delta.output[0]) || null;
                  // Trust upstream explicit type (image/video) even if URL lacks extension.
                  const declaredTypeRaw = (output0 && output0.type) || (deltaOut0 && deltaOut0.type) || obj.type || '';
                  const declaredType = String(declaredTypeRaw || '').toLowerCase();
                  const declaredHint = declaredType === 'image' || declaredType === 'video' ? declaredType : '';
                  const typeHintFromFields =
                    declaredHint ||
                    (obj.image_url && obj.image_url.url ? 'image' : '') ||
                    (obj.video_url && obj.video_url.url ? 'video' : '') ||
                    (output0 && output0.image_url ? 'image' : '') ||
                    (output0 && output0.video_url ? 'video' : '') ||
                    (deltaOut0 && deltaOut0.image_url ? 'image' : '') ||
                    (deltaOut0 && deltaOut0.video_url ? 'video' : '') ||
                    '';
                  const candidates = [
                    obj.url,
                    obj.video_url && obj.video_url.url,
                    obj.image_url && obj.image_url.url,
                    output0 && (output0.url || output0.video_url || output0.image_url),
                    deltaOut0 && (deltaOut0.url || deltaOut0.video_url || deltaOut0.image_url)
                  ].filter(Boolean);

                  // Capture remote task_id from delta.output if present (used by watermark cancel button)
                  if (delta.output && delta.output[0] && delta.output[0].task_id) {
                    updateTask(taskId, { remoteTaskId: String(delta.output[0].task_id) });
                    progressMarkerSeen = true;
                  }

                  let extractedUrl = candidates[0];

                  // <video src> or direct media link in content/markdown
                  if (!extractedUrl && obj.content) {
                    const htmlMatch = obj.content.match(/<video[^>]+src=['"]([^'"]+)['"]/i);
                    if (htmlMatch) extractedUrl = htmlMatch[1];
                    const mdMatch = obj.content.match(/https?:[^\s)"'<>]+\.(mp4|mov|m4v|webm|png|jpg|jpeg|webp)/i);
                    if (!extractedUrl && mdMatch) extractedUrl = mdMatch[0];
                  }
                  // Fallback: extract media link from last chunk
                  if (!extractedUrl) {
                    const urlMatch = lastChunk.match(/https?:[^\s)"'<>]+\.(mp4|mov|m4v|webm|png|jpg|jpeg|webp)/i);
                    if (urlMatch) extractedUrl = urlMatch[0];
                  }

                  if (extractedUrl) {
                    mediaUrl = extractedUrl;
                  }
                  if (mediaUrl) {
                    const u = mediaUrl.toString();
                    const extHint = /\.(png|jpg|jpeg|webp)$/i.test(u) ? 'image' : /\.(mp4|mov|m4v|webm)$/i.test(u) ? 'video' : '';
                    const modelHint = parseModelId(job.model).isImage ? 'image' : 'video';
                    mediaType = typeHintFromFields || extHint || modelHint;
                    const reso =
                      obj.resolution ||
                      (obj.meta && obj.meta.resolution) ||
                      (obj.width && obj.height ? `${obj.width}x${obj.height}` : null);
                    const dur = obj.duration || (obj.meta && obj.meta.duration) || (obj.length && `${obj.length}s`);
                    mediaMeta = [reso, dur].filter(Boolean).join(' · ');
                    updateTask(taskId, {
                      url: mediaUrl,
                      type: mediaType,
                      meta: { resolution: reso || '', duration: dur || '' },
                      logTail: lastChunk,
                      logFull: logBufferAttempt,
                      progress: 100
                    });
                  } else {
                    updateTask(taskId, { logTail: lastChunk, logFull: logBufferAttempt });
                  }

                  // Fallback: extract http(s) link from choices.delta/content
                  if (!mediaUrl) {
                    const choice = (obj.choices && obj.choices[0]) || {};
                    const delta = choice.delta || {};
                    const msg = choice.message || {};
                    const contentField = delta.content ?? msg.content ?? obj.content;
                    const outputField = delta.output ?? msg.output ?? obj.output;
                    const tryExtract = (text) => {
                      if (!text) return null;
                      const htmlMatch = text.match(/<video[^>]+src=['"]([^'"]+)['"]/i);
                      if (htmlMatch) return htmlMatch[1];
                      const anyMatch = text.match(/https?:[^\s)"'<>]+/i);
                      return anyMatch ? anyMatch[0] : null;
                    };
                    let extracted = tryExtract(contentField) || tryExtract(lastChunk);
                    if (!extracted && outputField && outputField[0]) {
                      extracted = outputField[0].url || outputField[0].video_url || outputField[0].image_url || null;
                    }
                    if (extracted) {
                      mediaUrl = extracted;
                      const u = mediaUrl.toString();
                      const extHint = /\.(png|jpg|jpeg|webp)$/i.test(u) ? 'image' : /\.(mp4|mov|m4v|webm)$/i.test(u) ? 'video' : '';
                      const modelHint = parseModelId(job.model).isImage ? 'image' : 'video';
                      mediaType = extHint || modelHint;
                      updateTask(taskId, { url: mediaUrl, type: mediaType, logTail: lastChunk, logFull: logBufferAttempt, progress: 100 });
                    }
                  }
                } catch (e) {
                  if (e && e.__submitRetryable) throw e;
                  updateTask(taskId, { logTail: lastChunk, logFull: logBufferAttempt });
                }
              });
              if (hadError || finished) break;
            }

            clearTimers();
            // Final Fallback: Any link from lastChunk
            if (!mediaUrl) {
              const tailMatch = lastChunk.match(/https?:[^\s)"'<>]+/i);
              if (tailMatch) {
                mediaUrl = tailMatch[0];
                const u = String(mediaUrl || '');
                const extHint = /\.(png|jpg|jpeg|webp)$/i.test(u) ? 'image' : /\.(mp4|mov|m4v|webm)$/i.test(u) ? 'video' : '';
                const modelHint = parseModelId(job.model).isImage ? 'image' : 'video';
                mediaType = extHint || modelHint;
              }
            }

            if (hadError) {
              return;
            }

            // Whitelist Filter
            if (mediaUrl && !isValidMediaUrl(mediaUrl)) {
              mediaUrl = null;
            }

            if (mediaUrl) {
              updateTask(taskId, {
                status: 'done',
                url: mediaUrl,
                type: mediaType,
                meta: mediaMeta ? { info: mediaMeta } : null,
                logTail: lastChunk,
                logFull: logBufferAttempt || lastChunk,
                progress: 100
              });
            } else {
              // Check if Character Creation Task
              const isCharacterTask = job.isCharacterCreation === true;
              const hasCharacterSuccessMsg = /Role created|Character created|Character name@/.test(contentAccumulated || lastChunk || '');

              if (characterCreated || characterCardInfo || (isCharacterTask && hasCharacterSuccessMsg)) {
                // 从消息中提取角色名
                let username = characterCardInfo?.username || '';
                if (!username && hasCharacterSuccessMsg) {
                  const match = (contentAccumulated || lastChunk || '').match(/Character name@(\w+)/);
                  if (match) username = match[1];
                }

                updateTask(taskId, {
                  status: 'done',
                  type: 'character',
                  message: username ? `Character Created: @${username}` : 'Character Created',
                  meta: { display: characterCardInfo?.display_name || username || '' },
                  logTail: lastChunk,
                  logFull: logBufferAttempt || lastChunk,
                  progress: 100
                });

                // Save Character Card to localStorage
                try {
                  const stored = localStorage.getItem('character_cards');
                  const cards = stored ? JSON.parse(stored) : [];

                  // Create new card object
                  const newCard = {
                    id: Date.now(), // Timestamp as ID
                    username: username || 'unknown',
                    display_name: characterCardInfo?.display_name || username || '',
                    description: characterCardInfo?.description || '',
                    avatar_path: characterCardInfo?.avatar_path || '',
                    created_at: new Date().toISOString()
                  };

                  // Prepend to list (Newest first)
                  cards.unshift(newCard);

                  // Save back to localStorage
                  localStorage.setItem('character_cards', JSON.stringify(cards));
                } catch (e) {
                  console.error('Save Character Card Failed:', e);
                }

                // Refresh Role List
                if (typeof loadRoles === 'function') {
                  loadRoles();
                }
              } else {
                const maybePolicy = isContentPolicyViolation(`${logBufferAttempt || ''}\n${lastChunk || ''}`);
                const isSb = !!(job.storyboard && job.storyboard.label);
                const msg = maybePolicy
                  ? isSb
                    ? 'Content Policy Check Failed (Modify shot prompt and retry)'
                    : 'Content Policy Check Failed (Adjust prompt and retry)'
                  : 'No media link returned. Likely policy block or invalid prompt';
                updateTask(taskId, {
                  status: 'error',
                  errorKind: maybePolicy ? 'policy' : '',
                  message: msg,
                  logTail: lastChunk,
                  logFull: logBufferAttempt || lastChunk,
                  progress: 0
                });
              }
            }
            return; // success
          } catch (e) {
            clearTimers();
            const msg = e?.message || String(e);
            if (retryCtl.cancelled) {
              updateTask(taskId, { status: 'error', message: 'Auto-retry aborted (Click Retry to restart)' });
              return;
            }

            // Auto-retry only for "Submission Fail/Net Glitch (No Progress)"; Avoid double-order
            const retryableSubmit = isRetryable(msg) && !progressMarkerSeen && !watermarkWaitSeen && attempt <= MAX_RETRY;
            if (retryableSubmit) {
              const retryCount = attempt; // 1st fail -> Retry 1; 2nd fail -> Retry 2 ...
              const delay = Math.min(1500 * Math.pow(2, Math.min(retryCount - 1, 5)), 15000);
              const brief = String(msg || 'Unknown Error').replace(/\s+/g, ' ').slice(0, 120);
              updateTask(taskId, {
                status: 'retrying',
                retryMode: 'submit',
                retryCount,
                timedOut: false,
                message: `Upload failed, retrying (${retryCount}): ${brief}`,
                progress: 0
              });
              logTask(taskId, `Upload failed: ${brief}; Retrying in ${delay}ms (${retryCount})`);
              const ok = await sleepCancellable(delay, () => retryCtl.cancelled);
              if (!ok) {
                updateTask(taskId, { status: 'error', message: 'Auto-retry aborted (Click Retry to restart)' });
                return;
              }
              continue;
            }
            const timeout =
              /Failed to connect|timed out|Timeout|ETIMEDOUT|ENETUNREACH|ECONNABORTED|AbortError|aborted/i.test(msg);
            const message = timeout ? 'Request timed out, upstream may still be processing. Retry later.' : msg;
            log('Error: ' + message);
            updateTask(taskId, {
              status: 'error',
              timedOut: timeout,
              message,
              logTail: '',
              logFull: logBufferAttempt || msg,
              progress: 0
            });
            showToast(message, timeout ? 'warn' : 'error', {
              title: timeout ? 'Timeout' : 'Request Failed',
              duration: 4200
            });
            return;
          }
        }
      } finally {
        retryCtl.abortFetch = null;
        taskRetryControls.delete(taskId);
      }
    };

    // No artificial concurrency limit: If poolSize covers all jobs, run all concurrently.
    if (poolSize >= jobs.length) {
      await Promise.all(jobs.map((j) => runJob(j)));
      return;
    }

    const runners = Array.from({ length: poolSize }).map(async () => {
      while (cursor < jobs.length) {
        const idx = cursor++;
        await runJob(jobs[idx]);
      }
    });
    await Promise.all(runners);
  };

  const analyzePromptHints = () => {
    const txt = promptBox.value;
    const hints = [];
    const timeMatch = txt.match(/(\d+)\s?(s|sec|seconds|秒)/i);
    const timeVal = timeMatch ? parseInt(timeMatch[1], 10) : 0;
    if (timeVal > 0) hints.push(`时长 ${timeVal}s`);
    const resMatch = txt.match(/(\d{3,4})\s?[xX]\s?(\d{3,4})/);
    if (resMatch) hints.push(`分辨率 ${resMatch[1]}x${resMatch[2]}`);
    const fpsMatch = txt.match(/(\d+)\s?fps/i);
    if (fpsMatch) hints.push(`帧率 ${fpsMatch[1]}fps`);
    if (!hints.length) hints.push('Tip: Describe shot, lighting, subject, action. Be specific.');
    $('promptHints').innerHTML = hints.map((h) => `<span class="chip">${h}</span>`).join('');
  };

  const getBaseUrl = () => $('baseUrl').value.trim().replace(/\/$/, '');

  const resetMainUpload = () => {
    if (fileInput) fileInput.value = '';
    setMainFiles([]);
    if (dropzone) dropzone.classList.remove('dragover');
    if (filePreviewBox) filePreviewBox.style.display = 'none';
    if (filePreviewMedia) filePreviewMedia.innerHTML = '';
    if (filePreviewName) filePreviewName.textContent = 'No file selected';
    if (filePreviewKind) filePreviewKind.textContent = 'Asset';
    if (filePreviewMeta) filePreviewMeta.textContent = '';
    renderChips(filePreviewHints, []);
    if (filePreviewList) {
      filePreviewList.style.display = 'none';
      filePreviewList.innerHTML = '';
    }
    if (btnUseRecommendedModel) btnUseRecommendedModel.style.display = 'none';
    if (btnClearFiles) btnClearFiles.style.display = 'none';
    setBannerText('');
    clearPreviewObjectUrl();
    syncMainUploadUI();
  };

  const resetMultiFiles = () => {
    multiPrompts = multiPrompts.map((p) => ({ ...p, fileDataUrl: null, fileName: '' }));
    renderMultiPrompts();
    clearStoryboardFiles();
    saveForm();
  };

  // Generation Mode Bar: Sliding Highlight (Smoother transition)
  let modeBarSyncTimer = null;
  const syncBatchModeIndicator = () => {
    if (!batchModeBar) return;
    const checked = batchModeBar.querySelector('input[name="batchType"]:checked');
    if (!checked) return;
    const label = checked.nextElementSibling;
    if (!label || !label.getBoundingClientRect) return;

    // offset* is stable: unaffected by scroll/zoom, relative to offsetParent
    const x = label.offsetLeft || 0;
    const y = label.offsetTop || 0;
    const w = label.offsetWidth || 0;
    const h = label.offsetHeight || 0;
    if (!w || !h) return;

    batchModeBar.style.setProperty('--seg-x', `${x}px`);
    batchModeBar.style.setProperty('--seg-y', `${y}px`);
    batchModeBar.style.setProperty('--seg-w', `${w}px`);
    batchModeBar.style.setProperty('--seg-h', `${h}px`);
    batchModeBar.setAttribute('data-ready', '1');
  };
  const scheduleBatchModeIndicator = () => {
    if (!batchModeBar) return;
    if (modeBarSyncTimer) clearTimeout(modeBarSyncTimer);
    modeBarSyncTimer = setTimeout(() => {
      modeBarSyncTimer = null;
      requestAnimationFrame(syncBatchModeIndicator);
    }, 30);
  };

  const normalizeBatchType = (raw) => {
    const v = String(raw || '').trim();
    if (v === 'single' || v === 'same_prompt_files' || v === 'multi_prompt' || v === 'storyboard' || v === 'character') return v;
    return 'single';
  };
  const defaultBatchConcurrencyForType = (t) => (normalizeBatchType(t) === 'storyboard' ? 1 : 2);
  const rememberBatchConcurrencyForType = (t, val) => {
    const key = normalizeBatchType(t);
    const fallback = defaultBatchConcurrencyForType(key);
    const n = normalizeTimes(val, fallback);
    batchConcurrencyByType[key] = n;
    return n;
  };
  const getBatchConcurrencyForType = (t) => {
    const key = normalizeBatchType(t);
    const fallback = defaultBatchConcurrencyForType(key);
    if (batchConcurrencyByType && batchConcurrencyByType[key] !== undefined) {
      return normalizeTimes(batchConcurrencyByType[key], fallback);
    }
    return fallback;
  };

  const setBatchType = (val) => {
    // Remember "Current Mode" default copies before switching (Separate defaults)
    const prevType = getBatchType();
    try {
      if (batchConcurrencyInput) rememberBatchConcurrencyForType(prevType, batchConcurrencyInput.value);
    } catch (_) {
      /* ignore */
    }
    batchModeBar.querySelectorAll('input[name="batchType"]').forEach((r) => {
      r.checked = r.value === val;
    });
    // Switch mode: Restore default copies (Storyboard=1, Multi=2, Others=2)
    try {
      const next = getBatchConcurrencyForType(val);
      if (batchConcurrencyInput) batchConcurrencyInput.value = String(next);
      if (quickCountInput && document.activeElement !== quickCountInput) quickCountInput.value = String(next);
    } catch (_) {
      /* ignore */
    }
    toggleBatchTextarea();

    // Character Mode: Hide prompt input
    const promptBlock = document.getElementById('promptBlock');
    if (promptBlock) {
      if (val === 'character') {
        promptBlock.style.display = 'none';
      } else {
        promptBlock.style.display = '';
      }
    }

    saveForm();
    scheduleBatchModeIndicator();
  };

  const getBatchType = () => {
    const checked = batchModeBar.querySelector('input[name="batchType"]:checked');
    return checked ? checked.value : 'single';
  };

  // ===== Single/Same-Prompt Batch: Main Upload Area Management =====
  const getMainFiles = () => Array.from((fileInput && fileInput.files ? fileInput.files : []) || []);

  const setMainFiles = (files) => {
    if (!fileInput) return;
    const list = Array.isArray(files) ? files.filter(Boolean) : [];
    try {
      const dt = new DataTransfer();
      list.forEach((f) => dt.items.add(f));
      applyingMainFiles = true;
      fileInput.files = dt.files;
    } catch (_) {
      // Some environments block programmatic 'files' set; at least support 'clear'
      if (!list.length) fileInput.value = '';
    } finally {
      applyingMainFiles = false;
    }
  };

  const getGlobalRolesForBatchType = (bt) => {
    const t = bt || getBatchType();
    if (t === 'multi_prompt') return attachedRolesMulti;
    if (t === 'storyboard') return attachedRolesStoryboard;
    // Single/Same: Global mount below main prompt box
    return attachedRoles;
  };

  const buildRoleContextText = (roleList = null) => {
    const list = Array.isArray(roleList) ? roleList : getGlobalRolesForBatchType(getBatchType());
    if (!Array.isArray(list) || list.length === 0) return '';
    return list
      .map((r) => {
        const uname = r && (r.username || r.display) ? String(r.username || r.display) : '';
        return uname ? `@${uname}` : '';
      })
      .filter(Boolean)
      .join(' ');
  };

  const buildPromptForSend = (promptUserRaw) => {
    const roleContext = buildRoleContextText();
    const promptUser = String(promptUserRaw || '').trim();
    return [roleContext, promptUser].filter(Boolean).join('\n\n');
  };

  const ensureMainFilePickerMode = (t, opts = { quiet: false }) => {
    if (!fileInput) return;
    // Main Upload: Only for Single/Same-Prompt; Others have own inputs
    if (t !== 'single' && t !== 'same_prompt_files') return;
    const wantMulti = t === 'same_prompt_files';
    try {
      fileInput.multiple = wantMulti;
    } catch (_) {
      /* ignore */
    }
    // Single Mode: Force keep 1 file (Avoid 'selected multiple but used first' confusion)
    const files = getMainFiles();
    if (!wantMulti && files.length > 1) {
      setMainFiles([files[0]]);
      if (!opts.quiet) {
        showToast('Single Mode uses 1st file only. Switched to 1 file. Use "Same Prompt Batch" for multiple.', 'warn', {
          duration: 3600
        });
      }
    }
  };

  const syncDropzoneText = () => {
    if (!dropzone) return;
    const t = getBatchType();
    const files = getMainFiles();
    if (!files.length) {
      dropzone.textContent =
        t === 'single'
          ? 'Drag files here, or click to select (Single file only)'
          : 'Drag files here, or click to select (Multiple files)';
      return;
    }
    const first = files[0];
    if (files.length === 1) {
      dropzone.textContent = `Selected: ${first.name}`;
      return;
    }
    dropzone.textContent = `Selected: ${files.length} files (1st: ${first.name})`;
  };

  const renderMainFileList = () => {
    if (!filePreviewList) return;
    const t = getBatchType();
    const files = getMainFiles();

    if (btnClearFiles) btnClearFiles.style.display = files.length ? 'inline-flex' : 'none';

    // Show full file list only in "Same Prompt Batch" (Single forced to 1)
    if (t !== 'same_prompt_files' || !files.length) {
      filePreviewList.style.display = 'none';
      filePreviewList.innerHTML = '';
      return;
    }

    const kindShort = (f) => {
      const tp = String((f && f.type) || '');
      if (tp.startsWith('image')) return 'Img';
      if (tp.startsWith('video')) return 'Vid';
      return 'File';
    };

    filePreviewList.style.display = 'flex';
    filePreviewList.innerHTML = files
      .map(
        (f, idx) => `
        <span class="file-chip" title="${escapeAttr(f.name)}">
          <span class="kind">${kindShort(f)}</span>
          <span class="name">${escapeHtml(f.name)}</span>
          <button type="button" class="close" data-remove-main-file="${idx}" aria-label="Remove File">×</button>
        </span>`
      )
      .join('');
  };

  const syncQuickModeBar = () => {
    if (!quickModeBar) return;
    const t = getBatchType();
    quickModeBar.querySelectorAll('[data-quick-mode]').forEach((btn) => {
      const val = btn.getAttribute('data-quick-mode');
      btn.classList.toggle('active', val === t);
    });
  };

  const syncSingleSamePlanUI = () => {
    const t = getBatchType();
    const files = getMainFiles();
    const apiKey = $('apiKey')?.value?.trim?.() || '';
    const promptUser = (promptBox?.value || '').trim();
    const promptForSend = buildPromptForSend(promptUser);

    const generationCountFallback = t === 'storyboard' ? 1 : 2;
    const perFileCount = t === 'single' ? 1 : normalizeTimes(batchConcurrencyInput?.value || String(generationCountFallback), generationCountFallback);

    // Quick Copies: Show only in "Same Prompt Batch"
    if (quickCountWrap) quickCountWrap.style.display = t === 'same_prompt_files' ? 'inline-flex' : 'none';
    if (quickCountInput && t === 'same_prompt_files' && document.activeElement !== quickCountInput) {
      quickCountInput.value = String(perFileCount);
    }

    // Planned Tasks (Single/Same only; Multi/Storyboard have own logic)
    let planned = 0;
    let reason = '';
    if (t === 'single') {
      planned = promptForSend || files.length ? 1 : 0;
      if (!planned) reason = 'Please enter prompt or select a file';
    } else if (t === 'same_prompt_files') {
      if (!promptForSend && !files.length) {
        planned = 0;
        reason = 'Need prompt or at least 1 file';
      } else {
        planned = files.length ? files.length * perFileCount : perFileCount;
      }
    } else {
      // Other modes: uploadCard hidden; keep minimal side effect
      planned = 0;
    }

    // quickPlan: Output "Formula" via chips
    if (quickPlan) {
      const chips = [];
      if (t === 'single') chips.push({ text: 'Single', kind: 'info' });
      if (t === 'same_prompt_files') chips.push({ text: 'Same Prompt Batch', kind: 'info' });
      if (files.length) chips.push({ text: `${files.length} Files`, kind: 'info' });
      if (t === 'same_prompt_files') chips.push({ text: `${perFileCount} per file`, kind: 'info' });

      if (!apiKey) {
        chips.push({ text: 'Missing API Key', kind: 'warn' });
      } else if (!planned) {
        chips.push({ text: reason || 'Not Ready', kind: 'warn' });
      } else {
        const kind = planned >= 30 ? 'warn' : 'ok';
        chips.push({ text: `Plan: ${planned} Tasks`, kind });
      }

      quickPlan.innerHTML = chips.map((c) => `<span class="chip ${c.kind}">${escapeHtml(c.text)}</span>`).join('');
    }

    // Main Button: Include plan count in text
    if (btnSendPrimary) {
      const base = planned && t === 'same_prompt_files' ? `Generate (${planned})` : 'Generate';
      btnSendPrimary.textContent = base;
      const prevDisabled = !!btnSendPrimary.disabled;
      const nextDisabled = !apiKey || (t === 'single' || t === 'same_prompt_files' ? planned === 0 : false);
      btnSendPrimary.disabled = nextDisabled;
      btnSendPrimary.title = !apiKey ? 'Please enter API Key first' : planned === 0 ? reason : '';
      if (prevDisabled && !nextDisabled) flashReadyButton(btnSendPrimary);
    }
  };

  // Multi/Storyboard: Explicit task count on button
  const syncBatchEditorPlanUI = () => {
    if (!btnSend) return;
    const t = getBatchType();
    if (t !== 'multi_prompt' && t !== 'storyboard') {
      btnSend.textContent = 'Generate';
      btnSend.disabled = false;
      btnSend.title = '';
      return;
    }
    const apiKey = $('apiKey')?.value?.trim?.() || '';
    let planned = 0;
    if (t === 'multi_prompt') {
      const defaultCount = normalizeTimes(batchConcurrencyInput?.value || '2', 2);
      const rows = (Array.isArray(multiPrompts) ? multiPrompts : [])
        .map((p) => ({
          text: (p?.text || '').trim(),
          count: normalizeTimes(p?.count, defaultCount),
          fileDataUrl: p?.fileDataUrl || null
        }))
        .filter((p) => p.text || p.fileDataUrl);
      planned = rows.reduce((sum, p) => sum + normalizeTimes(p.count, defaultCount), 0);
    } else if (t === 'storyboard') {
      const rows = (Array.isArray(storyboardShots) ? storyboardShots : [])
        .map((s) => ({
          text: (s?.text || '').trim(),
          count: normalizeTimes(s?.count, 1),
          fileDataUrl: s?.fileDataUrl || null
        }))
        .filter((s) => s.text || s.fileDataUrl);
      planned = rows.reduce((sum, s) => sum + normalizeTimes(s.count, 1), 0);
    }
    btnSend.textContent = planned ? `Generate (${planned})` : 'Generate';
    const prevDisabled = !!btnSend.disabled;
    const nextDisabled = !apiKey || planned === 0;
    btnSend.disabled = nextDisabled;
    btnSend.title = !apiKey ? 'Please enter API Key first' : planned === 0 ? 'Please enter at least one prompt (or select file)' : `Will create ${planned} tasks`;
    if (prevDisabled && !nextDisabled) flashReadyButton(btnSend);
  };
  let batchPlanSyncQueued = false;
  const scheduleBatchEditorPlanUI = () => {
    if (batchPlanSyncQueued) return;
    batchPlanSyncQueued = true;
    requestAnimationFrame(() => {
      batchPlanSyncQueued = false;
      try {
        syncBatchEditorPlanUI();
      } catch (_) {
        /* ignore */
      }
    });
  };
  const readyBtnTimer = new WeakMap();
  const flashReadyButton = (btn) => {
    if (!btn) return;
    try {
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;
      const now = Date.now();
      const last = parseInt(btn.getAttribute('data-ready-ts') || '0', 10) || 0;
      // Light debounce: Avoid rapid flicker
      if (last && now - last < 700) return;
      btn.setAttribute('data-ready-ts', String(now));

      btn.classList.remove('btn-ready');
      // Force reflow, ensure animation replay
      void btn.offsetWidth;
      btn.classList.add('btn-ready');

      const prev = readyBtnTimer.get(btn);
      if (prev) clearTimeout(prev);
      readyBtnTimer.set(
        btn,
        setTimeout(() => {
          try {
            btn.classList.remove('btn-ready');
          } catch (_) { }
        }, 2950)
      );
    } catch (_) {
      /* ignore */
    }
  };

  const syncMainUploadUI = (opts = { quiet: true }) => {
    ensureMainFilePickerMode(getBatchType(), { quiet: !!(opts && opts.quiet) });
    syncDropzoneText();
    renderMainFileList();
    syncQuickModeBar();
    syncSingleSamePlanUI();
  };

  // Refresh "Role Chips" under Multi-Prompt rows only (No textarea rebuild)
  const renderMultiPromptRoleChipsOnly = () => {
    if (!multiPromptList) return;
    const globals = Array.isArray(attachedRolesMulti) ? attachedRolesMulti : [];
    const globalUserSet = new Set(globals.map((r) => String(r?.username || '').trim()).filter(Boolean));

    multiPromptList.querySelectorAll('[data-row-roles]').forEach((container) => {
      const idx = parseInt(container.getAttribute('data-row-roles'), 10);
      const globalHtml = globals
        .map((r) => {
          const name = String(r?.display || r?.username || '').trim();
          if (!name) return '';
          return `<span class="chip info" title="Global Role (Multi Mode): Applies to every row">@${escapeHtml(name)}</span>`;
        })
        .join('');
      const roles = multiPromptRoles[idx] || [];
      const localHtml =
        roles
          .map((r, i) => {
            const uname = String(r?.username || '').trim();
            if (uname && globalUserSet.has(uname)) return '';
            return `<span class="chip" data-row-role="${idx}:${i}" style="display:inline-flex;align-items:center;gap:6px;">
              ${r.avatar ? `<img src="${r.avatar}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;">` : ''}
              @${escapeHtml(r.display || r.username || 'Role')}
              <button class="chip-close" type="button" aria-label="Remove Role" title="Remove" style="border:none;background:transparent;cursor:pointer;">×</button>
            </span>`;
          })
          .join('');
      container.innerHTML = (globalHtml + localHtml) || '';
    });

    multiPromptList.querySelectorAll('[data-row-role]').forEach((chip) => {
      chip.querySelector('.chip-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const [idx, ridx] = chip.getAttribute('data-row-role').split(':').map((x) => parseInt(x, 10));
        if (!isNaN(idx) && !isNaN(ridx) && multiPromptRoles[idx]) {
          multiPromptRoles[idx].splice(ridx, 1);
          renderMultiPromptRoleChipsOnly();
          saveForm();
          renderRoles();
        }
      });
    });
  };

  const renderMultiPrompts = () => {
    if (!multiPromptList) return;
    const fallbackCount = normalizeTimes(batchConcurrencyInput?.value || '2', 2);
    multiPromptList.innerHTML =
      multiPrompts
        .map((raw, idx) => {
          const p = {
            text: raw.text || '',
            count: normalizeTimes(raw.count, fallbackCount),
            fileDataUrl: raw.fileDataUrl || null,
            fileName: raw.fileName || ''
          };
          multiPrompts[idx] = p;
          return `
      <div class="multi-row" data-idx="${idx}">
        <div class="multi-row-top">
          <span class="sb-index-pill">Prompt ${idx + 1}</span>
          <span class="muted">Copies</span>
          <input class="input multi-prompt-count" data-idx="${idx}" type="number" min="1" max="9999" step="1" value="${p.count}" title="Copies for this prompt">
           <label class="pill-btn multi-file-label">
             Select File
             <input type="file" class="multi-prompt-file" data-idx="${idx}">
           </label>
           <span class="multi-file-name" data-file-label="${idx}">
             ${p.fileName ? escapeHtml(p.fileName) : 'None'}
           </span>
           <button type="button" class="pill-btn multi-file-clear" data-idx="${idx}" ${p.fileName ? '' : 'disabled'} title="Clear file for this prompt">Clear File</button>
           <button type="button" class="pill-btn multi-remove multi-prompt-remove" data-idx="${idx}">Delete</button>
         </div>
         <textarea class="input multi-prompt-input multi-prompt-textarea" data-idx="${idx}" placeholder="Prompt ${idx + 1} (Multi-line, describe shot/subject/action/style)">${escapeHtml(
            p.text ?? ''
          )}</textarea>
        <div class="multi-row-roles" data-row-roles="${idx}"></div>
      </div>`;
        })
        .join('') || '<div class="muted">No prompts. Click "Add Prompt" to add.</div>';

    multiPromptList.querySelectorAll('.multi-prompt-input').forEach((inp) =>
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (multiPrompts[idx]) {
          multiPrompts[idx].text = e.target.value;
          saveForm();
          scheduleBatchEditorPlanUI();
        }
      })
    );
    // Support dragging Role Card to Multi-Prompt Input
    multiPromptList.querySelectorAll('.multi-prompt-input').forEach((inp) => {
      inp.addEventListener('dragover', (e) => e.preventDefault());
      inp.addEventListener('drop', (e) => {
        e.preventDefault();
        const text = e.dataTransfer.getData('text/plain');
        if (!text) return;
        try {
          const obj = JSON.parse(text);
          if (obj.display || obj.username) {
            const idx = parseInt(inp.getAttribute('data-idx'), 10);
            addRoleToRow(idx, {
              display: obj.display || obj.display_name || obj.username || '',
              username: obj.username || '',
              avatar: obj.avatar || obj.avatar_path || ''
            });
            showToast('Attached to this prompt');
            return;
          }
        } catch (_) {
          /* ignore */
        }
      });
    });
    multiPromptList.querySelectorAll('.multi-prompt-count').forEach((sel) =>
      sel.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (multiPrompts[idx]) {
          const fallback = normalizeTimes(multiPrompts[idx].count ?? batchConcurrencyInput?.value ?? 2, 2);
          const val = normalizeTimes(e.target.value, fallback);
          multiPrompts[idx].count = val;
          e.target.value = String(val);
          saveForm();
          syncGlobalCountHighlight();
          scheduleBatchEditorPlanUI();
        }
      })
    );
    multiPromptList.querySelectorAll('.multi-prompt-remove').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        multiPrompts.splice(idx, 1);
        // Re-index roles after deletion to avoid mismatch
        const nextMap = {};
        Object.keys(multiPromptRoles || {}).forEach((k) => {
          const i = parseInt(k, 10);
          if (isNaN(i)) return;
          if (i < idx) nextMap[i] = multiPromptRoles[i];
          else if (i > idx) nextMap[i - 1] = multiPromptRoles[i];
        });
        Object.keys(multiPromptRoles || {}).forEach((k) => delete multiPromptRoles[k]);
        Object.keys(nextMap).forEach((k) => (multiPromptRoles[k] = nextMap[k]));
        renderMultiPrompts();
        saveForm();
      })
    );
    multiPromptList.querySelectorAll('.multi-prompt-file').forEach((inp) =>
      inp.addEventListener('change', async (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        const file = e.target.files?.[0];
        if (!file || !multiPrompts[idx]) return;
        const inputEl = e.target;
        try {
          const dataUrl = await fileToDataUrl(file);
          multiPrompts[idx].fileDataUrl = dataUrl;
          multiPrompts[idx].fileName = file.name;
          // Allow re-selecting same file to trigger change
          try {
            inputEl.value = '';
          } catch (_) {
            /* ignore */
          }
          renderMultiPrompts(); // Sync "Clear File" button state
          saveForm();
        } catch (err) {
          showToast('Read File Failed');
        }
      })
    );
    multiPromptList.querySelectorAll('.multi-file-clear').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (isNaN(idx) || !multiPrompts[idx]) return;
        multiPrompts[idx].fileDataUrl = null;
        multiPrompts[idx].fileName = '';
        renderMultiPrompts();
        saveForm();
        showToast('File cleared for this prompt', 'success');
      })
    );

    // Render Role Chips (Global + Row)
    renderMultiPromptRoleChipsOnly();

    syncBatchEditorPlanUI();
  };

  const addMultiPrompt = (text = '', count = 2) => {
    const fallback = normalizeTimes(batchConcurrencyInput?.value || '2', 2);
    multiPrompts.push({ text, count: normalizeTimes(count, fallback), fileDataUrl: null, fileName: '' });
    renderMultiPrompts();
    saveForm();
  };

  // =========================
  // Storyboard Mode
  // =========================
  const clampInt = (val, { min = 1, max = 99, fallback = 1 } = {}) => {
    const n = parseInt(val, 10);
    if (isNaN(n)) return fallback;
    return Math.max(min, Math.min(max, n));
  };

  // Copies/Repeats: No artificial limit, just min guard; high max to prevent typo crashes.
  const normalizeTimes = (val, fallback = 1) => clampInt(val, { min: 1, max: 9999, fallback });

  // Storyboard: Non-blocking "Undo" (Replaces confirm dialog)
  // Keep 1 step undo only: Sufficient, avoids complex stack issues
  let storyboardUndo = null; // { shots, shotCountValue, shotCountDirty, batchType, ts, reason }
  const cloneStoryboardRoles = (rolesArr) =>
    Array.isArray(rolesArr)
      ? rolesArr
        .map((r) => ({
          display: r?.display || r?.display_name || r?.username || '',
          username: r?.username || '',
          avatar: r?.avatar || r?.avatar_path || ''
        }))
        .filter((r) => r.display || r.username || r.avatar)
      : [];
  const cloneStoryboardShots = (arr) =>
    (Array.isArray(arr) ? arr : []).map((s) => ({
      text: typeof s?.text === 'string' ? s.text : '',
      count: normalizeTimes(s?.count ?? 1, 1),
      fileDataUrl: s?.fileDataUrl || null,
      fileName: s?.fileName || '',
      roles: cloneStoryboardRoles(s?.roles),
      useGlobalRoles: s && s.useGlobalRoles === false ? false : true
    }));
  const captureStoryboardUndo = (reason = '') => {
    storyboardUndo = {
      shots: cloneStoryboardShots(storyboardShots),
      shotCountValue: storyboardShotCount ? String(storyboardShotCount.value || '') : '',
      shotCountDirty: storyboardShotCount ? storyboardShotCount.getAttribute('data-dirty') || '' : '',
      batchType: getBatchType(),
      ts: Date.now(),
      reason: String(reason || '')
    };
  };
  const undoStoryboardOnce = () => {
    if (!storyboardUndo) {
      showToast('Nothing to undo', 'warn', { title: 'Undo' });
      return;
    }
    const snap = storyboardUndo;
    storyboardUndo = null;

    try {
      if (snap.batchType && snap.batchType !== getBatchType()) {
        setBatchType(snap.batchType);
      }
    } catch (_) {
      /* ignore */
    }

    storyboardShots = cloneStoryboardShots(snap.shots);
    if (storyboardShotCount) {
      if (snap.shotCountValue) storyboardShotCount.value = snap.shotCountValue;
      if (snap.shotCountDirty) storyboardShotCount.setAttribute('data-dirty', snap.shotCountDirty);
      else storyboardShotCount.removeAttribute('data-dirty');
    }
    renderStoryboardShots();
    syncStoryboardCountSelect();
    saveForm();
    showToast('Undo successful', 'success', { title: 'Undone', duration: 2400 });
  };

  const getStoryboardShotLabel = (_runNo, idx1, total = null) =>
    total ? `Shot ${idx1}/${total}` : `Shot ${idx1}`;

  const syncStoryboardCountSelect = () => {
    if (!storyboardShotCount) return;
    if (document.activeElement === storyboardShotCount) return; // Don't steal focus from user
    if (storyboardShotCount.getAttribute('data-dirty') === '1') return; // User hasn't clicked "Apply"
    const n = storyboardShots.length || 0;
    if (n > 0) storyboardShotCount.value = String(n);
  };

  const setStoryboardShotUseGlobalRoles = (idx, useGlobal) => {
    if (idx === null || idx === undefined) return;
    const i = parseInt(String(idx), 10);
    if (isNaN(i) || i < 0 || !storyboardShots[i]) return;
    const cur = storyboardShots[i];
    storyboardShots[i] = { ...cur, useGlobalRoles: !!useGlobal };
  };

  const syncStoryboardScopeButton = () => {
    if (!btnStoryboardScopeRoles) return;
    const total = storyboardShots.length || 0;
    const excluded = storyboardShots.filter((s) => s && s.useGlobalRoles === false).length;
    btnStoryboardScopeRoles.disabled = total === 0;
    btnStoryboardScopeRoles.textContent = excluded > 0 ? `Excluded Shots · ${excluded}` : 'Exclude Shots';
    btnStoryboardScopeRoles.title =
      total === 0
        ? 'No shots: Set shot count and apply first'
        : excluded > 0
          ? `Excluded ${excluded}/${total} shots (Not affected by Global Mounts)`
          : 'Exclude "Global Roles" from specific shots (Won\'t affect them)';
  };

  // Refresh "Role Chips" under Storyboard rows only (No textarea rebuild)
  const renderStoryboardRoleChipsOnly = () => {
    if (!storyboardList) return;

    const globals = Array.isArray(attachedRolesStoryboard) ? attachedRolesStoryboard : [];
    const globalUserSetAll = new Set(globals.map((r) => String(r?.username || '').trim()).filter(Boolean));

    storyboardList.querySelectorAll('[data-sb-roles]').forEach((container) => {
      const idx = parseInt(container.getAttribute('data-sb-roles'), 10);
      if (isNaN(idx) || !storyboardShots[idx]) return;

      const shot = storyboardShots[idx] || {};
      const useGlobal = shot.useGlobalRoles !== false;
      const globalUserSet = useGlobal ? globalUserSetAll : new Set(); // If global off, show local duplicates

      // Global Chips: Shown by default; offer "Restore Global" if manually excluded
      let globalHtml = '';
      if (globals.length) {
        if (!useGlobal) {
          globalHtml = `
            <span class="chip warn" title="Manually excluded: Global Roles not mounted">Global Roles Cancelled</span>
            <button type="button" class="chip info" data-sb-global-on="${idx}" title="Restore Global Roles for this shot" style="cursor:pointer;">Restore Global</button>
          `;
        } else {
          const chips = globals
            .map((r) => {
              const name = String(r?.display || r?.username || '').trim();
              if (!name) return '';
              return `<span class="chip info" title="Global Role (Storyboard): Applies to every shot">@${escapeHtml(name)}</span>`;
            })
            .join('');
          // "Exclude this shot from global mount"
          const offBtn = `<button type="button" class="chip warn" data-sb-global-off="${idx}" title="Exclude Global Roles for this shot" style="cursor:pointer;">× Exclude Global</button>`;
          globalHtml = chips + offBtn;
        }
      }

      const roles =
        (storyboardShots[idx] && Array.isArray(storyboardShots[idx].roles) ? storyboardShots[idx].roles : []) || [];
      const localHtml =
        roles
          .map((r, i) => {
            const uname = String(r?.username || '').trim();
            if (uname && globalUserSet.has(uname)) return '';
            return `<span class="chip" data-sb-role="${idx}:${i}" style="display:inline-flex;align-items:center;gap:6px;">
              ${r.avatar ? `<img src="${r.avatar}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;">` : ''}
              @${escapeHtml(r.display || r.username || 'Role')}
              <button class="chip-close" type="button" aria-label="Remove Role" title="Remove" style="border:none;background:transparent;cursor:pointer;">×</button>
            </span>`;
          })
          .join('');

      container.innerHTML = (globalHtml + localHtml) || '';
    });

    storyboardList.querySelectorAll('[data-sb-role]').forEach((chip) => {
      chip.querySelector('.chip-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const [idx, ridx] = chip
          .getAttribute('data-sb-role')
          .split(':')
          .map((x) => parseInt(x, 10));
        if (!isNaN(idx) && !isNaN(ridx) && storyboardShots[idx] && Array.isArray(storyboardShots[idx].roles)) {
          storyboardShots[idx].roles.splice(ridx, 1);
          renderStoryboardRoleChipsOnly();
          saveForm();
          renderRoles();
        }
      });
    });

    storyboardList.querySelectorAll('[data-sb-global-off]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-sb-global-off'), 10);
        if (isNaN(idx) || !storyboardShots[idx]) return;
        setStoryboardShotUseGlobalRoles(idx, false);
        renderStoryboardRoleChipsOnly();
        saveForm();
        showToast(`Shot ${idx + 1} excluded from Global Roles`, 'success', { duration: 2200 });
      });
    });

    storyboardList.querySelectorAll('[data-sb-global-on]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-sb-global-on'), 10);
        if (isNaN(idx) || !storyboardShots[idx]) return;
        setStoryboardShotUseGlobalRoles(idx, true);
        renderStoryboardRoleChipsOnly();
        saveForm();
        showToast(`Shot ${idx + 1} restored to Global Roles`, 'success', { duration: 2200 });
      });
    });

    syncStoryboardScopeButton();
    // Fallback: Role switch/scope change triggers this, ensure button state recalculated
    // Recalculate once to avoid "Shot content filled but button gray" issue.
    scheduleBatchEditorPlanUI();
  };

  const showStoryboardGlobalScopeMenu = (anchorEl) => {
    if (!anchorEl) return;
    const total = storyboardShots.length || 0;
    if (!total) {
      showToast('No shots: Set shot count and apply first', 'warn');
      return;
    }

    const rect = anchorEl.getBoundingClientRect ? anchorEl.getBoundingClientRect() : { left: 20, bottom: 20 };
    const menu = document.createElement('div');
    menu.className = 'role-target-menu';
    menu.style.position = 'fixed';
    menu.style.zIndex = 9999;
    menu.style.background = '#0f172a';
    menu.style.color = '#fff';
    menu.style.border = '1px solid #1e293b';
    menu.style.borderRadius = '12px';
    menu.style.padding = '10px';
    menu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
    menu.style.minWidth = '240px';
    menu.style.left = `${Math.max(10, rect.left)}px`;
    menu.style.top = `${Math.min(window.innerHeight - 20, rect.bottom + 8)}px`;

    const title = document.createElement('div');
    title.textContent = 'Global Roles Scope';
    title.style.fontWeight = '900';
    title.style.padding = '2px 6px 8px';
    menu.appendChild(title);

    const tip = document.createElement('div');
    tip.textContent = 'Excluded Shots: No longer auto-mount Global Roles (Future global changes ignored).';
    tip.style.fontSize = '12px';
    tip.style.opacity = '0.85';
    tip.style.padding = '0 6px 10px';
    menu.appendChild(tip);

    const makeBtn = (label, handler, opts = {}) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.width = '100%';
      b.style.textAlign = 'left';
      b.style.background = 'transparent';
      b.style.color = '#fff';
      b.style.border = 'none';
      b.style.padding = '7px 8px';
      b.style.cursor = 'pointer';
      b.style.borderRadius = '10px';
      if (opts.dim) b.style.opacity = '0.8';
      b.onmouseenter = () => (b.style.background = 'rgba(255,255,255,0.08)');
      b.onmouseleave = () => (b.style.background = 'transparent');
      b.onclick = () => handler && handler();
      return b;
    };

    const bar = document.createElement('div');
    bar.style.display = 'flex';
    bar.style.gap = '6px';
    bar.style.padding = '0 6px 8px';
    const mkMini = (label, handler) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.className = 'pill-btn';
      b.style.padding = '6px 10px';
      b.style.borderRadius = '10px';
      b.style.background = 'rgba(255,255,255,0.10)';
      b.style.borderColor = 'rgba(148,163,184,0.35)';
      b.style.color = '#fff';
      b.onclick = handler;
      return b;
    };
    bar.appendChild(
      mkMini('Use All', () => {
        storyboardShots = storyboardShots.map((s) => ({ ...s, useGlobalRoles: true }));
        renderStoryboardRoleChipsOnly();
        saveForm();
      })
    );
    bar.appendChild(
      mkMini('Exclude All', () => {
        storyboardShots = storyboardShots.map((s) => ({ ...s, useGlobalRoles: false }));
        renderStoryboardRoleChipsOnly();
        saveForm();
      })
    );
    menu.appendChild(bar);

    const listWrap = document.createElement('div');
    listWrap.style.maxHeight = '320px';
    listWrap.style.overflow = 'auto';
    listWrap.style.padding = '0 2px';

    const renderList = () => {
      listWrap.innerHTML = '';
      storyboardShots.forEach((s, idx) => {
        const on = s && s.useGlobalRoles !== false;
        const label = on ? `✓ Shot ${idx + 1}: Global Roles On` : `Shot ${idx + 1}: Excluded (No Auto-mount)`;
        listWrap.appendChild(
          makeBtn(label, () => {
            setStoryboardShotUseGlobalRoles(idx, !on);
            renderStoryboardRoleChipsOnly();
            saveForm();
            renderList(); // Keep menu open for multiple selections
          })
        );
      });
    };
    renderList();
    menu.appendChild(listWrap);

    const foot = document.createElement('div');
    foot.style.padding = '10px 6px 2px';
    foot.appendChild(
      makeBtn('Close', () => {
        try {
          document.body.removeChild(menu);
        } catch (_) { }
      }, { dim: true })
    );
    menu.appendChild(foot);

    document.body.appendChild(menu);

    // Clamp into viewport (avoid spilling out on the right/bottom).
    try {
      const box = menu.getBoundingClientRect();
      let left = box.left;
      let top = box.top;
      if (box.right > window.innerWidth - 10) left = Math.max(10, window.innerWidth - box.width - 10);
      if (box.bottom > window.innerHeight - 10) top = Math.max(10, window.innerHeight - box.height - 10);
      menu.style.left = `${left}px`;
      menu.style.top = `${top}px`;
    } catch (_) {
      /* ignore */
    }

    const dismiss = (e) => {
      if (!menu.contains(e.target) && e.target !== anchorEl) {
        try {
          document.body.removeChild(menu);
        } catch (_) { }
        document.removeEventListener('mousedown', dismiss);
      }
    };
    setTimeout(() => document.addEventListener('mousedown', dismiss), 0);
  };

  const renderStoryboardShots = () => {
    if (!storyboardList) return;

    storyboardList.innerHTML =
      storyboardShots
        .map((raw, idx) => {
          const s = {
            text: raw.text || '',
            count: normalizeTimes(raw.count, normalizeTimes(batchConcurrencyInput?.value || '1', 1)),
            fileDataUrl: raw.fileDataUrl || null,
            fileName: raw.fileName || '',
            roles: Array.isArray(raw.roles) ? raw.roles : [],
            // Default true; Compat imported 'use_global_roles'
            useGlobalRoles: raw.useGlobalRoles === false || raw.use_global_roles === false ? false : true
          };
          storyboardShots[idx] = s;

          return `
        <div class="multi-row sb-row" data-sb-idx="${idx}">
          <div class="multi-row-top">
            <span class="sb-index-pill">Shot ${idx + 1}</span>
            <input class="input sb-shot-count" data-idx="${idx}" type="number" min="1" max="9999" step="1" value="${s.count}" title="Copies for this Shot (Create multiple to cherry-pick)" style="width:78px;">
            <label class="pill-btn multi-file-label" title="Optional: Attach ref file for this shot">
              Select File
              <input type="file" class="sb-shot-file" data-idx="${idx}">
            </label>
            <span class="multi-file-name" data-sb-file-label="${idx}">
              ${s.fileName ? escapeHtml(s.fileName) : 'None'}
            </span>
            <button type="button" class="pill-btn sb-file-clear" data-idx="${idx}" ${s.fileName ? '' : 'disabled'} title="Clear file for this shot">Clear File</button>
            <button type="button" class="pill-btn sb-move-up" data-idx="${idx}" title="Move Up">↑</button>
            <button type="button" class="pill-btn sb-move-down" data-idx="${idx}" title="Move Down">↓</button>
            <button type="button" class="pill-btn sb-copy-prev" data-idx="${idx}" title="Copy previous shot content">Copy Prev</button>
            <button type="button" class="pill-btn multi-remove sb-remove" data-idx="${idx}">Delete</button>
          </div>
          <textarea class="input sb-prompt-textarea" data-idx="${idx}" placeholder="Shot ${idx + 1}: Describe Shot/Action/Dialog/Camera...">${escapeHtml(
            s.text
          )}</textarea>
          <div class="multi-row-roles" data-sb-roles="${idx}"></div>
        </div>
        `;
        })
        .join('') || '<div class="muted">No shots. Set "Shot Count" and apply, or "Add Shot".</div>';

    // Input: Text
    storyboardList.querySelectorAll('.sb-prompt-textarea').forEach((ta) => {
      ta.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (!isNaN(idx) && storyboardShots[idx]) {
          storyboardShots[idx].text = e.target.value;
          saveForm();
          scheduleBatchEditorPlanUI();
        }
      });
      // Drag Role Card to Shot Textarea: Append Role
      ta.addEventListener('dragover', (e) => e.preventDefault());
      ta.addEventListener('drop', (e) => {
        e.preventDefault();
        const text = e.dataTransfer.getData('text/plain');
        if (!text) return;
        try {
          const obj = JSON.parse(text);
          if (obj.display || obj.username) {
            const idx = parseInt(ta.getAttribute('data-idx'), 10);
            addRoleToStoryboardShot(idx, {
              display: obj.display || obj.display_name || obj.username || '',
              username: obj.username || '',
              avatar: obj.avatar || obj.avatar_path || ''
            });
            showToast('Attached to this shot');
            return;
          }
        } catch (_) {
          /* ignore */
        }
      });
    });

    // Input: Copies
    storyboardList.querySelectorAll('.sb-shot-count').forEach((sel) =>
      sel.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        const fallback = normalizeTimes(storyboardShots[idx]?.count ?? batchConcurrencyInput?.value ?? 1, 1);
        const val = normalizeTimes(e.target.value, fallback);
        if (!isNaN(idx) && storyboardShots[idx]) {
          storyboardShots[idx].count = val;
          e.target.value = String(val);
          saveForm();
          syncGlobalCountHighlight();
          scheduleBatchEditorPlanUI();
        }
      })
    );

    // File: Per shot optional
    storyboardList.querySelectorAll('.sb-shot-file').forEach((inp) =>
      inp.addEventListener('change', async (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        const file = e.target.files?.[0];
        if (!file || !storyboardShots[idx]) return;
        const inputEl = e.target;
        try {
          const dataUrl = await fileToDataUrl(file);
          storyboardShots[idx].fileDataUrl = dataUrl;
          storyboardShots[idx].fileName = file.name;
          // Allow re-selecting same file to trigger change
          try {
            inputEl.value = '';
          } catch (_) {
            /* ignore */
          }
          renderStoryboardShots(); // Sync "Clear File" button state
          saveForm();
        } catch (_) {
          showToast('Read File Failed', 'error');
        }
      })
    );
    storyboardList.querySelectorAll('.sb-file-clear').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (isNaN(idx) || !storyboardShots[idx]) return;
        storyboardShots[idx].fileDataUrl = null;
        storyboardShots[idx].fileName = '';
        renderStoryboardShots();
        saveForm();
        showToast('File cleared for this shot', 'success');
      })
    );

    // Delete/Move/Copy
    storyboardList.querySelectorAll('.sb-remove').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (isNaN(idx)) return;
        storyboardShots.splice(idx, 1);
        renderStoryboardShots();
        syncStoryboardCountSelect();
        saveForm();
      })
    );
    storyboardList.querySelectorAll('.sb-move-up').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (isNaN(idx) || idx <= 0) return;
        const tmp = storyboardShots[idx - 1];
        storyboardShots[idx - 1] = storyboardShots[idx];
        storyboardShots[idx] = tmp;
        renderStoryboardShots();
        saveForm();
      })
    );
    storyboardList.querySelectorAll('.sb-move-down').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (isNaN(idx) || idx >= storyboardShots.length - 1) return;
        const tmp = storyboardShots[idx + 1];
        storyboardShots[idx + 1] = storyboardShots[idx];
        storyboardShots[idx] = tmp;
        renderStoryboardShots();
        saveForm();
      })
    );
    storyboardList.querySelectorAll('.sb-copy-prev').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (isNaN(idx) || idx <= 0 || !storyboardShots[idx] || !storyboardShots[idx - 1]) return;
        const prev = storyboardShots[idx - 1];
        const cur = storyboardShots[idx];
        if ((cur.text || '').trim() && !(prev.text || '').trim()) {
          showToast('Previous shot empty, cannot copy', 'warn');
          return;
        }
        const curHasAny =
          !!(cur.text || '').trim() || (Array.isArray(cur.roles) && cur.roles.length) || !!cur.fileDataUrl;
        captureStoryboardUndo(curHasAny ? 'Overwritten by Prev' : 'Copied from Prev');
        storyboardShots[idx] = {
          ...cur,
          text: prev.text || '',
          roles: Array.isArray(prev.roles) ? [...prev.roles] : []
        };
        renderStoryboardShots();
        saveForm();
        showToast(curHasAny ? 'Overwritten by Previous Shot (Undoable)' : 'Copied Previous Shot (Undoable)', 'success', {
          title: 'Shot Updated',
          duration: 5200,
          action: { text: 'Undo', onClick: () => undoStoryboardOnce() }
        });
      })
    );

    // Render Role Chips (Global + Shot; Support "Shot-level Exclude Global")
    renderStoryboardRoleChipsOnly();

    syncStoryboardCountSelect();
    syncBatchEditorPlanUI();
  };

  const appendStoryboardShots = (howMany, opts = { text: '', count: null }) => {
    const n = Math.max(0, parseInt(String(howMany ?? 0), 10) || 0);
    if (!n) return;
    const fallbackCount = normalizeTimes(batchConcurrencyInput?.value ?? 1, 1);
    const c = normalizeTimes(opts && opts.count !== null && opts.count !== undefined ? opts.count : fallbackCount, 1);
    const text = opts && typeof opts.text === 'string' ? opts.text : '';
    for (let i = 0; i < n; i++) {
      storyboardShots.push({
        text: text || '',
        count: c,
        fileDataUrl: null,
        fileName: '',
        roles: [],
        useGlobalRoles: true
      });
    }
    renderStoryboardShots();
    syncStoryboardCountSelect();
    saveForm();
  };

  const addStoryboardShot = (text = '', count = null) => {
    appendStoryboardShots(1, { text, count });
  };

  const setStoryboardShotCount = (nextCount, opts = { confirmShrink: true }) => {
    const n = Math.max(1, parseInt(nextCount, 10) || 1);
    const cur = storyboardShots.length;
    if (n === cur) return;
    const willDelete = n < cur;
    if (willDelete && opts.confirmShrink) {
      captureStoryboardUndo(`Shot Count ${cur}→${n}`);
    }
    if (storyboardShotCount) storyboardShotCount.removeAttribute('data-dirty');
    if (n > cur) {
      appendStoryboardShots(n - cur, { text: '', count: normalizeTimes(batchConcurrencyInput?.value ?? 1, 1) });
      return;
    }
    storyboardShots = storyboardShots.slice(0, n);
    renderStoryboardShots();
    syncStoryboardCountSelect();
    if (storyboardShotCount) storyboardShotCount.removeAttribute('data-dirty');
    saveForm();
    if (willDelete && opts.confirmShrink) {
      showToast(`Shot count changed ${cur}→${n} (Removed last ${cur - n}, Undoable)`, 'warn', {
        title: 'Shots Adjusted',
        duration: 5200,
        action: { text: 'Undo', onClick: () => undoStoryboardOnce() }
      });
    }
  };

  const clearStoryboardFiles = () => {
    storyboardShots = storyboardShots.map((s) => ({ ...s, fileDataUrl: null, fileName: '' }));
    renderStoryboardShots();
    saveForm();
  };

  // Advanced Settings Collapsing: Ensure editor visible for Multi/Storyboard
  const setAdvancedOpen = (nextOpen, opts = { scroll: false }) => {
    advancedOpen = !!nextOpen;
    try {
      localStorage.setItem(ADV_OPEN_KEY, advancedOpen ? '1' : '0');
    } catch (_) {
      /* ignore */
    }
    if (advancedBox) advancedBox.style.display = advancedOpen ? 'block' : 'none';
    if (btnToggleAdvanced) btnToggleAdvanced.textContent = advancedOpen ? 'Hide Advanced Settings' : 'Show Advanced Settings';
    if (opts && opts.scroll && advancedBox && advancedOpen) {
      try {
        advancedBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (_) {
        /* ignore */
      }
    }
  };

  const toggleBatchTextarea = () => {
    const t = getBatchType();
    const isMulti = t === 'multi_prompt';
    const isStoryboard = t === 'storyboard';
    const isBatchEditor = isMulti || isStoryboard;
    if (isBatchEditor) setAdvancedOpen(true);
    if (batchPromptList) batchPromptList.style.display = 'none';
    if (multiGlobalRolesBar) multiGlobalRolesBar.style.display = isMulti ? 'block' : 'none';
    if (multiPromptList) multiPromptList.style.display = isMulti ? 'flex' : 'none';
    if (storyboardBox) storyboardBox.style.display = isStoryboard ? 'block' : 'none';
    if (multiPromptActions) multiPromptActions.style.display = isBatchEditor ? 'block' : 'none';
    if (btnAddPrompt) btnAddPrompt.textContent = isStoryboard ? 'Add Shot' : 'Add Prompt';
    if (uploadCard) uploadCard.style.display = isBatchEditor ? 'none' : 'flex';
    if (dropzoneWrap) dropzoneWrap.style.display = isBatchEditor ? 'none' : 'block';
    const promptBlock = document.getElementById('promptBlock');
    if (promptBlock) promptBlock.style.display = isBatchEditor ? 'none' : 'block';

    const showConcurrency = t !== 'single';
    const defaultCountFallback = isStoryboard ? 1 : 2;
    if (batchConcurrencyInput) {
      batchConcurrencyInput.disabled = !showConcurrency;
      if (showConcurrency && document.activeElement !== batchConcurrencyInput) {
        const v = normalizeTimes(batchConcurrencyInput.value, defaultCountFallback);
        batchConcurrencyInput.value = String(v);
      }
    }
    if (btnApplyGlobalCountToAll) {
      btnApplyGlobalCountToAll.style.display = isBatchEditor ? 'inline-flex' : 'none';
    }
    if (globalCountLabel) {
      globalCountLabel.textContent = isBatchEditor ? 'Default Copies' : 'Generations';
    }
    if (batchMetaActions) {
      batchMetaActions.style.display = showConcurrency ? 'flex' : 'none';
      batchMetaActions.style.alignItems = 'center';
      batchMetaActions.style.gap = '8px';
    }

    if (isMulti && multiPrompts.length === 0) {
      addMultiPrompt(promptBox.value || '', normalizeTimes(batchConcurrencyInput?.value || '2', 2));
    }
    if (isStoryboard && storyboardShots.length === 0) {
      const n = clampInt(storyboardShotCount?.value || '8', { min: 1, max: 200, fallback: 8 });
      // Enter Storyboard: Pre-fill N inputs
      appendStoryboardShots(Math.max(1, n), { text: '', count: normalizeTimes(batchConcurrencyInput?.value || '1', 1) });
    }
    // Important: Do NOT auto-write back to Main Prompt on exit Multi/Storyboard (Avoid user confusion)
    syncGlobalCountHighlight();
    syncMainUploadUI({ quiet: false });
    renderFilePreview();
    // Mode Switched: Sync Role badges/filters/global area
    renderRoles();
    renderAttachedRoles();
    renderMultiAttachedRoles();
    renderStoryboardAttachedRoles();
    scheduleBatchModeIndicator();
    syncBatchEditorPlanUI();
  };

  const syncGlobalCountHighlight = () => {
    const t = getBatchType();
    if (!batchConcurrencyInput || (t !== 'multi_prompt' && t !== 'storyboard')) {
      batchConcurrencyInput?.classList.remove('select-mismatch');
      if (btnApplyGlobalCountToAll) btnApplyGlobalCountToAll.disabled = true;
      return;
    }
    const fallback = t === 'storyboard' ? 1 : 2;
    const globalVal = normalizeTimes(batchConcurrencyInput.value, fallback);
    if (document.activeElement !== batchConcurrencyInput) batchConcurrencyInput.value = String(globalVal);
    const mismatch =
      t === 'multi_prompt'
        ? multiPrompts.some((p) => (p.count || 0) !== globalVal)
        : storyboardShots.some((s) => (s.count || 0) !== globalVal);
    if (mismatch) batchConcurrencyInput.classList.add('select-mismatch');
    else batchConcurrencyInput.classList.remove('select-mismatch');
    if (btnApplyGlobalCountToAll) btnApplyGlobalCountToAll.disabled = !mismatch;
  };

  const saveForm = () => {
    // Always save default copies for current mode, avoid pollution on switch
    try {
      if (batchConcurrencyInput) rememberBatchConcurrencyForType(getBatchType(), batchConcurrencyInput.value);
    } catch (_) {
      /* ignore */
    }
    const roleSlim = (r) => ({
      display: r.display || r.display_name || r.username || '',
      username: r.username || '',
      avatar: r.avatar || r.avatar_path || ''
    });
    const data = {
      apiKey: $('apiKey').value,
      baseUrl: $('baseUrl').value,
      model: $('model').value,
      prompt: promptBox.value,
      batchPrompts: batchPromptList ? batchPromptList.value : '',
      batchType: getBatchType(),
      batchConcurrency: batchConcurrencyInput.value,
      batchConcurrencyByType,
      multiPrompts: multiPrompts.map((p) => ({ text: p.text || '', count: p.count || 2 })),
      multiPromptRoles: multiPrompts.map((_, idx) => (multiPromptRoles[idx] || []).map(roleSlim)),
      storyboard: {
        title: storyboardTitle ? storyboardTitle.value : '',
        context: storyboardContext ? storyboardContext.value : '',
        sequential: storyboardSequential ? !!storyboardSequential.checked : true,
        shotCount: storyboardShotCount ? storyboardShotCount.value : '8',
        shots: storyboardShots.map((s) => ({
          text: s.text || '',
          count: s.count || 1,
          useGlobalRoles: s.useGlobalRoles !== false,
          roles: (Array.isArray(s.roles) ? s.roles : []).map(roleSlim)
        }))
      }
    };
    localStorage.setItem(formStorageKey, JSON.stringify(data));
    // Fallback: Ensure button state refreshed if data saved but UI lag
    try {
      const bt = getBatchType();
      if (bt === 'multi_prompt' || bt === 'storyboard') scheduleBatchEditorPlanUI();
    } catch (_) {
      /* ignore */
    }
  };

  const loadForm = () => {
    try {
      const data = JSON.parse(localStorage.getItem(formStorageKey) || '{}');

      // Restore "Copies by Mode" map first, needed by setBatchType()
      const hasByType = data.batchConcurrencyByType && typeof data.batchConcurrencyByType === 'object';
      batchConcurrencyByType = hasByType ? data.batchConcurrencyByType : {};
      // Compat Legacy: Storyboard default copies might be 2, revert to 1
      // - Keep if user explicitly changed to non-2
      try {
        if (hasByType && batchConcurrencyByType && batchConcurrencyByType.storyboard !== undefined) {
          const sb = parseInt(String(batchConcurrencyByType.storyboard ?? ''), 10);
          if (!isNaN(sb) && sb === 2) batchConcurrencyByType.storyboard = 1;
        }
      } catch (_) {
        /* ignore */
      }
      const wantType = normalizeBatchType(data.batchType || getBatchType() || 'single');
      // Compat Legacy: Old store had single batchConcurrency (SB=2); Migrating SB=1
      if (!hasByType) {
        const legacy = data.batchConcurrency;
        if (wantType === 'storyboard') {
          const legacyN = parseInt(String(legacy ?? ''), 10);
          // Legacy default 2 -> 1; Unless explicitly changed
          batchConcurrencyByType.storyboard = !isNaN(legacyN) && legacyN !== 2 ? legacyN : 1;
        } else if (legacy !== undefined && legacy !== null && legacy !== '') {
          batchConcurrencyByType[wantType] = legacy;
        }
      }
      if (data.apiKey) $('apiKey').value = data.apiKey;
      if (data.baseUrl) $('baseUrl').value = data.baseUrl;
      if (data.model) $('model').value = data.model;
      if (data.prompt) {
        promptBox.value = data.prompt;
      } else {
        const draft = localStorage.getItem(DRAFT_KEY) || '';
        if (draft) promptBox.value = draft;
      }
      if (batchPromptList && data.batchPrompts) batchPromptList.value = data.batchPrompts;
      if (data.batchType) setBatchType(data.batchType);
      // Sync current mode copies once (Avoid legacy mismatch)
      try {
        const t = normalizeBatchType(data.batchType || getBatchType() || 'single');
        const next = rememberBatchConcurrencyForType(t, batchConcurrencyByType[t] ?? batchConcurrencyInput?.value);
        if (batchConcurrencyInput) batchConcurrencyInput.value = String(next);
        if (quickCountInput && document.activeElement !== quickCountInput) quickCountInput.value = String(next);
      } catch (_) {
        /* ignore */
      }
      if (Array.isArray(data.multiPrompts) && data.multiPrompts.length) {
        const fallback = normalizeTimes(batchConcurrencyInput?.value || '2', 2);
        multiPrompts = data.multiPrompts.map((p) => ({ text: p.text || '', count: normalizeTimes(p.count, fallback) }));
      } else if (batchPromptList && data.batchPrompts) {
        // Compat Legacy: Line-based import
        multiPrompts = data.batchPrompts
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .map((t) => ({ text: t, count: 2 }));
      }
      // Restore Multi-Prompt "Row Roles"
      try {
        if (Array.isArray(data.multiPromptRoles) && data.multiPromptRoles.length) {
          Object.keys(multiPromptRoles).forEach((k) => delete multiPromptRoles[k]);
          data.multiPromptRoles.forEach((arr, idx) => {
            if (Array.isArray(arr) && arr.length) {
              multiPromptRoles[idx] = arr
                .map((r) => ({
                  display: r.display || r.display_name || r.username || '',
                  username: r.username || '',
                  avatar: r.avatar || r.avatar_path || ''
                }))
                .filter((r) => r.display || r.username);
            }
          });
        }
      } catch (_) {
        /* ignore */
      }

      // Restore Storyboard
      try {
        const sb = data.storyboard || {};
        if (storyboardTitle && typeof sb.title === 'string') storyboardTitle.value = sb.title;
        if (storyboardContext && typeof sb.context === 'string') storyboardContext.value = sb.context;
        if (storyboardSequential && typeof sb.sequential === 'boolean') storyboardSequential.checked = sb.sequential;
        if (storyboardShotCount && sb.shotCount) storyboardShotCount.value = String(sb.shotCount);
        if (Array.isArray(sb.shots) && sb.shots.length) {
          storyboardShots = sb.shots.map((s) => ({
            text: s.text || '',
            count: normalizeTimes(s.count, 1),
            fileDataUrl: null,
            fileName: '',
            useGlobalRoles: s.useGlobalRoles === false || s.use_global_roles === false ? false : true,
            roles: Array.isArray(s.roles)
              ? s.roles
                .map((r) => ({
                  display: r.display || r.display_name || r.username || '',
                  username: r.username || '',
                  avatar: r.avatar || r.avatar_path || ''
                }))
                .filter((r) => r.display || r.username)
              : []
          }));
        }
      } catch (_) {
        /* ignore */
      }
      renderMultiPrompts();
      renderStoryboardShots();
      toggleBatchTextarea();
    } catch (_) {
      /* ignore */
    }
  };

  const scheduleDraftSave = () => {
    if (draftTimer) clearTimeout(draftTimer);
    draftTimer = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, promptBox.value || '');
      const hint = $('promptDraftHint');
      if (hint) {
        hint.style.display = 'block';
        setTimeout(() => (hint.style.display = 'none'), 2000);
      }
    }, 10000);
  };

  const handleSend = async () => {
    out.textContent = '';
    const apiKey = $('apiKey').value.trim();
    const model = $('model').value;
    const baseUrl = getBaseUrl();
    const prompt = promptBox.value.trim();
    const files = getMainFiles();
    const batchType = getBatchType();
    const generationCountFallback = batchType === 'storyboard' ? 1 : 2;
    const generationCount = normalizeTimes(batchConcurrencyInput?.value || String(generationCountFallback), generationCountFallback);
    const finalCount = batchType === 'single' ? 1 : generationCount;

    if (!apiKey) {
      showToast('Please enter API Key', 'error', { title: 'Missing API Key', duration: 3200 });
      smoothFocus($('apiKey'));
      return;
    }
    if (!baseUrl) {
      showToast('Please enter Server URL (Base URL)', 'error', { title: 'Missing Server URL', duration: 3200 });
      smoothFocus($('baseUrl'));
      return;
    }

    // Append Role Description on Send (Hidden in UI)
    const roleContext = buildRoleContextText();
    const promptForSend = [roleContext, prompt].filter(Boolean).join('\n\n');

    // ===== Pre-send UX Check (Reduce "Asset ignored" confusion) =====
    const modelInfo = parseModelId(model);
    const hasVideoFile = files.some((f) => (f.type || '').startsWith('video'));
    const hasImageFile = files.some((f) => (f.type || '').startsWith('image'));
    const mixedFiles = hasVideoFile && hasImageFile;

    // Mixed Files: Can cause "Drift/Ignored Asset/Unpredictable Batch"
    if ((batchType === 'single' || batchType === 'same_prompt_files') && files.length && mixedFiles) {
      showToast('Mixed Image+Video detected: Proceeding, but separate runs recommended.', 'warn', {
        title: 'Mixed Assets',
        duration: 4200
      });
    }

    // Image Model + Video File: Video won't be used for Image Gen (Common confusion)
    if ((batchType === 'single' || batchType === 'same_prompt_files') && files.length && modelInfo.isImage && hasVideoFile) {
      showToast('Image Model with Video File: Video ignored for Image Gen (Proceeding)', 'warn', {
        title: 'Model/Asset Mismatch',
        duration: 4200
      });
    }

    // Video Model + Image Frame + Empty Prompt: Common "Irrelevant to Image" trigger
    if ((batchType === 'single' || batchType === 'same_prompt_files') && files.length && modelInfo.isVideo && hasImageFile && !promptForSend) {
      showToast('Image Frame with Empty Prompt: Result may drift (Proceeding)', 'warn', { title: 'Empty Prompt', duration: 4200 });
    }

    const jobs = [];
    if (batchType === 'same_prompt_files') {
      if (!promptForSend && !files.length) {
        showToast('Same Prompt Batch: Enter prompt or select a file', 'warn', { title: 'Cannot Generate', duration: 3600 });
        smoothFocus(promptBox);
        return;
      }
      if (files.length) {
        for (let i = 0; i < finalCount; i++) {
          files.forEach((f) => jobs.push({ promptSend: promptForSend, promptUser: prompt, file: f, model }));
        }
      } else {
        for (let i = 0; i < finalCount; i++) {
          jobs.push({ promptSend: promptForSend, promptUser: prompt, file: null, model });
        }
      }
    } else if (batchType === 'multi_prompt') {
      const defaultCount = generationCount;
      const validPrompts = multiPrompts
        .map((p, idx) => ({
          idx,
          text: (p.text || '').trim(),
          count: normalizeTimes(p.count, defaultCount),
          fileDataUrl: p.fileDataUrl || null,
          fileName: p.fileName || ''
        }))
        .filter((p) => p.text || p.fileDataUrl);
      if (!validPrompts.length) {
        showToast('Multi-Prompt: Add at least one prompt (or file)', 'warn', { title: 'Cannot Generate', duration: 3600 });
        return;
      }
      validPrompts.forEach((p) => {
        const rowRoles = (multiPromptRoles[p.idx] || [])
          .map((r) => (r.username ? `@${r.username}` : `@${r.display}`))
          .filter(Boolean)
          .join(' ');
        const finalPrompt = [roleContext, rowRoles, p.text].filter(Boolean).join('\n\n');
        const times = normalizeTimes(p.count, defaultCount);
        const promptUser = p.text || p.fileName || '(仅素材)';
        for (let i = 0; i < times; i++) {
          jobs.push({ promptSend: finalPrompt, promptUser, file: null, fileDataUrl: p.fileDataUrl, model });
        }
      });
    } else if (batchType === 'storyboard') {
      const sbTitleRaw = (storyboardTitle && storyboardTitle.value ? storyboardTitle.value.trim() : '') || '';
      const sbContext = (storyboardContext && storyboardContext.value ? storyboardContext.value.trim() : '') || '';
      const totalShots = storyboardShots.length || 0;
      if (!totalShots) {
        showToast('Storyboard Empty: Set shot count and apply, or add shot', 'warn', { title: 'Cannot Generate', duration: 3600 });
        return;
      }

      const emptyIdx = [];
      const list = storyboardShots
        .map((s, idx) => ({
          idx,
          idx1: idx + 1,
          text: (s.text || '').trim(),
          count: normalizeTimes(s.count, 1),
          fileDataUrl: s.fileDataUrl || null,
          roles: Array.isArray(s.roles) ? s.roles : [],
          useGlobalRoles: s && s.useGlobalRoles === false ? false : true
        }))
        .filter((x) => {
          const hasAny = !!x.text || !!x.fileDataUrl;
          if (!hasAny) emptyIdx.push(x.idx1);
          return hasAny;
        });

      if (!list.length) {
        showToast('Storyboard: Enter at least one shot prompt (or file)', 'warn', { title: 'Cannot Generate', duration: 3600 });
        return;
      }
      if (emptyIdx.length) {
        const plannedTasks = list.reduce((sum, x) => sum + normalizeTimes(x.count, 1), 0);
        showToast(
          `Skipping ${emptyIdx.length} empty shots (${emptyIdx.slice(0, 12).join(', ')}${emptyIdx.length > 12 ? '...' : ''}), creating ${plannedTasks} tasks`,
          'info',
          { title: 'Skipping Empty Shots', duration: 5200 }
        );
      }

      storyboardRunCounter += 1;
      localStorage.setItem(STORYBOARD_RUN_KEY, String(storyboardRunCounter));
      // Auto-title if empty, avoids unsearchable task pile
      const sbTitle = sbTitleRaw || `Storyboard${storyboardRunCounter}`;
      if (storyboardTitle && !sbTitleRaw) storyboardTitle.value = sbTitle;

      list.forEach((shot) => {
        const rowRoles = shot.roles
          .map((r) => (r.username ? `@${r.username}` : `@${r.display}`))
          .filter(Boolean)
          .join(' ');
        const globalCtx = shot.useGlobalRoles ? roleContext : '';
        const finalPrompt = [globalCtx, sbContext, rowRoles, shot.text].filter(Boolean).join('\n\n');
        const times = normalizeTimes(shot.count, 1);
        const baseLabel = getStoryboardShotLabel(storyboardRunCounter, shot.idx1, totalShots);
        for (let i = 0; i < times; i++) {
          const label = times > 1 ? `${baseLabel}·${i + 1}` : baseLabel;
          jobs.push({
            promptSend: finalPrompt,
            promptUser: shot.text,
            file: null,
            fileDataUrl: shot.fileDataUrl,
            model,
            storyboard: {
              run: storyboardRunCounter,
              idx: shot.idx1,
              total: totalShots,
              title: sbTitle,
              label,
              take: i + 1,
              takes: times
            }
          });
        }
      });
    } else if (batchType === 'character') {
      // Character Mode: Needs video file, logic handled by backend
      if (!files.length) {
        showToast('Character Mode: Please upload a video file', 'warn', { title: 'Missing Video', duration: 3600 });
        return;
      }
      const videoFile = files.find((f) => (f.type || '').startsWith('video'));
      if (!videoFile) {
        showToast('Character Mode: Video file required (Image not supported)', 'warn', { title: 'Invalid File Type', duration: 3600 });
        return;
      }
      // Character Mode: Empty prompt, send video, mark as character task
      jobs.push({
        promptSend: '',
        promptUser: '(Character Creation)',
        file: videoFile,
        model,
        isCharacterCreation: true  // Mark as character creation task
      });
    } else {
      if (!promptForSend && !files.length) {
        showToast('Please enter prompt or upload file', 'warn', { title: 'Cannot Generate', duration: 3600 });
        smoothFocus(promptBox);
        return;
      }
      for (let i = 0; i < finalCount; i++) {
        jobs.push({ promptSend: promptForSend, promptUser: prompt, file: files[0] || null, model });
      }
    }

    // Same Prompt Batch: Confirm "Large Batch" to prevent accidental massive run
    if (batchType === 'same_prompt_files' && jobs.length >= 30) {
      const fileCount = files.length;
      const explain = fileCount
        ? `${fileCount} Files × ${finalCount} Copies = ${jobs.length} Tasks`
        : `Text Only × ${finalCount} Copies = ${jobs.length} Tasks`;
      showToast(`Large Batch: ${explain} (Proceeding)`, 'warn', { title: 'Large Batch Warning', duration: 5200 });
    }

    // Light Notification: Don't auto-switch tab, but offer "View Tasks" button (Non-intrusive)
    if (jobs.length && currentRightTab !== 'tasks') {
      showToast(`Created ${jobs.length} tasks, generating...`, 'info', {
        title: 'Tasks Queued',
        duration: 3600,
        action: { text: 'View Tasks', onClick: () => setRightTab('tasks') }
      });
    }

    // Unlock button immediately after queuing, allow appending tasks
    const setSendBusy = (busy) => {
      [btnSend, btnSendPrimary].filter(Boolean).forEach((b) => {
        b.disabled = !!busy;
        if (busy) b.textContent = `Generating (${jobs.length})...`;
      });
    };
    setSendBusy(true);
    const pool =
      // Storyboard: No sequencing/throttling; start all concurrent
      jobs.length;
    const running = runJobs(jobs, apiKey, baseUrl, pool).catch((e) => log('Error: ' + e.message));
    setSendBusy(false);
    syncSingleSamePlanUI(); // Restore "Predicted Tasks" text on main button
    syncBatchEditorPlanUI(); // Restore "Predicted Tasks" text on batch editor button
    await running;
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Drag/Select File
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      const list = Array.from(e.dataTransfer.files || []);
      setMainFiles(list);
      // Single Mode Drag Multiple: Auto-trim and warn
      ensureMainFilePickerMode(getBatchType(), { quiet: false });
      syncMainUploadUI({ quiet: true });
      renderFilePreview(); // Update preview/hint (Non-blocking)
    }
  });
  fileInput.addEventListener('change', () => {
    if (applyingMainFiles) return;
    // User selected via file picker
    ensureMainFilePickerMode(getBatchType(), { quiet: false });
    syncMainUploadUI({ quiet: true });
    renderFilePreview();
  });

  // File List: Remove individually in Same Prompt Batch
  if (filePreviewList) {
    filePreviewList.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest ? e.target.closest('[data-remove-main-file]') : null;
      if (!btn) return;
      const idx = parseInt(btn.getAttribute('data-remove-main-file'), 10);
      const files = getMainFiles();
      if (isNaN(idx) || idx < 0 || idx >= files.length) return;
      const removed = files[idx];
      files.splice(idx, 1);
      setMainFiles(files);
      syncMainUploadUI({ quiet: true });
      renderFilePreview();
      showToast(`Removed: ${removed?.name || 'File'}`, 'success');
    });
  }
  if (btnClearFiles) {
    btnClearFiles.addEventListener('click', () => {
      setMainFiles([]);
      syncMainUploadUI({ quiet: true });
      renderFilePreview();
      showToast('Files cleared', 'success');
    });
  }

  // Quick Mode Switch: "Single/Same Batch" moved from Advanced to Main Upload
  if (quickModeBar) {
    quickModeBar.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest ? e.target.closest('[data-quick-mode]') : null;
      if (!btn) return;
      const val = btn.getAttribute('data-quick-mode');
      if (!val) return;
      setBatchType(val);
      syncMainUploadUI({ quiet: false });
    });
  }
  if (btnOpenMoreModes) {
    btnOpenMoreModes.addEventListener('click', () => {
      setAdvancedOpen(true, { scroll: true });
    });
  }
  if (btnToggleAdvanced) {
    btnToggleAdvanced.addEventListener('click', () => {
      setAdvancedOpen(!advancedOpen, { scroll: false });
    });
  }

  // Quick Copies (Same Batch): Sync with Advanced batchConcurrencyInput
  const applyQuickCount = (next) => {
    if (!batchConcurrencyInput) return;
    const bt = getBatchType();
    const fallback = bt === 'storyboard' ? 1 : 2;
    const val = normalizeTimes(String(next ?? batchConcurrencyInput.value ?? fallback), fallback);
    batchConcurrencyInput.value = String(val);
    if (quickCountInput && document.activeElement !== quickCountInput) quickCountInput.value = String(val);
    saveForm();
    syncGlobalCountHighlight();
    syncSingleSamePlanUI();
    // Quick copies also affect Multi/Storyboard predicted task count and button availability
    scheduleBatchEditorPlanUI();
  };
  if (quickCountDec) {
    quickCountDec.addEventListener('click', () => {
      const cur = clampInt(quickCountInput?.value || batchConcurrencyInput?.value || '2', { min: 1, max: 9999, fallback: 2 });
      applyQuickCount(cur - 1);
    });
  }
  if (quickCountInc) {
    quickCountInc.addEventListener('click', () => {
      const cur = clampInt(quickCountInput?.value || batchConcurrencyInput?.value || '2', { min: 1, max: 9999, fallback: 2 });
      applyQuickCount(cur + 1);
    });
  }
  if (quickCountInput) {
    quickCountInput.addEventListener('change', () => applyQuickCount(quickCountInput.value));
    quickCountInput.addEventListener('input', () => syncSingleSamePlanUI());
  }

  // Quick Tags
  tagBar.querySelectorAll('[data-snippet]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const snippet = btn.getAttribute('data-snippet');
      const cur = promptBox.value;
      promptBox.value = cur ? `${cur}\n${snippet}` : snippet;
      analyzePromptHints();
      saveForm();
      syncSingleSamePlanUI();
      renderFilePreview();
      scheduleDraftSave();
    });
  });

  // Prompt Change
  promptBox.addEventListener('input', () => {
    analyzePromptHints();
    syncSingleSamePlanUI();
    // Only update "Empty Prompt" hints, don't rebuild objectURL every input
    if (previewHintTimer) clearTimeout(previewHintTimer);
    previewHintTimer = setTimeout(() => renderFilePreview(), 180);
  });
  promptBox.addEventListener('dragover', (e) => e.preventDefault());
  promptBox.addEventListener('drop', (e) => {
    e.preventDefault();
    const text = e.dataTransfer.getData('text/plain');
    if (text) {
      try {
        const obj = JSON.parse(text);
        if (obj.display) {
          handleRoleAttach({
            display: obj.display || obj.display_name || obj.username || '',
            username: obj.username || '',
            avatar: obj.avatar || obj.avatar_path || ''
          }, e);
          return;
        }
      } catch (_) {
        // Ignore non-JSON text
      }
    }
  });

  // Role Card Mount Area
  const renderAttachedRoles = () => {
    attachedRolesBox.innerHTML =
      attachedRoles
        .map(
          (r, idx) =>
            `<span class="chip" data-attached="${idx}" draggable="true" style="display:inline-flex;align-items:center;gap:6px;">
                ${r.avatar ? `<img src="${r.avatar}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;">` : ''}
                @${escapeHtml(r.display || r.username || 'Role')}
                <button class="chip-close" type="button" aria-label="Remove Role" title="Remove" style="margin-left:6px;cursor:pointer;border:none;background:transparent;font-weight:600;color:#64748b;line-height:1;">×</button>
             </span>`
        )
        .join('') || '';

    // Clear All: Disable if empty to avoid confusion
    if (btnClearMainRoles) {
      const has = Array.isArray(attachedRoles) && attachedRoles.length > 0;
      btnClearMainRoles.disabled = !has;
      btnClearMainRoles.style.opacity = has ? '1' : '0.55';
    }
    attachedRolesBox.querySelectorAll('[data-attached]').forEach((el) => {
      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', el.getAttribute('data-attached'));
      });
      el.addEventListener('dragover', (e) => e.preventDefault());
      el.addEventListener('drop', (e) => {
        e.preventDefault();
        const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const to = parseInt(el.getAttribute('data-attached'), 10);
        if (isNaN(from) || isNaN(to) || from === to) return;
        const tmp = attachedRoles[from];
        attachedRoles.splice(from, 1);
        attachedRoles.splice(to, 0, tmp);
        renderAttachedRoles();
        persistRoles();
      });
    });
    attachedRolesBox.querySelectorAll('.chip-close').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const chip = btn.closest('[data-attached]');
        if (!chip) return;
        const idx = parseInt(chip.getAttribute('data-attached'), 10);
        attachedRoles.splice(idx, 1);
        renderAttachedRoles();
        persistRoles();
        renderRoles();
      });
    });
    // Role mount changes promptForSend, affecting "Ready / Predicted Tasks"
    syncSingleSamePlanUI();
  };

  // Multi-Prompt Mode: Global Roles (Won't affect Single/Same)
  const renderMultiAttachedRoles = () => {
    if (!multiAttachedRolesBox) return;
    multiAttachedRolesBox.innerHTML =
      attachedRolesMulti
        .map(
          (r, idx) =>
            `<span class="chip" data-multi-attached="${idx}" style="display:inline-flex;align-items:center;gap:6px;">
                ${r.avatar ? `<img src="${r.avatar}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;">` : ''}
                @${escapeHtml(r.display || r.username || 'Role')}
                <button class="chip-close" type="button" aria-label="Remove Role" title="Remove" style="margin-left:6px;cursor:pointer;border:none;background:transparent;font-weight:600;color:#64748b;line-height:1;">×</button>
             </span>`
        )
        .join('') || '';

    multiAttachedRolesBox.querySelectorAll('.chip-close').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const chip = btn.closest('[data-multi-attached]');
        if (!chip) return;
        const idx = parseInt(chip.getAttribute('data-multi-attached'), 10);
        if (isNaN(idx)) return;
        attachedRolesMulti.splice(idx, 1);
        renderMultiAttachedRoles();
        persistRolesMulti();
        renderRoles();
      });
    });

    // Sync role display under each row (Avoid "Global mounted but invisible in row" illusion)
    renderMultiPromptRoleChipsOnly();
    // Fallback: Ensure button state recalculated
    scheduleBatchEditorPlanUI();
    // Fallback again: rAF might be throttled, sync once to prevent "Gray button stuck"
    try {
      syncBatchEditorPlanUI();
    } catch (_) {
      /* ignore */
    }
  };

  // Storyboard Mode: Global Roles (Won't affect Single/Same)
  const renderStoryboardAttachedRoles = () => {
    if (!storyboardAttachedRolesBox) return;
    storyboardAttachedRolesBox.innerHTML =
      attachedRolesStoryboard
        .map(
          (r, idx) =>
            `<span class="chip" data-sb-attached="${idx}" style="display:inline-flex;align-items:center;gap:6px;">
                ${r.avatar ? `<img src="${r.avatar}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;">` : ''}
                @${escapeHtml(r.display || r.username || 'Role')}
                <button class="chip-close" type="button" aria-label="Remove Role" title="Remove" style="margin-left:6px;cursor:pointer;border:none;background:transparent;font-weight:600;color:#64748b;line-height:1;">×</button>
             </span>`
        )
        .join('') || '';

    storyboardAttachedRolesBox.querySelectorAll('.chip-close').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const chip = btn.closest('[data-sb-attached]');
        if (!chip) return;
        const idx = parseInt(chip.getAttribute('data-sb-attached'), 10);
        if (isNaN(idx)) return;
        attachedRolesStoryboard.splice(idx, 1);
        renderStoryboardAttachedRoles();
        persistRolesStoryboard();
        renderRoles();
      });
    });

    // Critical: Sync role display under each shot after global change
    renderStoryboardRoleChipsOnly();
    // Fallback: Global role switch shouldn't block "Generate", but force refresh button state
    scheduleBatchEditorPlanUI();
    // Fallback again: rAF throttled, sync once
    try {
      syncBatchEditorPlanUI();
    } catch (_) {
      /* ignore */
    }
  };

  const addAttachedRole = (roleObj) => {
    if (!roleObj || (!roleObj.display && !roleObj.username)) return;
    const u = roleObj.username || '';
    const d = roleObj.display || '';
    if (attachedRoles.find((r) => (u && r.username === u) || (!u && d && r.display === d))) return;
    attachedRoles.push(roleObj);
    markRoleUsed(u);
    renderAttachedRoles();
    persistRoles();
    renderRoles(); // Sync "Mounted" badge / filter stats
  };

  const addAttachedRoleMulti = (roleObj) => {
    if (!roleObj || (!roleObj.display && !roleObj.username)) return;
    const u = String(roleObj.username || '').trim();
    const d = String(roleObj.display || '').trim();
    if (attachedRolesMulti.find((r) => (u && String(r.username || '').trim() === u) || (!u && d && String(r.display || '').trim() === d)))
      return;
    attachedRolesMulti.push(roleObj);
    markRoleUsed(u);
    renderMultiAttachedRoles();
    persistRolesMulti();
    renderRoles();
  };

  const removeAttachedRoleMulti = (roleObj) => {
    const u = String(roleObj?.username || '').trim();
    const d = String(roleObj?.display || '').trim();
    const next = attachedRolesMulti.filter((r) => {
      const ru = String(r?.username || '').trim();
      const rd = String(r?.display || '').trim();
      if (u) return ru !== u;
      return d ? rd !== d : true;
    });
    const changed = next.length !== attachedRolesMulti.length;
    if (changed) {
      attachedRolesMulti = next;
      renderMultiAttachedRoles();
      persistRolesMulti();
      renderRoles();
    }
    return changed;
  };

  const toggleAttachedRoleMulti = (roleObj) => {
    const u = String(roleObj?.username || '').trim();
    const exists = u
      ? attachedRolesMulti.some((r) => String(r?.username || '').trim() === u)
      : attachedRolesMulti.some((r) => String(r?.display || '').trim() === String(roleObj?.display || '').trim());
    if (exists) return !removeAttachedRoleMulti(roleObj);
    addAttachedRoleMulti(roleObj);
    return true;
  };

  const addAttachedRoleStoryboard = (roleObj) => {
    if (!roleObj || (!roleObj.display && !roleObj.username)) return;
    const u = String(roleObj.username || '').trim();
    const d = String(roleObj.display || '').trim();
    if (
      attachedRolesStoryboard.find((r) => (u && String(r.username || '').trim() === u) || (!u && d && String(r.display || '').trim() === d))
    )
      return;
    attachedRolesStoryboard.push(roleObj);
    markRoleUsed(u);
    renderStoryboardAttachedRoles();
    persistRolesStoryboard();
    renderRoles();
  };

  const removeAttachedRoleStoryboard = (roleObj) => {
    const u = String(roleObj?.username || '').trim();
    const d = String(roleObj?.display || '').trim();
    const next = attachedRolesStoryboard.filter((r) => {
      const ru = String(r?.username || '').trim();
      const rd = String(r?.display || '').trim();
      if (u) return ru !== u;
      return d ? rd !== d : true;
    });
    const changed = next.length !== attachedRolesStoryboard.length;
    if (changed) {
      attachedRolesStoryboard = next;
      renderStoryboardAttachedRoles();
      persistRolesStoryboard();
      renderRoles();
    }
    return changed;
  };

  const toggleAttachedRoleStoryboard = (roleObj) => {
    const u = String(roleObj?.username || '').trim();
    const exists = u
      ? attachedRolesStoryboard.some((r) => String(r?.username || '').trim() === u)
      : attachedRolesStoryboard.some((r) => String(r?.display || '').trim() === String(roleObj?.display || '').trim());
    if (exists) return !removeAttachedRoleStoryboard(roleObj);
    addAttachedRoleStoryboard(roleObj);
    return true;
  };

  const addRoleToRow = (idx, roleObj) => {
    if (idx === null || idx === undefined || idx < 0 || !multiPrompts[idx]) return;
    const list = multiPromptRoles[idx] || [];
    if (list.find((r) => r.display === roleObj.display && r.username === roleObj.username)) return;
    list.push(roleObj);
    multiPromptRoles[idx] = list;
    markRoleUsed(roleObj?.username || '');
    renderMultiPromptRoleChipsOnly();
    renderRoles();
    saveForm();
  };

  const removeRoleFromRow = (idx, roleObj) => {
    if (idx === null || idx === undefined || idx < 0 || !multiPrompts[idx]) return false;
    const list = multiPromptRoles[idx] || [];
    const u = String(roleObj?.username || '').trim();
    const d = String(roleObj?.display || '').trim();
    const next = list.filter((r) => {
      const ru = String(r?.username || '').trim();
      const rd = String(r?.display || '').trim();
      if (u) return ru !== u;
      return d ? rd !== d : true;
    });
    const changed = next.length !== list.length;
    if (changed) {
      multiPromptRoles[idx] = next;
      renderMultiPromptRoleChipsOnly();
      renderRoles();
      saveForm();
    }
    return changed;
  };

  const toggleRoleOnRow = (idx, roleObj) => {
    const list = multiPromptRoles[idx] || [];
    const u = String(roleObj?.username || '').trim();
    const exists = u ? list.some((r) => String(r?.username || '').trim() === u) : list.some((r) => (r?.display || '') === roleObj?.display);
    if (exists) {
      removeRoleFromRow(idx, roleObj);
      return false;
    }
    addRoleToRow(idx, roleObj);
    return true;
  };

  const addRoleToStoryboardShot = (idx, roleObj) => {
    if (idx === null || idx === undefined || idx < 0 || !storyboardShots[idx]) return;
    const s = storyboardShots[idx];
    const list = Array.isArray(s.roles) ? s.roles : [];
    if (list.find((r) => r.display === roleObj.display && r.username === roleObj.username)) return;
    list.push(roleObj);
    storyboardShots[idx] = { ...s, roles: list };
    markRoleUsed(roleObj?.username || '');
    renderStoryboardRoleChipsOnly();
    renderRoles();
    saveForm();
  };

  const removeRoleFromStoryboardShot = (idx, roleObj) => {
    if (idx === null || idx === undefined || idx < 0 || !storyboardShots[idx]) return false;
    const s = storyboardShots[idx];
    const list = Array.isArray(s.roles) ? s.roles : [];
    const u = String(roleObj?.username || '').trim();
    const d = String(roleObj?.display || '').trim();
    const next = list.filter((r) => {
      const ru = String(r?.username || '').trim();
      const rd = String(r?.display || '').trim();
      if (u) return ru !== u;
      return d ? rd !== d : true;
    });
    const changed = next.length !== list.length;
    if (changed) {
      storyboardShots[idx] = { ...s, roles: next };
      renderStoryboardRoleChipsOnly();
      renderRoles();
      saveForm();
    }
    return changed;
  };

  const toggleRoleOnStoryboardShot = (idx, roleObj) => {
    const s = storyboardShots[idx];
    const list = (s && Array.isArray(s.roles) ? s.roles : []) || [];
    const u = String(roleObj?.username || '').trim();
    const exists = u ? list.some((r) => String(r?.username || '').trim() === u) : list.some((r) => (r?.display || '') === roleObj?.display);
    if (exists) {
      removeRoleFromStoryboardShot(idx, roleObj);
      return false;
    }
    addRoleToStoryboardShot(idx, roleObj);
    return true;
  };

  const showRoleTargetMenu = (roleObj, clientX, clientY) => {
    const menu = document.createElement('div');
    menu.className = 'role-target-menu';
    menu.style.position = 'fixed';
    menu.style.zIndex = 9999;
    menu.style.background = '#0f172a';
    menu.style.color = '#fff';
    menu.style.border = '1px solid #1e293b';
    menu.style.borderRadius = '10px';
    menu.style.padding = '8px';
    menu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
    menu.style.minWidth = '160px';
    menu.style.left = `${clientX}px`;
    menu.style.top = `${clientY}px`;
    const makeBtn = (label, handler) => {
      const b = document.createElement('button');
      b.textContent = label;
      b.style.width = '100%';
      b.style.textAlign = 'left';
      b.style.background = 'transparent';
      b.style.color = '#fff';
      b.style.border = 'none';
      b.style.padding = '6px 8px';
      b.style.cursor = 'pointer';
      b.onmouseenter = () => (b.style.background = 'rgba(255,255,255,0.08)');
      b.onmouseleave = () => (b.style.background = 'transparent');
      b.onclick = () => {
        handler();
        renderRoles();
        document.body.removeChild(menu);
      };
      return b;
    };
    const bt = getBatchType();
    const uname = String(roleObj?.username || '').trim();

    // "Global (This Mode)": For consistency, avoiding pollution of Single/Same
    if (bt === 'multi_prompt') {
      const inGlobal = uname ? attachedRolesMulti.some((r) => String(r?.username || '').trim() === uname) : false;
      menu.appendChild(
        makeBtn(inGlobal ? '全局（本模式）：已挂载（点此取消）' : '全局（本模式）：挂载到所有提示', () => toggleAttachedRoleMulti(roleObj))
      );
      menu.appendChild(makeBtn('—— Mount to Row ——', () => { })).disabled = true;
      multiPrompts.forEach((p, idx) => {
        const row = multiPromptRoles[idx] || [];
        const inRow = uname ? row.some((r) => String(r?.username || '').trim() === uname) : false;
        menu.appendChild(makeBtn(inRow ? `Prompt ${idx + 1}: Mounted (Click to Remove)` : `Prompt ${idx + 1}`, () => toggleRoleOnRow(idx, roleObj)));
      });
    } else if (bt === 'storyboard') {
      const inGlobal = uname ? attachedRolesStoryboard.some((r) => String(r?.username || '').trim() === uname) : false;
      menu.appendChild(
        makeBtn(inGlobal ? 'Global (Mode): Mounted (Click to Remove)' : 'Global (Mode): Mount to All Shots', () =>
          toggleAttachedRoleStoryboard(roleObj)
        )
      );
      menu.appendChild(makeBtn('—— Mount to Shot ——', () => { })).disabled = true;
      storyboardShots.forEach((s, idx) => {
        const roles = (s && Array.isArray(s.roles) ? s.roles : []) || [];
        const inShot = uname ? roles.some((r) => String(r?.username || '').trim() === uname) : false;
        menu.appendChild(
          makeBtn(inShot ? `Shot ${idx + 1}: Mounted (Click to Remove)` : `Shot ${idx + 1}`, () => toggleRoleOnStoryboardShot(idx, roleObj))
        );
      });
    } else {
      // Fallback: Non-batch mode shouldn't reach here; mount to main prompt
      menu.appendChild(makeBtn('Mount to Prompt Below', () => addAttachedRole(roleObj)));
    }
    document.body.appendChild(menu);
    const dismiss = (e) => {
      if (!menu.contains(e.target)) {
        document.body.removeChild(menu);
        document.removeEventListener('mousedown', dismiss);
      }
    };
    setTimeout(() => document.addEventListener('mousedown', dismiss), 0);
  };

  const handleRoleAttach = (roleObj, event, targetIdx = null) => {
    const bt = getBatchType();
    if (bt !== 'multi_prompt' && bt !== 'storyboard') {
      addAttachedRole(roleObj);
      return;
    }
    if (targetIdx !== null) {
      if (bt === 'multi_prompt') addRoleToRow(targetIdx, roleObj);
      else addRoleToStoryboardShot(targetIdx, roleObj);
      return;
    }
    const { clientX = window.innerWidth / 2, clientY = window.innerHeight / 2 } = event || {};
    showRoleTargetMenu(roleObj, clientX, clientY);
  };

  const safeParse = (raw, fallback) => {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  };

  const loadRoleUiFromStorage = () => {
    const v = safeParse(localStorage.getItem(ROLE_UI_KEY) || '', null);
    if (!v || typeof v !== 'object') return;
    if (typeof v.query === 'string') roleUi.query = v.query;
    if (typeof v.filter === 'string') roleUi.filter = v.filter;
    if (typeof v.sort === 'string') roleUi.sort = v.sort;
    if (typeof v.dense === 'boolean') roleUi.dense = v.dense;
  };

  const saveRoleUiToStorage = () => {
    try {
      localStorage.setItem(
        ROLE_UI_KEY,
        JSON.stringify({
          query: roleUi.query || '',
          filter: roleUi.filter || 'all',
          sort: roleUi.sort || 'smart',
          dense: !!roleUi.dense
        })
      );
    } catch (_) {
      /* ignore */
    }
  };

  const loadRoleFavsFromStorage = () => {
    const arr = safeParse(localStorage.getItem(ROLE_FAV_KEY) || '[]', []);
    roleFavs = new Set(Array.isArray(arr) ? arr.filter(Boolean).map((x) => String(x)) : []);
  };

  const saveRoleFavsToStorage = () => {
    try {
      localStorage.setItem(ROLE_FAV_KEY, JSON.stringify(Array.from(roleFavs.values())));
    } catch (_) {
      /* ignore */
    }
  };

  const loadRoleUsedFromStorage = () => {
    const obj = safeParse(localStorage.getItem(ROLE_USED_KEY) || '{}', {});
    roleUsed = obj && typeof obj === 'object' ? obj : {};
  };

  const saveRoleUsedToStorage = () => {
    try {
      localStorage.setItem(ROLE_USED_KEY, JSON.stringify(roleUsed || {}));
    } catch (_) {
      /* ignore */
    }
  };

  const markRoleUsed = (username) => {
    const u = String(username || '').trim();
    if (!u) return;
    roleUsed[u] = Date.now();
    saveRoleUsedToStorage();
  };

  const isRoleAttachedMain = (username) => {
    const u = String(username || '').trim();
    if (!u) return false;
    return attachedRoles.some((r) => String(r?.username || '').trim() === u);
  };

  const isRoleAttachedMultiGlobal = (username) => {
    const u = String(username || '').trim();
    if (!u) return false;
    return attachedRolesMulti.some((r) => String(r?.username || '').trim() === u);
  };

  const isRoleAttachedStoryboardGlobal = (username) => {
    const u = String(username || '').trim();
    if (!u) return false;
    return attachedRolesStoryboard.some((r) => String(r?.username || '').trim() === u);
  };

  const isRoleAttachedInAnyMultiRow = (username) => {
    const u = String(username || '').trim();
    if (!u) return false;
    return Object.values(multiPromptRoles || {}).some((arr) => Array.isArray(arr) && arr.some((r) => String(r?.username || '').trim() === u));
  };

  const isRoleAttachedInAnyStoryboardShot = (username) => {
    const u = String(username || '').trim();
    if (!u) return false;
    return storyboardShots.some((s) => Array.isArray(s?.roles) && s.roles.some((r) => String(r?.username || '').trim() === u));
  };

  const isRoleAttachedInCurrentMode = (username) => {
    const bt = getBatchType();
    if (bt === 'multi_prompt') return isRoleAttachedMultiGlobal(username) || isRoleAttachedInAnyMultiRow(username);
    if (bt === 'storyboard') return isRoleAttachedStoryboardGlobal(username) || isRoleAttachedInAnyStoryboardShot(username);
    // Single/Same Prompt
    return isRoleAttachedMain(username);
  };

  const syncRoleFilterButtons = () => {
    if (!roleFilterBar) return;
    const btns = Array.from(roleFilterBar.querySelectorAll('[data-role-filter]'));
    btns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-role-filter') === roleUi.filter));
  };

  const syncRoleClearButton = () => {
    if (!roleSearchClear || !roleSearch) return;
    roleSearchClear.classList.toggle('show', !!roleSearch.value.trim());
  };

  const syncRoleDenseButton = () => {
    if (!btnRoleDense || !roleList) return;
    btnRoleDense.classList.toggle('active', !!roleUi.dense);
    btnRoleDense.textContent = roleUi.dense ? 'Compact ✓' : 'Compact';
    roleList.classList.toggle('dense', !!roleUi.dense);
  };

  const syncRoleSortSelect = () => {
    if (!roleSort) return;
    roleSort.value = roleUi.sort || 'smart';
  };

  const syncRoleCount = (visible, total) => {
    if (!roleCountEl) return;
    if (!total) roleCountEl.textContent = '0';
    else if (visible === total && !roleUi.query && (roleUi.filter === 'all' || !roleUi.filter))
      roleCountEl.textContent = `Total ${total}`;
    else roleCountEl.textContent = `Shown ${visible}/${total}`;
  };

  const renderRoleSkeleton = (n = 6) => {
    if (!roleList) return;
    roleList.setAttribute('aria-busy', 'true');
    roleList.innerHTML = Array.from({ length: n })
      .map(
        () =>
          `<div class="role-card role-skeleton" aria-hidden="true">
            <div class="role-avatar" style="background:#e2e8f0;border-color:rgba(148,163,184,0.55);"></div>
            <div class="role-meta">
              <div style="height:14px;width:68%;background:#e2e8f0;border-radius:8px;"></div>
              <div style="height:12px;width:46%;background:#e2e8f0;border-radius:8px;margin-top:8px;"></div>
              <div style="height:12px;width:86%;background:#e2e8f0;border-radius:8px;margin-top:10px;"></div>
              <div style="height:30px;width:100%;background:#e2e8f0;border-radius:12px;margin-top:12px;"></div>
            </div>
          </div>`
      )
      .join('');
    if (roleCountEl) roleCountEl.textContent = 'Loading...';
    notifyHeight();
  };

  const getRoleDisplayName = (r) => {
    const a = String(r?.display_name || '').trim();
    const b = String(r?.username || '').trim();
    return a || b || 'Role';
  };

  const normalizeKeyword = (raw) => {
    const s = String(raw || '').trim().toLowerCase();
    return s.replace(/^@+/, '');
  };

  const renderRoles = () => {
    if (!roleList) return;
    roleList.setAttribute('aria-busy', 'false');

    // UI Sync (Avoid external state mismatch)
    syncRoleFilterButtons();
    syncRoleDenseButton();
    syncRoleClearButton();
    syncRoleSortSelect();

    const all = Array.isArray(roles) ? roles : [];
    const total = all.length;
    const keyword = normalizeKeyword(roleSearch?.value || roleUi.query || '');

    // Filter: Keyword + Filter
    let list = all.filter((r) => {
      if (!keyword) return true;
      const hay = [
        getRoleDisplayName(r),
        r?.username ? '@' + r.username : '',
        r?.cameo_id || '',
        r?.character_id || '',
        r?.description || '',
        r?.bio || ''
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(keyword);
    });

    if (roleUi.filter === 'attached') {
      list = list.filter((r) => isRoleAttachedInCurrentMode(r?.username || ''));
    } else if (roleUi.filter === 'fav') {
      list = list.filter((r) => roleFavs.has(String(r?.username || '').trim()));
    }

    // Sort
    const byName = (a, b) =>
      getRoleDisplayName(a).localeCompare(getRoleDisplayName(b), 'en', { numeric: true, sensitivity: 'base' });
    const byCreatedDesc = (a, b) => (Date.parse(b?.created_at || '') || 0) - (Date.parse(a?.created_at || '') || 0);
    const byCreatedAsc = (a, b) => -byCreatedDesc(a, b);

    if (roleUi.sort === 'newest') list.sort(byCreatedDesc);
    else if (roleUi.sort === 'oldest') list.sort(byCreatedAsc);
    else if (roleUi.sort === 'name_asc') list.sort(byName);
    else if (roleUi.sort === 'name_desc') list.sort((a, b) => -byName(a, b));
    else {
      // smart: Fav > Recent > Created > Name
      list.sort((a, b) => {
        const ua = String(a?.username || '').trim();
        const ub = String(b?.username || '').trim();
        const fa = roleFavs.has(ua) ? 1 : 0;
        const fb = roleFavs.has(ub) ? 1 : 0;
        if (fa !== fb) return fb - fa;
        const la = roleUsed[ua] || 0;
        const lb = roleUsed[ub] || 0;
        if (la !== lb) return lb - la;
        const ca = Date.parse(a?.created_at || '') || 0;
        const cb = Date.parse(b?.created_at || '') || 0;
        if (ca !== cb) return cb - ca;
        return byName(a, b);
      });
    }

    syncRoleCount(list.length, total);

    if (!total) {
      roleList.innerHTML = `
        <div class="role-empty">
          <div class="title">No Role Cards</div>
          <div class="desc">Create role cards in Admin/Creation Flow, then click "Reload" here.</div>
          <div class="actions">
            <button class="pill-btn" type="button" data-role-action="reload">Reload</button>
          </div>
        </div>
      `;
      notifyHeight();
      return;
    }

    if (!list.length) {
      const parts = [];
      if (keyword) parts.push('No search results');
      if (roleUi.filter === 'attached') parts.push('No "Mounted" roles');
      if (roleUi.filter === 'fav') parts.push('No "Favorites" roles');
      const tip = parts.length ? parts.join(', ') : 'No matching roles';
      roleList.innerHTML = `
        <div class="role-empty">
          <div class="title">${escapeHtml(tip)}</div>
          <div class="desc">Clear search / Switch to "All", or Reload.</div>
          <div class="actions">
            ${keyword ? '<button class="pill-btn" type="button" data-role-action="clear-search">Clear Search</button>' : ''}
            ${roleUi.filter !== 'all' ? '<button class="pill-btn" type="button" data-role-action="show-all">Show All</button>' : ''}
            <button class="pill-btn" type="button" data-role-action="reload">Reload</button>
          </div>
        </div>
      `;
      notifyHeight();
      return;
    }

    const bt = getBatchType();
    const isBatch = bt === 'multi_prompt' || bt === 'storyboard';

    roleList.innerHTML = list
      .map((r) => {
        const username = String(r?.username || '').trim();
        const display = getRoleDisplayName(r);
        const full = String(r?.description || r?.bio || '').trim();
        const text = full ? full.replace(/\s+/g, ' ') : 'No description';
        const short = text.length > 88 ? text.slice(0, 88) + '…' : text;
        const avatar = String(r?.avatar_path || '').trim();
        const avatarSrc = avatar || DEFAULT_ROLE_AVATAR;
        const fav = username && roleFavs.has(username);
        const attached = username && isRoleAttachedInCurrentMode(username);

        const cameo = String(r?.cameo_id || '').trim();
        const cameoShort = cameo ? (cameo.length > 14 ? cameo.slice(0, 14) + '…' : cameo) : '';
        const charId = String(r?.character_id || '').trim();
        const charShort = charId ? (charId.length > 14 ? charId.slice(0, 14) + '…' : charId) : '';

        const roleData = {
          id: r?.id || null,
          display,
          username,
          avatar,
          desc: short,
          full: full || short,
          cameo_id: cameo,
          character_id: charId,
          created_at: r?.created_at || ''
        };
        const roleJson = encodeURIComponent(JSON.stringify(roleData));

        const chips = [
          cameo
            ? `<button class="role-chip" type="button" data-role-action="copy" data-copy="${escapeAttr(cameo)}" title="Copy cameo_id: ${escapeAttr(cameo)}">cameo: ${escapeHtml(cameoShort)}</button>`
            : '',
          charId
            ? `<button class="role-chip" type="button" data-role-action="copy" data-copy="${escapeAttr(charId)}" title="Copy character_id: ${escapeAttr(charId)}">char: ${escapeHtml(charShort)}</button>`
            : ''
        ].join('');

        return `
          <div class="role-card ${attached ? 'attached' : ''} ${fav ? 'fav' : ''}" draggable="true" data-role="${roleJson}" title="${escapeAttr(full || short || display)}">
            <button class="role-star ${fav ? 'fav' : ''}" type="button" data-role-action="fav" aria-label="${fav ? 'Unfavorite' : 'Favorite'}" title="${fav ? 'Unfavorite' : 'Favorite'}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
            </button>
            <img class="role-avatar" src="${escapeAttr(avatarSrc)}" alt="${escapeAttr(display)}" loading="lazy">
            <div class="role-meta">
              <div class="role-top">
                <div class="role-name">${escapeHtml(display)}</div>
                ${attached ? '<span class="role-badge attached" title="Mounted in current mode">Mounted</span>' : ''}
              </div>
              <div class="role-username">${username ? '@' + escapeHtml(username) : ''}</div>
              <div class="role-desc">${escapeHtml(short)}</div>
              ${chips ? `<div class="role-chips">${chips}</div>` : ''}
              <div class="role-actions">
                <button class="pill-btn role-attach ${attached ? 'active' : ''}" type="button" data-role-action="attach" title="${isBatch ? 'Mount to Mode (Global/Row/Shot)' : attached ? 'Unmount' : 'Mount to Prompt'}">${isBatch ? 'Mount' : attached ? 'Unmount' : 'Mount'}</button>
                <button class="pill-btn role-copy" type="button" data-role-action="copy-username">Copy @username</button>
                <button class="pill-btn role-delete" type="button" data-role-action="delete" style="color:#ef4444;" title="Delete Role">Delete</button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    notifyHeight();
  };

  const parseRoleFromCard = (cardEl) => {
    try {
      const raw = cardEl?.getAttribute ? cardEl.getAttribute('data-role') : '';
      return raw ? JSON.parse(decodeURIComponent(raw)) : null;
    } catch (_) {
      return null;
    }
  };

  const loadRoles = async () => {
    renderRoleSkeleton(6);
    try {
      // Load roles from localStorage
      const stored = localStorage.getItem('character_cards');
      const data = stored ? JSON.parse(stored) : [];
      roles = Array.isArray(data) ? data : [];
    } catch (e) {
      roles = [];
      log('Failed to load role cards');
    }
    renderRoles();
  };

  // Auto-reload roles on baseUrl input: Avoid interaction gap
  // - input: Debounce
  // - change: Immediate trigger (Paste/Enter)
  let rolesAutoReloadTimer = null;
  let rolesAutoReloadLastBaseUrl = '';
  const scheduleLoadRoles = (opts = { force: false }) => {
    const force = !!(opts && opts.force);
    if (rolesAutoReloadTimer) clearTimeout(rolesAutoReloadTimer);
    rolesAutoReloadTimer = setTimeout(
      () => {
        rolesAutoReloadTimer = null;
        const baseUrl = getBaseUrl();
        // Don't nag when baseUrl incomplete (Avoid frequent toasts during typing)
        if (!baseUrl || baseUrl.length < 8 || !/^https?:\/\//i.test(baseUrl)) return;
        if (!force && baseUrl === rolesAutoReloadLastBaseUrl) return;
        rolesAutoReloadLastBaseUrl = baseUrl;
        loadRoles();
      },
      force ? 80 : 800
    );
  };

  const initRoleUi = () => {
    loadRoleUiFromStorage();
    loadRoleFavsFromStorage();
    loadRoleUsedFromStorage();
    if (roleSearch) roleSearch.value = roleUi.query || '';
    syncRoleFilterButtons();
    syncRoleDenseButton();
    syncRoleClearButton();
    syncRoleSortSelect();
  };

  // Event Binding
  rightTabButtons.forEach((btn) =>
    btn.addEventListener('click', () => setRightTab(btn.getAttribute('data-tab')))
  );
  if (previewFilterBar) {
    previewFilterBar.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest ? e.target.closest('[data-preview-filter]') : null;
      if (!btn) return;
      setPreviewFilter(btn.getAttribute('data-preview-filter') || 'all', { toast: false });
    });
  }
  // Preview: Batch Download (Current Filter)
  let previewBatchDownloading = false;
  if (btnPreviewBatchDownload) {
    btnPreviewBatchDownload.addEventListener('click', async (e) => {
      if (previewBatchDownloading) return;

      // Download "Visible Filtered" results only: User can switch filter first
      const fullList = (Array.isArray(tasks) ? tasks : []).filter((t) => t && t.url && isValidMediaUrl(t.url));
      const filtered = fullList.filter((t) => taskMatchesPreviewFilter(t, previewFilter));
      // URL Dedup: Avoid duplicate download
      const seen = new Set();
      const list = [];
      filtered.forEach((t) => {
        const u = String(t.url || '');
        if (!u || seen.has(u)) return;
        seen.add(u);
        list.push(t);
      });

      if (!list.length) {
        showToast('No downloadable results under current filter', 'warn', { title: 'Batch Download' });
        return;
      }

      // Sort: Storyboard shot/take first, others by task ID
      const sorted = list.slice().sort((a, b) => {
        const sa = a && a.storyboard ? a.storyboard : null;
        const sb = b && b.storyboard ? b.storyboard : null;
        if (sa || sb) {
          const runA = sa ? parseInt(String(sa.run || '0'), 10) || 0 : 0;
          const runB = sb ? parseInt(String(sb.run || '0'), 10) || 0 : 0;
          if (runA !== runB) return runA - runB;
          const idxA = sa ? parseInt(String(sa.idx || '0'), 10) || 0 : 0;
          const idxB = sb ? parseInt(String(sb.idx || '0'), 10) || 0 : 0;
          if (idxA !== idxB) return idxA - idxB;
          const takeA = sa ? parseInt(String(sa.take || '0'), 10) || 0 : 0;
          const takeB = sb ? parseInt(String(sb.take || '0'), 10) || 0 : 0;
          if (takeA !== takeB) return takeA - takeB;
        }
        const idA = a && typeof a.id === 'number' ? a.id : 0;
        const idB = b && typeof b.id === 'number' ? b.id : 0;
        return idA - idB;
      });

      const n = sorted.length;
      const wantDirectMulti = !!(e && e.shiftKey); // Shift+Click => multi-files
      showToast(
        wantDirectMulti
          ? `Triggering ${n} downloads (Allow "Multiple file downloads" if prompted).`
          : `Packing ${n} results into 1 ZIP (Better for IDM/Interceptors, friendly filenames).`,
        'info',
        { title: wantDirectMulti ? 'Multi-File DL' : 'ZIP Pack', duration: n >= 12 ? 5200 : 4200 }
      );

      previewBatchDownloading = true;
      const oldText = btnPreviewBatchDownload.textContent || 'Batch DL';
      btnPreviewBatchDownload.setAttribute('data-loading', '1');
      btnPreviewBatchDownload.textContent = wantDirectMulti ? `Downloading(${n})...` : `Packing(${n})...`;

      let okCount = 0;
      try {
        if (wantDirectMulti) {
          // Note: Don't use await/timer, or browser may block as "non-user gesture".
          // Trigger sync at once.
          sorted.forEach((t, idx) => {
            const u = String(t.url || '');
            if (!u) return;
            const filename = buildDownloadFilename(t, u, t.type, idx + 1);
            const ok = triggerBrowserDownload(u, filename);
            if (ok) okCount += 1;
          });
        } else {
          // ZIP Pack: Backend packs /tmp files, frontend triggers download
          const items = sorted
            .map((t, idx) => {
              const u = String(t.url || '');
              return {
                url: normalizeTmpDownloadUrl(u),
                filename: buildDownloadFilename(t, u, t.type, idx + 1)
              };
            })
            .filter((x) => x && x.url && String(x.url).startsWith('/tmp/'));

          const skipped = n - items.length;
          if (!items.length) {
            throw new Error('No local /tmp files to pack (Ensure output links are /tmp/...)');
          }

          const titleFromShot =
            sorted.find((t) => t && t.storyboard && t.storyboard.title)?.storyboard?.title || '';
          const titleFromInput =
            (storyboardTitle && storyboardTitle.value ? storyboardTitle.value.trim() : '') || '';
          const title =
            previewFilter === 'storyboard'
              ? titleFromInput || titleFromShot || `storyboard_${new Date().toISOString().slice(0, 10)}`
              : `preview_${previewFilterLabel(previewFilter)}`;

          const resp = await fetch('/api/download/batch-zip', {
            method: 'POST',
            headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, items })
          });
          const text = await resp.text();
          let data = null;
          try {
            data = text ? JSON.parse(text) : null;
          } catch (err) {
            throw new Error(`Response Parse Failed (Check plugins/interceptors): ${(err && err.message) || String(err)}`);
          }
          if (!resp.ok || !data || data.success !== true) {
            const detail = (data && (data.detail || data.message)) || text || `HTTP ${resp.status}`;
            throw new Error(typeof detail === 'string' ? detail : `HTTP ${resp.status}`);
          }

          const zipUrl = data.url ? String(data.url) : '';
          const zipName = data.filename ? String(data.filename) : '';
          if (!zipUrl) throw new Error('Pack success but missing download URL');

          const okDl = triggerBrowserDownload(zipUrl, zipName);
          okCount = okDl ? 1 : 0;

          showToast(
            `Packed ${data.count || items.length} files${skipped ? ` (Skipped ${skipped} non-local links)` : ''}.\nIf download didn't start: Click "Download ZIP" here.`,
            'success',
            {
              title: 'Pack Complete',
              duration: 7200,
              action: { text: 'Download ZIP', onClick: () => triggerBrowserDownload(zipUrl, zipName) }
            }
          );
        }
      } catch (err) {
        showToast(`Batch Download Failed: ${(err && err.message) || String(err)}`, 'error', {
          title: 'Batch DL Failed',
          duration: 5200
        });
      } finally {
        btnPreviewBatchDownload.removeAttribute('data-loading');
        btnPreviewBatchDownload.setAttribute('data-done', '1');
        setTimeout(() => {
          try {
            btnPreviewBatchDownload.removeAttribute('data-done');
          } catch (_) { }
        }, 1200);
        btnPreviewBatchDownload.textContent = oldText;
        previewBatchDownloading = false;
      }

      if (wantDirectMulti) {
        showToast(
          `Triggered ${okCount}/${n} downloads.\nIf blocked: Allow "Multi-file DL".\nIDM users: Use "Batch DL" (ZIP) mode.`,
          okCount ? 'success' : 'warn',
          { title: 'Multi-File DL', duration: n >= 10 ? 5200 : 4200 }
        );
      }
    });
  }
  if (btnOnlyRunning) {
    btnOnlyRunning.addEventListener('click', () => {
      onlyRunning = !onlyRunning;
      btnOnlyRunning.classList.toggle('active', onlyRunning);
      btnOnlyRunning.textContent = onlyRunning ? 'Running Only ?' : 'Running Only';
      renderTasks();
    });
  }
  if (btnPreviewDense) {
    btnPreviewDense.addEventListener('click', () => {
      densePreview = !densePreview;
      try {
        localStorage.setItem(PREVIEW_DENSE_KEY, densePreview ? '1' : '0');
      } catch (_) {
        /* ignore */
      }
      if (previewGrid) previewGrid.classList.toggle('dense', densePreview);
      btnPreviewDense.classList.toggle('active', densePreview);
      btnPreviewDense.textContent = densePreview ? 'Compact ✓' : 'Compact';
    });
    // 初始化同步（持久化）
    if (previewGrid) previewGrid.classList.toggle('dense', densePreview);
    btnPreviewDense.classList.toggle('active', densePreview);
    btnPreviewDense.textContent = densePreview ? 'Compact ✓' : 'Compact';
  }
  if (btnLogBottom) {
    btnLogBottom.addEventListener('click', () => {
      out.scrollTop = out.scrollHeight;
    });
  }
  if (concurrencyDec && concurrencyInc) {
    const clampConcurrency = (v) => Math.max(1, Math.min(5, v));
    const syncConcurrency = () => {
      batchConcurrencyInput.value = clampConcurrency(parseInt(batchConcurrencyInput.value || '1', 10) || 1);
      saveForm();
    };
    concurrencyDec.addEventListener('click', () => {
      batchConcurrencyInput.value = clampConcurrency((parseInt(batchConcurrencyInput.value || '1', 10) || 1) - 1);
      syncConcurrency();
    });
    concurrencyInc.addEventListener('click', () => {
      batchConcurrencyInput.value = clampConcurrency((parseInt(batchConcurrencyInput.value || '1', 10) || 1) + 1);
      syncConcurrency();
    });
    batchConcurrencyInput.addEventListener('change', syncConcurrency);
  }

  // Preview Modal (Large View)
  if (previewModal) {
    previewModal.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.getAttribute && target.getAttribute('data-close') === '1') {
        closePreviewModal();
      }
    });
  }
  if (btnPreviewClose) {
    btnPreviewClose.addEventListener('click', closePreviewModal);
  }
  if (btnPreviewOpenNew) {
    btnPreviewOpenNew.addEventListener('click', () => {
      const u = previewModalState && previewModalState.url ? String(previewModalState.url) : '';
      if (!u) return;
      window.open(u, '_blank', 'noopener');
    });
  }
  if (btnPreviewCopyLink) {
    btnPreviewCopyLink.addEventListener('click', async (e) => {
      const u = previewModalState && previewModalState.url ? String(previewModalState.url) : '';
      const ok = await copyTextSafe(u);
      showBubble(ok ? 'Link Copied' : 'Copy Failed', e.currentTarget);
    });
  }
  if (btnPreviewCopyHtml) {
    btnPreviewCopyHtml.addEventListener('click', async (e) => {
      const u = previewModalState && previewModalState.url ? String(previewModalState.url) : '';
      const t = previewModalState && previewModalState.type ? String(previewModalState.type) : 'video';
      const html = buildEmbedHtml(u, t === 'image' ? 'image' : 'video');
      const ok = await copyTextSafe(html);
      showBubble(ok ? 'HTML Copied' : 'Copy Failed', e.currentTarget);
    });
  }
  if (btnPreviewLocateTask) {
    btnPreviewLocateTask.addEventListener('click', () => {
      const tid = previewModalState && previewModalState.taskId ? parseInt(String(previewModalState.taskId), 10) : 0;
      if (!tid) return;
      closePreviewModal();
      setRightTab('tasks');
      requestAnimationFrame(() => {
        const el = taskList?.querySelector(`.task-card[data-id="${tid}"]`);
        if (!el) return;
        el.classList.add('spotlight');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => el.classList.remove('spotlight'), 1300);
      });
    });
  }

  // Storyboard Edit Fallback: Toggle Edit Modal
  if (editStoryboardModal) {
    editStoryboardModal.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.getAttribute && target.getAttribute('data-close') === '1') {
        closeEditStoryboardModal();
      }
    });
  }
  if (btnEditStoryboardCancel) {
    btnEditStoryboardCancel.addEventListener('click', closeEditStoryboardModal);
  }
  if (btnEditStoryboardRetry) {
    btnEditStoryboardRetry.addEventListener('click', submitEditStoryboardModal);
  }

  // Control from Admin Page: Locate task, open preview
  window.addEventListener('message', (event) => {
    try {
      if (event && event.origin && event.origin !== window.location.origin) return;
      const d = event && event.data ? event.data : {};
      if (!d || typeof d !== 'object') return;

      if (d.type === 'focus_task') {
        const id = parseInt(String(d.id || '0'), 10) || 0;
        if (!id) return;
        setRightTab('tasks');
        requestAnimationFrame(() => {
          const el = taskList?.querySelector(`.task-card[data-id="${id}"]`);
          if (!el) return;
          el.classList.add('spotlight');
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => el.classList.remove('spotlight'), 1300);
        });
        return;
      }

      if (d.type === 'open_preview') {
        const url = d.url ? String(d.url) : '';
        if (!url) return;
        const tid = parseInt(String(d.taskId || '0'), 10) || null;
        const mediaType =
          d.mediaType === 'image' || d.mediaType === 'video'
            ? d.mediaType
            : /\.(png|jpg|jpeg|webp)(?:\?|#|$)/i.test(url)
              ? 'image'
              : 'video';
        // Use our modal so the user stays in one flow.
        openPreviewModal(url, mediaType, tid);
        return;
      }
    } catch (_) {
      /* ignore */
    }
  });
  // Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (editStoryboardModal && editStoryboardModal.classList.contains('open')) {
        e.preventDefault();
        closeEditStoryboardModal();
        return;
      }
      if (previewModal && previewModal.classList.contains('open')) {
        e.preventDefault();
        closePreviewModal();
        return;
      }
    }
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if (editStoryboardModal && editStoryboardModal.classList.contains('open')) {
        submitEditStoryboardModal();
        return;
      }
      handleSend();
    }
    if (e.altKey && !e.shiftKey) {
      if (e.key === '1') setRightTab('tasks');
      if (e.key === '2') setRightTab('preview');
      if (e.key === '3') setRightTab('log');
    }
  });

  // Clear "Output/Tasks" Unified: Avoid UI mismatch
  const clearAllOutputs = (opts = { toast: true }) => {
    // If previewing, close first
    try {
      if (previewModal && previewModal.classList.contains('open')) closePreviewModal();
      if (editStoryboardModal && editStoryboardModal.classList.contains('open')) closeEditStoryboardModal();
    } catch (_) {
      /* ignore */
    }
    // 1) Clear task array
    tasks = [];
    unread.tasks = false;
    // 2) Clear unread set
    previewSeenTaskIds = new Set();
    try {
      localStorage.removeItem(PREVIEW_SEEN_KEY);
    } catch (_) {
      /* ignore */
    }
    // 3) Clear dedup set / log buffer, free memory
    try {
      previewKnown.clear();
    } catch (_) {
      /* ignore */
    }
    taskLogBuffer = {};
    currentLogTaskId = null;
    logVersion = 0;
    logSeenVersion = 0;
    out.textContent = '';

    // 4) Clear "Auto-collapse" timers
    try {
      collapseTimers.forEach((timer) => clearTimeout(timer));
      collapseTimers.clear();
    } catch (_) {
      /* ignore */
    }

    scheduleRender({ tasks: true, previews: true });
    schedulePersistTasks({ immediate: true });
    if (opts && opts.toast) showToast('Outputs Cleared (Tasks/Previews/Logs)', 'success');
  };

  btnSend.addEventListener('click', handleSend);
  btnClear.addEventListener('click', () => {
    clearAllOutputs();
  });
  btnClearDone.addEventListener('click', () => {
    tasks = tasks.filter((t) => t.status !== 'error');
    prunePreviewSeenTaskIds();
    persistPreviewSeenTaskIds();
    scheduleRender({ tasks: true, previews: true });
    schedulePersistTasks({ immediate: true });
    showToast('Failed Tasks Cleared', 'success');
  });
  btnClearAll.addEventListener('click', () => {
    clearAllOutputs({ toast: false });
  });
  if (btnCopyLog) {
    btnCopyLog.addEventListener('click', async (e) => {
      const ok = await copyTextSafe(out.textContent || '');
      showBubble(ok ? 'Log Copied' : 'Copy Failed', e.currentTarget);
      if (ok) {
        logSeenVersion = logVersion;
        updateUnreadDots();
      }
    });
  }
  if (btnCopyTaskLog) {
    btnCopyTaskLog.addEventListener('click', async (e) => {
      const t =
        currentLogTaskId !== null ? tasks.find((x) => x.id === currentLogTaskId) : tasks.length ? tasks[0] : null;
      const content = t ? getTaskLogText(t) : '';
      const ok = await copyTextSafe(content);
      showBubble(ok ? 'Task Log Copied' : 'Copy Failed', e.currentTarget);
    });
  }

  // Role Card UI (Search/Filter/Sort/Compact)
  if (roleSearch) {
    roleSearch.addEventListener('input', () => {
      roleUi.query = roleSearch.value || '';
      saveRoleUiToStorage();
      syncRoleClearButton();
      renderRoles();
    });
    roleSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        roleSearch.value = '';
        roleUi.query = '';
        saveRoleUiToStorage();
        syncRoleClearButton();
        renderRoles();
        roleSearch.blur();
      }
    });
  }
  if (roleSearchClear && roleSearch) {
    roleSearchClear.addEventListener('click', () => {
      roleSearch.value = '';
      roleUi.query = '';
      saveRoleUiToStorage();
      syncRoleClearButton();
      renderRoles();
      roleSearch.focus();
    });
  }
  if (roleFilterBar) {
    roleFilterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-role-filter]');
      if (!btn) return;
      roleUi.filter = btn.getAttribute('data-role-filter') || 'all';
      saveRoleUiToStorage();
      syncRoleFilterButtons();
      renderRoles();
    });
  }
  if (roleSort) {
    roleSort.addEventListener('change', () => {
      roleUi.sort = roleSort.value || 'smart';
      saveRoleUiToStorage();
      renderRoles();
    });
  }
  if (btnRoleDense) {
    btnRoleDense.addEventListener('click', () => {
      roleUi.dense = !roleUi.dense;
      saveRoleUiToStorage();
      syncRoleDenseButton();
      renderRoles();
    });
  }
  if (btnReloadRoles) btnReloadRoles.addEventListener('click', loadRoles);

  // Role List: Event Delegation
  if (roleList) {
    roleList.addEventListener(
      'error',
      (e) => {
        const t = e.target;
        if (t && t.classList && t.classList.contains('role-avatar')) {
          t.src = DEFAULT_ROLE_AVATAR;
        }
      },
      true
    );

    roleList.addEventListener('dragstart', (e) => {
      const card = e.target.closest ? e.target.closest('.role-card') : null;
      if (!card) return;
      const data = parseRoleFromCard(card);
      if (!data) return;
      e.dataTransfer.setData('text/plain', JSON.stringify(data));
    });

    roleList.addEventListener('click', async (e) => {
      const actionBtn = e.target.closest ? e.target.closest('[data-role-action]') : null;
      if (!actionBtn) return;
      const action = actionBtn.getAttribute('data-role-action') || '';

      if (action === 'reload') {
        loadRoles();
        return;
      }
      if (action === 'clear-search') {
        if (roleSearch) {
          roleSearch.value = '';
          roleUi.query = '';
          saveRoleUiToStorage();
          syncRoleClearButton();
          renderRoles();
          roleSearch.focus();
        }
        return;
      }
      if (action === 'show-all') {
        roleUi.filter = 'all';
        saveRoleUiToStorage();
        syncRoleFilterButtons();
        renderRoles();
        return;
      }

      const card = e.target.closest ? e.target.closest('.role-card') : null;
      const data = card ? parseRoleFromCard(card) : null;
      if (!data) return;

      if (action === 'attach') {
        markRoleUsed(data.username || '');
        const roleObj = { display: data.display || data.username || '', username: data.username || '', avatar: data.avatar || '' };
        const bt = getBatchType();
        // Single/Same: Button can "Unmount" directly
        if (bt !== 'multi_prompt' && bt !== 'storyboard') {
          const u = String(roleObj.username || '').trim();
          if (u && isRoleAttachedMain(u)) {
            attachedRoles = attachedRoles.filter((r) => String(r?.username || '').trim() !== u);
            renderAttachedRoles();
            persistRoles();
            renderRoles();
            showBubble('Unmounted', actionBtn);
            return;
          }
        }
        handleRoleAttach(roleObj, e);
        // Single adds immediately; Batch uses menu callback
        return;
      }
      if (action === 'copy-username') {
        const ok = await copyTextSafe(`@${data.username || data.display}`);
        showBubble(ok ? 'Copied @username' : 'Copy Failed', actionBtn);
        return;
      }
      if (action === 'copy') {
        const v = actionBtn.getAttribute('data-copy') || '';
        if (!v) return;
        const ok = await copyTextSafe(v);
        showBubble(ok ? 'Copied' : 'Copy Failed', actionBtn);
        return;
      }
      if (action === 'fav') {
        const u = String(data.username || '').trim();
        if (!u) {
          showBubble('No username, cannot fav', actionBtn);
          return;
        }
        if (roleFavs.has(u)) {
          roleFavs.delete(u);
          showBubble('Unfavorited', actionBtn);
        } else {
          roleFavs.add(u);
          showBubble('Favorited', actionBtn);
        }
        saveRoleFavsToStorage();
        renderRoles();
        return;
      }
      if (action === 'delete') {
        const u = String(data.username || '').trim();
        const displayName = data.display || u || 'this role';

        // 二次确认
        if (!confirm(`Delete role card "${displayName}"?\n\nCannot be undone.`)) {
          return;
        }

        try {
          // Delete from localStorage
          const stored = localStorage.getItem('character_cards');
          const cards = stored ? JSON.parse(stored) : [];
          const filtered = cards.filter(c => c.username !== u);
          localStorage.setItem('character_cards', JSON.stringify(filtered));

          // Refresh Display
          loadRoles();
          showToast('Role card deleted', 'success');
        } catch (e) {
          console.error('Failed to delete role card:', e);
          showToast('Delete failed', 'error');
        }
        return;
      }
    });
  }

  $('apiKey').addEventListener('input', () => {
    saveForm();
    syncSingleSamePlanUI();
    // Storyboard/Multi-prompt use btnSend: Sync state to avoid "Key filled but button gray" illusion
    scheduleBatchEditorPlanUI();
  });
  $('baseUrl').addEventListener('input', () => {
    saveForm();
    scheduleLoadRoles({ force: false });
  });
  $('model').addEventListener('change', () => {
    saveForm();
    renderFilePreview();
  });
  if (btnUseRecommendedModel) {
    btnUseRecommendedModel.addEventListener('click', () => {
      if (!currentRecommendedModel) {
        showToast('No recommended models available', 'warn');
        return;
      }
      $('model').value = currentRecommendedModel;
      saveForm();
      renderFilePreview();
      showToast('Switched to recommended model', 'success');
    });
  }
  promptBox.addEventListener('input', saveForm);
  promptBox.addEventListener('input', scheduleDraftSave);
  $('baseUrl').addEventListener('change', () => {
    saveForm();
    scheduleLoadRoles({ force: true });
  });
  if (batchPromptList) batchPromptList.addEventListener('input', saveForm);
  if (batchConcurrencyInput)
    batchConcurrencyInput.addEventListener('change', () => {
      const bt = getBatchType();
      const fallback = bt === 'storyboard' ? 1 : 2;
      const val = normalizeTimes(batchConcurrencyInput.value, fallback);
      batchConcurrencyInput.value = String(val);
      saveForm();
      syncGlobalCountHighlight();
      syncSingleSamePlanUI();
      // Multi/Storyboard "Generate (N)" depends on default copies: Sync to prevent lag
      scheduleBatchEditorPlanUI();
    });
  if (btnApplyGlobalCountToAll)
    btnApplyGlobalCountToAll.addEventListener('click', () => {
      const bt = getBatchType();
      if (bt !== 'multi_prompt' && bt !== 'storyboard') return;
      const fallback = bt === 'storyboard' ? 1 : 2;
      const val = normalizeTimes(batchConcurrencyInput?.value || String(fallback), fallback);
      batchConcurrencyInput.value = String(val);
      if (bt === 'multi_prompt') {
        multiPrompts = multiPrompts.map((p) => ({ ...p, count: val }));
        renderMultiPrompts();
      } else {
        storyboardShots = storyboardShots.map((s) => ({ ...s, count: val }));
        renderStoryboardShots();
      }
      saveForm();
      syncGlobalCountHighlight();
      scheduleBatchEditorPlanUI();
      showToast('Applied to all', 'success');
    });
  batchModeBar.querySelectorAll('input[name="batchType"]').forEach((r) =>
    r.addEventListener('change', () => setBatchType(r.value))
  );
  // Mode Bar: Window resize/re-layout changes "Slide Highlight"
  window.addEventListener('resize', scheduleBatchModeIndicator);
  if (btnAddPrompt)
    btnAddPrompt.addEventListener('click', () => {
      const bt = getBatchType();
      if (bt === 'storyboard') {
        addStoryboardShot('', normalizeTimes(batchConcurrencyInput?.value || '1', 1));
      } else {
        addMultiPrompt('', normalizeTimes(batchConcurrencyInput?.value || '2', 2));
      }
    });
  if (storyboardTitle) storyboardTitle.addEventListener('input', saveForm);
  if (storyboardContext) storyboardContext.addEventListener('input', saveForm);
  if (storyboardSequential) storyboardSequential.addEventListener('change', saveForm);
  if (btnMultiClearRoles)
    btnMultiClearRoles.addEventListener('click', () => {
      attachedRolesMulti = [];
      renderMultiAttachedRoles();
      persistRolesMulti();
      renderRoles();
      showToast('Multi-Prompt Global Roles cleared', 'success');
    });
  if (btnClearMainRoles)
    btnClearMainRoles.addEventListener('click', () => {
      attachedRoles = [];
      renderAttachedRoles();
      persistRoles();
      renderRoles();
      showToast('Prompt Role Mounts cleared', 'success');
    });
  if (btnStoryboardClearRoles)
    btnStoryboardClearRoles.addEventListener('click', () => {
      attachedRolesStoryboard = [];
      renderStoryboardAttachedRoles();
      persistRolesStoryboard();
      renderRoles();
      showToast('Storyboard Global Roles cleared', 'success');
    });
  if (btnStoryboardScopeRoles)
    btnStoryboardScopeRoles.addEventListener('click', (e) => {
      e.preventDefault();
      showStoryboardGlobalScopeMenu(e.currentTarget || btnStoryboardScopeRoles);
    });
  if (storyboardShotCount) {
    storyboardShotCount.addEventListener('input', () => {
      storyboardShotCount.setAttribute('data-dirty', '1');
      saveForm();
    });
    storyboardShotCount.addEventListener('change', saveForm);
    storyboardShotCount.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setStoryboardShotCount(storyboardShotCount?.value || '8', { confirmShrink: true });
      }
    });
  }
  if (btnApplyStoryboardCount)
    btnApplyStoryboardCount.addEventListener('click', () => {
      setStoryboardShotCount(storyboardShotCount?.value || '8', { confirmShrink: true });
    });
  if (btnStoryboardFromPrompt)
    btnStoryboardFromPrompt.addEventListener('click', () => {
      const raw = (promptBox.value || '').split('\n').map((l) => l.trim()).filter(Boolean);
      if (!raw.length) {
        showToast('Main Prompt Empty: Cannot import shots', 'warn');
        return;
      }
      const hasContent = storyboardShots.some(
        (s) => (s.text || '').trim() || (Array.isArray(s.roles) && s.roles.length) || s.fileDataUrl
      );
      if (hasContent) captureStoryboardUndo('Main Prompt Overwrite');
      setBatchType('storyboard');
      const defaultCount = normalizeTimes(batchConcurrencyInput?.value || '1', 1);
      storyboardShots = raw.map((t) => ({
        text: t,
        count: defaultCount,
        fileDataUrl: null,
        fileName: '',
        roles: [],
        useGlobalRoles: true
      }));
      if (storyboardShotCount) {
        storyboardShotCount.value = String(storyboardShots.length);
        storyboardShotCount.removeAttribute('data-dirty');
      }
      renderStoryboardShots();
      saveForm();
      showToast(`Imported ${storyboardShots.length} shots${hasContent ? ' (Overwritten, can undo)' : ''}`, 'success', {
        title: 'Storyboard Imported',
        duration: hasContent ? 5200 : 2400,
        action: hasContent ? { text: 'Undo', onClick: () => undoStoryboardOnce() } : null
      });
    });
  if (btnStoryboardClear)
    btnStoryboardClear.addEventListener('click', () => {
      const n = storyboardShots.length || parseInt(storyboardShotCount?.value || '8', 10) || 8;
      const hasContent = storyboardShots.some((s) => (s.text || '').trim() || (Array.isArray(s.roles) && s.roles.length) || s.fileDataUrl);
      if (!hasContent) {
        // Even if empty, layout input boxes for immediate writing
        storyboardShots = [];
        appendStoryboardShots(Math.max(1, n), { text: '', count: normalizeTimes(batchConcurrencyInput?.value || '1', 1) });
        showToast('Storyboard reset to blank', 'success');
        return;
      }
      captureStoryboardUndo('Clear Storyboard');
      const defaultCount = normalizeTimes(batchConcurrencyInput?.value || '1', 1);
      const prev = storyboardShots;
      storyboardShots = Array.from({ length: Math.max(1, n) }).map((_, i) => ({
        text: '',
        count: defaultCount,
        fileDataUrl: null,
        fileName: '',
        roles: [],
        useGlobalRoles: prev && prev[i] && prev[i].useGlobalRoles === false ? false : true
      }));
      renderStoryboardShots();
      saveForm();
      showToast('Storyboard cleared (Can Undo)', 'success', {
        title: 'Storyboard Cleared',
        duration: 5200,
        action: { text: 'Undo', onClick: () => undoStoryboardOnce() }
      });
    });
  if (btnSendPrimary) btnSendPrimary.addEventListener('click', handleSend);
  if (btnClearPrimary) btnClearPrimary.addEventListener('click', () => {
    clearAllOutputs();
  });
  btnExportBatch.addEventListener('click', () => {
    const bt = getBatchType();
    let payload = null;
    let filename = 'batch_prompts.json';

    const pickRoleFields = (r) => ({
      display: r?.display || r?.display_name || r?.username || '',
      username: r?.username || '',
      avatar: r?.avatar || r?.avatar_path || ''
    });

    if (bt === 'storyboard') {
      payload = {
        kind: 'storyboard',
        version: 2,
        title: (storyboardTitle && storyboardTitle.value ? storyboardTitle.value.trim() : '') || '',
        context: (storyboardContext && storyboardContext.value ? storyboardContext.value.trim() : '') || '',
        global_roles: (Array.isArray(attachedRolesStoryboard) ? attachedRolesStoryboard : []).map(pickRoleFields),
        shots: storyboardShots.map((s) => ({
          prompt: s.text || '',
          count: normalizeTimes(s.count, 1),
          use_global_roles: s && s.useGlobalRoles === false ? false : true,
          roles: Array.isArray(s.roles) ? s.roles.map(pickRoleFields) : []
        }))
      };
      filename = 'storyboard.json';
    } else {
      // Multi-Prompt Template (Object): Includes "Global Roles", compatible with old array
      const rows = (Array.isArray(multiPrompts) ? multiPrompts : [])
        .map((p, idx) => ({
          prompt: (p?.text || '').trim(),
          count: normalizeTimes(p?.count, 2),
          roles: Array.isArray(multiPromptRoles[idx]) ? multiPromptRoles[idx].map(pickRoleFields) : []
        }))
        .filter((x) => x.prompt || (Array.isArray(x.roles) && x.roles.length));
      if (!rows.length) {
        showToast('No exportable batch content', 'warn');
        return;
      }
      payload = {
        kind: 'multi_prompt',
        version: 2,
        global_roles: (Array.isArray(attachedRolesMulti) ? attachedRolesMulti : []).map(pickRoleFields),
        rows
      };
      filename = 'multi_prompt.json';
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  });
  btnImportBatch.addEventListener('click', () => importBatchFile.click());
  importBatchFile.addEventListener('change', async () => {
    if (!importBatchFile.files || !importBatchFile.files.length) return;
    const file = importBatchFile.files[0];
    const text = await file.text();
    try {
      const data = JSON.parse(text);

      // Storyboard Template (Object)
      if (data && typeof data === 'object' && data.kind === 'storyboard' && Array.isArray(data.shots)) {
        if (storyboardTitle) storyboardTitle.value = (data.title || '').trim();
        if (storyboardContext) storyboardContext.value = (data.context || '').trim();
        if (storyboardSequential) storyboardSequential.checked = data.sequential !== false;
        if (Array.isArray(data.global_roles)) {
          attachedRolesStoryboard = data.global_roles
            .map((r) => ({
              display: r.display || r.display_name || r.username || '',
              username: r.username || '',
              avatar: r.avatar || r.avatar_path || ''
            }))
            .filter((r) => r.display || r.username);
          persistRolesStoryboard();
          renderStoryboardAttachedRoles();
        }
        storyboardShots = data.shots
          .map((x) => ({
            text: (x.prompt || x.text || '').trim(),
            count: normalizeTimes(x.count, 1),
            fileDataUrl: null,
            fileName: '',
            useGlobalRoles: x && (x.useGlobalRoles === false || x.use_global_roles === false) ? false : true,
            roles: Array.isArray(x.roles)
              ? x.roles
                .map((r) => ({
                  display: r.display || r.display_name || r.username || '',
                  username: r.username || '',
                  avatar: r.avatar || r.avatar_path || ''
                }))
                .filter((r) => r.display || r.username)
              : []
          }));
        if (!storyboardShots.length) {
          storyboardShots = [
            { text: '', count: normalizeTimes(batchConcurrencyInput?.value || '1', 1), fileDataUrl: null, fileName: '', roles: [], useGlobalRoles: true }
          ];
        }
        renderStoryboardShots();
        setBatchType('storyboard');
        saveForm();
        importBatchFile.value = '';
        showToast('Storyboard Template Imported', 'success');
        return;
      }

      // Multi-Prompt Template (Object)
      if (data && typeof data === 'object' && data.kind === 'multi_prompt' && Array.isArray(data.rows)) {
        if (Array.isArray(data.global_roles)) {
          attachedRolesMulti = data.global_roles
            .map((r) => ({
              display: r.display || r.display_name || r.username || '',
              username: r.username || '',
              avatar: r.avatar || r.avatar_path || ''
            }))
            .filter((r) => r.display || r.username);
          persistRolesMulti();
          renderMultiAttachedRoles();
        }
        multiPrompts = data.rows
          .map((x) => ({
            text: (x.prompt || x.text || '').trim(),
            count: normalizeTimes(x.count, 2),
            fileDataUrl: null,
            fileName: ''
          }))
          .filter((x) => x.text);

        // Sync Row Roles (Optional)
        Object.keys(multiPromptRoles).forEach((k) => delete multiPromptRoles[k]);
        data.rows.forEach((x, idx) => {
          if (Array.isArray(x.roles) && x.roles.length) {
            multiPromptRoles[idx] = x.roles
              .map((r) => ({
                display: r.display || r.display_name || r.username || '',
                username: r.username || '',
                avatar: r.avatar || r.avatar_path || ''
              }))
              .filter((r) => r.display || r.username);
          }
        });

        renderMultiPrompts();
        setBatchType('multi_prompt');
        saveForm();
        importBatchFile.value = '';
        showToast('Multi-Prompt Template Imported', 'success');
        return;
      }

      // Multi-Prompt Template: Compatible with old array format
      if (Array.isArray(data)) {
        multiPrompts = data
          .map((x) => ({
            text: (x.prompt || x.text || '').trim(),
            count: normalizeTimes(x.count, 2)
          }))
          .filter((x) => x.text);

        // Sync Row Roles (Optional)
        Object.keys(multiPromptRoles).forEach((k) => delete multiPromptRoles[k]);
        data.forEach((x, idx) => {
          if (Array.isArray(x.roles) && x.roles.length) {
            multiPromptRoles[idx] = x.roles
              .map((r) => ({
                display: r.display || r.display_name || r.username || '',
                username: r.username || '',
                avatar: r.avatar || r.avatar_path || ''
              }))
              .filter((r) => r.display || r.username);
          }
        });

        renderMultiPrompts();
        setBatchType('multi_prompt');
        saveForm();
        importBatchFile.value = '';
        showToast('Batch Template Imported', 'success');
        return;
      }

      showToast('Import Failed: Unsupported Format', 'error');
    } catch (_) {
      showToast('Import Failed: Format Error');
    }
    importBatchFile.value = '';
  });

  // Initialize
  setAdvancedOpen(advancedOpen);
  initRoleUi();
  loadForm();
  scheduleBatchModeIndicator();
  loadTasksFromStorage();
  loadPreviewSeenTaskIds();
  syncPreviewFilterButtons();
  loadRolesFromStorage();
  analyzePromptHints();
  renderFilePreview();
  syncMainUploadUI({ quiet: true });
  renderAttachedRoles();
  renderMultiAttachedRoles();
  renderStoryboardAttachedRoles();
  renderTasks();
  renderPreviews();
  setRightTab(currentRightTab); // Apply persisted tab
  loadRoles();
})();
