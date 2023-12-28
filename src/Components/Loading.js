import React from 'react'
import CardShimmer from './CardShimmer';

const Loading = ({text}) => {
    return (
        <div>
            <div className='flex justify-center font-bold p-20 sm:p-40 bg-[#282c3f] text-white font-sans'>{text}</div>
            <div>
                <CardShimmer/>
            </div>
        </div>
    )
}

export default Loading;