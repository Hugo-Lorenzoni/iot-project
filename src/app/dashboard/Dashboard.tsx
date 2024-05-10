"use client";

import getData from "@/lib/getData";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AreaChart, List, ListItem } from "@tremor/react";

type Data = {
  time: string;
  Temperature: number;
  Humidity: number;
}[];

type Summary = {
  name: string;
  value: number;
}[];

interface StatusColor {
  [key: string]: string;
}

const statusColor: StatusColor = {
  Temperature: "bg-blue-500",
  Humidity: "bg-violet-500",
};

export default function Dashboard({
  data,
  summary,
}: {
  data: Data;
  summary: Summary;
}) {
  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  const { data: result } = useQuery({
    queryKey: ["data&summary"],
    queryFn: async () => await getData(),
    initialData: { data, summary },
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
  });

  return (
    <>
      <AreaChart
        data={result.data}
        index="time"
        categories={["Temperature", "Humidity"]}
        colors={["blue", "violet"]}
        valueFormatter={valueFormatter}
        showLegend={true}
        showYAxis={true}
        showGradient={false}
        startEndOnly={true}
        className="mt-6"
      />
      <List className="mt-2">
        {result.summary.map((item) => (
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
    </>
  );
}
