"use client";

import { signOut } from "next-auth/react";
import { Button } from "@ui/button";
import React from "react";
import { cn } from "@/lib/utils";

export function SignOutButton({
  classNames,
}: {
  classNames?: React.ComponentProps<typeof Button>["className"];
}) {
  return (
    <Button className={cn(classNames)} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
