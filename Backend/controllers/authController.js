const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Session = require("../models/Session");
const uuid = require("uuid");
const crypto = require("crypto");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET);
    const token = await setToken(user);

    res.json({ user: { role: user.role, id: user._id }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const setToken = async (user) => {
  const sessionId = uuid.v4();
  const payload = {
    sessionId,
  };

  const session = new Session({
    _id: sessionId,
    user,
    expires: new Date(Date.now() + 30 * 60 * 1000),
  });
  await session.save();

  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  ).toString("base64");
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(`${header}.${payloadBase64}`)
    .digest("base64");

  const customToken = `${header}.${payloadBase64}.${signature}`;

  return customToken;
};

exports.logout = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.session.sessionId).exec();

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(`Error during logout: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
