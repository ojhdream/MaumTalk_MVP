(function () {
  const KEYS = {
    records: 'maumtalk.records',
    draft: 'maumtalk.editorDraft',
    profile: 'maumtalk.profile',
    settings: 'maumtalk.settings'
  };

  function read(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value == null ? fallback : JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  function getRecords() {
    return read(KEYS.records, []);
  }

  function saveRecords(records) {
    return write(KEYS.records, Array.isArray(records) ? records : []);
  }

  function addRecord(record) {
    const records = getRecords();
    const next = {
      id: record.id || Date.now(),
      createdAt: record.createdAt || new Date().toISOString(),
      ...record
    };
    records.unshift(next);
    saveRecords(records.slice(0, 100));
    return next;
  }

  window.MaumTalkStorage = {
    KEYS,
    read,
    write,
    getRecords,
    saveRecords,
    addRecord,
    getDraft: () => read(KEYS.draft, null),
    saveDraft: (draft) => write(KEYS.draft, draft),
    clearDraft: () => localStorage.removeItem(KEYS.draft),
    getProfile: () => read(KEYS.profile, null),
    saveProfile: (profile) => write(KEYS.profile, profile),
    getSettings: () => read(KEYS.settings, {}),
    saveSettings: (settings) => write(KEYS.settings, settings || {})
  };
})();
