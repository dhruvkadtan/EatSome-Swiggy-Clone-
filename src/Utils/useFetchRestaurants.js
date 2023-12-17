import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ADDRESS_RECOMMEND_URL, FETCH_CARDS_URL } from "./Constants";
import Loading from "../Components/Loading";

const useFetchRestaurants = () => {
    const [cards,setCards] = useState([]);

    const [isDataFetched, setIsDataFetched] = useState(false);

    const location = useSelector(store => store.location.location)

    useEffect(() => {
    
        const getLatLng = async() => {
            const data = await fetch(ADDRESS_RECOMMEND_URL + location.place_id);
            const json = await data.json();
            let geometry = json.data[0].geometry.location;
            localStorage.setItem('latLng', JSON.stringify(geometry));
            getAllRestaurants(geometry);
        }

        const getAllRestaurants = async( geometry) => {
            setIsDataFetched(false)
            const data = await fetch(FETCH_CARDS_URL + 'lat=' + geometry.lat + '&lng=' + geometry.lng)

            const json = await data?.json();
          
            const sections = new Map();
            let title = '';
            let isFirstTime = true;
       
            (json.data.cards).forEach((card)=> {
                let cardDetails = card?.card?.card;

                if(cardDetails.gridElements && cardDetails.imageGridCards && !cardDetails.header.title) {
                    cardDetails.title = 'Offers';
                    sections.set('offers',{isPresent : true , data : cardDetails})
                } else if(cardDetails.id == 'whats_on_your_mind') {
                    sections.set('whats_on_your_mind',{isPresent : true , data : cardDetails})
                } else if(cardDetails.id == 'top_brands_for_you') {
                    sections.set('top_brands_for_you',{isPresent : true, data : cardDetails})
                } else if(cardDetails.id == 'popular_restaurants_title') {
                    title = cardDetails.title;
                } else if(cardDetails.id == 'restaurant_grid_listing') {
                    cardDetails['title'] = title;
                    sections.set('restaurants_list', {isPresent: true, data: cardDetails});
                } else if (cardDetails.id === 'restaurant_near_me_links') {
                    if(isFirstTime) {
                        sections.set('otherDetails', {isPresent: true, data: [cardDetails]});
                        isFirstTime = false;
                    } else {
                        let details = sections.get('otherDetails');
                        details.data.push(cardDetails);
                        sections.set('otherDetails', details);
                    }
                }
            });


            setCards(sections);
            setIsDataFetched(true)
        }
        
        
        if(Object.keys(location).length > 1) {
            console.log(Object.keys(location)   )
            getLatLng();
        } else {
            getAllRestaurants({lat : 18.5997736 , lng : 73.7346365});
        }


    },[location])

    if(!isDataFetched) {
        return <Loading text={"Looking For a Great Food Near You..."}/>
    }

    return cards;
}

export default useFetchRestaurants;