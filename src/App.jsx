// Main Dashboard Component
import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import LineComp from "./line";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-blue-950 py-5 min-w-full flex flex-row justify-around px-12">
      <div className="flex flex-col w-1/3 mr-8 justify-between shadow-lg rounded-lg overflow-hidden">
        <div className="flex h-1/2 flex-row justify-around overflow-hidden">
          {/* <div className="flex flex-col justify-around bg-blue-300 text-black text-xl font-bold w-1/3 mr-4 px-6 py-4 shadow-lg rounded-lg overflow-hidden">
            <div>
              INFLOW
            </div>
            <div>
              10
            </div>
            <div>
              OUTFLOW
            </div>
            <div>
              10
            </div>
          </div> */}
          <div className="bg-blue-300 pb-4 text-black text-xl font-bold w-full  p-5 shadow-lg rounded-lg overflow-hidden">
            <div className="mb-2">WATER LEVEL</div>
            <div className="rounded-lg fit overflow-hidden">
              <GaugeChart />
            </div>
          </div>
        </div>
        <div className="bg-blue-400 mt-4 h-1/2 w-full shadow-lg rounded-lg p-4 overflow-hidden">
          <div className="font-bold text-black text-xl">Flood Analysis</div>
          <div>
            <LineChartWithCrossPointer />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/3 mr-8 shadow-lg rounded-lg overflow-hidden">
        <div className="w-full font-bold text-xl bg-rose-800 p-5 mb-5 shadow-lg rounded-lg overflow-hidden">
          DAM STATUS
        </div>
        <div>
          <img
            src="./src/assets/india-rivers-map.jpg"
            className="h-full w-full"
          />
        </div>
      </div>
      <div className="flex flex-col w-1/3 shadow-lg rounded-lg overflow-hidden">
        <div className="w-full font-bold text-xl bg-green-800 p-5 mb-5 shadow-lg rounded-lg overflow-hidden">
          WATER RELEASE:
        </div>
        <div className="flex flex-col justify-around gap-3 bg-blue-300 text-black font-bold px-6 py-4 shadow-lg rounded-lg overflow-hidden">
          <div className="text-xl">TOP TICKET SOLVER:</div>
          <div className="flex flex-row justify-between text-sm border-b-2 border-b-black ">
            <div>
              Name
            </div>
            <div>
              Score
            </div>
          </div>
          <LineComp name={"rahul"} score={"11"}/>
          <LineComp name={"rahul"} score={"11"}/>
          <LineComp name={"rahul"} score={"11"}/>
          <LineComp name={"rahul"} score={"11"}/>
          <LineComp name={"rahul"} score={"11"}/>
          <LineComp name={"rahul"} score={"11"}/>
        </div>
        <div className="bg-white">
          <LifeExpectancyChart/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const GaugeChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize the chart only once when the component mounts
    const chartInstance = echarts.init(chartRef.current, "dark");

    const option = {
      tooltip: {
        formatter: "{c}%",
      },
      series: [
        {
          name: "Pressure",
          type: "gauge",
          progress: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            
            formatter: "{value}",
          },
          data: [
            {
              value: 70,
              name: "",
            },
          ],
        },
      ],
    };

    // Set the chart options
    chartInstance.setOption(option);

    // Cleanup to prevent memory leaks
    return () => {
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "280px" }} />;
};

const LineChartWithCrossPointer = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize the chart
    const chartInstance = echarts.init(chartRef.current, "dark");

    const colors = ["#5470C6", "#EE6666"];
    const option = {
      color: colors,
      tooltip: {
        trigger: "none",
        axisPointer: {
          type: "cross",
        },
      },
      legend: {},
      grid: {
        top: 70,
        bottom: 50,
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[1],
            },
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return (
                  params.value +
                  (params.seriesData.length
                    ? "：" + params.seriesData[0].data
                    : "")
                );
              },
            },
          },
          data: [
            "0.1",
            "0.2",
            "0.3",
            "0.4",
            "0.5",
            "0.6",
            "0.7",
            "0.8",
            "0.9",
            "1.0",
          ],
        },
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[0],
            },
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return (
                  params.value +
                  (params.seriesData.length
                    ? "：" + params.seriesData[0].data
                    : "")
                );
              },
            },
          },
          data: [
            "0.1",
            "0.2",
            "0.3",
            "0.4",
            "0.5",
            "0.6",
            "0.7",
            "0.8",
            "0.9",
            "1.0",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "",
          type: "line",
          xAxisIndex: 1,
          smooth: true,
          emphasis: {
            focus: "series",
          },
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
          ],
        },
        {
          name: "",
          type: "line",
          smooth: true,
          emphasis: {
            focus: "series",
          },
          data: [
            3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3,
            0.7,
          ],
        },
      ],
    };

    // Set the chart options
    chartInstance.setOption(option);

    // Cleanup on component unmount
    return () => {
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "280px" }} />;
};

const LifeExpectancyChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current,'dark');

    // Data for the chart
    const data = [
      { Year: 1950, Country: 'Germany', Income: 3000 },
      { Year: 1960, Country: 'Germany', Income: 4000 },
      { Year: 1970, Country: 'Germany', Income: 5000 },
      { Year: 1980, Country: 'Germany', Income: 6000 },
      { Year: 1990, Country: 'Germany', Income: 7000 },
      { Year: 1950, Country: 'France', Income: 3200 },
      { Year: 1960, Country: 'France', Income: 4200 },
      { Year: 1970, Country: 'France', Income: 5200 },
      { Year: 1980, Country: 'France', Income: 6200 },
      { Year: 1990, Country: 'France', Income: 7200 },
    ];

    // Filtering and preparing datasets for the chart
    const germanyData = data.filter(
      (item) => item.Country === 'Germany' && item.Year >= 1950
    );
    const franceData = data.filter(
      (item) => item.Country === 'France' && item.Year >= 1950
    );

    const option = {
      title: {
        text: 'Income of Germany and France since 1950',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
        data: germanyData.map((item) => item.Year),
      },
      yAxis: {
        name: 'Income',
      },
      series: [
        {
          name: 'Germany',
          type: 'line',
          data: germanyData.map((item) => item.Income),
          showSymbol: false,
        },
        {
          name: 'France',
          type: 'line',
          data: franceData.map((item) => item.Income),
          showSymbol: false,
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};


// echo "# dashboard-ml" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/VRAHUL1232/dashboard-ml.git
// git push -u origin main