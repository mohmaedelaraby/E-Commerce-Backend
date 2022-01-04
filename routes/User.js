
const express = require('express');
const cryptoJS= require('crypto-js')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verfiyToken');
const UserModuel = require('../modules/UserModuel');
const router = express.Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      req.body.password =  cryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD
      ).toString()
    }
  
    try {
      const updatedUser = await UserModuel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//*****************DELETE************ */
  router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await UserModuel.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //*********************** GET  USER  ********/
  router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
     const wanted_user = await UserModuel.findById(req.params.id);
      res.status(200).json(wanted_user);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //**********GET ALL USER***********//
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await UserModuel.find().sort({ _id: -1 }).limit(5)
        : await UserModuel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  //*************GET USER STATS********* */

  router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await UserModuel.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router 