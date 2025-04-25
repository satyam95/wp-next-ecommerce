import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function OrdersSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          <Skeleton className="h-8 w-48" />
        </h1>
        
        <div className="space-y-6">
          {[1, 2, 3].map((order) => (
            <Card key={order} className="p-6">
              <CardHeader className="p-0">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-4">
                      <Skeleton className="h-16 w-16 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 