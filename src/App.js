import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from "../src/Pages/payment";

function App() {

  const stripePromise = loadStripe('pk_test_51OXKWeSBpKxZ9YXn0P92Wupabn92YsGHUzGwbhpCDnpgi1q2bTZKKj83vrhZztuRXifEOs7FfJR7imIXsIV8j8np00ewl1PEU1');
 
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}

export default App;
