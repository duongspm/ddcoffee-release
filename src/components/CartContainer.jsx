import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { MdRunCircle } from 'react-icons/md';
import EmptyCart from '../assets/imgs/emptyCart.svg';
import CartItem from './CartItem';
import {motion} from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import NumberFormat from 'react-number-format';

const CartContainer = ({ cartMenu, setCartMenu }) => {
    const [{cartShow, cartItems, user, total, drinkItems}, dispatch] = 
    useStateValue();

    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);
    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    }

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
          return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot);
    }, [tot, flag]);
    const clearCart = () => {
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: [],
        });
        localStorage.setItem("cartItems", JSON.stringify([]));
    }

    return (
        <motion.div 
            initial={{opacity: 0, x: 200}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 200}}
            className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]'>
            <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
                <motion.div whileTap={{scale:0.75}} onClick={showCart}>
                    <MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>
                </motion.div>
                <p className='text-textColor text-lg font-semibold'>Cart</p>
                <motion.p whileTap={{scale:0.75}} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base' onClick={clearCart}>
                    Clear <MdRunCircle/>{" "}
                </motion.p>
            </div>
            {/* bottom section */}
            {cartItems && cartItems.length > 0 ? (
                <div className='w-full h-full bg-cartBg rounded-t-3xl flex flex-col'>
                {/**Cart Items section */}
                <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
                    {/**Tai tho */}
                    {/* <div className='px-8'>
                        <div className='w-full h-10 bg-green-800'></div>
                    </div> */}
                    {/**End Tai tho */}

                    {/*Cart item */}
                    {cartItems && cartItems.map (item => (
                        <CartItem key={item.id} item={item} setFlag={setFlag}
                        flag={flag}/>
                    ))} 
                </div>
                {/**Cart total section */}
                <div className='w-full flex-1 bg-cartTotal rounded-t-3xl flex flex-col items-center justify-evenly px-8 py-2'>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-400 text-lg'>Sub Total</p>
                        <NumberFormat 
                            value={tot}
                            displayType="text"
                            thousandSeparator
                            renderText={(value) => <p  className='text-gray-400 text-lg'> {value} VND</p>}
                        />
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-400 text-lg'>Delivery</p>
                        <NumberFormat 
                            value={15000}
                            displayType="text"
                            thousandSeparator
                            renderText={(value) => <p  className='text-gray-400 text-lg'> {value} VND</p>}
                        />
                    </div>
                    
                    <div className='w-full border-b border-gray-600 my-2'></div>

                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-200 text-xl'>Total</p>
                        
                        <NumberFormat 
                            value={tot + 15000}
                            displayType="text"
                            thousandSeparator
                            renderText={(value) => <p  className='text-gray-200 text-xl'> {value} VND</p>}
                        />
                    </div>
                    {user ? (
                        <motion.button whileTap={{scale: 0.8}} type="button" className='w-full p-2 rounded-full bg-colorGreen text-gray-50 text-lg my-2 hover:shadow-lg '>
                        Check Out
                    </motion.button>
                    ) : (
                        <motion.button whileTap={{scale: 0.8}} type="button" className='w-full p-2 rounded-full bg-colorGreen text-gray-50 text-lg my-2 hover:shadow-lg '>
                        Login to Check Out
                    </motion.button>
                    )}
                </div>
            </div>
            ) : (
                <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
                    <img src={EmptyCart} className="w-300" alt=""></img>
                    <p className='text-xl text-textColor font-semibold'>Add some items to your cart 🍵☕</p>
                </div>
            )}
            
        </motion.div>
    );
};

export default CartContainer;