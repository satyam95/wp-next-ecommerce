import React from "react";

interface StarRatingProps {
  rating: number;
}

interface StarIconProps {
  filled: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(totalStars)].map((_, index) => (
        <StarIcon key={index} filled={index < filledStars} />
      ))}
    </div>
  );
};

const StarIcon: React.FC<StarIconProps> = ({ filled }) => {
  const className = filled
    ? "w-5 h-5 fill-primary"
    : "w-5 h-5 fill-muted stroke-muted-foreground";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};
