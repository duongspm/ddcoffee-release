import React from 'react'
import {useState} from 'react'
import f4 from '../../assets/imgs/f4.png';
import f5 from '../../assets/imgs/f5.png';
import f6 from '../../assets/imgs/f6.png';
import cam from '../../assets/imgs/cam.png';
import Slider from "react-slick";   
import './Slider.css';
import {FaArrowRight, FaArrowLeft} from 'react-icons/fa';

const images = [f4,f5,f6,cam];

function SliderFeedback() {
                    // onclick
    const NextArrow = ({onClick}) =>{
        return(
            <div className='bg-blue-300 arrow next' onClick={onClick}>
                <FaArrowRight/>
            </div>
        )
    }
    const PrevArrow = ({onClick}) =>{
        return(
            <div className='bg-red-800 arrow prev' onClick={onClick}>
                <FaArrowLeft/>
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

    return (
        <div className='w-full'>
            <Slider {...setting}>
                {images.map((img,idx) => (
                    <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                        <img src={img} className="h-72"></img>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default SliderFeedback
