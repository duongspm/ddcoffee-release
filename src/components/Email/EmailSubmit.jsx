import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <form ref={form} onSubmit={sendEmail}>
                <input type="email" name="user_name" placeholder='Enter your Email address'></input>
                <button>Submit</button>
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