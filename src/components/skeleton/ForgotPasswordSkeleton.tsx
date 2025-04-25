import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function ForgotPasswordSkeleton() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-16" />
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