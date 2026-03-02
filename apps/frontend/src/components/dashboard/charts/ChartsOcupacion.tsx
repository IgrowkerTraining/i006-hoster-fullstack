import React from 'react'
import DonutChart from "../../common/charts/DonutChart";
import Legend from "../../common/charts/Legend";

const habitaciones = [
  { name: "Standard", value: 40, color: "var(--light-chart1)" },
  { name: "Deluxe", value: 15, color: "var(--light-chart2)" },
  { name: "Presidencial", value: 10, color: "var(--light-chart3)" },
];

const cabanas = [
  { name: "Standard", value: 10, color: "var(--light-chart1)" },
  { name: "Deluxe", value: 10, color: "var(--light-chart2)" },
  { name: "Presidencial", value: 5, color: "var(--light-chart3)" },
];



const ChartsOcupacion = () => {
  return (
    <>
      <div className="flex flex-col gap-10 mt-4">
        {/* Habitaciones */}
        <div className="flex items-center gap-8">
          <DonutChart value={65} data={habitaciones} />
          <Legend
            title="Por tipo de habitación"
            items={habitaciones}
          />
        </div>

        {/* Cabañas */}
        <div className="flex items-center gap-8">
          <DonutChart value={25} data={cabanas} />
          <Legend
            title="Por tipo de cabaña"
            items={cabanas}
          />
        </div>
      </div>
    </>
  )
}

export default ChartsOcupacion