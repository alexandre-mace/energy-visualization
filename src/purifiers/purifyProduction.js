import excludedEntries from "../config/excludedEntries";

export default function purifyProduction(productionData) {
    return productionData.map(data => {
        Object.keys(data.years).forEach(function(year){
            data.years[year] = parseInt(data.years[year])
        });
        return {
            country: data.country,
            years: data.years
        }
    }).filter(data => !excludedEntries.includes(data.country))
}