"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if (!session || session.status === "unauthenticated") {
    return (
      <main className="flex flex-col items-center justify-center flex-auto">
        <h1>Unauthenticated</h1>
      </main>
    );
  } else if (session?.data?.user?.name) {
    return (
      <main className="flex flex-col items-center justify-center flex-auto">
        <h1 className=" font-semibold text-lg">
          Welcome back {session.data.user.name} !
        </h1>
        <p>You are {session.data.user.isAdmin ? "Admin" : "not Admin"}</p>
      </main>
    );
  }
}
