import React from 'react';
import {MdOutlinePhoneInTalk, MdOutlineMailOutline, MdOutlineLocationOn, MdOutlineFacebook} from 'react-icons/md';
import './contact.css';

const Contact = () => {

    return (
        <div className='w-screen bg-nendamhon'>
            <div className='mb-14 mt-14'>
                <div className="cards">
                    <div class="framework-card ">
                        <div className=' cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center'>
                            <div className='rounded-full bg-green-800 w-16 h-16 flex items-center justify-center'>
                                <MdOutlinePhoneInTalk className='text-4xl text-white'/>
                            </div>
                            <div className='text-lg text-headingColor font-semibold uppercase'>
                                LET'S TALK
                            </div>
                            <div>   
                                <div className='text-sm text-gray-500 sm:text-center'>
                                    Phone: <a href="tel:0396752611">0396752611</a>
                                </div>
                                <div className='text-sm text-gray-500 sm:text-center mt-'>
                                    <a href="tel:0328818203">0328818203</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="framework-card">
                            <div className='cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center '>
                            <div className='rounded-full bg-green-800 w-16 h-16 flex items-center justify-center'>
                                <MdOutlineMailOutline className='text-4xl text-white'/>
                            </div>
                            <div className='text-lg text-headingColor font-semibold uppercase'>
                                email
                            </div>
                            <div>
                                <div className='text-sm text-gray-500 sm:text-center'>
                                    <a href="mailto:duongtv0711@gmail.com">duongtv0711@gmail.com</a>
                                </div>
                                <div className='text-sm text-gray-500 sm:text-center'>
                                    ddcoffee@gmail.com
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="framework-card">
                        <div className='cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center'>
                        <div className='rounded-full bg-green-800 w-16 h-16 flex items-center justify-center'>
                            <MdOutlineLocationOn className='text-4xl text-white'/>
                        </div>
                        <div className='text-lg text-headingColor font-semibold uppercase'>
                            Address
                        </div>
                        <div>
                            <div className='text-sm text-gray-500 sm:text-center'>
                                <a href='https://goo.gl/maps/gTfeRDDabfxFjnrF9'>397/29A đường 30/4 khu 4, Phú Hòa, Thủ Dầu Một, Bình Dương (Bấm vào để chỉ đường)</a>
                                
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="framework-card">
                    <a href="https://www.facebook.com/DD-Coffee-Tea-106366635493290" className=' cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center'>
                            <div className='rounded-full bg-green-800 w-16 h-16 flex items-center justify-center'>
                                <MdOutlineFacebook className='text-4xl text-white'/>
                            </div>
                            <div className='text-lg text-headingColor font-semibold uppercase'>
                                Page
                            </div>
                            <div className='mb-8'>
                                <div className='text-sm text-gray-500 sm:text-center'>
                                    Facebook: DD Coffee & Tea
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;