import React from 'react';
import './App.css';
import { Doughnut } from 'react-chartjs-2';
import getRandomColor from "./utils/getRandomColor";
import purifyProduction from "./purifiers/purifyProduction";
import purifyConsumption from "./purifiers/purifyConsumption";
import getCountryDelta from "./utils/getCountryDelta";
// Import data
import consumption from './data/consumption2015.json'
import production from './data/production2015.json';

// Purify data
let purifiedConsumptionData = purifyConsumption(consumption);
let purifiedProductionData = purifyProduction(production);

// Filter data to harmonize country data sets
const colors = purifiedConsumptionData.map(() => getRandomColor());
const countryDelta = getCountryDelta(purifiedProductionData, purifiedConsumptionData)
purifiedConsumptionData = purifiedConsumptionData.filter(data => !countryDelta.includes(data.country));
purifiedProductionData = purifiedProductionData.filter(data => !countryDelta.includes(data.country));

// Create chartjs data for both datasets
const productionData = {
    labels: purifiedProductionData.map(data => data.country)
    ,
    datasets: [{
        data: purifiedProductionData.map(data => data.capacity),
        backgroundColor: colors,
        hoverBackgroundColor: colors
    }]
};

const consumptionData = {
    labels: purifiedConsumptionData.map(data => data.country)
    ,
    datasets: [{
        data: purifiedConsumptionData.map(data => data.consumption),
        backgroundColor: colors,
        hoverBackgroundColor: colors
    }]
};

function App() {
  return (
    <div className="App">
      <Doughnut data={productionData} />
      <Doughnut data={consumptionData} />
    </div>
  );
}

export default App;
