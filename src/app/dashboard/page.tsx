import { getNextAuthSession } from "@/auth";
import Dashboard from "./Dashboard";
import { redirect } from "next/navigation";
import getData from "@/lib/getData";
import { Button } from "@/components/ui/button";

import mqtt from "mqtt";
import { env } from "process";


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

  async function changeFanMode(formData: FormData){
    'use server'
    const options = {
      username: env.MQTT_USER,
      password: env.MQTT_PASSWORD
    };

    const mode = formData.get("mode")

    if (!mode) {
      return 
    }
  
  const client = mqtt.connect("mqtt://localhost:1883", options);
  
  client.on('connect', () => {
      console.log('Connected to the broker');
    
      const publishOptions = {
        retain: true  // Retain flag
      };
      console.log(mode.toString());
    
      client.publish("esp/fanMode", mode.toString(), publishOptions, (err) => {
        if (err) {
          console.error('Failed to publish message', err);
        } else {
          console.log('Message published successfully');
        }
        
        client.end();
      });
    });
  }

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
            <div className="flex justify-between mt-4">
              <form action={changeFanMode}>
                <input type="hidden" name="mode" value="1" />
                <Button type="submit">Activate Fan</Button>
              </form>
              <form action={changeFanMode}>
                <input type="hidden" name="mode" value="0" />
                <Button variant="outline" type="submit">Automatic Fan</Button>
              </form>
              <form action={changeFanMode}>
                <input type="hidden" name="mode" value="-1" />
                <Button variant="destructive" type="submit">Stop Fan</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
