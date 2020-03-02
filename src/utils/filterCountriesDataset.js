import mapOrder from "./mapOrder";

const filterCountriesDataset = (producersDataset, consumersDataset, currentYear, filterTop10Producers, filterTop10Consumers) => {

    let countriesToFilter = false;

    if (filterTop10Producers) {
        countriesToFilter = producersDataset.sort(function(a, b){
            if(a.years[currentYear] < b.years[currentYear]) { return 1; }
            if(a.years[currentYear] > b.years[currentYear]) { return -1; }
            return 0;
        }).slice(0, 10).map(data => data.country);
    }
    if (filterTop10Consumers) {
        countriesToFilter = consumersDataset.sort(function(a, b){
            if(a.years[currentYear] < b.years[currentYear]) { return 1; }
            if(a.years[currentYear] > b.years[currentYear]) { return -1; }
            return 0;
        }).slice(0, 10).map(data => data.country);
    }

    let filteredProducersDataset = countriesToFilter
        ? mapOrder(producersDataset.filter(data => countriesToFilter.includes(data.country)), countriesToFilter, 'country')
        : producersDataset;

    let filteredConsumersDataset = countriesToFilter
        ? mapOrder(consumersDataset.filter(data => countriesToFilter.includes(data.country)), countriesToFilter, 'country')
        : consumersDataset;

    return {
        'producers': filteredProducersDataset,
        'consumers': filteredConsumersDataset
    };
};

export default filterCountriesDataset;