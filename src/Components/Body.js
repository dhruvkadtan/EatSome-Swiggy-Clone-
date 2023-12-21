
import useFetchRestaurants from "../Utils/useFetchRestaurants";
import Loading from "./Loading";
import Section from "./Section";


const Body = () => {
    
    const cards = Array.from(useFetchRestaurants());
  

    return cards && (cards.length === 0) ? (<Loading  text={'Looking for great food near you...'}/>) : (
        
        <div className="lg:mx-[10%] mt-8 select-none"> 
 
             {
                cards.map((card, index) => (<Section key={index} card={card}/>))
            }
        </div>
    )
    
}

export default Body;