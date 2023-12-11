import { useEffect, useState } from "react";
import { ADDRESS_RECOMMEND_URL, AUTOCOMPLETE_URL } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { updateLocation } from "../Utils/LocationSlice";
import { useNavigate } from "react-router-dom";

const LocationPopup = ({setShowLocationPopUp}) => {

    const [location , setLocation] = useState('');
    const [matchingLocations, setMatchingLocations] = useState([])
    const [fetchingLocations, setFetchingLocations] = useState(false);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleLocation = (location) => {
        dispatch(updateLocation(location));
        setShowLocationPopUp();
        navigate('/')
    }

    useEffect(() => {
        const fetchLocations = async() => {
            setFetchingLocations(true);
            const data = await fetch(AUTOCOMPLETE_URL + '?input=' + location )
            const json = await data.json();
            console.log(json)
            let allLocations = [];
            (json?.data).forEach((data) => {
                let add = {}
                add['place_id'] = data.place_id;
                add['place'] = data.terms[0];
                add['description'] = data.description;
                data.terms.splice(0,1);
                let address = ''
                data.terms.forEach((term,index) => {
                    address += term.value;
                    if(index + 1 < data.terms.length)
                        address += ','; 
                })
                add['address'] = address;
                allLocations.push(add);
            })
            setMatchingLocations(allLocations);
            setFetchingLocations(false);
        }

        const timer = setTimeout(() => {
            if(location)
                fetchLocations();
            else
                setMatchingLocations([])
        },1000)

        
    },[location]);

    
    return(
        <div className="bg-white border-2 shadow-sm h-screen w-1/3 fixed top-0 left-0 z-50">
            <div className="pl-[30%] pr-[10%] pb-[30%] pt-[10%] ">
                <div className="pb-2">
                    <img onClick={setShowLocationPopUp} className="w-8 h-8 hover:cursor-pointer" src="https://static.thenounproject.com/png/1202535-200.png" alt="close"/>
                </div>
                <div className="pb-2 flex ">
                    <input
                        className="p-2 w-full border-2 border-gray-400" 
                        placeholder="Search for area, street name.."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                 
                </div>
                <div className="border-2 border-gray-400">
                   {
                    fetchingLocations ? <div>Fetching Locations.. </div> : 
                        matchingLocations && matchingLocations.map((location) => {
                           return(
                                <div key={location.place_id} className="p-2 ml-2 cursor-pointer" onClick={() => handleLocation(location)}>
                                    <div className="font-bold text-md hover:text-orange-500" >{location.place.value}</div>
                                    <div className="text-sm text-gray-600">{location.address}</div>
                                    <div className="h-0.5 border border-gray-200 bg-gray-200 mt-3 mb-3"></div>
                                </div>
                           )
                        })
                   }
                </div>
            
            </div>
        </div>
    )
}

export default LocationPopup;