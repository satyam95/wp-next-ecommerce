import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function LoginSkeleton() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="ml-auto h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="mt-4 text-center">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
} 