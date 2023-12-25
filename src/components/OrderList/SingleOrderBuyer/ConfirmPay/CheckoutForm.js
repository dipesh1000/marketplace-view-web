import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./styles/ConfirmPay.scss";
import CardSection from "./CardSection";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../../utils/AxiosInstance";
import { StripeKey } from "../../../../utils/baseUrl";

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);
// eslint-disable-next-line
const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CheckoutForm = ({
  orderId,
  slug,
  handleStatus,
  isSubmitting,
  resolution_id,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const [cardComplete, setCardComplete] = useState(false);
  // eslint-disable-next-line
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
  });

  const history = useHistory();
  const handleHistory = (orderId, slug) => {
    history.replace(`/users/dashboard/singleorders/${orderId}`);
  };
  // const { orderData } = useSelector((state) => state.checkout);

  function handleServerResponse(response) {
    console.table(response);
    if (response.data.status === "requires_action") {
      // Use Stripe.js to handle required card action
      stripe
        .handleCardAction(response.data.data.payment_intent_client_secret)
        .then(handleStripeJsResult);
    } else if (response.data.status === "success") {
      //handle action after successful payment
      handleHistory(orderId, slug);
      // alert(response.data.message);
    } else {
      // Show success message
      setError(response.data.message);
      // problem in backend on response statuses
    }
  }

  function handleStripeJsResult(result) {
    if (result.error) {
      // Show error in payment form
    } else {
      axiosInstance()
        .post("/api/order/resolution/pay", {
          payment_method: "stripe",
          payment_intent_id: result.paymentIntent.id,
          code: orderId,
          resolution_id: resolution_id,
          name: billingDetails?.name,
          email: billingDetails?.email,
        })
        .then(function (result) {
          // Handle server response (see Step 4)
          handleServerResponse(result);
        })
        .catch(function (err) {
          // Handle error here
          handleServerError(err);
        });
    }
  }

  const handleServerError = (err) => {
    setError(err.response?.data?.message);
    setProcessing(false);
    setPaymentMethod(null);
    handleStatus();
    // alert(err.response?.data?.message);
  };

  function stripePaymentMethodHandler(result) {
    if (result.error) {
      // Show error in payment form
      handleStatus();
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 4)
      axiosInstance()
        .post("/api/order/resolution/pay", {
          payment_method: "stripe",
          payment_method_id: result.paymentMethod.id,
          code: orderId,
          resolution_id: resolution_id,
          name: billingDetails?.name,
          email: billingDetails?.email,
        })
        .then(function (result) {
          // Handle server response (see Step 4)
          handleServerResponse(result);
        })
        .catch(function (err) {
          // Handle error here
          handleServerError(err);
        });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return null;
    } else {
      handleStatus();
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      if (error) {
        elements.getElement("card").focus();
        handleStatus();

        return;
      }

      if (cardComplete) {
        setProcessing(true);
      }

      const payload = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      });

      setProcessing(false);

      if (payload.error) {
        setError(payload.error);
      } else {
        stripePaymentMethodHandler(payload);
        setPaymentMethod(payload.paymentMethod);
      }
    }
  };

  // eslint-disable-next-line
  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      name: "",
      email: "",
    });
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle text-dark" role="alert">
        PROCESSING
      </div>
      <div className="ResultMessage">
        Please wait while we process your payment.
      </div>
      {/* <ResetButton onClick={reset} /> */}
    </div>
  ) : (
    <>
      <form className="Form" onSubmit={handleSubmit} id="stripe-form">
        {orderId && <CardSection />}
        <fieldset className="FormGroup">
          <Field
            label="Name"
            id="name"
            type="text"
            placeholder="Jane Doe"
            required
            autoComplete="name"
            value={billingDetails.name}
            onChange={(e) => {
              setBillingDetails({
                ...billingDetails,
                name: e.target.value,
              });
            }}
          />
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="janedoe@gmail.com"
            required
            autoComplete="email"
            value={billingDetails.email}
            onChange={(e) => {
              setBillingDetails({
                ...billingDetails,
                email: e.target.value,
              });
            }}
          />
        </fieldset>
      </form>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(StripeKey);

const App = ({ orderId, slug, handleStatus, isSubmitting, resolution_id }) => {
  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm
          orderId={orderId}
          resolution_id={resolution_id}
          slug={slug}
          isSubmitting={isSubmitting}
          handleStatus={handleStatus}
        />
      </Elements>
    </div>
  );
};

export default App;
