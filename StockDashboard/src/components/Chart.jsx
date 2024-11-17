import { useContext, useState, useEffect } from 'react';
import { convertUnixTimeStampToDate, convertDateToUnixTimeStamp ,createDate } from '../helpers/date-helper';
import Card from './Card';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip,} from 'recharts';
import StockContext from '../contexts/StockContext';
import { fetchHistoricalData } from '../api/stock-api';
import { chartConfig } from '../constants/config';
import ChartFilter from './chartFilter';

const Chart = () => {
    const [data, setData] = useState([]);
    const [filter,setFilter] = useState("1W");

    const {stockSymbol} = useContext(StockContext);
   
    const formatData = (data) =>{
        return data.c.map((item,index) => {
                return{
                    value: item.toFixed(2),
                    date: convertUnixTimeStampToDate(data.t[index]),
                };
            });
    };

    useEffect(() => {
        const getDateRange =()=>{
            const {days,weeks,months,years} = chartConfig[filter];
            const endDate=new Date();
            const startDate=createDate(endDate,-days,-weeks,-months,-years);
            const startDateUnixTimeStamp=convertDateToUnixTimeStamp(startDate);
            const endDateUnixTimeStamp=convertDateToUnixTimeStamp(endDate);

            return {startDateUnixTimeStamp,endDateUnixTimeStamp};
        };
        const updateChartData = async()=>{
            try {
                const resolution=chartConfig[filter].resolution;
                const {startDateUnixTimeStamp,endDateUnixTimeStamp} = getDateRange();
                const results= await fetchHistoricalData(stockSymbol,resolution,startDateUnixTimeStamp,endDateUnixTimeStamp);
                setData(formatData(results));
            } catch (error) {
                setData([]);
                console.log(error);
            }
        };
        
        updateChartData();

    },[stockSymbol,filter]);

    return (
         <Card>
             <ul className="flex absolute top-2 right-2 z-40">
            {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>
            <ResponsiveContainer>
                <AreaChart data={data}>
                <Area 
                type="monotone"
                dataKey="value"
                stroke="#312e81"
                fillOpacity={1}
                strokeWidth={0.5}
                />
                <Tooltip />
                <XAxis dataKey="date"/>
                <YAxis domain={["dataMin","dataMax"]}/>
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};
export default Chart;