import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  // Connect to DB
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  //   authrazetion

  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .session(404)
      .json({ status: "failed", message: "User doesn't exsit!" });
  }
  //   Requests

  if (req.method === "POST") {
    const { title, status } = req.body;
    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });
    }
    user.todo.push({ title, status });
    user.save();
    res.status(201).json({ status: "success", message: "Todo created" });
  }
}
export default handler;
