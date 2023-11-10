import { Card, CardBody } from "@nextui-org/react";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);
const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
export const data = {
    labels,
    datasets: [
        {
            type: 'line' as const,
            label: 'Ventas',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: labels.map(() => faker.datatype.number({ min: -200, max: 1000 })),
        },
        {
            type: 'bar' as const,
            label: 'Ganancias',
            backgroundColor: 'rgb(75, 192, 192)',
            data: labels.map(() => faker.datatype.number({ min: -200, max: 1000 })),
            borderColor: 'white',
            borderWidth: 2,
        },
      
    ],
};
const SalesOverview = () => {
    return (
        <>
            <Card>
                <CardBody>
                    <Chart type='bar' data={data} />
                </CardBody>
            </Card>
        </>
    )
}

export default SalesOverview;