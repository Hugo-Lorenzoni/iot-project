"use client";

import { cn } from "@/lib/utils";
import { AreaChart, List, ListItem } from "@tremor/react";

type Data = {
  date: string;
  Organic: number;
  Sponsored: number;
}[];

type Summary = {
  name: string;
  value: number;
}[];

interface StatusColor {
  [key: string]: string;
}

const statusColor: StatusColor = {
  Organic: "bg-blue-500",
  Sponsored: "bg-violet-500",
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
  return (
    <>
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
    </>
  );
}
