import Card from "./Card";

const Overview = ({symbol,price,currency,change,changePercent}) => {
    
    return (
        <Card>
            <span className="absolute top-4 left-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">{symbol}</span>
            <div className="w-full h-full flex items-center justify-around">
                <span className="flex items-center text-2xl xl:text-4xl 2xl:text-5xl">
                    ${price}
                    <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400">
                        {currency}
                    </span>
                </span>
                <span className={`text-lg xl:text-xl 2xl:text-2xl ${change>0 ? "text-green-500" : "text-red-500"} `}>
                    {change} <span>({changePercent}%)</span>
                </span>
            </div>
        </Card>
    );
};
export default Overview;