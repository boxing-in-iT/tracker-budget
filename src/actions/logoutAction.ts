import { toast } from "react-toastify";
import { deleteItem } from "../helpers/helper";
import { redirect } from "react-router-dom";

export async function logoutAction() {
  console.log("remove");
  //delete the user
  deleteItem({
    key: "userName",
  });

  deleteItem({
    key: "expenses",
  });

  deleteItem({
    key: "budgets",
  });
  toast.success("You`ve deleted your account");
  //return redirect
  return redirect("/");
}
