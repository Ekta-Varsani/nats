const express = require("express");
require('./model')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const User = require('mongoose').model('user')

const paypal = require('paypal-rest-sdk');

// Configure PayPal SDK with your credentials
paypal.configure({
    mode: 'sandbox', // Set to 'live' for production
    client_id: 'AXyil6yIK9V4r6PjrvAMEZlJcSyorQTtqm9VMIjPOQaEL7RitEvEmB2IYNlsZ1NdeuEKVB8PTq-EMn3t',
    client_secret: 'EH262jodEYXL4wqTO8rJHRkqzRNLyqUuhjSi77QixFxBJcGPoHoNO09hZal82uPMkrjZXdIi6YT22sM5'
});

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

const cardDetails = {
    number: '4111111111111111',
    type: 'visa',
    expire_month: '12',
    expire_year: '2029',
    cvv2: '123',
    first_name: 'ekta',
    last_name: 'varsani'
};



app.post('/pay', (req, res) => {
    // const create_payment_json = {
    //     "intent": "sale",
    //     "payer": {
    //         "payment_method": "paypal"
    //     },
    //     "redirect_urls": {
    //         "return_url": "http://localhost:3000/success",
    //         "cancel_url": "http://localhost:3000/cancel"
    //     },
    //     "transactions": [{
    //         "item_list": {
    //             "items": [{
    //                 "name": "Red Sox Hat",
    //                 "sku": "001",
    //                 "price": "25.00",
    //                 "currency": "USD",
    //                 "quantity": 1
    //             }]
    //         },
    //         "amount": {
    //             "currency": "USD",
    //             "total": "25.00"
    //         },
    //         "description": "Hat for the best team ever"
    //     }]
    // };

    paypal.creditCard.create(cardDetails, (error, creditCard) => {
        if (error) {
          console.error(error.response);
          // Handle the error
        } else {
          console.log('Card added successfully:', creditCard);
          // Use the creditCard object for further processing
        }
      });
    app.get('/success', (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };
       

        // paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        //     if (error) {
        //         console.log(error.response);
        //         throw error;
        //     } else {
        //         console.log(JSON.stringify(payment));
        //         res.send('Success');
        //     }
        // });
    });
    // paypal.payment.create(create_payment_json, function (error, payment) {
    //     if (error) {
    //         throw error;
    //     } else {
    //         for (let i = 0; i < payment.links.length; i++) {
    //             if (payment.links[i].rel === 'approval_url') {
    //                 res.redirect(payment.links[i].href);
    //             }
    //         }
    //     }
    // });

});
app.get('/cancel', (req, res) => res.send('Cancelled'));


app.post('/pay2', (req, res) => {
    const paymentDetails = {
        intent: 'sale',
        payer: {
          payment_method: 'PAYPAL',
          payer_info: {
            email: 'bulk-sb-2@business.example.com',
            billing_address: {
              line1: '123 Main St',
              city: 'San Jose',
              state: 'CA',
              postal_code: '95131',
              country_code: 'US'
            }
          },
          funding_instruments: [{
            credit_card_token: {
              credit_card_id: 'CARD-4SV57182SS903290EMSJG2IA'
            }
          }]
        },
        transactions: [{
          amount: {
            total: '10.00',
            currency: 'USD'
          }
        }]
      };
      paypal.payment.create(paymentDetails, (error, payment) => {
        if (error) {
          console.error(error.response);
          // Handle the error
        } else {
          console.log('Payment completed successfully:', payment);
          // Use the payment object for further processing
        }
      });
})

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});