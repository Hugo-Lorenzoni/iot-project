"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AreaChart, Card, List, ListItem } from "@tremor/react";
import { useSession } from "next-auth/react";

const data = [
  {
    date: "Jan 23",
    Organic: 232,
    Sponsored: 0,
  },
  {
    date: "Feb 23",
    Organic: 241,
    Sponsored: 0,
  },
  {
    date: "Mar 23",
    Organic: 291,
    Sponsored: 0,
  },
  {
    date: "Apr 23",
    Organic: 101,
    Sponsored: 0,
  },
  {
    date: "May 23",
    Organic: 318,
    Sponsored: 0,
  },
  {
    date: "Jun 23",
    Organic: 205,
    Sponsored: 0,
  },
  {
    date: "Jul 23",
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: "Aug 23",
    Organic: 341,
    Sponsored: 0,
  },
  {
    date: "Sep 23",
    Organic: 387,
    Sponsored: 120,
  },
  {
    date: "Oct 23",
    Organic: 220,
    Sponsored: 0,
  },
  {
    date: "Nov 23",
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: "Dec 23",
    Organic: 321,
    Sponsored: 0,
  },
];

const summary = [
  {
    name: "Organic",
    value: 3273,
  },
  {
    name: "Sponsored",
    value: 120,
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

interface StatusColor {
  [key: string]: string;
}

const statusColor: StatusColor = {
  Organic: "bg-blue-500",
  Sponsored: "bg-violet-500",
};

export default function Home() {
  const session = useSession();
  // const session = { status: "loading" };
  // console.log(session);
  if (!session || session.status === "unauthenticated") {
    return (
      <main className="flex flex-col items-center justify-center flex-auto">
        <h1>Unauthenticated</h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center flex-auto">
      <div className="flex flex-row items-stretch w-full flex-auto justify-center">
        <div className="sm:max-w-4xl m-4 min-h-1/2 w-full flex items-center">
          {session.status === "loading" ? (
            <>
              <div className="border h-1/2 rounded-tremor-default shadow-tremor-card w-full p-4">
                <Skeleton className="h-full w-full" />
              </div>
            </>
          ) : (
            <>
              <div className="border min-h-1/2 rounded-tremor-default shadow-tremor-card w-full p-4">
                <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Follower metrics
                </h3>
                <AreaChart
                  data={data}
                  index="date"
                  categories={["Organic", "Sponsored"]}
                  colors={["blue", "violet"]}
                  valueFormatter={valueFormatter}
                  showLegend={true}
                  showYAxis={true}
                  showGradient={false}
                  startEndOnly={true}
                  className="mt-6"
                />
                <List className="mt-2">
                  {summary.map((item) => (
                    <ListItem key={item.name}>
                      <div className="flex items-center space-x-2">
                        <span
                          className={cn(statusColor[item.name], "h-0.5 w-3")}
                          aria-hidden={true}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {valueFormatter(item.value)}
                      </span>
                    </ListItem>
                  ))}
                </List>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
