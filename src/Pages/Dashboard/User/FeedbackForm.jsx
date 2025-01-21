import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const FeedbackForm = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            const feedbackInfo = {
                name: user?.displayName,
                image: user?.photoURL,
                email: user?.email,
                campId:id,
                rating: parseInt(data.rating),
                comment: data.comment
            }
            // console.log(feedbackInfo);
            const response = await axiosSecure.post('/feedbacks', feedbackInfo);
            if (response.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Feedback has been added successfully.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            reset();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again later.",
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl ">
    <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">Provide Your Feedback</h3>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-slate-100 my-10 p-6 rounded-xl shadow-lg">
    <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Rating:</label>
            <input
                type="number"
                {...register('rating', { 
                    required: true, 
                    min: 1, 
                    max: 5 
                })}
                placeholder="Enter a rating between 1 and 5"
                className="block w-full px-4 py-2 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.rating && <p className="text-red-500 text-sm">Rating is required and must be between 1 and 5</p>}
        </div>

        <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Details:</label>
            <textarea
                {...register('comment', { required: true })}
                placeholder="Please provide your comments"
                className="block w-full px-4 py-2 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.comment && <p className="text-red-500 text-sm">Details are required</p>}
        </div>

        <div className="flex justify-center">
            <button
                type="submit"
                className="px-6 py-3 text-white bg-green-900 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
            >
                Submit Feedback
            </button>
        </div>
    </form>
</div>

    );
};

export default FeedbackForm;
