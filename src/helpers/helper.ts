import { toast } from "react-toastify";

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = (key: string) => {
  const data = localStorage.getItem(key);
  if (data !== null) {
    return JSON.parse(data);
  }
  return null;
};

//delete item
export const deleteItem = ({ key, id }: any) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item: any) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

//create budget
export const createBudget = ({
  name,
  amount,
}: {
  name: string;
  amount: number;
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

//create expense
export const createExpense = ({
  name,
  amount,
  budgetId,
}: {
  name: string;
  amount: number;
  budgetId: string;
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

interface Expense {
  budgetId: string;
  amount: number;
  // Другие свойства, если они есть
}

// total spent by budget
export const calculateSpentByBudget = (budgetId: string) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc: number, expense: Expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return acc + expense.amount;
  }, 0);
  return budgetSpent;
};

export const formatPercentage = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatCurrency = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

// Formating percentages
export const formateDateToLocalString = (epoch: number): string => {
  return new Date(epoch).toLocaleDateString();
};

//get all items for local storage
export const getAllMatchingItems = ({
  category,
  key,
  value,
}: {
  category: string;
  key: string;
  value: string;
}) => {
  const data = fetchData(category) ?? [];
  return data.filter((item: any) => item[key] === value);
};
