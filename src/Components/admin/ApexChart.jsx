import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
    const [state, setState] = useState({
        series: [],
        options: {
            chart: { height: 450, type: "area", toolbar: { show: true } },
            stroke: { curve: "smooth", width: 4 },
            dataLabels: { enabled: false },
            xaxis: {

                type: "datetime",
                // labels: { style: { colors: "#0000" } }
            },
            yaxis: {
                min: 0,
                max: 3,

                // labels: { style: { colors: "#fff" } }
            },
            tooltip: {
                theme: "dark",
                x: {
                    formatter: (val) => {
                        const d = new Date(val);
                        const day = String(d.getDate()).padStart(2, "0");
                        const month = String(d.getMonth() + 1).padStart(2, "0");
                        const year = d.getFullYear();
                        return `${day}/${month}/${year}`;
                    }
                }
            },
            // legend: { labels: { colors: "#fff" } },
            grid: { borderColor: "#555" }
        }
    });

    useEffect(() => {
        fetch("http://localhost:3000/crimes")
            .then(res => res.json())
            .then(data => {
                if (!data.length) return;

                // 1️⃣ Get all unique dates in the dataset
                const datesSet = new Set(data.map(d => {
                    const date = new Date(d.time);
                    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
                }));
                const allDates = Array.from(datesSet).sort((a, b) => a - b);

                // 2️⃣ Aggregate counts per category per date
                const categories = [...new Set(data.map(d => d.category))];
                const aggregated = {};

                categories.forEach(cat => {
                    aggregated[cat] = allDates.map(date => {
                        const count = data.filter(d =>
                            d.category === cat &&
                            new Date(d.time).setHours(0, 0, 0, 0) === date
                        ).length;
                        return { x: date, y: count };
                    });
                });

                // 3️⃣ Build series for ApexCharts
                const series = categories.map(cat => ({ name: cat, data: aggregated[cat] }));

                setState(prev => ({ ...prev, series }));
            })
            .catch(err => console.error("Error fetching crimes:", err));
    }, []);

    return (
        <div id="chart" className="text-white">
            <ReactApexChart options={state.options} series={state.series} type="area" height={450} />
        </div>
    );
};

export default ApexChart;
