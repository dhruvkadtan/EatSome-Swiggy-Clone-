import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../Utils/Constants";
import RestaurantMenuAccordion from "./RestaurantMenuAccordian";
import CardShimmer from "./CardShimmer";
import { useSelector , useDispatch } from "react-redux";
import { clearCart } from "../Utils/CartSlice";
import Loading from "./Loading";


const RestaurantMenu = () => {
    const resId = useParams();
    const [restaurant,setRestaurant] = useState(null);
    const [offers , setOffers] = useState([])
    const [showIndex, setShowIndex] = useState(0);
    const [menu , setMenu] = useState([])

    const containerRef = useRef(null);

    const prev = () => {
        containerRef.current.scrollLeft -= 500; 
    };

    const next = () => {
        containerRef.current.scrollLeft += 500; 
    };

    useEffect(() => {
       
        getRestaurantInfo();
       
    },[])

    const getRestaurantInfo = async() => {
        const data = await fetch(MENU_API + resId.id)
        const json = await data.json();
        setRestaurant(json?.data?.cards[0]?.card?.card?.info);
        setOffers(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers);
        setMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    }

    if(restaurant === null)
    {
        return (<><Loading text={"Hold Tight, Loading Menu"}/><CardShimmer/></>)
    }

    return(
        <div  className="pl-[20%] pr-[20%] pt-3 pb-3">
            <div className="border-b-2 border-dotted border-gray-500  p-2 flex justify-between">
                <div>
                    <h1 className="font-semibold text-xl">{restaurant?.name}</h1> 
                    <h3 className="font-light">{restaurant?.cuisines?.join(', ')}</h3>
                    <h3 className="font-light">{restaurant?.areaName}</h3>
                    <h3 className="font-light">{restaurant?.feeDetails?.message}</h3>
                </div>
                <div className='text-center border-2 border-gray-300  p-2  rounded-md mb-7'>
                    <div className='text-green-500 font-bold border-b-2 m-1 border-gray-300'>{restaurant?.avgRating}</div>
                    <div className='font-light text-sm'>{restaurant?.totalRatingsString}</div>
                </div>
            </div>
            <div className="border-b-2 border-gray-300 p-2">
                <div><h1 className="font-bold">{restaurant?.sla?.deliveryTime} MINS        {restaurant?.costForTwoMessage}</h1></div>
                <div className="flex space-x-2 pt-2 pb-2">
                    {
                        offers.length > 0 && offers.map((offer) => {
                            return (
                                <div className="border-2 border-gray-300 rounded-md p-1">
                                    <h2 className="text-md font-bold text-gray-500">{offer?.info?.header}</h2>
                                    <h3 className="text-xs font-semibold text-gray-500">{offer?.info?.couponCode} | {offer?.info?.description}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="border-b-8 border-gray-200 pb-5">
                {
                    menu.map((card,index) => (
                        
                        <div key={index}>
                            {
                                card?.card?.card?.carousel && 
                                
                                    <div>
                                        <div className='flex justify-between items-center mt-5 mb-3 '>
                                            <div className="font-bold text-2xl">{card?.card?.card?.title}</div>
                                                <div className='flex space-x-2'>
                                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer" onClick={prev}>
                                                        <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-4 h-4 text-black"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                                        ></path>
                                                        </svg>
                                                    </div>
                                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer" onClick={next}>
                                                        <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-4 h-4 text-black"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        ></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="overflow-x-scroll scrollbar-hide mt-4" ref={containerRef}>
                                            <div className='flex space-x-10'>
                                            {
                                                card?.card?.card?.carousel.map((offer) => (
                                                 <div className="" >
                                                    <img
                            
                                                        src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_628,h_704/" + offer?.creativeId}
                                                        style={{"minWidth" :"360px" , "minHeight" : "384px"}}
                                                    />
                                                </div>
                                           
                                                ))
                                            }
                                            </div>
                                        </div>
                                    </div>
                              
                              
                            }
                        </div>
                    ))
                }
            </div>
            <div className="mt-5">
              {
               
                menu.map((card,index) =>  (
                        <div key={index}>
                            {
                                (card?.card?.card?.itemCards )
                                && 
                                <RestaurantMenuAccordion
                                    resDetails = {restaurant}
                                    key={card?.card?.card?.title}
                                    cardDetails = {card?.card?.card}
                                    isAccordionOpen={index === showIndex}
                                    setShowIndex={() => {setShowIndex(index === showIndex ? null : index)}}
                                />
                            }
                        </div>
                    )
                )
              }
            </div>
            <div>

            </div>
        </div>  
    )
}

export default RestaurantMenu;