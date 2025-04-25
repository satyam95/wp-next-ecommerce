import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          <Skeleton className="h-8 w-48" />
        </h1>
        
        <div className="grid gap-6">
          {/* Cart Items */}
          {[1, 2, 3].map((item) => (
            <Card key={item} className="p-4">
              <div className="flex gap-4">
                <Skeleton className="h-24 w-24 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            </Card>
          ))}
          
          {/* Order Summary */}
          <Card className="p-6">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 