import { Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from "chart.js";
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard(props) {
    const data = {
        labels: ["Active User", "Inactive User"],
        datasets: [
            {
                backgroundColor: ["#41B883", "#E46651"],
                data: [props.data.active_user, props.data.inactive_user],
            },
        ],
    };

    const data2 = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        datasets: [
            {
                label: "Sales 2023 (M)",
                data: [3, 2, 2, 1, 5, 4, 7],
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly Sales Data",
            },
        },
    };

    return (
        <>
            <div className="grid sm:grid-flow-col sm:grid-cols-2 gap-2">
                <div className="min-w-md text-center">
                    <Pie data={data} options={options} />
                </div>
                <div className="min-w-md text-center">
                    <Line data={data2} options={options2} />
                </div>
            </div>
        </>
    );
}
