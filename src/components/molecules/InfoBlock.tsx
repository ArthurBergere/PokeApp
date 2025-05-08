import React, { ReactNode } from "react";
import clsx from "clsx";
import Text from "../atoms/Text";

interface InfoBlockProps {
    title: string;
    children: ReactNode;
    className?: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, children, className }) => {
    return (
        <div
            className={clsx(
                "bg-gray-800 border border-gray-700 rounded-lg overflow-hidden",
                className
            )}
        >
            {/* Header du bloc */}
            <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
                <Text variant="h3" size="lg" className="text-white">
                    {title}
                </Text>
            </div>

            {/* Contenu */}
            <div className="p-4 text-white">
                {children}
            </div>
        </div>
    );
};

export default InfoBlock;