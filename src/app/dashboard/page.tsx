import { getNextAuthSession } from "@/auth";
import Dashboard from "./Dashboard";
import { redirect } from "next/navigation";
import getData from "@/lib/getData";

// const data = [
//   {
//     date: "Jan 23",
//     Organic: 232,
//     Sponsored: 0,
//   },
//   {
//     date: "Feb 23",
//     Organic: 241,
//     Sponsored: 0,
//   },
//   {
//     date: "Mar 23",
//     Organic: 291,
//     Sponsored: 0,
//   },
//   {
//     date: "Apr 23",
//     Organic: 101,
//     Sponsored: 0,
//   },
//   {
//     date: "May 23",
//     Organic: 318,
//     Sponsored: 0,
//   },
//   {
//     date: "Jun 23",
//     Organic: 205,
//     Sponsored: 0,
//   },
//   {
//     date: "Jul 23",
//     Organic: 372,
//     Sponsored: 0,
//   },
//   {
//     date: "Aug 23",
//     Organic: 341,
//     Sponsored: 0,
//   },
//   {
//     date: "Sep 23",
//     Organic: 387,
//     Sponsored: 120,
//   },
//   {
//     date: "Oct 23",
//     Organic: 220,
//     Sponsored: 0,
//   },
//   {
//     date: "Nov 23",
//     Organic: 372,
//     Sponsored: 0,
//   },
//   {
//     date: "Dec 23",
//     Organic: 321,
//     Sponsored: 0,
//   },
// ];

// const summary = [
//   {
//     name: "Organic",
//     value: 3273,
//   },
//   {
//     name: "Sponsored",
//     value: 120,
//   },
// ];

export default async function DashboardPage() {
  const session = await getNextAuthSession();

  if (!session?.user.isAdmin) {
    redirect("/");
  }

  const { data, summary } = await getData();

  return (
    <main className="flex flex-col items-center justify-center flex-auto">
      <div className="flex flex-row items-stretch w-full flex-auto justify-center">
        <div className="sm:max-w-4xl m-4 min-h-1/2 w-full flex items-center">
          <div className="border min-h-1/2 rounded-tremor-default shadow-tremor-card w-full p-4">
            <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Follower metrics
            </h3>
            <Dashboard data={data} summary={summary} />
          </div>
        </div>
      </div>
    </main>
  );
}
