"use client";

import toast from "react-hot-toast";
import MyForm from "../components/my-form";
import { signup } from "../actions";
import { UserSchema } from "../lib/zod-schemas";
import { getErrorString } from "../lib/lib";

async function clientSignup(formData: FormData) {
  const result = UserSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    toast.error(getErrorString(result.error));
    return;
  }
  const rtrn = await signup(formData);
  if (rtrn.error) {
    toast.error(rtrn.error);
  }
}

export default function Page() {
  return (
    <MyForm
      h1Text="Create an account"
      usernameP="Your username visible to others."
      passwordP="Your secret password."
      action={clientSignup}
    />
  );
}
