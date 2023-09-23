import React from "react";
import { TBadgeProps } from "../../types/props.type";

const Badge = ({ quantity }: TBadgeProps) => {
  return (
    <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
      {quantity}
    </span>
  );
};

export default Badge;
