import React from 'react';
import './App.css';
import getRandomColor from "./utils/getRandomColor";
import purifyDataset from "./purifiers/purifyDataset";
import Filters from "./components/Filters";
import ComplementaryInformation from "./components/ComplementaryInformation";
import filterCountriesDataset from "./utils/filterCountriesDataset";
import Tabs from '@material-ui/core/Tabs';
import LinkTab from "./components/LinkTab";
import a11yProps from "./utils/allyProps";
import TabPanel from "./components/TabPanel";
import generateChartJsData from "./utils/generateChartJsData";
import generateChartJsMergedData from "./utils/generateChartJsMergedData";
import generateChartJsSingleCountryData from "./utils/generateChartJsSingleCountryData";
import WorldVisualization from "./components/WorldVisualization";
import SingleCountryVisualization from "./components/SingleCountryVisualization";

// Import data
import consumption from './data/consumption.json'
import production from './data/production.json'

// Purify data
let purifiedProductionData = purifyDataset(production);
let purifiedConsumptionData = purifyDataset(consumption);

// Generate diagram extra data
const years = Object.keys(production[0].years);
const colors = purifiedConsumptionData.map(() => getRandomColor());
const countries = purifiedProductionData.map(data => data.country);

function App() {
    const [filterTop10Producers, setFilterTop10Producers] = React.useState(false);
    const [filterTop10Consumers, setFilterTop10Consumers] = React.useState(false);
    const [singleCountry, setSingleCountry] = React.useState("France");
    const [currentYear, setCurrentYear] = React.useState("2018");
    const [appMode, setAppMode] = React.useState(0);

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

    const handleSingleCountryChange = (event) => {
        setSingleCountry(event.target.value)
    };

    const handleAppModeChange = (event, newValue) => {
        setAppMode(newValue);
    };

    // Create chartjs data for both datasets
    const productionData = generateChartJsData(filteredData.producers, currentYear, colors);
    const consumptionData = generateChartJsData(filteredData.consumers, currentYear, colors);
    const mergedData = generateChartJsMergedData(filterTop10Consumers, filteredData.producers, filteredData.consumers, currentYear);
    const singleCountryData = generateChartJsSingleCountryData(
        purifiedProductionData.find(producer => producer.country === singleCountry),
        purifiedConsumptionData.find(producer => producer.country === singleCountry)
    );

    return (
        <div className="App">

            <Tabs
                centered
                value={appMode}
                onChange={handleAppModeChange}
                aria-label="nav tabs example"
                indicatorColor="primary"
                textColor="primary"
            >
                <LinkTab label="World"  {...a11yProps(0)} />
                <LinkTab label="Single country"  {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={appMode} index={0}>
                <WorldVisualization
                    productionData={productionData}
                    consumptionData={consumptionData}
                    mergedData={mergedData}
                />
            </TabPanel>
            <TabPanel value={appMode} index={1}>
                <SingleCountryVisualization
                    singleCountry={singleCountry}
                    singleCountryData={singleCountryData}
                />
            </TabPanel>

            <ComplementaryInformation/>
            <Filters
                appMode={appMode}
                singleCountry={singleCountry}
                handleSingleCountryChange={handleSingleCountryChange}
                countries={countries}
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
