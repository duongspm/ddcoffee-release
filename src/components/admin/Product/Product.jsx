import React from 'react'
import {useEffect} from 'react';
import { useState } from 'react';
import { firestore } from '../../../firebase.config';
import {collection,deleteDoc,doc,getDocs} from 'firebase/firestore';
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        try{
            products()
        }catch(err){
            console.log("loiii"+err);
        }

    },[])
    useEffect (() =>{
        console.log(items)
    })
    function products(){
        const feedbackCollectionRef = collection(firestore, "drinkItems")
        getDocs(feedbackCollectionRef)
            .then(response => {
                console.log(response)
                const items = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setItems(items);
            })
            .catch(error => console.log(error.message))
    }

    function deleteFeedback(id) {
        const docRef = doc(firestore, 'drinkItems', id)
        deleteDoc(docRef).then(() => console.log('Document delete roi'))
            .catch(error => console.log(error.message))

        toast.success("Image uploaded to successfully 😊");
        products();
    }

    return (
        <div id='product' class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            <span class="sr-only">Image</span>
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Product
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Qty
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Category
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Price
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(items => (
                        <tr key={items.data.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="p-4 w-32">
                                <img src={items.data.imageURL} alt="Apple Watch"/>
                            </td>
                            <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                {items.data.title}
                            </td>
                            <td class="py-4 px-6">
                                <div class="flex items-center space-x-3">
                                    <button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                        <span class="sr-only">Quantity button</span>
                                        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                    </button>
                                    <div>
                                        <input type="number" id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required=""/>
                                    </div>
                                    <button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                        <span class="sr-only">Quantity button</span>
                                        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </td>
                            <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                {items.data.category}
                            </td>
                            <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                <NumberFormat 
                                value={items.data.price}
                                displayType="text"
                                thousandSeparator
                                renderText={(value) => <p> {value}</p>}
                            />
                            </td>
                            <td class="py-4 px-6">
                                <button  onClick={() => deleteFeedback(items.id)} href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default Product
