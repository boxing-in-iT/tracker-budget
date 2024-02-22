import { toast } from "react-toastify";

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

export const fetchData = (key: string) => {
  const data = localStorage.getItem(key);
  if (data === null) {
    // Handle the case where the item is not found in localStorage
    // You may want to return a default value or throw an error
    throw new Error(`Item with key '${key}' not found in localStorage`);
  }
  return JSON.parse(data);
};
