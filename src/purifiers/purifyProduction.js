import getCountryName from "../utils/getCountryName";

export default function purifyProduction(productionData) {
    const globalProductionByCountry = productionData.map(data => (
        {
            "country" : getCountryName(data.country),
            "capacity": data.capacity
        }
    ));
    let purifiedData = [];
    globalProductionByCountry.forEach(countryData => {
        if (!(purifiedData.find(findData => findData.country === countryData.country))) {
            if (typeof countryData.capacity === "number") {
                purifiedData.push(countryData)
            }
        } else {
            let concernedCountry = purifiedData.find(findData =>  findData.country === countryData.country);
            if (typeof countryData.capacity === "number") {
                concernedCountry.capacity = Math.ceil(concernedCountry.capacity) + Math.ceil(countryData.capacity)
            }
        }
    });

    return purifiedData.sort(function(a, b){
        if(a.country < b.country) { return -1; }
        if(a.country > b.country) { return 1; }
        return 0;
    });
}