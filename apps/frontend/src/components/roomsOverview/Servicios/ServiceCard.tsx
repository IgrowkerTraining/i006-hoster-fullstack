import React from "react";
import raw from "../../../data/serviciosAdicionales.json";
import ServiceCard from "./Servicios";
import type { ServiceItem } from "../../../types/services"

const servicesData = raw as ServiceItem[];

const ServiciosAdicionales: React.FC = () => {
    return (
        <>
            {servicesData.map((service) => (
                <ServiceCard key={service.id} {...service} />
            ))}
        </>
    );
};

export default ServiciosAdicionales;