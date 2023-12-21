import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector , useDispatch} from "react-redux";
import { updateIsSearchClicked, updateSearchText , clearSearchText} from "../Utils/SearchSlice";
import LocationPopup from "./LocationPopup";


const Navbar = () => {
    const cartItems = useSelector(store => store.cart.items);
    const location = useSelector(store => store.location.location);
    const search = useSelector(store => store.search)
   
    const Location = (props) => {
        return (
            <div className="flex space-x-2  hover:text-orange-500">
                <div className="font-bold text-lg underline">{props.address}  </div>
                <div className="font-semibold pt-1 text-sm truncate w-2/5">{props.description}</div>
            </div>
        )
    }

    let dispatch = useDispatch();

    const handleClick = () => {
        if(search.isSearchClicked) {
            dispatch(clearSearchText())
        }
        dispatch(updateIsSearchClicked())
    }

    const [showLocationPopUp, setShowLocationPopUp] = useState(false)
    return(
        <React.Fragment>
            <div className="sticky top-0 z-30 bg-white">
                <div className="p-5  md:flex md:justify-between lg:flex lg:justify-between lg:px-[5%] overflow-hidden  shadow-md select-none">
                    <div className="flex">
                        <div >
                            <Link to="/"><img className="h-10 w-10" src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg" alt="EatSome"/></Link>
                        </div>
                        <div  className="font-bold pl-4  text-lg truncate text-slate-600 cursor-pointer" onClick={() => {setShowLocationPopUp(!showLocationPopUp)}}>
                            {Object.keys(location.address).length > 0 ? <Location address={location.address.split(' ')[0]} description={location.description}/> :
                                                                         <Location address="Phase" description="Laxmi Chowk, Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Maharashtra"/>}
                        </div>
                    </div>
                    <ul className="flex space-x-8 ">
                        <li>
                            {   
                                !search.isSearchClicked ? (<button className=" text-gray-600 font-semibold text-lg hover:text-orange-500" onClick={() => handleClick()}>Search</button>) :
                                (<div className="flex">
                                    <input
                                        placeholder="Search For Restaurants.."   
                                        className="border-2 border-gray-400 rounded-md p-2 hover:border-orange-500"
                                        value={search.searchText}
                                        onChange={(e) => dispatch(updateSearchText(e.target.value))}
                                    />
                                    <button className="border-2 rounded-md p-2 border-gray-400 mx-2 hover:border-orange-500" onClick={() => handleClick()}>x</button>
                                </div>)
                            }
                        </li>
                     
                        <li><Link className=" text-slate-600 font-semibold text-lg hover:text-orange-500" to="/cart">Cart [{cartItems.length}]</Link></li>
                    </ul>
                </div>
            </div>
            <div>
                {
                    showLocationPopUp && <LocationPopup setShowLocationPopUp={() => {setShowLocationPopUp(!showLocationPopUp)}}/>
                }
            </div>
        </React.Fragment>  
    )
}

export default Navbar;