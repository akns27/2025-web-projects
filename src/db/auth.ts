"use server";

import { NextAuthOptions } from "@/db/options";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth(NextAuthOptions);
