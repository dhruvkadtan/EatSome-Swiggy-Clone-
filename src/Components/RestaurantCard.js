
import { IMG_CDN_URL } from "../Utils/Constants";


const RestaurantCard = (props) => {
    const {resData, shouldEnableCarousel,offerDetailsInfo} = props;
    const {name, cloudinaryImageId, cuisines, avgRating, areaName, aggregatedDiscountInfoV3} = resData?.info; 

    return (
        <div className={shouldEnableCarousel ? "h-92 w-60 hover:cursor-pointer hover:scale-95 rounded-lg" : "w-60 h-92 pb-8 max-[300px]:mx-[14%] justify-between hover:cursor-pointer hover:scale-95 overflow-hidden rounded-lg"}>
            <div className='relative'>
                <img 
                    alt={name}
                    className="h-44 w-full overflow-hidden rounded-lg"
                    src={IMG_CDN_URL + cloudinaryImageId}
                />
                {aggregatedDiscountInfoV3 && <div className="absolute inset-x-0 rounded-b-lg bottom-0 h-6 bg-black bg-opacity-50 ">
                                                <label className='absolute font-extrabold text-center inset-x-[10%]  text-white z-10 hover:cursor-pointer'>{offerDetailsInfo}</label>
                                            </div>}
            </div>
            <div className='overflow-hidden text-lg break-words font-bold text-slate-700 leading-8 m-1 truncate'>{name}</div>
                <div className="flex text-center">
                    <div className="pl-1 text-slate-700  font-semibold">{avgRating}</div>
                    <div className="font-semibold text-slate-700 ">. {resData?.info?.sla?.slaString}</div>
                </div>
            <div className='truncate m-1  leading-4 text-sm text-slate-500 '>{cuisines.join(", ")}</div>
            <div className='m-1 leading-3 text-sm text-slate-500 '>{areaName}</div>
        </div>
    )
}

export const withOfferText = (RestaurantCard) => {
    return ({resData}) => {
        let offerDetails = resData.info.aggregatedDiscountInfoV3;
        let offerDetailsInfo = " ";
        if(offerDetails.header) {
            offerDetailsInfo += offerDetails.header;
        } if (offerDetails.subHeader) {
            offerDetailsInfo += " " + offerDetails.subHeader;
        }
        return (
            <div className='relative'>
                <RestaurantCard resData={resData} offerDetailsInfo={offerDetailsInfo}/>
            </div>
        )
    }
}


export default RestaurantCard;

