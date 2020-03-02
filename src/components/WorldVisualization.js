import {Bar, Doughnut} from "react-chartjs-2";
import React from "react";

const WorldVisualization = ({ productionData, consumptionData, mergedData }) => (
    <>
        <div className={"chart-title"}>Energy production by countries (Millions of tonnes of oil equivalent)</div>
        <Doughnut data={productionData} />
        <div className={"chart-title"}>Energy consumption by countries (Millions of tonnes of oil equivalent)</div>
        <Doughnut data={consumptionData} />
        <div className={"chart-title"}>Merged diagrams</div>
        <Bar
            data={mergedData}
            width={100}
            height={50}
            options={{
                scales: {
                    xAxes: [{
                        barPercentage: 1,
                        categoryPercentage: 1
                    }],
                }
            }}
        />
    </>
);

export default WorldVisualization;