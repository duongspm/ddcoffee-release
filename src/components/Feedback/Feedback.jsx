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
        <div>
                <div class="flex justify-center items-center w-full">
                {isLoading ? (
                <Loader />
                ) : (
                <>
                {!imageAsset ? (
                    <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" accept="image/*"
                        onChange={uploadImage}/>
                    </label>
                    ) : (
                        <div className="relative h-full">
                            <img
                            src={imageAsset}
                            alt=""
                            className="h-full w-full object-cover"
                            />
                            <button
                            type="button"
                            className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl
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

                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                    <input type="email" value={name} onChange={(e) => setName(e.target.value)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required="" />
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Feedback</label>
                    <textarea rows="4" type="password" value={feedback} onChange={(e) => setFeedback(e.target.value)} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                <button onClick={saveDetails} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            
           
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
