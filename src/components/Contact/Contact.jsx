import React from 'react';
import {MdOutlinePhoneInTalk, MdOutlineMailOutline, MdOutlineLocationOn, MdOutlineFacebook} from 'react-icons/md';

const Contact = () => {

    return (
        <div className='w-screen bg-nendamhon'>
            <div className="flex mb-16 mt-16 w-full mr-3 items-center justify-center sm:flex">
                <div className=' group bg-cardOverlay w-225 h-225 cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-lighttextGray'>
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

                <div className='group  w-225 h-225 cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-lighttextGray'>
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
                        <div className='text-sm text-gray-500 sm:text-center mt-'>
                            ddcoffee@gmail.com
                        </div>
                    </div>
                </div>
                <div className='group bg-cardOverlay w-225 h-225 cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-lighttextGray'>
                    <div className='rounded-full bg-green-800 w-16 h-16 flex items-center justify-center'>
                        <MdOutlineLocationOn className='text-4xl text-white'/>
                    </div>
                    <div className='text-lg text-headingColor font-semibold uppercase'>
                        Address
                    </div>
                    <div>
                        <div className='text-sm text-gray-500 sm:text-center'>
                            392/29A khu 4, Lê Hồng Phong, Phú Hòa, Thủ Dầu Một, Bình Dương
                        </div>
                    </div>
                </div>
                <div className='group w-225 h-225 cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-lighttextGray'>
                    <a href="https://www.facebook.com/DD-Coffee-Tea-106366635493290" className='group w-225 h-225 cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-lighttextGray'>
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
    );
};

export default Contact;