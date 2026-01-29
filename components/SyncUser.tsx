"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { createUserIfNotExists } from "@/lib/createUser";

export default function SyncUser() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      createUserIfNotExists(user);
    }
  }, [isSignedIn, user]);

  return null;
}
