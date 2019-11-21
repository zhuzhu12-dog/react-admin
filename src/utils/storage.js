export function setItem (key, value) {
    try {
        value = JSON.stringify(value);
    } finally {
        window.localStorage.setItem(key, value);
    }
}
export function getItem(key) {
    const value = window.localStorage.getItem(key);
}