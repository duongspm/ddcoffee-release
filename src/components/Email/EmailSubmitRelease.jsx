import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { storage } from '../../firebase.config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import { saveEmail} from '../../utils/firebaseFunctions';
import { useStateValue } from '../../context/StateProvider';


const EmailSubmitRelease = () => {
    const [email, setEmail] = useState("");
    const form = useRef();
    const sendEmail = (e) => {
        try{
            e.preventDefault();
    
            emailjs.sendForm('service_d85pzdb', 'template_ww2y9zh', form.current, 't2_DjLlpwFn4-iPKh')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
            });
            const data = {
                id : `${Date.now()}`,
                email : email,
            }
            saveEmail(data);
            toast.success("Cảm ơn bạn đã đăng ký! 💕");
        }
        catch (error){
            console.log(error);
            toast.danger("That bai roi !!!🤷‍♂️🤷‍♂️");
        }
    }
    // const fetchData = async() => {
    //     await getALlDrinkItems().then ((data) => {
    //         dispatch({
    //         type : actionType.SET_DRINK_ITEMS,
    //         drinkItems : data,
    //         });
    //     });
    // };
    return (
        <div >
            <form ref={form} onSubmit={sendEmail} >
                <div class="flex items-end mb-3">
                    <div class="relative w-full mr-3 revue-form-group">
                        <label for="member_email" class="hidden block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-7 h-7 text-green-800 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                        </div>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} class="revue-form-field bg-gray-50 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-20 pr-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 text-sm text-gray-500" placeholder="Địa chỉ email của bạn..." type="email" name="member[email]" id="member_email" required="" />
                        </div>
                        <div class="revue-form-actions">
                        <input type="submit" value="ĐĂNG KÝ" class="cursor-pointer font-medium rounded-full text-sm px-5 py-2.5 text-center text-white hover:text-white border border-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-green-300  dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" name="member[subscribe]" id="member_submit" />
                    </div>
                </div>
            </form>
            <span className='text-sm text-gray-300 sm:text-center dark:text-gray-400'>Chúng tôi tôn trọng quyền riêng tư của bạn</span>
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

export default EmailSubmitRelease;