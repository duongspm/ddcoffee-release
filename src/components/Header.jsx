import React, { useState } from 'react';
import {motion} from "framer-motion";
import {Link} from 'react-router-dom';
import {MdCoffee} from 'react-icons/md';
import {MdCoffeeMaker, MdAdd, MdLogout, MdAccountCircle} from 'react-icons/md';
//import Logo from '../assets/imgs/logo-dendo-cocaybua.png';
import Avatar from '../assets/imgs/avatar.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{user}, dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        //đăng nhập rồi click vô avt k hiện đăng nhập nữa
        if(!user)
        {
            const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type : actionType.SET_USER,
                user : providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]))
        }else{
            setIsMenu(!isMenu);
        }
    };
    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    }

    return (
        <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>
            {/* desktop */}
            <div className='hidden md:flex w-full h-full items-center justify-between'>
                <Link to={"/"} className='flex items-center gap-2'>
                    {/* <img src={Logo} className="w-16 object-cover" alt="Logo nef"/> */}
                    <MdCoffee className='w-16 object-cover cursor-pointer text-6xl hover:text-cartNumBg'></MdCoffee>
                    <motion.p whileTap={{scale: 0.6}}  className='text-headingColor text-xl font-bold'><span className='text-green-800'>DD</span> Cup & Tea</motion.p>
                </Link>
                <div className='flex items-center gap-8'> {/* bo ra ngoai div nay thi no se nam giua */}
                    <motion.ul 
                        initial={{opacity: 0, x: 200}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 200}}
                        className="flex items-center gap-8 ">
                        <li className='text-base text-textColor hover:text-colorGreen duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
                        <li className='text-base text-textColor hover:text-colorGreen duration-100 transition-all ease-in-out cursor-pointer' onClick={()=>setIsMenu(false)}>Menu</li>
                        <li className='text-base text-textColor hover:text-colorGreen duration-100 transition-all ease-in-out cursor-pointer' onClick={()=>setIsMenu(false)}>About Us</li>
                        <li className='text-base text-textColor hover:text-colorGreen duration-100 transition-all ease-in-out cursor-pointer' onClick={()=>setIsMenu(false)}>Blog</li>
                    </motion.ul>    
                    <div className='relative flex items-center justify-center'>
                        <MdCoffeeMaker className='text-textColor text-2xl ml-8 cursor-pointer'></MdCoffeeMaker>
                        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold'>2</p>
                        </div>
                    </div>
                    <div className='relative'>
                        <motion.img whileTap={{scale: 0.6}} className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full' src={user ? user.photoURL : Avatar} alt="avata nguoi dung" 
                        onClick={login}/>
                        {/* Menu In4 */}
                        {
                            isMenu && 
                            (
                                <motion.div 
                                    initial={{opacity: 0, scale: 0.6}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.6}}
                                    className='w-40 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-12 right-0'>
                                    {
                                        user && user.email === "tranvanduong10a22016bb@gmail.com" && (
                                            <Link to={'/createItem'}>
                                                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base '><MdAdd/> New Item </p>
                                            </Link>
                                        )
                                    }
                                    <Link to={'/info'}>
                                        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'><MdAccountCircle/>{user ? user.displayName : 'In4'} </p>
                                    </Link>
                                    <hr/>
                                    <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={logout}><MdLogout/> Logout </p>
                                </motion.div>
                            )
                        }
                        {/* End Menu In4 */}
                    </div>
                </div>
            </div>
            {/* mobile */}
            <div className='flex items-center justify-between md:hidden w-full h-full'>
                <div className='relative flex items-center justify-center'>
                    <MdCoffeeMaker className='text-textColor text-2xl ml-8 cursor-pointer'></MdCoffeeMaker>
                    <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                        <p className='text-xs text-white font-semibold'>2</p>
                    </div>
                </div>
                <Link to={"/"} className='flex items-center gap-2'>
                    {/* <img src={Logo} className="w-16 object-cover" alt="Logo nef"/> */}
                    <MdCoffee className='w-16 object-cover cursor-pointer text-6xl hover:text-cartNumBg'></MdCoffee>
                    <motion.p whileTap={{scale: 0.6}}  className='text-headingColor text-xl font-bold'>DD Cup & Tea</motion.p>
                </Link>
                
                <div className='relative'>
                        <motion.img whileTap={{scale: 0.6}} className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full' src={user ? user.photoURL : Avatar} alt="avata nguoi dung" 
                        onClick={login}/>
                        {/* Menu In4 */}
                        {
                            isMenu && 
                            (
                                <motion.div 
                                    initial={{opacity: 0, scale: 0.6}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.6}}
                                    className='w-40 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-12 right-0'>
                                    {
                                        user && user.email === "tranvanduong10a22016bb@gmail.com" && (
                                            <Link to={'/createItem'}>
                                                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base justify-center'><MdAdd/> New Item </p>
                                            </Link>
                                        )
                                    }
                                    <ul className="flex flex-col">
                                        <li className='text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Home</li>
                                        <li className='text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Menu</li>
                                        <li className='text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>About Us</li>
                                    </ul>
                                    <hr/>
                                    <Link to={'/info'}>
                                        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base justify-center'><MdAccountCircle/> In4 </p>
                                    </Link>
                                    <hr/>
                                    <p className='m-2 p-2 rounded-md shadow-md flex items-center gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base justify-center bg-gray-200 ' onClick={logout}><MdLogout/> Logout </p>
                                </motion.div>
                            )
                        }
                        {/* End Menu In4 */}
                    </div>
            </div>
        </header>
    );
};

export default Header;