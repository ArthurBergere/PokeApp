
import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import { IconType } from "react-icons";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  linkText: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, linkText, onClick }) => (
  <div className="bg-gray-900 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-gray-800 transition">
    <div className="text-5xl text-blue-400 mb-4">
      <Icon />
    </div>
    <Text variant="h3" size="xl" color="white" bold className="mb-2">
      {title}
    </Text>
    <Text variant="p" size="base" color="gray" className="mb-4">
      {description}
    </Text>
    <Button variant="outline" onClick={onClick} className="mt-auto">
      {linkText}
    </Button>
  </div>
);

export default FeatureCard;
