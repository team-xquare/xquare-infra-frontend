import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TimeScale,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, TimeScale, Filler);

interface GraphProps {
  jsonData: {
    [key: number]: {
      [dateString: string]: string;
    };
  };
}

const options: ChartOptions<'line'> = {
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'minute',
        tooltipFormat: 'HH:mm',
        displayFormats: {
          minute: 'HH:mm',
        },
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 4,
      },
    },
    y: {
      grid: {
        display: true,
        color: '#EEEEEE',
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  interaction: {
    mode: 'point',
  },
};

export function ContainerGraph({ jsonData }: GraphProps) {
  const firstKey = Object.keys(jsonData)[0] as string;
  const dataMap = jsonData[Number(firstKey)];

  const labels = Object.keys(dataMap).map((time) => new Date(time));
  const usage = Object.values(dataMap).map((value) => parseFloat(value as string));

  const data = {
    labels,
    datasets: [
      {
        data: usage,
        backgroundColor: '#F0E6FF',
        borderColor: '#9650FA',
        fill: true,
      },
    ],
  };

  return (
    <div style={{ width: '220px', height: '110px' }}>
      <Line options={options} data={data} />
    </div>
  );
}
