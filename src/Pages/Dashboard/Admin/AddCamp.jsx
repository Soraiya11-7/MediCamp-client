import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

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
                }
            }
        } catch (error) {
            console.error("Error adding camp:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again later.",
            });
        }
    };

    return (
        <div className="w-[90%] mx-auto">
            <div className="my-8">
                <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
                    Add a New Camp Event
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 bg-slate-100 rounded-lg shadow-lg px-4 py-8"
                >
                

                <div className=" md:flex mb-4 md:mb-8">
                        {/* Camp Name */}
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                        <label className="label">
                            <span className="label-text">Camp Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Camp Name"
                            {...register("campName", { required: true })}
                            className="input input-bordered w-full text-sm sm:text-base"
                        />
                    </div>

                    {/* Location */}
                    <div className="form-control md:w-1/2 md:ml-4">
                        <label className="label">
                            <span className="label-text">Location*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Location"
                            {...register("location", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>


                <div className=" md:flex mb-4 md:mb-8">

                    
                    {/* Healthcare Professional Name */}
                    <div className="form-control md:w-1/2 mb-4 md:mb-0">
                        <label className="label">
                            <span className="label-text">Healthcare Professional Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Professional Name"
                            {...register("healthcareProfessional", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                      {/* Camp Fees */}
                      <div className="form-control md:w-1/2 md:ml-4">
                        <label className="label">
                            <span className="label-text">Camp Fees*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Fees"
                            {...register("fees", { required: true })}
                            className="input input-bordered w-full text-sm sm:text-base"
                        />
                    </div>
                </div>

                    <div className=" md:flex mb-4 md:mb-8">

                        {/* Image */}
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                           <div className="form-control w-full">
                           <label className="label">
                                <span className="label-text">Image*</span>
                            </label>
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                className="file-input w-full text-sm sm:text-base "
                            />
                           </div>
                        </div>

                         {/* Date */}
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Date*</span>
                            </label>
                            <input
                                type="date"
                                {...register("date", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div className=" md:flex mb-4 md:mb-8">

                        {/* Start Time */}
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                            <label className="label">
                                <span className="label-text">Start Time*</span>
                            </label>
                            <input
                                type="time"
                                {...register("startTime", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control md:w-1/2 md:ml-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">End Time*</span>
                                </label>
                                <input
                                    type="time"
                                    {...register("endTime", { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description*</span>
                        </label>
                        <textarea
                            placeholder="Enter Description"
                            {...register("description", { required: true })}
                            className="textarea textarea-bordered h-24"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button className="btn bg-green-900 hover:bg-green-300 text-white w-full mb-5">Add Camp</button>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;
