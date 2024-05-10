import prisma from "@/db";

export default async function getData() {
  const res = await prisma.data.findMany({
    take: 20,
    orderBy: {
      time: "desc",
    },
  });
  const data = res.map((d) => ({
    time: d.time.toLocaleTimeString("en-US"),
    Temperature: d.temperature,
    Humidity: d.humidity,
  }));
  const summary = [
    {
      name: "Temperature",
      value: data.reduce((acc, curr) => acc + curr.Temperature, 0),
    },
    {
      name: "Humidity",
      value: data.reduce((acc, curr) => acc + curr.Humidity, 0),
    },
  ];
  // console.log(data, summary);
  return { data, summary };
}
