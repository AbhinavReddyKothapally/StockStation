import Card from "./Card";

const Details = ({details}) => {
    
    const detailedList={
        name : "Name",
        country : "Country",
        currency : "Currency",
        exchange : "Exchange",
        ipo : "IPO Date",
        marketCapitalization : "Market CAP",
        finnhubIndustry : "Industry",
    };

    const millionToBillion = (num) => {
        return (num/1000).toFixed(2);
    }
    return (
        <Card>
            <ul className="w-full h-full flex flex-col justify-between divide-y-1">
                {Object.keys(detailedList).map((item) => {
                    return(<li key={item} className="flex-1 flex justify-between items-center">
                        <span>{detailedList[item]}</span>
                        <span>{item==="marketCapitalization"? `${millionToBillion(details[item])}B` :details[item]}</span>
                    </li>)
                })}

            </ul>
        </Card>
    );
};
export default Details;