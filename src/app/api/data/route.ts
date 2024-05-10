import { NextRequest } from "next/server";
import prisma from "@/db";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const headersList = headers();
  const api_key = headersList.get("api_key");
  if (api_key !== process.env.API_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const temperatureString = searchParams.get("temperature");
  const temperature = temperatureString ? parseFloat(temperatureString) : null;
  const humidityString = searchParams.get("humidity");
  const humidity = humidityString ? parseFloat(humidityString) : null;
  console.log(temperature, humidity);

  if (!temperature || !humidity) {
    return new Response("Bad Request", { status: 400 });
  }

  const response = await prisma.data.create({
    data: {
      time: new Date(),
      temperature: temperature,
      humidity: humidity,
    },
  });

  if (!response) {
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}
