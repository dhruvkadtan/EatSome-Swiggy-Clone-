import { MENU_IMG_CDN } from "../Utils/Constants";

const RestaurantMenuAccordion = ({ cardDetails, isAccordionOpen,setShowIndex }) => {

    return(
        <div>
            <div className="cursor-pointer flex justify-between mb-8 border-b-8 border-gray-200" 
                onClick={() => {
                setShowIndex();
            }}>
                <div className="font-bold p-4 text-gray-500 text-lg">
                    {cardDetails?.title + " (" + cardDetails?.itemCards?.length + ")"}
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
                        cardDetails?.itemCards && cardDetails?.itemCards.map((detail) => {
                            return(
                            <div className="flex border-b-2 border-gray-300 p-3 space-x-2 justify-between" key={detail?.card?.info?.id}>
                                <div style={{"maxWidth" : "calc(100% - 144px)"}}>
                                    <h2 className="text-slate-800 font-semibold">{detail?.card?.info?.name}</h2>
                                    <h3 className="text-slate-800 font-semibold">{detail?.card?.info?.price / 100}</h3>
                                    <h3 className="text-gray-400 mt-2 mb-2">{detail?.card?.info?.description}</h3>
                                </div>
                                <div className="">
                                    <img
                                        className="rounded-md"
                                        style={{"width" : "118px" , "height" : "96px" ,"background" : "rgb(251, 238, 215)"}}
                                        src={MENU_IMG_CDN + detail?.card?.info?.imageId}
                                    />
                                    <button 
                                             className="ml-[20%] font-semibold rounded-md text-sm px-5 py-2 text-green-500 border-2 border-gray-300">
                                        ADD
                                    </button>
                                </div>
                            </div>
                        )})
                    }
                </div>
            }
        </div>
    )
}

export default RestaurantMenuAccordion;