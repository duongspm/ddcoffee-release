import React from 'react';
import delivery from '../assets/imgs/delivery.png';
import HeroBg from '../assets/imgs/bg-green.png';
import heroData from '../utils/data'

const HomeContainer = () => {
    return (
        <section id="home" className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
            <div className='py-2 flex flex-1 flex-col items-start  justify-center gap-8'>
                <div className='flex items-center gap-2 justify-center'>
                    <p className='text-base text-green-800 font-semibold bg-green-100 px-4 py-1 rounded-full'>Bike Delivery</p>
                    <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
                        <img src={delivery} className="w-full h-full object-contain" alt="deli"/>
                    </div>
                </div>
                <p className='text-[2.5rem] font-bold tracking-wide text-headingColor lg:text-[4.5rem]'>The Fastest Delivery in <span className='text-green-800 text-[3rem] lg:text-[5rem]'>Your City</span></p>
                <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>People drink coffee to relieve mental and physicl fatigue and to increase metal alertness. Coffee is also used to prevent. Parkison's disease gallstones, type 2 diabetes</p>
                <button type='button' className='bg-gradient-to-br from-green-600 to-green-800 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out md:w-auto text-white'>BUY NOW</button>
            </div>
            <div className='py-2 flex-1 flex items-center relative'>
                <img src={HeroBg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="hero-bg"/>

                <div className='w-full h-full absolute flex items-center justify-center top-0 left-0 py-4 gap-4 flex-wrap lg:px-26'>
                    {heroData && heroData.map(n => (
                        <div key={n.id} className='w-190 bg-cardOverlay backdrop-blur-md p-4 rounded-3xl flex flex-col items-center justify-center lg:w-190 drop-shadow-lg'>
                        <img src={n.imageSrc} className='w-20 lg:w-40 -mt-10 lg:-mt-20' alt='i1'/>
                        <p className='text-base lg:text-xl font-semibold text-headingColor mt-2 lg:mt-4'>{n.name}</p>
                        <p className='text-[12px] lg:text-sm font-semibold text-textColor my-1 lg:my-3'>{n.decp}</p>
                        <p className='text-sm font-semibold text-headingColor'>{n.price} <span className='text-xs text-red-600'>VNĐ</span></p>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeContainer;