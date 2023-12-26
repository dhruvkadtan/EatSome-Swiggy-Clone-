const CardShimmer = () => {
    
    return (

            <div className="grid grid-cols-4 pl-[20%] pr-[20%]">
                  {Array(12).fill().map(() => {
                    
                    return (
                        
                        <div key={Math.random() * 100} className="w-[100%] h-[100%] rounded-lg p-2 hover:cursor-pointer hover:scale-95 overflow-hidden">
                            <div className="w-60 h-40 bg-gray-300 rounded-lg"></div>
                            <div className="mt-2 w-56 h-7 bg-gray-300 rounded-lg"></div>
                            <div className="mt-2 w-56 h-7 bg-gray-300 rounded-lg"></div>
                            <div className="mt-2 w-56 h-7 bg-gray-300 rounded-lg"></div>
                        </div>
                    )
                  })}
            </div>
   
    )

}

export const Shimmer = () => {
    return (
        <div className="w-60 h-92 rounded-lg hover:cursor-pointer hover:scale-95 overflow-hidden mb-8">
            <div className="w-50 h-40 border border-solid bg-gray-300"></div>
            <div className="mt-2 w-60 h-7 border border-solid bg-gray-300 rounded-lg"></div>
            <div className="mt-2 w-60 h-7 border border-solid bg-gray-300 rounded-lg"></div>
            <div className="mt-2 w-60 h-7 border border-solid bg-gray-300 rounded-lg"></div>
        </div>
    )
}

export default CardShimmer;


