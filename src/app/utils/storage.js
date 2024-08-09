"use client";
export const storageData = {
  getData: (key) => {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          return JSON.parse(data);
        } catch (e) {
          console.error(
            `Error parsing JSON from localStorage for key "${key}":`,
            e
          );
          return null;
        }
      }
      return null;
    }
    return null;
  },

  setData: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  removeData: (key) => localStorage.removeItem(key),
  clearData: () => localStorage.clear(),
};
