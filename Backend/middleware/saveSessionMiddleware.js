// const jwt = require('jsonwebtoken');

// exports.verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid token' });
//         }
//         req.user = decoded;
//         next();
//     });
// };

module.exports = async (req, res, next) => {
  if (req.session && req.session.sessionId && req.session.data) {
    try {
      const { sessionId } = req.session;

      const session = await Session.findByIdAndUpdate(
        sessionId,
        { data: req.session.data },
        { new: true, upsert: false }
      );

      console.log(`Session data saved for session ID: ${sessionId}`);
    } catch (error) {
      console.error(`Error saving session data: ${error.message}`);
    }
  }

  next();
};
