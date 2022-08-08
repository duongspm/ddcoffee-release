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
        toast.success("Send Mail Successfully!");
    }
    return (
        <div>
            <form ref={form} onSubmit={sendEmail} >
                <div className='flex w-full gap-2'>
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
                </div>
            </form>
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