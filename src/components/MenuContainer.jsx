import React, { useState } from 'react';
import {MdLocalDrink} from 'react-icons/md';
import { categories } from '../utils/data';
import {motion} from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import RowContainerRelease from './RowContainerRelease';


const MenuContainer = () => {
    const [filter, setFilter] = useState("cafe");

    const [{drinkItems}, dispatch] = useStateValue();

    return (
        <section id='menu' className="w-full my-6">
            <div className='w-full flex flex-col items-center justify-center'>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-600 to-green-800 transition-all ease-in-out duration-100 mr-auto'>
                    Our Hot Drink
                </p>
                <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                    {categories && categories.map((category) => 
                        <motion.div whileTap={{scale: 0.75}} key={category.id} className={`group ${filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"}  w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadpw-xl flex flex-col gap-3 items-center justify-center hover:bg-red-600`} onClick={() => setFilter(category.urlParamName)}>
                        <div className={`w-10 h-10 rounded-full shadow-lg ${filter === category.urlParamName ? "bg-white" : "bg-cartNumBg"} group-hover:bg-white flex items-center justify-center`}>
                            <MdLocalDrink className={`${filter === category.urlParamName ? "text-textColor" : "text-white"} group-hover:text-textColor text-lg`}/>
                        </div>
                        <p className={`text-sm ${filter === category.urlParamName ? "text-white" : "text-textColor"} group-hover:text-white`}>{category.name}</p>
                    </motion.div>
                    )}
                </div>
                <div className='w-full'>
                    {/* <RowContainer flag={false} data={drinkItems?.filter((n) => n.category === filter)} /> */}
                    <RowContainerRelease flag={false} data={drinkItems?.filter((n) => n.category === filter)} />
                </div>
            </div>
        </section>
    );
};

export default MenuContainer;