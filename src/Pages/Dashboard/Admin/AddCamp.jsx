import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Button from "../../../components/Shared/Button";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();


    const onSubmit = async (data) => {
        try {
            // Image upload to imgbb
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { "content-type": "multipart/form-data" },
            });

            if (res.data.success) {
                // Save camp details to the database
                const campDetails = {
                    campName: data.campName,
                    image: res.data.data.display_url,
                    fees: parseFloat(data.fees),
                    dateTime: data.dateTime,
                    location: data.location,
                    healthcareProfessional: data.healthcareProfessional,
                    participants: 0, // Starts at 0
                    description: data.description,
                };

                console.log(campDetails);

                const dbRes = await axiosPublic.post("/camps", campDetails);
                if (dbRes.data.insertedId) {
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
        }
    };

    return (
        <div className="w-[90%] mx-auto">
            <div className="my-8">
                <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">Add a New Camp Event</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-slate-100 rounded-lg shadow-lg p-4">
                    {/* Camp Name */}
                    {/* <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Camp Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Camp Name"
                            {...register("campName", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div> */}

                    <div className=" md:flex mb-4 md:mb-8 mt-5">
                        <div className="form-control md:w-1/2 mb-4 md:mb-0">
                            <label className="label">
                                <span className="label-text">Camp Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Camp Name"
                                {...register("campName", { required: true })}
                                className="input input-bordered w-full text-xs sm:text-base"
                            />
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">

                            {/* Camp Fees */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Camp Fees*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Fees"
                                    {...register("fees", { required: true })}
                                    className="input input-bordered w-full text-xs sm:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image*</span>
                        </label>
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="file-input w-full max-w-xs"
                        />
                    </div>

                    {/* Camp Fees
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Camp Fees*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Fees"
                            {...register("fees", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div> */}

                    {/* Date & Time */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Date & Time*</span>
                        </label>
                        <input
                            type="datetime-local"
                            {...register("dateTime", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Location */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Location*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Location"
                            {...register("location", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Healthcare Professional */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Healthcare Professional Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Healthcare Professional Name"
                            {...register("healthcareProfessional", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description*</span>
                        </label>
                        <textarea
                            placeholder="Description"
                            {...register("description", { required: true })}
                            className="textarea textarea-bordered h-24"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button className="btn bg-lime-800 text-white w-full mb-5">Add Camp</button>
                    
                </form>
            </div>
        </div>
    );
};

export default AddCamp;
