
import { IMG_CDN_URL } from "../Utils/Constants";


const RestaurantCard = (props) => {
    const {resData, shouldEnableCarousel} = props;
    const {name, cloudinaryImageId, cuisines, avgRating, areaName, aggregatedDiscountInfoV3} = resData?.info; 

    return (
        <div className={shouldEnableCarousel ? "h-92 w-52 p-2 m-2 hover:cursor-pointer hover:scale-95 rounded-md" : " w-56 h-92 p-2 m-2 hover:cursor-pointer hover:scale-95 overflow-hidden rounded-md"}>
            <div className='relative'>
                <img 
                    alt={name}
                    className="h-44 w-full overflow-hidden rounded-lg hover:scale-95"
                    src={IMG_CDN_URL + cloudinaryImageId}
                />
                {aggregatedDiscountInfoV3 && <div className="absolute inset-x-0 bottom-0 h-6 bg-black opacity-50"></div>}
            </div>
            <div className='overflow-hidden text-lg break-words font-bold leading-8 m-2 truncate'>{name}</div>
            <div className="m-2 font-semibold">{avgRating} . {resData?.info?.sla?.slaString}</div>
            <div className='truncate m-2 leading-4 text-sm'>{cuisines.join(", ")}</div>
            <div className='m-2 leading-3 text-sm'>{areaName}</div>
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
                <label className='absolute font-extrabold text-center top-40 left-5 text-white z-10 hover:cursor-pointer hover:scale-95'>{offerDetailsInfo}</label>
                <RestaurantCard resData={resData}/>
            </div>
        )
    }
}


export default RestaurantCard;

