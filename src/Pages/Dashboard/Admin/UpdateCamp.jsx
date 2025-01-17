import {useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCampById from "../../../hooks/useCampById";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCamp = () => {
    const { campId } = useParams();
    const axiosPublic = useAxiosPublic();
    const [camp, isLoading, refetch] = useCampById(campId)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()

    console.log(camp);
    const { _id, campName, image, dateTime, fees, location, healthcareProfessional, description } = camp || {};
    // console.log(dateTime);

    const [preview, setPreview] = useState(image);
    const formattedDate = dateTime
        ? new Date(dateTime.split(" | ")[0]).toISOString().slice(0, 10)
        : "";

    if (isLoading) {
        return <div className="flex items-center min-h-screen justify-center">
            <Skeleton count={3} height={120} width={200} />
        </div>
    }

    const onSubmit = async (data) => {
        try {
            let updatedImage = preview;

            // Upload a new image if provided...........
            if (data.image && data.image[0]) {
                const imageFile = new FormData();
                imageFile.append("image", data.image[0]);

                const imageResponse = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: { "content-type": "multipart/form-data" },
                });

                if (imageResponse.data.success) {
                    updatedImage = imageResponse.data.data.display_url;
                }
            }

            const updatedCampDetails = {
                campName: data.campName,
                location: data.location,
                healthcareProfessional: data.healthcareProfessional,
                fees: parseFloat(data.fees),
                dateTime: `${data.date} | ${data.startTime} - ${data.endTime}`,
                description: data.description,
                image: updatedImage,
            };

            const dbResponse = await axiosPublic.patch(`/update-camp/${_id}`, updatedCampDetails);
            if (dbResponse.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.campName} has been updated successfully.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                navigate('/dashboard/manageCamps');
            }
        } catch (error) {
            console.error("Error updating camp:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again later.",
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Update preview
        }
        // console.log(preview);
    };

    return (
        <div className="w-[90%] mx-auto">
            <div className="my-8">
                <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
                    Update Camp Event
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 bg-slate-100 rounded-lg shadow-lg px-4 py-8"
                >
                    <div className="md:flex mb-4 md:mb-8">
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                            <label className="label">
                                <span className="label-text">Camp Name*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={campName}
                                {...register("campName", { required: true })}
                                className="input input-bordered w-full text-sm sm:text-base"
                            />
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Location*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={location}
                                {...register("location", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div className="md:flex mb-4 md:mb-8">
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                            <label className="label">
                                <span className="label-text">Healthcare Professional Name*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={healthcareProfessional}
                                {...register("healthcareProfessional", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Camp Fees*</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={fees}
                                {...register("fees", { required: true })}
                                className="input input-bordered w-full text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <div className="md:flex mb-4 md:mb-8">
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                            <label className="label">
                                <span className="label-text">Current Image</span>
                            </label>
                            <img src={preview} alt="Preview" className="w-32 h-32 object-cover mb-4" />
                            <input
                                type="file"
                                {...register("image")}
                                className="file-input w-full text-sm sm:text-base"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Date*</span>
                            </label>
                            <input
                                type="date"
                                defaultValue={formattedDate}
                                {...register("date", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div className="md:flex mb-4 md:mb-8">
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                            <label className="label">
                                <span className="label-text">Start Time*</span>
                            </label>
                            <input
                                type="time"
                                defaultValue={dateTime.split(" | ")[1]?.split(" - ")[0]}
                                {...register("startTime", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">End Time*</span>
                            </label>
                            <input
                                type="time"
                                defaultValue={dateTime.split(" | ")[1]?.split(" - ")[1]}
                                {...register("endTime", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description*</span>
                        </label>
                        <textarea
                            defaultValue={description}
                            {...register("description", { required: true })}
                            className="textarea textarea-bordered h-24"
                        ></textarea>
                    </div>

                    <button className="btn bg-green-900 hover:bg-green-300 text-white w-full mb-5">
                        Update Camp
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateCamp;
