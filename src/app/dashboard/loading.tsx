import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function DashboardLoadingPage() {
  return (
    <main className="flex flex-col items-center justify-center flex-auto">
      <div className="flex flex-row items-stretch w-full flex-auto justify-center">
        <div className="sm:max-w-4xl m-4 w-full flex items-center">
          <div className="border h-3/5 rounded-tremor-default shadow-tremor-card w-full p-4">
            <Skeleton className="h-6 w-24" />
            <div className="mt-6 w-full h-80 mb-2">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="flex justify-between py-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Separator />
            <div className="flex justify-between py-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-12" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
