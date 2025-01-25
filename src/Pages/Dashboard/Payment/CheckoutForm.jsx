import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useRegisteredCampById from "../../../hooks/useRegisteredCampById";
import { div } from "framer-motion/client";


const CheckoutForm = ({ id }) => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [camp, isLoading, refetch] = useRegisteredCampById(id);
    // console.log(camp);

    const { user } = useAuth();
    const navigate = useNavigate();

    const totalPrice = camp.campFees;
    // console.log(totalPrice);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            setError(confirmError.message)
            // console.log('confirm error')
        }
        else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    campName: camp.campName,
                    registerId: camp._id,
                    paymentStatus: "Paid",
                    confirmationStatus: camp.confirmationStatus
                }

                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data,transactionId,paymentIntent.id);
                refetch();
                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Thank you for the payment! Your transaction id is ${paymentIntent.id}`,
                        showConfirmButton: false,
                        timer: 5000
                    });
                    navigate('/dashboard/paymentHistory')
                }

            }
        }

    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center my-8">Complete Your Payment</h2>
            <form onSubmit={handleSubmit} className="">

                <div className="border border-gray-300 rounded-lg p-3 hover:border-green-800 focus-within:border-green-800 transition duration-150 max-w-xl overflow-hidden ">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#2D3748',
                                    '::placeholder': {
                                        color: '#A0AEC0',
                                    },
                                },
                                invalid: {
                                    color: '#E53E3E',
                                },
                            },
                        }}
                    />
                </div>

                <button className="btn btn-sm bg-green-800 hover:bg-green-300 text-white my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
            </form>

        </div>

    );
};

export default CheckoutForm;