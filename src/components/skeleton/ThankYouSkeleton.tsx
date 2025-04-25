import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function ThankYouSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Skeleton className="h-20 w-20 rounded-full" />
          </div>
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-6" />
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-6" />
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="text-center space-y-4">
            <Skeleton className="h-4 w-64 mx-auto" />
            <div className="flex justify-center space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 