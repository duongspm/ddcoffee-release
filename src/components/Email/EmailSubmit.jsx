import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MdOutlineEmail} from 'react-icons/md';
const EmailSubmit = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_d85pzdb', 'template_ww2y9zh', form.current, 't2_DjLlpwFn4-iPKh')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
        });
        toast.success("Cảm ơn các bạn đã đăng ký! Chúng tôi cam kết bảo mật thông tin của quý khách hàng 💕");
    }
    return (
        <div>
            <form ref={form} onSubmit={sendEmail} >
                {/* <div className='flex w-full gap-2 '>
                    <div className='py-2 border-green-900 flex items-center gap-2 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gradientBg dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                        <MdOutlineEmail className='text-3xl text-gray-700'/>
                        <input 
                            type="text"
                            required
                            placeholder="Your email address ..."
                            className='text-sm rounded-lg  w-full pl-10 p-2.5  dark:placeholder-gray-400 dark:text-gradientBg'            
                        />
                        
                    </div>
                    <button className=" text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2 mr-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Subscribe</button>
                </div> */}
                <div class="flex items-end mb-3">
                    <div class="relative w-full mr-3 revue-form-group">
                        <label for="member_email" class="hidden block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                        </div>
                            <input class="revue-form-field bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 text-sm text-gray-500" placeholder="Your email address..." type="email" name="member[email]" id="member_email" required="" />
                        </div>
                        <div class="revue-form-actions">
                        <input type="submit" value="Subscribe" class="cursor-pointer  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300  dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" name="member[subscribe]" id="member_submit" />
                    </div>
                </div>
            </form>
            <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>(Đăng ký để nhận bản tin)</span>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    );
};

export default EmailSubmit;