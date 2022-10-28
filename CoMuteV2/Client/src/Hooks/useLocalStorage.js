function useLocalStorage() {

    const getLocalStorageItem = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    const setLocalStorageItem = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const clearLocalStorage = () => {
        localStorage.clear();
    }

  return [getLocalStorageItem, setLocalStorageItem, clearLocalStorage]
}

export default useLocalStorage