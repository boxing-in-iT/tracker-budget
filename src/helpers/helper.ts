import { toast } from "react-toastify";

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

export const fetchData = (key: string) => {
  const data = localStorage.getItem(key);
  if (data !== null) {
    return JSON.parse(data);
  }
  return null;
};

//delete item
export const deleteItem = ({ key, id }: any) => {
  debugger;
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item: any) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
