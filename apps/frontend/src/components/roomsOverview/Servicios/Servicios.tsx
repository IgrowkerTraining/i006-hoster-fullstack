import React from "react";
import { icons } from "lucide-react";
import type { ServiceItem } from "../../../types/services";

type ServiceCardProps = ServiceItem;

const ServiceCard: React.FC<ServiceCardProps> = ({ tipo, icon, precio, descripcion }) => {
    const Icon = icons[icon];

    return (
        <div className="bg-[var(--light-card)] rounded-xl p-4 shadow-sm w-[372px] h-[272px]">
            <div className="flex items-center gap-3 mb-3 ">
                <Icon size={24} />
                <h3 className="font-medium text-lg text-[24px]">{tipo}</h3>
            </div>

            <div className="font-normal text-[16px] mb-2">Precio: ${precio}</div>
            <p className="text-[16px] opacity-80 mb-4">{descripcion}</p>
        </div>
    );
};

export default ServiceCard;