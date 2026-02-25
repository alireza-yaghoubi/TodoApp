import { verifyPassword } from "@/utils/auth";

const { default: connectDB } = require("@/utils/connectDB");
const { getServerSession } = require("next-auth");
const { authOptions } = require("./auth/[...nextauth]");
const { default: User } = require("@/models/User");

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

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exsit!" });
  }

  if (req.method === "POST") {
    const {name, lastName, password } = req.body;
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(422).json({
        status: "failed",
        message: "password is incorrect!",
      });
    }
    if (!name || !lastName || !password) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }

    user.name = name;
    user.lastName = lastName;
    user.save();


    res
      .status(200)
      .json({
        status: "success",
        data: name,
        lastName,
        email: session.user.email,
      });
  }
}
export default handler;
