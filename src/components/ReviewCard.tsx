import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { StarRating } from "./StarRating";
import { daysAgo } from "@/lib/daysAgo";

type ReviewCardPropsType = {
  avatarUrl: string;
  authorName: string;
  postedDate: string;
  rating: number;
  reviewContent: string;
};

const ReviewCard = ({
  avatarUrl,
  authorName,
  postedDate,
  rating,
  reviewContent,
}: ReviewCardPropsType) => {
  return (
    <div className="flex gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarImage alt="@shadcn" src={avatarUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="grid gap-4">
        <div className="flex gap-4 items-start">
          <div className="grid gap-0.5 text-sm">
            <h3 className="font-semibold">{authorName}</h3>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {daysAgo(postedDate)}
            </time>
          </div>
          <div className="flex items-center gap-0.5 ml-auto">
            <StarRating rating={rating} />
          </div>
        </div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: reviewContent,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ReviewCard;
