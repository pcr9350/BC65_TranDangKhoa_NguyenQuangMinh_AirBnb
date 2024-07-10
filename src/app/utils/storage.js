export const storageData = {
  getData: (key) => JSON.parse(localStorage.getItem(key)),
  setData: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  removeData: (key) => localStorage.removeItem(key),
  clearData: () => localStorage.clear(),
};
  