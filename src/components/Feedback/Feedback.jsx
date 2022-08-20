import React from 'react'
import {doc, setDoc} from 'firebase/firestore';

import {useState} from 'react';
import { firestore, storage } from '../../firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import {MdDelete} from 'react-icons/md';
import { getALlFeedBack, saveFeedback } from '../../utils/firebaseFunctions';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';

const Feedback = () => {
    const [name, setName] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [{feedBack}, dispatch] = useStateValue();
    const uploadImage = (e) => {
        setIsLoading(true);

        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Customners/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
            toast.danger("Error while uploading : Try again 🙇");
            setTimeout(() => {
              setIsLoading(false);
            }, 4000);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageAsset(downloadURL);
              setIsLoading(false);
              toast.danger("Image uploaded to successfully 😊");
              setTimeout(() => {
              }, 4000);
            });
          }
        );
    };
    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef)
            .then(() => {
                setImageAsset(null);
                setIsLoading(false);
                toast.danger("Image deleted  successfully 😊");
                setTimeout(() => {
                }, 4000);
            })
            .catch((error) => {
                console.log(error);
                toast.danger("Error while deleting : Try again 🙇");
                setTimeout(() => {
                setIsLoading(false);
                }, 4000);
          });
      };
    
      const saveDetails = () => {
        setIsLoading(true);
        try{
            if((!name || !feedback)){
                toast.danger("Reuired fields can't be empty : Try Again 😟😥");
                setTimeout(() => {
                    setIsLoading(false)
                }, 4000);
            } else {
                const data = {
                    id : `${Date.now()}`,
                    name : name,
                    feedback : feedback,
                    imageURL : imageAsset,
                }
                saveFeedback(data);
                setIsLoading(false);
      
              
                toast.success("Data upload successfully 😊😊🤑");
              
                setTimeout(() => {
                  
                    //setIsLoading(false)
                }, 4000);
                clearData();
            }
        } catch (error){
            console.log(error);
            toast.danger('Error while uploading : Try Again 😟😥');
            setTimeout(() => {
             
                setIsLoading(false)
            }, 4000);
        }
        fetchData();
    };
    const clearData = () => {
        setName("");
        setFeedback("");
        setImageAsset(null);
    }
    const fetchData = async() => {
        await getALlFeedBack().then ((data) => {
            dispatch({
              type : actionType.SET_FEED_BACK,
              feedback : data,
            });
        });
    };

    return (
        <div id='feedback' className='w-full mb-16'>
            <div className='my-12'>
                <p className='text-3xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-600 to-green-800 transition-all ease-in-out duration-100'>
                    Feedback
                </p>
                <p className='mt-4 font-normal text-gray-600 tracking-wide leading-10 not-italic'>Lắng nghe góp ý, review nhầm cải thiện chất lượng dịch vụ và thức uống tại đây ⬇️</p>
            </div>
            <div className='w-full flex gap-10'>
                {/* hinh anh */}
                <div className='w-1/2  flex items-center drop-shadow-2xl'>{/*div nay dung de gioi han hinh anh */}
                    <div class="flex justify-center items-center w-full ">
                        {isLoading ? (
                        <Loader />
                        ) : (
                        <>
                        {!imageAsset ? (
                            <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer  hover:bg-gray-100 ">
                                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Nhấp để tải lên </span> hoặc kéo và thả </p>
                                    <p class="mb-2 text-sm text-gray-500 ">Hình ảnh feedback từ bạn</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" accept="image/*"
                                onChange={uploadImage}/>
                            </label>
                            ) : (
                                <div className="relative md:h-full">
                                    <img
                                    src={imageAsset}
                                    alt=""
                                    className="w-1/2 object-cover"
                                    />
                                    <button
                                    type="button"
                                    className="absolute bottom-3 right-1/2 p-3 rounded-full bg-red-500 text-xl
                                        cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                                    onClick={deleteImage}
                                    >
                                        <MdDelete className="text-white" />
                                    </button>
                                </div>
                                )}
                            </>
                            )}
                    </div> 
                </div>
                {/*end hinh anh */}
                {/* form nhap*/}
                <div className='w-1/2 drop-shadow-2xl'>
                    <div class="mb-6">
                        <label class="block mb-2 text-lg font-medium text-gray-900 not-italic ">Tên của bạn</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Nhập tên của bạn" required="" />
                    </div>
                    <div class="mb-6">
                        <label class="block mb-2 text-lg font-medium text-gray-900 ">Feedback</label>
                        <textarea rows="4" type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Đóng góp ý kiến của bạn ..." required/>
                    </div>
                    <div class="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
                        <button onClick={saveDetails} type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                        <div class="flex pl-0 space-x-1 sm:pl-2">
                            <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Attach file</span>
                            </button>
                            <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Set location</span>
                            </button>
                        </div>
                    </div>
                    
                </div>
                {/*end form nhap*/}
            </div>
            <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        />
        </div>
       
    )
}

export default Feedback
