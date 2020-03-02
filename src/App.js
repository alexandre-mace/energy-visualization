import React from 'react';
import './App.css';
import {Bar, Doughnut} from 'react-chartjs-2';
import getRandomColor from "./utils/getRandomColor";
import purifyProduction from "./purifiers/purifyProduction";
import purifyConsumption from "./purifiers/purifyConsumption";

// Import data
import consumption from './data/consumption.json'
import production from './data/production.json'
import Filters from "./components/Filters";
import ComplementaryInformation from "./components/ComplementaryInformation";
import filterCountriesDataset from "./utils/filterCountriesDataset";

// Purify data
let purifiedProductionData = purifyProduction(production);
let purifiedConsumptionData = purifyConsumption(consumption);

const colors = purifiedConsumptionData.map(() => getRandomColor());
const years = Object.keys(production[0].years);

function App() {
    const [filterTop10Producers, setFilterTop10Producers] = React.useState(false);
    const [filterTop10Consumers, setFilterTop10Consumers] = React.useState(false);
    const [currentYear, setCurrentYear] = React.useState("2018");

    const filteredData = filterCountriesDataset(purifiedProductionData, purifiedConsumptionData, currentYear, filterTop10Producers, filterTop10Consumers);

    const handleFilterTop10ProducersChange = () => {
        setFilterTop10Producers(!filterTop10Producers);
        setFilterTop10Consumers(false);
    };

    const handleFilterTop10ConsumersChange = () => {
        setFilterTop10Consumers(!filterTop10Consumers)
        setFilterTop10Producers(false);
    };

    const handleYearChange = (event) => {
        setCurrentYear(event.target.value)
    };

    // Create chartjs data for both datasets
    const mergedData = {
        labels: (filterTop10Consumers)
                    ? filteredData.consumers.map(data => data.country)
                    : filteredData.producers.map(data => data.country)
        ,
        datasets: [
            {
                label: "Energy production (MTOE)",
                data: filteredData.producers.map(data => data.years[currentYear]),
                backgroundColor: 'rgba(99, 132, 0, 0.6)',
                borderWidth: 0,
            },
            {
                label: "Energy consumption (MTOE)",
                data: filteredData.consumers.map(data => data.years[currentYear]),
                backgroundColor: 'rgba(0, 99, 132, 0.6)',
                borderWidth: 0,
            }
        ]
    };
    const productionData = {
        labels: filteredData.producers.map(data => data.country)
        ,
        datasets: [{
            data: filteredData.producers.map(data => data.years[currentYear]),
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
    };
    const consumptionData = {
        labels: filteredData.consumers.map(data => data.country)
        ,
        datasets: [{
            data: filteredData.consumers.map(data => data.years[currentYear]),
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
    };

    return (
        <div className="App">
            <ComplementaryInformation/>
            <div className={"chart-title mt-0"}>Energy production by countries (Millions of tonnes of oil equivalent)</div>
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
            <Filters
                years={years}
                currentYear={currentYear}
                handleYearChange={handleYearChange}
                filterTop10Producers={filterTop10Producers}
                filterTop10Consumers={filterTop10Consumers}
                handleFilterTop10ProducersChange={handleFilterTop10ProducersChange}
                handleFilterTop10ConsumersChange={handleFilterTop10ConsumersChange}
            />
        </div>
    );
}

export default App;
