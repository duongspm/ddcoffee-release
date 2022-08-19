import React from 'react'
import {MdMarkEmailRead} from 'react-icons/md';
import {useEffect} from 'react';
import { useState } from 'react';
import { firestore } from '../../../firebase.config';
import {collection,deleteDoc,doc,getDocs} from 'firebase/firestore';

function FeedbackAdmin() {
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
    function getFeedbacks(){
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

    function deleteFeedback(id) {
        const docRef = doc(firestore, 'feedback', id)
        deleteDoc(docRef).then(() => console.log('Document delete roi'))
            .catch(error => console.log(error.message))
        //alert(id)
        getFeedbacks();
    }
    return (
        <div id='feedback' class="overflow-x-auto relative sm:rounded-lg">
            <div className='px-4 mb-4'>
                <div className="mt-1 text-2xl font-semibold text-green-800">
                    <nav class="flex text-2xl font-semibold text-green-800" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <a href="#" class="inline-flex items-center text-2xl font-semibold text-green-800  hover:text-gray-900">
                                    <MdMarkEmailRead class="w-4 h-4 mr-2 text-2xl"></MdMarkEmailRead>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div class="flex items-center text-2xl font-semibold text-green-800">
                                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <a href="#" class="ml-1  hover:text-gray-900 md:ml-2">Feedback</a>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="flex justify-between items-center pb-4 bg-white">
                
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                </div>
            </div>
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Image
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Ten
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Noi dung feedback
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map(feedbacks => (
                        <tr key={feedbacks.id} class="bg-white border-b  hover:bg-gray-50">
                            <td class="p-4 w-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td class="p-4 w-32">
                                <img src={feedbacks.data.imageURL} alt={feedbacks.data.name} />
                            </td>
                            <td class="py-4 px-6">
                                <div class="flex items-center">
                                    <p className='text-base font-semibold'>{feedbacks.data.name}</p>
                                </div>
                            </td>
                            <td class="py-4 px-6">
                                <div class="flex items-center">
                                    <span className='text-gray-600 font-thin text-4xl font-serif'>"</span>{feedbacks.data.feedback}<span className='text-gray-600 font-thin text-4xl font-serif'>"</span>
                                </div>
                            </td>
                            <td class="py-4 px-6">
                                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 ">✏️</a>
                                <button onClick={() => deleteFeedback(feedbacks.id)} class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 ">🗑️</button>
                            </td>
                        </tr>
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    )
}

export default FeedbackAdmin
