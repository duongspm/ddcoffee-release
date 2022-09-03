import React, { useEffect } from 'react'
import {useState} from 'react'
import f4 from '../../assets/imgs/f4.png';
import f5 from '../../assets/imgs/f5.png';
import f6 from '../../assets/imgs/f6.png';
import cam from '../../assets/imgs/cam.png';
import Slider from "react-slick";   
import './Slider.css';
import {FaArrowRight, FaArrowLeft} from 'react-icons/fa';
import IconFeedback from '../../assets/imgs/iconfeedback.png';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase.config';
import {MdArrowBackIosNew, MdArrowForwardIos, MdMoreHoriz} from 'react-icons/md'
import Like from '../../assets/imgs/Heart-red.png';
import Message from '../../assets/imgs/Chat.png';
import Save from '../../assets/imgs/Save (2).png';
import Send from '../../assets/imgs/Message (1).png';
import Avt from '../../assets/imgs/avt-tachcf.png'

const images = [f4,f5,f6,cam];

function SliderFeedback() {
                    // onclick
    const NextArrow = ({onClick}) =>{
        return(
            <div className='arrow next text-4xl' onClick={onClick}>
                <MdArrowForwardIos/>
            </div>
        )
    }
    const PrevArrow = ({onClick}) =>{
        return(
            <div className=' arrow prev text-4xl' onClick={onClick}>
                <MdArrowBackIosNew/>
            </div>
        )
    }
    const [imageIndex, setImageIndex] = useState(0);

    const setting = {
        dots: true,
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next)
    };

    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        try{
            getFeedbacks()
        }catch(err){
            console.log("loiii"+err);
        }

    },[])
    useEffect (() =>{
        console.log(feedbacks)
    })
    const getFeedbacks = () => {
        const feedbackCollectionRef = collection(firestore, "feedback")
        getDocs(feedbackCollectionRef)
            .then(response => {
                console.log(response)
                const feedbacks = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setFeedbacks(feedbacks);
            })
            .catch(error => console.log(error.message))
    }
    return (
        <div className='w-full my-16 h-full'>
            <div className='my-12'>
                <p className='text-3xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-64 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-600 to-green-800 transition-all ease-in-out duration-100'>
                    Phản hồi từ khách hàng của chúng tôi
                </p>
                <p className='mt-4 font-normal text-gray-600 tracking-wide leading-10 not-italic'>Don’t take our word for it. Trust our customers</p>
            </div>
            {/* py-6 px-6 flex gap-10 bg-white rounded-lg  */}
            <div className='w-full items-center justify-center'>
                {/* <Slider {...setting}>
                {feedbacks.map((feedbacks,idx) => (
                <div className='flex items-center  my-4'>
                    <div key={feedbacks.id} className={idx === imageIndex ? "h-auto min-w-[325px] md:min-w-[350px] md:w-325 slide activeSlide py-6 pl-6  flex justify-between bg-white rounded-xl drop-shadow-2xl " : "slide py-6 px-6 flex gap-10  rounded-lg "}>
                      
                        <div className='w-3/5'>
                            <img className='h-5' src={IconFeedback}></img>
                          
                            <div className='max-w-prose'>
                                <p className='max-w-prose font-light text-gray-600 not-italic tracking-wide leading-relaxed  text-xs object-none'>{feedbacks.data.feedback}</p>
                            </div>
                           
                            <div className='w-full'>
                                <h1 className='max-w-prose text-clip text-lg text-headingColor font-semibold underline hover:underline-offset-4 decoration-wavy decoration-sky-500/30'>{feedbacks.data.name}</h1>
                            </div>
                        </div>
                     
                        <div className='md:w-48 md:h-auto w-2/5 h-40 drop-shadow-2xl -mt-8'>
                            <img className=' w-full h-full object-contain' src={feedbacks.data.imageURL} alt={feedbacks.data.name}></img>
                        </div>
                    </div>
                </div>
               
                ))}
                </Slider> */}
                <Slider {...setting}>
                {feedbacks.map((feedbacks,idx)  => (
                    <div className='flex items-center my-4'>
                        <div  key={feedbacks.id} className={idx === imageIndex ? "max-w-xs slide activeSlide justify-between bg-white rounded-2xl drop-shadow-2xl ": "slide  justify-between bg-white rounded-2xl drop-shadow-2xl max-w-xs"}>
                            {/* top */}
                            <div className='p-3 flex items-center justify-between'>
                                <div className='flex items-center'>
                                    {/*avt*/}
                                    <div className='overflow-hidden relative w-5 h-5 bg-gray-100 rounded-full  md:w-10 md:h-10'>
                                        <img className='object-contain'  src={Avt}></img>
                                    </div>
                                    {/*ten*/}
                                    <p className='font-medium md:text-sm pl-2 text-xs md:font-normal'>{feedbacks.data.name}</p>
                                </div>
                                {/*3cham*/}
                                <MdMoreHoriz/>
                            </div>
                            {/* hinh */}
                            <div className='h-28 md:h-48  object-contain relative bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 '>
                                <img className='inset-0 w-full h-full object-contain' src={feedbacks.data.imageURL}>
                                </img>
                            </div>
                            {/* duoi */}
                            <div className='flex items-center justify-between p-3'>
                                <div className='flex items-center md:gap-3 gap-1'>
                                    <img className='w-4 md:w-6' src={Like}></img>
                                    <img className='w-4 md:w-6' src={Message}></img>
                                    <img className='w-4 md:w-6' src={Send}></img>
                                </div>
                                <div>
                                    <img className='w-4 md:w-6' src={Save}></img>
                                </div>
                            </div>
                            <div className='flex items-center pb-3'>
                                <p className='md:font-semibold font-semibold md:text-sm pl-3 text-xs'>{feedbacks.data.name}</p>
                                <p className='pl-2 md:font-normal font-sans text-xs md:text-sm'>{feedbacks.data.feedback}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
                </Slider>
            </div>

            {/* <Slider {...setting}>
                {images.map((img,idx) => (
                    <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                        <img src={img} className="h-72"></img>
                    </div>
                ))}
            </Slider> */}
            
        </div>
    )
}

export default SliderFeedback
