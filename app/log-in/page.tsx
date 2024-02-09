"use client";

import MyForm from "../components/my-form";
import { login } from "../actions";
import { UserSchema } from "../lib/zod-schemas";
import toast from "react-hot-toast";
import { getErrorString } from "../lib/lib";

async function clientLogin(formData: FormData) {
  const result = UserSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    toast.error(getErrorString(result.error));
    return;
  }
  const rtrn = await login(formData);
  if (rtrn.error) {
    toast.error(rtrn.error);
  }
}

export default function Page() {
  return <MyForm h1Text="Log in" action={clientLogin} />;
}
