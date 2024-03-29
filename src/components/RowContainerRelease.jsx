import React, { useEffect, useRef, useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import {motion} from 'framer-motion';
import NotFound from '../assets/imgs/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import NumberFormat from 'react-number-format';


const RowContainerRelease = ({flag, data, scrollValue}) => {
    //console.log(data);
    const rowContainer = useRef();

    const [items, setItems] = useState([]);

    const [{cartItems}, dispatch] = useStateValue();
    const addtocart = () => {
        //console.log(item);
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: items,
        });
        localStorage.setItem("cartItems", JSON.stringify(items));
    };
    useEffect(() => {
        //toast.success("Order successfully 🤑💵🤑");
        addtocart()
    },[items]);

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    const result4 = (data || []).length;
    // w-275 h-auto min-w-[275px] md:min-w-[300px] md:w-300 bg-cardOverlay rounded-lg p-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between relative'>
    // <div className='w-full flex items-center justify-between
    return (
        <div ref={rowContainer} className={`w-full my-12 flex gap-3 items-center scroll-smooth ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"}`}>
            {result4 > 0 ? data.map((item) => (
            <div key={item.id} className='w-225 h-auto min-w-[225px] md:min-w-[250px] md:w-225 bg-cardOverlay rounded-lg p-2 px-4 my-4 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between relative'>
                <div className='w-full flex items-center justify-between'>
                    {/* src={item?.imageURL} */}
                    <motion.div whileHover={{scale:1.2}} className="w-40 h-40 -mt-8 drop-shadow-2xl">
                        <img className='w-full h-full object-contain' alt="addtocart" src={item?.imageURL}
                        />
                    </motion.div>

                    <motion.div whileTap={{scale: 0.75}} className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md" onClick={() => setItems([...cartItems, item])}>
                        <MdShoppingBasket className='text-white'/>
                    </motion.div>
                </div>
                <div className='w-full flex flex-col items-end justify-end'>
                    <p className='text-textColor font-semibold text-base md:text-lg'>{item?.title}</p>
                    {/* <p className='mt-1 text-sm text-gray-500'>{item?.calories} Calories</p> */}
                    <div className='flex items-center gap-8'>
                        <NumberFormat 
                                value={item?.price}
                                displayType="text"
                                thousandSeparator
                                renderText={(value) => <p  className='text-lg text-headingColor font-semibold'> {value} <span className='text-sm text-red-500'>VND</span></p>}
                            />
                    </div>
                </div>
            </div>
            )) : <div className = "w-full flex flex-col items-center justify-center">
            <img src={NotFound} alt="notfound" className='h-340'/>
            <p className='text-xl text-headingColor'>Items Not Available</p>
        </div>}
        
        </div>
    );
};
export default RowContainerRelease;