"use server";

import { redirect } from "next/navigation";

export async function navigate(address: string) {
  if (address === "") {
    return;
  }
  redirect(`/search/${address}`);
}
