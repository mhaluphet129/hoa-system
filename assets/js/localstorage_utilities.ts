// ! All items stored in localStorage is removed after 1 hour of not getting the item,
// ! for security purposes
// TODO: mark "need to login again if token is expired"

function setItemWithExpiry(key: string, value: any, expirySeconds: number) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expirySeconds * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getItem(key: string) {
  const itemString = localStorage.getItem(key);
  if (!itemString) {
    return null;
  }
  const item = JSON.parse(itemString);
  setItemWithExpiry(key, item, 3600);
  return item.value;
}

export { setItemWithExpiry, getItem };
