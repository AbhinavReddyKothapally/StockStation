import Chart from './Chart';
import Details from './Details';
import Header from './Header';
import Overview from './Overview';
import { useContext, useEffect, useState } from 'react';
import StockContext from '../contexts/StockContext';
import { fetchQuote, fetchStockDetails } from '../api/stock-api';

const Dashboard = () => {

    const {stockSymbol} = useContext(StockContext);
    const [stockDetails ,setStockDetails] = useState({});
    const [quote,setQuote] = useState({});

    useEffect(() => {

      const updateStockDetails = async()=>{
        try {
          const results=await fetchStockDetails(stockSymbol);
          setStockDetails(results);
        } catch (error) {
          setStockDetails({});
          console.log(error);
        }
      };
      const updateStockOverview = async()=>{
        try {
          const results = await fetchQuote(stockSymbol);
          setQuote(results);
        } catch (error) {
          setQuote({});
          console.log(error);
        }
      };

      updateStockDetails();
      updateStockOverview();

    } ,[stockSymbol]);

    return(
      <div className="h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr p-10 gap-6 font-quicksand bg-neutral-100">
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
          <Header name={stockDetails.name}/>
        </div>
        <div className="md:col-span-2 row-span-4">
          <Chart />
        </div>
        <div>
          <Overview symbol={stockSymbol} price={quote.c} currency={stockDetails.currency} change={quote.d} changePercent={quote.dp}></Overview>
        </div>
        <div className="row-span-2 xl:row-span-3">
          <Details details={stockDetails}/>
        </div>
      </div>
    );
};

export default Dashboard 