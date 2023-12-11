import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL, MENU_API } from "../Utils/Constants";

const RestaurantMenu = () => {
    const resId = useParams();
    const [restaurant,setRestaurant] = useState(null);

    const [showIndex, setShowIndex] = useState(0);

    useEffect(() => {
        getRestaurantInfo();
    },[])

    const getRestaurantInfo = async() => {
        const data = await fetch(MENU_API + resId.id)
        const json = await data.json();
        setRestaurant(json?.data?.cards[0]?.card?.card?.info);
        console.log(json)
    }

    if(restaurant === null)
    {
        return (<h3>Fetching restaurant menu for you...</h3>)
    }

    return(
        <div  className="pl-[20%] pr-[20%] pt-3 pb-3">
            <div className="border-b-2 border-dotted border-gray-500  p-2 flex justify-between">
                <div>
                    <h1 className="font-semibold">{restaurant?.name}</h1> 
                    <h3 className="font-light">{restaurant?.cuisines?.join(', ')}</h3>
                    <h3 className="font-light">{restaurant?.areaName}</h3>
                    <h3 className="font-light">{restaurant?.feeDetails?.message}</h3>
                </div>
                <div className='text-center border-2 border-gray-300  p-2  rounded-md mb-7'>
                    <div className='text-green-500 font-bold border-b-2 m-1 border-gray-300'>{restaurant?.avgRating}</div>
                    <div className='font-light text-sm'>{restaurant?.totalRatingsString}</div>
                </div>
            </div>
            <div className="border-b-2 border-gray-500 p-2">
                <h1 className="font-bold">{restaurant?.sla?.deliveryTime} MINS        {restaurant?.costForTwoMessage}</h1>
            </div>
            <div className="mt-5">
               {restaurant?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map((card,index) =>
                     {
                    <div key={index}>
                        {
                            card?.card?.card?.itemCards && 
                            <RestaurantMenuAccordion 
                              key={card?.card?.card?.title} 
                              cardDetails={card?.card?.card}
                              resDetails={restaurant}
                              isAccordionOpen={index === showIndex}
                              setShowIndex={() => {setShowIndex(index === showIndex ? null : index)}}
                            />    
                        }
                    </div>
               })}
            </div>
            <div>

            </div>
        </div>  
    )
}

export default RestaurantMenu;