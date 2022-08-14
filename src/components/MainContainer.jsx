import React, { useEffect, useState } from 'react';
import HomeContainer from './HomeContainer';
import {motion} from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
//import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import MenuContainer from './MenuContainer';
import RowContainerRelease from './RowContainerRelease';
import CartContainer from './CartContainer';
import {CartProvider} from 'react-use-cart';
import Contact from './Contact/Contact';
import FooterRelease from './Footer/FooterRelease';
import Feedback from './Feedback/Feedback';
const MainContainer = () => {
    const [{drinkItems, cartShow}, dispatch] = useStateValue();
    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {}, [scrollValue, cartShow]);

    return (
        <div id='home' className='w-full h-auto flex flex-col items-center justify-center'>
            <HomeContainer/>
            {/* Start category */}
            <section className="w-full my-6">
                <div className='w-full flex items-center justify-between'>
                    <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-600 to-green-800 transition-all ease-in-out duration-100'>
                        Our fresh & Healthy fruits
                    </p>
                    <div className='hidden md:flex gap-3 items-center'>
                        <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-green-400 hover:bg-greener-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center' onClick={()=> setScrollValue(-200)}>
                            <MdChevronLeft className='text-lg text-white'></MdChevronLeft>
                        </motion.div>
                        <motion.div whileTap={{scale:0.75}}  className='w-8 h-8 rounded-lg bg-green-400 hover:bg-greener-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center' onClick={()=> setScrollValue(200)}>
                            <MdChevronRight className='text-lg text-white'></MdChevronRight>
                        </motion.div>
                    </div>
                </div>
                {/* <RowContainer
                    scrollValue = {scrollValue}
                    flag={true} 
                    data={drinkItems?.filter((n) => n.category === 'cafe')}/> */}
                    <RowContainerRelease scrollValue = {scrollValue} flag={true} data={drinkItems?.filter((n) => n.category === 'cafe')}/>
            </section>
            {/* End category */}
            <CartProvider>
                {/* Start Menu */}
                <MenuContainer/>
                {/* End Menu */}
                {cartShow && <CartContainer/> }
            </CartProvider>
            <Feedback/>
            <Contact/>
            <FooterRelease/>
        </div>
    );
};

export default MainContainer;