import { useState } from "react";
import useFetchRestaurants from "../Utils/useFetchRestaurants";
import Loading from "./Loading";
import Section from "./Section";
import { useSelector , useDispatch } from "react-redux";
import { updateSearchText } from "../Utils/SearchSlice";


const Body = () => {
    
    const cards = Array.from(useFetchRestaurants());
    const search = useSelector(store => store.search)
    let dispatch = useDispatch();

    return cards && (cards.length === 0) ? (<Loading  text={'Looking for great food near you...'}/>) : (
        
        <div className="lg:mx-[13%] mt-8"> 
            { search.isSearchClicked && <div className="">
                <input
                    placeholder="Search For Restaurants.."   
                    className="border-2 border-gray-400 rounded-md p-2 hover:border-orange-500"
                    value={search.searchText}
                    onChange={(e) => dispatch(updateSearchText(e.target.value))}
                />
            </div>
            }
           
             {
                cards.map((card, index) => (<Section key={index} card={card}/>))
            }
        </div>
    )
    
}

export default Body;