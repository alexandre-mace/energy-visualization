export default function getCountryDelta(firstDataSet, secondDataSet) {
    const countryDeltaFirstBatch = firstDataSet.map(data => {
        if (!firstDataSet.find(dataConsumption => (dataConsumption.country === data.country))) {
            return data.country
        }
    }).filter(data => data !== undefined);

    const countryDeltaSecondBatch = secondDataSet.map(data => {
        if (!secondDataSet.find(dataProduction => (dataProduction.country === data.country))) {
            return data.country
        }
    }).filter(data => data !== undefined);

    return countryDeltaFirstBatch.concat(countryDeltaSecondBatch);
}