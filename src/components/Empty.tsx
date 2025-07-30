"use client";

import Image from "next/image";
import React from "react";
import emptyImage from "../../public/empty.png"; // ✅ use alias if configured, or adjust the path

interface EmptyProps {
  label: string;
  imageSrc?: string;
}

export const Empty = ({ label, imageSrc }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
      <div className="w-32 h-32 relative mb-4">
        <Image
          src={imageSrc || emptyImage}
          alt="Empty State"
          fill
          className="object-contain"
        />
      </div>
      <p className="text-lg font-medium">{label}</p>
    </div>
  );
};