const CardShimmer = () => {
    return (
        <div className="shadow-sm shadow-black rounded-lg p-2"> 
            <div className="grid grid-cols-4 pl-[20%] pr-[20%]">
                  {Array(12).fill("").map((e) => {
                    return (
                        <div className="w-[100%] h-[100%] rounded-lg p-2 hover:cursor-pointer hover:scale-95 overflow-hidden">
                            <div className="w-60 h-40 bg-gray-300 rounded-lg"></div>
                            <div className="mt-2 w-56 h-7 bg-gray-300 rounded-lg"></div>
                            <div className="mt-2 w-56 h-7 bg-gray-300 rounded-lg"></div>
                            <div className="mt-2 w-56 h-7 bg-gray-300 rounded-lg"></div>
                        </div>
                    )
                  })}
            </div>
        </div>
    )

}

export default CardShimmer;


