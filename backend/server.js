const express = require('express');
const stripe = require('stripe')('sk_test_51OXKWeSBpKxZ9YXnO6CXpAnC25Q3Ot6GaBXcwbLbB6FXaaUw4Te5rMb0XHxchHuaKtnNszXUqxBUOL4Owip9AnjO007lAC3joT');
const cors = require('cors');

const app = express();

app.use(cors()); //installed cors


// Parse JSON requests
app.use(express.json());

// Create a Payment Intent on the server
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency, token } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: token,
      confirm: true,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating Payment Intent:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});