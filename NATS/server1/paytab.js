const axios = require('axios');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

// Define your routes and middleware here

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/add-card', (req, res) => {
  const cardDetails = req.body;

  const requestBody = {
    card_number: cardDetails.cardNumber,
    expiry_date: cardDetails.expiryDate,
    cvv: cardDetails.cvv,
    card_holder_name: cardDetails.cardHolderName,
    // Include other required fields
  };

  const headers = {
    Authorization: 'Bearer YOUR_PAYTABS_API_KEY',
    'Content-Type': 'application/json',
  };

  axios
    .post('https://secure-api.paytabs.com/payment/card', requestBody, { headers })
    .then((response) => {
      // Handle the PayTabs response here

      res.json(response.data); // Send the response to the client
    })
    .catch((error) => {
      // Handle the error here

      res.status(500).json({ error: 'An error occurred' }); // Send an error response to the client
    });
});
