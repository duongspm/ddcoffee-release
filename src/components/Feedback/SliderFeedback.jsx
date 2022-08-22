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
import {MdArrowBackIosNew, MdArrowForwardIos} from 'react-icons/md'
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
            <div className=' w-full'>
            <Slider {...setting}>
                {feedbacks.map((feedbacks,idx) => (
               
                <div className='flex items-center  my-4'>
                    <div key={feedbacks.id} className={idx === imageIndex ? "h-auto min-w-[325px] md:min-w-[350px] md:w-325 slide activeSlide py-6 pl-6  flex justify-between bg-white rounded-xl drop-shadow-2xl " : "slide py-6 px-6 flex gap-10  rounded-lg "}>
                        {/* ben trai, noi dung */}
                        <div className='w-3/5'>
                            <img className='h-5' src={IconFeedback}></img>
                            {/* noi dung feedback */}
                            <div className='max-w-prose'>
                                <p className='max-w-prose font-light text-gray-600 not-italic tracking-wide leading-relaxed  text-xs object-none'>{feedbacks.data.feedback}</p>
                            </div>
                            {/* ten */}
                            <div className='w-full'>
                                <h1 className='max-w-prose text-clip text-lg text-headingColor font-semibold underline hover:underline-offset-4 decoration-wavy decoration-sky-500/30'>{feedbacks.data.name}</h1>
                            </div>
                        </div>
                        {/* ben phai, hinh anh feedback */}
                        <div className='md:w-48 md:h-auto w-2/5 h-40 drop-shadow-2xl -mt-8'>
                            <img className=' w-full h-full object-contain' src={feedbacks.data.imageURL} alt={feedbacks.data.name}></img>
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
