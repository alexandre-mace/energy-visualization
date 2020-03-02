import React from 'react';
import './App.css';
import {Bar, Doughnut} from 'react-chartjs-2';
import getRandomColor from "./utils/getRandomColor";
import purifyProduction from "./purifiers/purifyProduction";
import purifyConsumption from "./purifiers/purifyConsumption";
import getCountryDelta from "./utils/getCountryDelta";
// Import data
import consumption from './data/consumption2015.json'
import production from './data/production2015.json';
import Filters from "./components/Filters";
import ComplementaryInformation from "./components/ComplementaryInformation";

// Purify data
let purifiedConsumptionData = purifyConsumption(consumption);
let purifiedProductionData = purifyProduction(production);

// Filter data to harmonize country data sets
const colors = purifiedConsumptionData.map(() => getRandomColor());
const countryDelta = getCountryDelta(purifiedProductionData, purifiedConsumptionData);
purifiedConsumptionData = purifiedConsumptionData.filter(data => !countryDelta.includes(data.country));
purifiedProductionData = purifiedProductionData.filter(data => !countryDelta.includes(data.country));

function App() {
    const [filterTop10, setFilterTop10] = React.useState(false);

    const filteredProductionData = filterTop10
        ? [...purifiedProductionData].sort(function(a, b){
            if(a.capacity < b.capacity) { return 1; }
            if(a.capacity > b.capacity) { return -1; }
            return 0;
        }).slice(0, 10)
        : purifiedProductionData;

    const filteredConsumptionData = filterTop10
        ? [...purifiedConsumptionData].sort(function(a, b){
            if(a.consumption < b.consumption) { return 1; }
            if(a.consumption > b.consumption) { return -1; }
            return 0;
        }).slice(0, 10)
        : purifiedConsumptionData;

    const handleFilterTop10Change = () => {
        setFilterTop10(!filterTop10)
    };

    // Create chartjs data for both datasets
    const mergedData = {
        labels: filteredProductionData.map(data => data.country)
        ,
        datasets: [
            {
                label: "Energy production (Mw)",
                data: filteredProductionData.map(data => data.capacity),
                backgroundColor: 'rgba(99, 132, 0, 0.6)',
                borderWidth: 0,
                yAxisID: "y-axis-production"
            },
            {
                label: "Energy consumption (MTOE)",
                data: filteredConsumptionData.map(data => data.consumption),
                backgroundColor: 'rgba(0, 99, 132, 0.6)',
                borderWidth: 0,
                yAxisID: "y-axis-consumption"
            }
        ]
    };
    const productionData = {
        labels: filteredProductionData.map(data => data.country)
        ,
        datasets: [{
            data: filteredProductionData.map(data => data.capacity),
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
    };
    const consumptionData = {
        labels: filteredConsumptionData.map(data => data.country)
        ,
        datasets: [{
            data: filteredConsumptionData.map(data => data.consumption),
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
    };

    return (
        <div className="App">
            <ComplementaryInformation/>
            <div className={"chart-title mt-0"}>Energy production by countries (Megawatts (Mw))</div>
            <Doughnut data={productionData} />
            <div className={"chart-title"}>Energy consumption by countries (Millions of tonnes of oil equivalent (Mtoe))</div>
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
                        yAxes: [
                            {
                                id: "y-axis-production"
                            },
                            {
                                id: "y-axis-consumption"
                            }
                        ]
                    }
                }}
            />
            <Filters
                filterTop10={filterTop10}
                handleFilterTop10Change={handleFilterTop10Change}
            />
        </div>
    );
}

export default App;
