import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const formatDateTime = (date, startTime, endTime) => {
        const dateObj = new Date(date);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(dateObj);

        return `${formattedDate} | ${startTime} - ${endTime}`;
    };

    const onSubmit = async (data) => {
        try {
            const formattedDateTime = formatDateTime(data.date, data.startTime, data.endTime);

            // Image upload to imgbb
            const imageFile = new FormData();
            imageFile.append("image", data.image[0]);

            const imageResponse = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { "content-type": "multipart/form-data" },
            });

            if (imageResponse.data.success) {
                const campDetails = {
                    campName: data.campName,
                    image: imageResponse.data.data.display_url,
                    fees: parseFloat(data.fees),
                    dateTime: formattedDateTime,
                    location: data.location,
                    healthcareProfessional: data.healthcareProfessional,
                    participants: 0,
                    description: data.description,
                };

                // Save camp details to the database
                const dbResponse = await axiosSecure.post("/camps", campDetails);
                if (dbResponse.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.campName} has been added successfully.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/dashboard/manageCamps')
                }
            }
        } catch (error) {
            // console.error("Error adding camp:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again later.",
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Launch New Camp</title>
            </Helmet>
            <div className="w-full">
            <div className="my-8 overflow-hidden">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center my-8">
                    Add a New Camp 
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 bg-gray-50 rounded-lg shadow-lg px-2 py-8 dark:text-black"
                >
                

                <div className=" md:flex mb-4 md:mb-8">
                        {/* Camp Name */}
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                        <label className="label">
                            <span className="label-text text-sm sm:text-base">Camp Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Camp Name"
                            {...register("campName", { required: true })}
                            className="input input-bordered w-full text-sm sm:text-base"
                        />
                        {errors.campName && <p className="text-red-500 text-sm">Camp Name is required </p>}
                    </div>

                    {/* Location */}
                    <div className="form-control md:w-1/2 md:ml-4">
                        <label className="label">
                            <span className="label-text text-sm sm:text-base">Location*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Location"
                            {...register("location", { required: true })}
                            className="input input-bordered w-full"
                        />
                         {errors.location && <p className="text-red-500 text-sm">Location is required </p>}
                    </div>
                </div>


                <div className=" md:flex mb-4 md:mb-8">

                    
                    {/* Healthcare Professional Name */}
                    <div className="form-control md:w-1/2 mb-4 md:mb-0">
                        <label className="label">
                            <span className="label-text text-sm sm:text-base">Healthcare Professional Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Professional Name"
                            {...register("healthcareProfessional", { required: true })}
                            className="input input-bordered w-full"
                        />
                         {errors.healthcareProfessional && <p className="text-red-500 text-sm">HealthcareProfessional Name is required </p>}
                    </div>

                      {/* Camp Fees */}
                      <div className="form-control md:w-1/2 md:ml-4">
                        <label className="label">
                            <span className="label-text text-sm sm:text-base">Camp Fees*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Fees"
                            {...register("fees", { required: true })}
                            className="input input-bordered w-full text-sm sm:text-base"
                        />
                        {errors.fees && <p className="text-red-500 text-sm">Fees are required </p>}
                    </div>
                </div>

                    <div className=" md:flex mb-4 md:mb-8">

                        {/* Image */}
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                           <div className="form-control w-full">
                           <label className="label">
                                <span className="label-text text-sm sm:text-base">Image*</span>
                            </label>
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                className="file-input w-full text-sm sm:text-base "
                            />
                            {errors.image && <p className="text-red-500 text-sm">Image is required </p>}
                           </div>
                        </div>

                         {/* Date */}
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text text-sm sm:text-base">Date*</span>
                            </label>
                            <input
                                type="date"
                                {...register("date", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.date && <p className="text-red-500 text-sm">Date is required </p>}
                        </div>
                    </div>

                    <div className=" md:flex mb-4 md:mb-8">

                        {/* Start Time */}
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                            <label className="label">
                                <span className="label-text text-sm sm:text-base">Start Time*</span>
                            </label>
                            <input
                                type="time"
                                {...register("startTime", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.startTime && <p className="text-red-500 text-sm">startTime is required </p>}
                        </div>

                        <div className="form-control md:w-1/2 md:ml-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-sm sm:text-base">End Time*</span>
                                </label>
                                <input
                                    type="time"
                                    {...register("endTime", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.endTime && <p className="text-red-500 text-sm">End Time is required </p>}
                            </div>
                        </div>

                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-sm sm:text-base">Description*</span>
                        </label>
                        <textarea
                            placeholder="Enter Description"
                            {...register("description", { required: true })}
                            className="textarea textarea-bordered h-24"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">Description is required </p>}
                    </div>

                    {/* Submit Button */}
                    <button className="btn bg-green-900 hover:bg-green-300 text-white w-full mb-5">Add Camp</button>
                </form>
            </div>
        </div>
        </>

    );
};

export default AddCamp;
