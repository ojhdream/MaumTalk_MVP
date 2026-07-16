(function () {
  const KEY = 'maumtalk.records';

  function parseDate(value) {
    const time = value ? new Date(value).getTime() : 0;
    return Number.isFinite(time) ? time : 0;
  }

  function readRecords() {
    try {
      const value = localStorage.getItem(KEY);
      const records = value ? JSON.parse(value) : [];
      return Array.isArray(records) ? records : [];
    } catch (error) {
      return [];
    }
  }

  function writeRecords(records) {
    localStorage.setItem(KEY, JSON.stringify(records));
    return records;
  }

  function normalize(record) {
    const now = new Date().toISOString();
    const id = record.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return {
      id,
      category: record.category || record.categoryId || record.type || 'plain',
      content: record.content || record.text || '',
      todos: Array.isArray(record.todos) ? record.todos : [],
      tags: Array.isArray(record.tags) ? record.tags : [],
      attachments: Array.isArray(record.attachments) ? record.attachments : [],
      createdAt: record.createdAt || record.date || now,
      updatedAt: record.updatedAt || now
    };
  }

  function sortNewest(records) {
    return records.slice().sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt));
  }

  function save(record) {
    const next = normalize(record || {});
    const records = readRecords().filter((item) => item.id !== next.id);
    records.unshift(next);
    writeRecords(sortNewest(records));
    return next;
  }

  function getAll() {
    return sortNewest(readRecords().map(normalize));
  }

  function get(id) {
    return getAll().find((record) => String(record.id) === String(id)) || null;
  }

  function update(id, data) {
    const records = getAll();
    const index = records.findIndex((record) => String(record.id) === String(id));
    if (index < 0) return null;
    const next = normalize({
      ...records[index],
      ...(data || {}),
      id: records[index].id,
      createdAt: records[index].createdAt,
      updatedAt: new Date().toISOString()
    });
    records[index] = next;
    writeRecords(sortNewest(records));
    return next;
  }

  function remove(id) {
    const before = getAll();
    const after = before.filter((record) => String(record.id) !== String(id));
    writeRecords(after);
    return before.length !== after.length;
  }

  function clear() {
    writeRecords([]);
  }

  function stats() {
    const records = getAll();
    const dates = new Set(records.map((record) => record.createdAt.slice(0, 10)).filter(Boolean));
    return {
      count: records.length,
      dateCount: dates.size,
      latestAt: records[0]?.createdAt || null
    };
  }

  const api = {
    key: KEY,
    save,
    getAll,
    get,
    update,
    remove,
    clear,
    stats,
    getRecords: getAll,
    addRecord: save
  };

  window.Storage = api;
  window.MaumTalkStorage = api;
})();
