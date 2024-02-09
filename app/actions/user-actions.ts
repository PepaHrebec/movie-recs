"use server";

import { getErrorString } from "../lib/lib";
import { myPool } from "../lib/auth";
import { validateRequest, lucia } from "../lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { IUser } from "../lib/types";
import { FieldPacket } from "mysql2";
import { UserSchema } from "../lib/zod-schemas";

export async function logout(): Promise<{ error: string }> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export async function signup(formData: FormData): Promise<ActionResult> {
  const result = UserSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      error: getErrorString(result.error),
    };
  }

  const { username, password } = result.data;

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    const [results] = await myPool.query(
      "INSERT INTO user (id, username, hashed_password) VALUES (?, ?, ?)",
      [userId, username, hashedPassword]
    );
  } catch (error) {
    return {
      error: "Username already exists.",
    };
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

interface ActionResult {
  error: string | null;
}

export async function login(formData: FormData): Promise<ActionResult> {
  const result = UserSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      error: getErrorString(result.error),
    };
  }

  const { username, password } = result.data;

  const [usersQuery]: [IUser[], FieldPacket[]] = await myPool.query<IUser[]>(
    "SELECT * FROM user WHERE username = ?",
    [username.toLowerCase()]
  );
  const existingUser = usersQuery[0];
  if (!existingUser) {
    return {
      error: "Incorrect username.",
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password,
    password
  );
  if (!validPassword) {
    return {
      error: "Incorrect password.",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
