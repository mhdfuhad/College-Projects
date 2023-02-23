import Chart from "react-apexcharts";
import { useState } from "react";

export default function ReportChart(props) {
  const [chartData] = useState(props.data);

  const options = {
    labels: chartData.map((item) => item.category),
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "50px",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: "2em",
              color: "#2787AB",
              formatter: function (w) {
                let total = chartData.reduce((acc, cur) => {
                  return acc + cur.amount;
                }, 0);
                total = total.toFixed(2);
                return "$" + total;
              },
            },
          },
        },
      },
    },
  };

  const series = chartData.map((item) => item.amount);

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      width="100%"
      height={500}
    />
  );
}
