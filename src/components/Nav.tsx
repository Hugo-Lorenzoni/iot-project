import { auth } from "@/auth";
import { SignInButton } from "@components/auth/signInButton";
import { SignOutButton } from "@components/auth/signOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Nav() {
  const data = await auth();
  console.log(data);

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
        {data && data.user ? (
          <>
            <ul className="flex gap-4 items-center">
              <li className="flex items-center gap-2">
                <Avatar>
                  {data.user?.image && (
                    <AvatarImage src={data.user.image} alt="profile picture" />
                  )}
                  <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="flex items-center">{data.user.name}</span>
              </li>

              <li>
                <SignOutButton />
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
