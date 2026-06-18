"use server";

import { signIn, signOut } from "@/auth";

export async function signInGitHub() {
  await signIn("github");
}

export async function signOutAction() {
  await signOut();
}
