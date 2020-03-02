export default function generateChartJsMergedData(filterTop10Consumers, producers, consumers, currentYear) {
    return {
        labels: (filterTop10Consumers)
            ? consumers.map(data => data.country)
            : producers.map(data => data.country)
        ,
        datasets: [
            {
                label: "Energy production (MTOE)",
                data: producers.map(data => data.years[currentYear]),
                backgroundColor: 'rgba(99, 132, 0, 0.6)',
                borderWidth: 0,
            },
            {
                label: "Energy consumption (MTOE)",
                data: consumers.map(data => data.years[currentYear]),
                backgroundColor: 'rgba(0, 99, 132, 0.6)',
                borderWidth: 0,
            }
        ]
    };
}