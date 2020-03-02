import excludedEntries from "../config/excludedEntries";

export default function purifyDataset(dataset) {
    return dataset
        .filter(data => !excludedEntries.includes(data.country))
        .map(data => {
            Object.keys(data.years).forEach(function(year){
                data.years[year] = parseInt(data.years[year])
            });
            return {
                country: data.country,
                years: data.years
            }
        })
}