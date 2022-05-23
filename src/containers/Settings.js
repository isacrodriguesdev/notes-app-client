import "./Settings.css"
import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

function Settings() {

  const [textStorage, setTextStorage] = useState("")
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log(error, paymentMethod, event)
  };

  return (
    <div className="Settings">
      <form onSubmit={handleSubmit}>
        <label style={{ marginBottom: 10 }} for="exampleInputEmail1">Storage</label>
        <input type="number" className="form-control" id="storage" value={textStorage}
          onChange={e => setTextStorage(e.target.value)} />
        <div style={{ marginTop: 20 }} />
        <CardElement />
        <button className="btn btn-secondary btn-pay" type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default Settings
