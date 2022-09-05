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

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
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
                        <motion.button whileTap={{scale: 0.8}} type="button" onClick={toggleModal}  data-modal-toggle="popup-modal" className='w-full p-2 rounded-full bg-colorGreen text-gray-50 text-lg my-2 hover:shadow-lg '>
                        Check Out
                    </motion.button>
                    ) : (
                        <motion.button whileTap={{scale: 0.8}} type="button" onClick={toggleModal} data-modal-toggle="popup-modal" className='w-full p-2 rounded-full bg-colorGreen text-gray-50 text-lg my-2 hover:shadow-lg '>
                        Login to Check Out
                    </motion.button>
                    )}
                    
                </div>
            </div>
            ) : (
                <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
                    <img src={EmptyCart} className="w-300" alt=""></img>
                    <p className='text-xl text-textColor font-semibold'>Add some items to your cart 🍵☕</p>
                    <button type="button" class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
                        <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
                        Check out with PayPal
                    </button>
                    <button type="button" class="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
                        <svg aria-hidden="true" class="mr-2 -ml-1 w-10 h-3" viewBox="0 0 256 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.812 0L0 63.76H34.492L38.768 53.594H48.542L52.818 63.76H90.784V56.001L94.167 63.76H113.806L117.189 55.837V63.76H196.148L205.749 53.858L214.739 63.76L255.294 63.842L226.391 32.058L255.294 0H215.368L206.022 9.71899L197.315 0H111.418L104.042 16.457L96.493 0H62.073V7.495L58.244 0C58.244 0 28.812 0 28.812 0ZM35.486 9.05399H52.299L71.41 52.29V9.05399H89.828L104.589 40.054L118.193 9.05399H136.519V54.806H125.368L125.277 18.955L109.02 54.806H99.045L82.697 18.955V54.806H59.757L55.408 44.549H31.912L27.572 54.797H15.281C15.281 54.797 35.486 9.05399 35.486 9.05399ZM146.721 9.05399H192.063L205.931 24.034L220.246 9.05399H234.114L213.043 32.049L234.114 54.779H219.617L205.749 39.625L191.361 54.779H146.721V9.05399ZM43.665 16.795L35.924 35.067H51.397L43.665 16.795ZM157.918 18.527V26.879H182.654V36.188H157.918V45.306H185.663L198.555 31.876L186.21 18.519H157.918V18.527Z" fill="white"/></svg>
                        Pay with American Express
                    </button>
                </div>
            )}
            {modal && (
                <div id="popup-modal" tabindex="-1" class="shadow-2xl overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full md:justify-center justify-center items-center flex" aria-modal="true" role="dialog">
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div class="relative bg-white rounded-lg shadow ">
                            <a href='https://www.facebook.com/DD-Coffee-Tea-106366635493290' type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="popup-modal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only" onClick={toggleModal}>Close modal</span>
                            </a>
                            <div class="p-6 text-center">
                                <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 ">Chức năng order online đang được phát triển! Quý khách vui lòng truy cập Fanpage <a href='https://www.facebook.com/DD-Coffee-Tea-106366635493290' className='text-[#3b5998]/90 font-bold'>DD Coffee & Tea</a> để order online hoặc liên hệ qua Zalo: <a href="tel:0328818203" className='text-green-800 font-bold'>0328818203</a><br/><span className='mb-5 text-base font-light text-gray-600 '>Like Share Fanpage Dùm Mình Nhé 😍😍 Xin cảm ơn</span></h3>
                                
                                <a href='https://www.facebook.com/DD-Coffee-Tea-106366635493290'data-modal-toggle="popup-modal" type="button" class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-[#3b5998]/50 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
                                    Order trên FB
                                </a>
                                <a href='https://www.facebook.com/DD-Coffee-Tea-106366635493290' data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={toggleModal}>Đóng</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CartContainer;