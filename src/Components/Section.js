import { Link, json } from "react-router-dom";
import Carousel from "./Carousel";
import { useEffect, useRef, useState } from "react";
import RestaurantCard , {withOfferText} from "./RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurants } from "../Utils/restaurantSlice";
import { UPDATE_RESTAURANTS_LIST_URL } from "../Utils/Constants";
import { Shimmer } from "./CardShimmer";
import { updateIsSearchClicked } from "../Utils/SearchSlice";

const Section = ({card}) => {
  
    
    const RestaurantCardWithOffer = withOfferText(RestaurantCard);
    const search = useSelector(store => store.search)

    const [isLoading, setIsLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    

    
    const containerRef = useRef(null);
    const scrollDivRef = useRef(null);

    let dispatch = useDispatch()

    const prev = () => {
        containerRef.current.scrollLeft -= 500; 
    };

    const next = () => {
        containerRef.current.scrollLeft += 500;
    };
    
    const allRestaurants = useSelector((store) => store.restaurants.restaurants)
    
   

    if(card[0] === 'restaurants_list') {
        localStorage.setItem('resCount', allRestaurants.length + 1);
    }

    useEffect(() => {

        if(card[0] === 'restaurants_list') {
            setRestaurants(allRestaurants);
            if(search.searchText.length > 0)
            {
               let filtered = []
               allRestaurants.map((res) => {
                    if(res.info.name.toLowerCase().includes(search.searchText.toLowerCase()))
                        filtered.push(res)
               })
               setFilteredRestaurants(filtered)
            } else 
                setFilteredRestaurants(allRestaurants);   
          
        } else if (card[0] === 'top_brands_for_you') {
            setRestaurants(card[1].data.gridElements.infoWithStyle.restaurants);
            if(search.searchText.length > 0){
                let filtered = []
                card[1].data.gridElements.infoWithStyle.restaurants.map((res) => {
                    if(res.info.name.toLowerCase().includes(search.searchText.toLowerCase()))
                        filtered.push(res)
               })
               setFilteredRestaurants(filtered)
            } else
                setFilteredRestaurants(card[1].data.gridElements.infoWithStyle.restaurants);
        } 
    }, [card, allRestaurants,search]);

    

    useEffect(() => {
      
        if(card[0] === 'restaurants_list') {
            let isFetchCalled = false;
            let res = card[1].data?.gridElements?.infoWithStyle?.restaurants;
            dispatch(updateRestaurants({cardDetails: res, isUpdate: false}));
            
            const fetchRes = async () => {
                setIsLoading(true);
                let count = JSON.parse(localStorage.getItem('resCount')) ? JSON.parse(localStorage.getItem('resCount')) : 10;
                let latLng = JSON.parse(localStorage.getItem('latLng'));
                
                const data = await fetch(UPDATE_RESTAURANTS_LIST_URL, {
                    method: "POST", 
                    mode : 'cors',
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "lat": latLng?.lat ? latLng.lat : 17.385044,
                        "lng": latLng?.lng ? latLng.lng : 78.486671,
                        "nextOffset": "COVCELQ4KICg97fn1ojZJTCnEw==",
                        "widgetOffset": {
                            "NewListingView_Topical_Fullbleed": "",
                            "NewListingView_category_bar_chicletranking_TwoRows": "",
                            "NewListingView_category_bar_chicletranking_TwoRows_Rendition": "",
                            "Restaurant_Group_WebView_PB_Theme": "",
                            "Restaurant_Group_WebView_SEO_PB_Theme": "",
                            "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": JSON.stringify(count),
                            "inlineFacetFilter": "",
                            "restaurantCountWidget": ""
                        },
                        "filters": {},
                        "seoParams": {
                            "seoUrl": "https://www.swiggy.com/",
                            "pageType": "FOOD_HOMEPAGE",
                            "apiName": "FoodHomePage"
                        },
                        "page_type": "DESKTOP_WEB_LISTING",
                        "_csrf": "YH5n08SgbkUZ-zpAL-zeJwmc09fXXBG7yc5H8D_s"
                    }), 
                });
                const json = await data.json();
              
                let restaurantsData = json.data.cards[0].card.card.gridElements.infoWithStyle.restaurants;
                localStorage.setItem('resCount', JSON.stringify(restaurantsData.length))
                dispatch(updateRestaurants({cardDetails: restaurantsData, isUpdate: true}));
                isFetchCalled = false;
                setIsLoading(false);
            };

            const handleScroll = () => {
               
                if (scrollDivRef.current) {
                  const rect = scrollDivRef.current.getBoundingClientRect();
                  const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
          
                  if (isVisible && !isFetchCalled) {
                
                    fetchRes();
                    isFetchCalled = true;
                  }
                }
            };
            
            window.addEventListener('scroll', handleScroll);
        
            return () => {
            window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [card, dispatch])

    if((card[0] === 'offers' || card[0] === 'whats_on_your_mind') && !search.isSearchClicked ) {
        let style = {};
        let imageUrl = '';
        let data = card[1].data.gridElements.infoWithStyle.info;

        if(card[0] === 'offers') {
            style = {'width': 425, 'height': 252};
            imageUrl = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/';
            title = 'Best offers for you';
            
            return (
                <Carousel
                    style={style} 
                    imageUrl={imageUrl} 
                    data={data}
                    title={title}
                />
            )
        }  else if (card[0] === 'whats_on_your_mind'){
            style = {'width': 144, 'height': 180};
            imageUrl = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/';
            title = card[1].data.header.title;
           
            return (
            
                    <Carousel 
                        style={style} 
                        imageUrl={imageUrl} 
                        data={data}
                        title={title}
                    />
  
            )
        }
    }  else if(card[0] === 'top_brands_for_you' || card[0] === 'restaurants_list') {
       
    
       return (
            <div className='sm:m-[5%] min-[375px]:m-[5%] max-[412px]:m-[5%] '>
                     
                <div className=" flex justify-between space-x-2">
                    <div className="font-bold min-[300px]:text-lg md:text-xl lg:text-2xl ">{card[1].data.title ? card[1].data.title : card[1].data.header.title}</div>
                    {
                        card[0] === 'top_brands_for_you' && <div className="flex space-x-2">
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
                    }
                </div>
                <div ref={containerRef} className= {card[0] === 'top_brands_for_you' ? 'flex mt-4 space-x-5 overflow-x-scroll scrollbar-hide' : 'grid max-[580px]:mx-[14%]  min-[300px]:grid-cols-1 min-[580px]:grid-cols-2 min-[1060px]:grid-cols-3 min-[1300px]:grid-cols-4 mt-4'}>
                    {
                        filteredRestaurants.map((restaurant) => {
                            return(
                            <Link key={restaurant.info.id} to={"restaurant/" + restaurant.info.id}> 
                            {   
                                  restaurant.info.aggregatedDiscountInfoV3 ?
                                  <RestaurantCardWithOffer resData={restaurant}/> :
                                  <RestaurantCard resData={restaurant} shouldEnableCarousel={card[0] === 'top_brands_for_you' ? true : false}/>
                            }
                            </Link>
                            )
                        })
                    }
                </div>
                <div>
                    {
                        card[0] === 'restaurants_list' && <div ref={scrollDivRef}></div>
                    }
                </div>
                {isLoading && 
                    <div className="grid min-[300px]:grid-cols-1 min-[580px]:grid-cols-2 min-[1060px]:grid-cols-3 min-[1300px]:grid-cols-4 ">
                        {
                            Array(8).fill("").map((arr) => (
                                <Shimmer/>
                            ))
                        }
                    </div>
                }
            </div>
       )
    } else if(card[0] === 'otherDetails') {
        let other = card[1].data;
       
        return(
            <div>
                {other.map((details,index) => {
                    return(
                    <div key={index} className="m-4">
                        <div className="font-bold min-[300px]:text-lg md:text-xl lg:text-2xl">{details.title}</div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-center">
                            {details.brands.map((brand, index) => (
                            <div className='border p-4 truncate cursor-pointer' key={index}><a href={brand.link} target='_blank' rel="noreferrer">{brand.text}</a></div>
                            ))}
                        </div>
                    </div>
                    )
                })}
            </div>
        )
    }
}

export default Section;