import React, { useState, useCallback, useEffect } from "react";
import { useAllPayment } from "../../api/payment/api";
import SearchBar from "./SearchBar";
import DatePickerRange from "./DateSelect";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Sector,
} from "recharts";
import { paymentServices } from "../../api/payment/services";
import Pagination from "../../components/Pagination";

//#region
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dataForPie = [
  { name: "App", value: 400 },
  { name: "Instructors", value: 300 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

//#endregion

export default function IncomeReportPage() {
  const [total, setTotal] = useState(1021);
  //   const [part1, setPartOne] = useState(0);
  //   const [part2, setPartTwo] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataTable, setDataTable] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Implement filtering/searching logic here based on the value
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const fetchData = async () => {
    try {
      const { error, data } =
        await paymentServices.GetPaymentTableRefInstructor(
          new Date(2024, 11, 1, 0, 0, 0),
          new Date(2024, 11, 31, 0, 0, 0)
        );

      setDataTable(data);
      console.log({ data });
    } catch (error) {
      alert("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalMoneyOfApp = 0;
  const totalMoneyOfIns = 0;
  // dataTable.map((row) => {
  //   // totalMoneyOfApp += row.amount;
  //   totalMoneyOfIns += row.totalPaidForInstructor;
  // });

  const handlePaidClick = async (ins_id, amount) => {
    await paymentServices.PaidForInstructor(
      ins_id,
      amount,
      new Date(2024, 11, 1, 0, 0, 0),
      new Date(2024, 11, 31, 0, 0, 0)
    );
  };

  return (
    <div className="max-w-full overflow-hidden px-11 py-14 flex flex-col gap-8 box-border">
      <div className="flex flex-row gap-8">
        <div className="bg-white hover:bg-app-primary-color flex flex-col gap-3 p-6 basis-1/3 justify-center items-start drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl w-[281px] h-[136px]">
          <p className="font-normal text-xl">Total Income</p>
          <p className="font-medium text-4xl">{total}</p>
        </div>
        <div className="bg-white hover:bg-app-primary-color flex flex-col gap-3 p-6 basis-1/3 justify-center items-start drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl w-[281px] h-[136px]">
          <p className="font-normal text-xl">App Revenue</p>
          <p className="font-medium text-4xl">{total}</p>
        </div>
        <div className="bg-white hover:bg-app-primary-color flex flex-col gap-3 p-6 basis-1/3 justify-center items-start drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl w-[281px] h-[136px]">
          <p className="font-normal text-xl">Pay For Instructors</p>
          <p className="font-medium text-4xl">{total}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <SearchBar handleSearch={handleSearch} />
        <DatePickerRange></DatePickerRange>
        {/* <Datepicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          showShortcuts={true}
        /> */}
      </div>
      <div className="w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name Instructor</th>
              <th>Trade Discount</th>
              <th>Total Payment</th>
              <th>Commission</th>
              <th>Instructor Payment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row, i) => (
              <tr key={row.id}>
                <td>{i}</td>
                <td>{row.name}</td>
                <td>{row.trade_discount}</td>
                <td>{row.amount}</td>
                <td>{row.commission}</td>
                <td>{row.totalPaidForInstructor}</td>
                <td>
                  <button
                    disabled={row.commission === 0}
                    className="btn"
                    onClick={async () => {
                      handlePaidClick(row.id, row.commission);
                      await fetchData();
                    }}
                  >
                    Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Pagination></Pagination> */}
      </div>
      <div className="grid grid-cols-2 w-full">
        <div className="w-full flex flex-col gap-5 justify-center items-center">
          <p className="font-normal text-2xl font-roboto">
            Total income over recent months
          </p>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </div>

        <div className="w-full flex flex-col gap-5 justify-center items-center">
          <p className="font-normal text-2xl font-roboto">
            Percentage of revenue this month
          </p>
          <PieChart width={600} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={[
                { name: "App", value: 400 },
                { name: "Instructors", value: 0 },
              ]}
              innerRadius={100}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
