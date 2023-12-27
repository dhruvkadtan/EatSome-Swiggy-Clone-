import Item from "./Item";


const RestaurantMenuAccordion = ({resDetails, cardDetails, isAccordionOpen,setShowIndex }) => {

    console.log(cardDetails)
    return(
        <div className="mb-8 border-b-8 border-gray-200">
            <div className="cursor-pointer flex justify-between " 
                onClick={() => {
                setShowIndex();
            }}>
                <div className="font-bold p-4 text-gray-500 text-lg">
                    {cardDetails?.title}  {cardDetails?.itemCards && (" (" + cardDetails?.itemCards?.length+ ")")}
                </div>
                <div>
                    { isAccordionOpen ? (
                        <img
                        alt='collapse'
                        className="w-5 h-5 m-3"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/OOjs_UI_icon_collapse.svg/2048px-OOjs_UI_icon_collapse.svg.png"
                        />
                        ) : (
                        <img    
                        alt="expand"
                        className="w-5 h-5 m-3"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVb1IcFrhPX2fOXprYZ-vX4xKjRWEa8KLLA&usqp=CAU"
                        />
                    )}
                </div>
            </div>
            {
                isAccordionOpen &&   <div>
                    {
                        cardDetails?.itemCards  && cardDetails?.itemCards
                                .map((detail) => <Item resDetails={resDetails} item={detail}/>)
                    }
                </div>
            }
        </div>
    )
}

export default RestaurantMenuAccordion;

