import { useState } from "react"
import { XIcon, SearchIcon } from "@heroicons/react/solid";
import SearchResults from "./SearchResults";
import { stockSymbol } from "../api/stock-api";

const Search = () => {
    
    const [input,setInput] = useState("");
    const [bestMatches,setBestMatches] = useState([]);

    const clear = () =>{
        setInput("");
        setBestMatches([]);
    }

    const updateBestMatches = async () =>{
        try {
            if(input)
            {
                const searchResults = await stockSymbol(input);
                const results = searchResults.result;
                setBestMatches(results);
            }
        }
        catch (error) {
            setBestMatches([]);
            console.log(error);
        }
    }

    return (
        <div className="flex items-center my-4 border-2 z-50 relative w-96 rounded-md bg-white border-neutral-200">
            <input type="text" value={input} placeholder="Search Stock..." 
                className="w-full px-3 py-3 focus:outline-none rounded-md"
                onChange={(event) => {setInput(event.target.value)}}
                onKeyPress={(event) => {
                    if(event.key === "Enter"){
                        updateBestMatches();
                    }
                }}
            />
            { input && (<button onClick={clear}>
                <XIcon className="w-6 h-6 m-2 fill-gray-400"/>
            </button>) }
                
            <button className="bg-blue-500 h-8 w-8 rounded-md flex justify-center items-center m-1 p-2"
            onClick={updateBestMatches}
            >
                <SearchIcon className="w-4 h-4 fill-white"/>
            </button>
            { input && bestMatches.length>0 ? <SearchResults results={bestMatches}/> : null}
        </div>
        
    );
};
export default Search;