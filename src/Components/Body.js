
import { useDispatch, useSelector } from "react-redux";
import useFetchRestaurants from "../Utils/useFetchRestaurants";
import Loading from "./Loading";
import Section from "./Section";
import { updateIsSearchClicked , updateSearchText, clearSearchText } from "../Utils/SearchSlice";

const Body = () => {
    
    const cards = Array.from(useFetchRestaurants());
    const search = useSelector(store => store.search)
    const dispatch  = useDispatch();

    return cards && (cards.length === 0) ? (<Loading  text={'Looking for great food near you...'}/>) : (
        
        <div className="lg:mx-[10%] md:mx-[5%] mt-8 select-none"> 
             {
                    search.isSearchClicked && (
                        <div className="flex min-[1px]:px-[10%] md:px-[15%] lg:px-[25%] justify-center space-x-2">
                           <input 
                                placeholder="Search For Restaurants.."
                                className="border-2 w-full border-gray-400 hover:border-orange-500 rounded-lg p-2"
                                onChange={(e) => dispatch(updateSearchText(e.target.value))}
                           />
                           <button onClick={() => {dispatch(updateIsSearchClicked()) ; dispatch(clearSearchText())}} className="border-2 border-gray-400 hover:border-orange-500 rounded-lg p-2">X</button>
                        </div>
                    )
                }
             {
                cards.map((card, index) => (<Section key={index} card={card}/>))
            }
        </div>
    )
    
}

export default Body;