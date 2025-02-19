import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCampById from "../../../hooks/useCampById";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCamp = () => {
    const { campId } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [camp, isLoading, refetch] = useCampById(campId)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()


    // console.log(camp);
    const { _id, campName, image, dateTime, fees, location, healthcareProfessional, description } = camp || {};
    // console.log(dateTime);

    const [preview, setPreview] = useState('');
    useEffect(() => {
        if (camp?.image) {
            setPreview(camp.image);
        } else {
            setPreview('');
        }
    }, [camp]);



    const formattedDate = dateTime
        ? new Date(dateTime.split(" | ")[0]).toLocaleDateString("en-CA")
        : ""; // Returns the date in YYYY-MM-DD format



    // if (isLoading) {
    //     return <div className="flex items-center min-h-screen justify-center">
    //         <Skeleton count={3} height={120} width={200} />
    //     </div>
    // }

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
            const dateFormat = new Date(data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            // console.log(dateFormat);


            const updatedCampDetails = {
                campName: data.campName,
                location: data.location,
                healthcareProfessional: data.healthcareProfessional,
                fees: parseFloat(data.fees),
                dateTime: `${dateFormat} | ${data.startTime} - ${data.endTime}`,
                description: data.description,
                image: updatedImage,
            };

            const dbResponse = await axiosSecure.patch(`/update-camp/${_id}`, updatedCampDetails);
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
            // console.error("Error updating camp:", error);
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
        <>
            <Helmet>
                <title>Admin Dashboard | Update Camp</title>
            </Helmet>
            <div className="w-full overflow-hidden">
                <div className="my-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center my-8">
                        Update Camp
                    </h2>
                    {
                        
                        isLoading ? (<div className="flex items-center justify-center">
                        <span className="loading loading-bars loading-lg flex items-center justify-center dark:text-white dark:bg-white text-green-800"></span>
                       
                    </div>)
                        : 
                        <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 bg-gray-50 rounded-lg shadow-lg px-4 py-8 dark:text-black"
                    >
                        <div className="md:flex mb-4 md:mb-8">
                            <div className="form-control md:w-1/2 mb-4 md:mb-0">
                                <label className="label">
                                    <span className="label-text text-sm sm:text-base">Camp Name*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={campName}
                                    {...register("campName", { required: true })}
                                    className="input input-bordered w-full text-sm sm:text-base"
                                />
                                {errors.campName && <p className="text-red-500 text-sm">Camp Name is required </p>}
                            </div>
                            <div className="form-control md:w-1/2 md:ml-4">
                                <label className="label">
                                    <span className="label-text text-sm sm:text-base">Location*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={location}
                                    {...register("location", { required: true })}
                                    className="input input-bordered w-full text-sm sm:text-base "
                                />
                                {errors.location && <p className="text-red-500 text-sm">Location is required </p>}
                            </div>
                        </div>

                        <div className="lg:flex mb-4 lg:mb-8">
                            <div className="form-control lg:w-1/2 mb-4 lg:mb-0">
                                <label className="label">
                                    <span className="label-text text-sm sm:text-base">Healthcare Professional Name*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={healthcareProfessional}
                                    {...register("healthcareProfessional", { required: true })}
                                    className="input input-bordered w-full text-sm sm:text-base"
                                />
                                {errors.healthcareProfessional && <p className="text-red-500 text-sm">HealthcareProfessional Name is required </p>}
                            </div>
                            <div className="form-control lg:w-1/2 lg:ml-4">
                                <label className="label">
                                    <span className="label-text text-sm sm:text-base">Camp Fees*</span>
                                </label>
                                <input
                                    type="number"
                                    defaultValue={fees}
                                    {...register("fees", { required: true })}
                                    className="input input-bordered w-full text-sm sm:text-base"
                                />
                                {errors.fees && <p className="text-red-500 text-sm">Fees are required </p>}
                            </div>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-sm sm:text-base">Current Image</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <img src={preview} alt="Preview" className="w-12 h-12 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg" />
                                <input
                                    type="file"
                                    {...register("image")}
                                    className="file-input file-input-bordered w-full h-8 sm:h-12 rounded-lg text-xs md:text-sm"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {errors.image && <p className="text-red-500 text-sm">Image is required </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-sm sm:text-base">Date*</span>
                            </label>
                            <input
                                type="date"
                                defaultValue={formattedDate}
                                {...register("date", { required: true })}
                                className="input input-bordered w-full text-sm sm:text-base"
                            />
                            {errors.date && <p className="text-red-500 text-sm">Date is required </p>}
                        </div>


                        <div className="md:flex mb-4 md:mb-8">
                            <div className="form-control md:w-1/2 mb-4 md:mb-0">
                                <label className="label">
                                    <span className="label-text text-sm sm:text-base">Start Time*</span>
                                </label>
                                <input
                                    type="time"
                                    defaultValue={dateTime.split(" | ")[1]?.split(" - ")[0]}
                                    {...register("startTime", { required: true })}
                                    className="input input-bordered w-full text-sm sm:text-base"
                                />
                                {errors.startTime && <p className="text-red-500 text-sm">startTime is required </p>}
                            </div>
                            <div className="form-control md:w-1/2 md:ml-4">
                                <label className="label">
                                    <span className="label-text text-sm sm:text-base">End Time*</span>
                                </label>
                                <input
                                    type="time"
                                    defaultValue={dateTime.split(" | ")[1]?.split(" - ")[1]}
                                    {...register("endTime", { required: true })}
                                    className="input input-bordered w-full text-sm sm:text-base"
                                />
                                {errors.endTime && <p className="text-red-500 text-sm">End Time is required </p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-sm sm:text-base">Description*</span>
                            </label>
                            <textarea
                                defaultValue={description}
                                {...register("description", { required: true })}
                                className="textarea textarea-bordered h-24 text-sm sm:text-base"
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-sm">Description is required </p>}
                        </div>

                        <button className="btn bg-green-900 hover:bg-green-800 text-white w-full mb-5">
                            Update Camp
                        </button>
                    </form>
                    }
                 
                </div>
            </div>
        </>

    );
};

export default UpdateCamp;
