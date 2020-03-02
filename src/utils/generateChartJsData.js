export default function generateChartJsData(dataset, currentYear, colors) {
    return {
        labels: dataset.map(data => data.country)
        ,
        datasets: [{
            data: dataset.map(data => data.years[currentYear]),
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
    };
}