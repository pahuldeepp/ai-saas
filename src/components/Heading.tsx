import React from "react";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = "text-black",
  bgColor = "bg-gray-100",
}) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={`p-2 w-fit rounded-md ${bgColor}`}>
        <Icon className={`w-10 h-10 ${iconColor}`} />
      </div>
      <div >
        
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
