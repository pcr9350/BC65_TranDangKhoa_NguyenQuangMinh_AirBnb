export const storageData = {
  getData: (key) => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
  },
  setData: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  removeData: (key) => localStorage.removeItem(key),
  clearData: () => localStorage.clear(),
};
