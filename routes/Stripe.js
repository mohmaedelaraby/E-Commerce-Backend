const express = require('express');
const router = express.Router();
const KEY ="sk_test_51KEHNkAFEwvcyB9ZZdKeOev2HHNiCBZFPQUQybK0rT3rvS6J4epuVfH66FAe8k8DFXEOlzxkQrWhpOoGFiGD88wL00IiJvoGDS"
const stripe = require('stripe')(KEY)


router.post("/payment", (req, res) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  });

module.exports = router