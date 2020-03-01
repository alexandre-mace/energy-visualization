import React from 'react';
import './App.css';
import { Doughnut } from 'react-chartjs-2';
import production from './data/production2015.json';
import consumption from './data/consumption2015.json'
import getRandomColor from "./utils/getRandomColor";
import purifyProduction from "./purifiers/purifyProduction";
import purifyConsumption from "./purifiers/purifyConsumption";

let purifiedConsumptionData = purifyConsumption(consumption);
let purifiedProductionData = purifyProduction(production);

const colors = purifiedConsumptionData.map(() => getRandomColor());

const countryDeltaFirstBatch = purifiedProductionData.map(data => {
    if (!purifiedConsumptionData.find(dataConsumption => (dataConsumption.country === data.country))) {
        return data.country
    }
}).filter(data => data !== undefined);

const countryDeltaSecondBatch = purifiedConsumptionData.map(data => {
    if (!purifiedProductionData.find(dataProduction => (dataProduction.country === data.country))) {
        return data.country
    }
}).filter(data => data !== undefined);

const countryDelta = countryDeltaFirstBatch.concat(countryDeltaSecondBatch);

purifiedConsumptionData = purifiedConsumptionData.filter(data => !countryDelta.includes(data.country));
purifiedProductionData = purifiedProductionData.filter(data => !countryDelta.includes(data.country));

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
