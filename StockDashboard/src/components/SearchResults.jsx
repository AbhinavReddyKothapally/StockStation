import { useContext } from "react";
import StockContext from "../contexts/StockContext";

const SearchResults = ({results}) => {
    
    const {setStockSymbol} =useContext(StockContext);

    return (
        <ul className="absolute top-12 border-2 w-full overflow-y-scroll rounded-md h-64 bg-white">
            {results.map((item) => 
            {
                return(
                <li key={item.symbol} className="cursor-pointer p-2 m-4 flex items-center rounded-md justify-between hover:bg-blue-200" 
                onClick={()=>{
                    setStockSymbol(item.symbol);
                }}
                >
                <span>{item.symbol}</span>
                <span>{item.description}</span>
                </li>);
            })}
        </ul>
    );
};

export default SearchResults;