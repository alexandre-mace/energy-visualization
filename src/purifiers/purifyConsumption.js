import getCountryName from "../utils/getCountryName";

export default function purifyConsumption(consumptionData) {
    return consumptionData.filter(data => typeof parseFloat(data[Object.keys(data)[1]]) === 'number' && !isNaN(parseFloat(data[Object.keys(data)[1]]))).map(data => {
            return {
                "country": getCountryName(data[Object.keys(data)[0]].slice(-2)),
                "consumption" : parseFloat(data[Object.keys(data)[1]])
            }
    }).sort(function(a, b){
        if(a.country < b.country) { return -1; }
        if(a.country > b.country) { return 1; }
        return 0;
    });
}