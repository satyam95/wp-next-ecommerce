import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function TrackOrderSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <Skeleton className="h-8 w-64 mx-auto" />
        </h1>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Order Status Timeline */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">
            <Skeleton className="h-6 w-48" />
          </h2>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 