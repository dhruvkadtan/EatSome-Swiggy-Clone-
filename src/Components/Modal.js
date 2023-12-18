const Modal = ({isOpen, handleClose, modalDetails}) => {

    const {header, body, footer} = modalDetails;

    if (!isOpen) return null;
    return (
        <div className="fixed inset-x-0  bottom-10 flex items-center justify-center z-50">
            <div className="bg-white w-1/3 shadow-gray-600 shadow-lg ml-2 p-2 flex flex-col max-[450px]:w-full">
                <div className="flex-1 text-slate-700 text-lg p-2 font-bold">{header}</div>
                <div className="flex-1 text-gray-500 px-2">{body}</div>
                <div className="flex-1 flex py-2">
                    <button className="border border-green-500 m-2 p-2 w-1/2 text-green-500 font-bold" onClick={footer.no.handler}>{footer.no.message}</button>
                    <button className="bg-green-500 text-white font-bold border border-green-500 m-2 p-2 w-1/2" onClick={footer.yes.handler}>{footer.yes.message}</button>      
                </div>
            </div>
        </div>
    )
}

export default Modal;