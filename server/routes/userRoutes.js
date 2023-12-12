import express from "express";
import AsyncHandler from "express-async-handler";

import User from "../models/userModel.js";

const router = express.Router();

router.post(
  "/",
  AsyncHandler(async (req, res) => {
    const { username } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({ username, btn: "", pos: { x: 0, y: 0 } });
    }

    res.status(201).json({
      status: "success",
      user,
    });
  })
);

router.get(
  "/",
  AsyncHandler(async (req, res) => {
    const users = await User.find({});

    res.status(200).json({
      status: "success",
      users,
    });
  })
);

export default router;
