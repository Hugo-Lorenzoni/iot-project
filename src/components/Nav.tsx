import { SignInButton } from "@components/auth/signInButton";
import { SignOutButton } from "@components/auth/signOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getNextAuthSession } from "@/auth";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default async function Nav() {
  const session = await getNextAuthSession();
  // console.log(session);

  return (
    <header className="sticky top-0 z-20  font-semibold  border-b">
      <nav className="container mx-auto flex justify-between gap-4 p-4">
        {" "}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-base duration-150 hover:opacity-80 xs:text-lg"
        >
          <div>IoT PUT MONS EUNICE PROJECT</div>
        </a>
        {session && session.user ? (
          <>
            <ul className="flex gap-8 items-center">
              <li>
                {session.user.isAdmin && (
                  <Link href="/dashboard">Dashboard</Link>
                )}
              </li>
              <li>
                <Popover>
                  <PopoverTrigger className="flex items-center gap-2">
                    <span className="flex items-center">
                      {session.user.name}
                    </span>
                    <Avatar>
                      {session.user?.image && (
                        <AvatarImage
                          src={session.user.image}
                          alt="profile picture"
                        />
                      )}
                      <AvatarFallback>
                        {session.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-3 mt-1">
                    <div className="px-1 pb-1">Déconnexion</div>
                    <Separator />
                    <SignOutButton classNames="w-full mt-2" />
                  </PopoverContent>
                </Popover>
              </li>
            </ul>
          </>
        ) : (
          <SignInButton />
        )}
      </nav>
    </header>
  );
}
