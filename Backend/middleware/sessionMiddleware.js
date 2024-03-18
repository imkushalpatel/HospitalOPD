const Session = require('../models/Session');

const crypto = require('crypto');


const extendSession = async (sessionId) => {
    try {
        const session = await Session.findById(sessionId).exec();

        if (session) {

            const remainingTime = session.expires - Date.now();
            if (remainingTime <= 5 * 60 * 1000) {

                session.expires = new Date(session.expires.getTime() + 10 * 60 * 1000);
                await session.save();
                console.log(`Session extended for session ID: ${sessionId}`);
            } else {
                console.log(`No need to extend session for session ID: ${sessionId}`);
            }
        } else {
            console.log(`Session not found for session ID: ${sessionId}`);
        }
    } catch (error) {
        console.error(`Error extending session: ${error.message}`);
    }
};
const tokenMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {

            const decoded = verifyToken(token);


            const sessionData = await Session.findById(decoded.sessionId).exec();


            if (!sessionData || Date.now() > sessionData.expires.getTime()) {
                return res.status(403).json({ message: 'Token has expired or is invalid' });
            }


            req.session = {
                sessionId: decoded.sessionId,
                data: sessionData.data,
                expiresAt: sessionData.expires.getTime(),
            };

            extendSession(decoded.sessionId);
        } catch (error) {
            console.log(error);
            return res.status(403).json({ message: 'Invalid token' });
        }
    }

    next();
};


const verifyToken = (token) => {
    const [header, payload, signature] = token.split('.');
    const verifiedSignature = crypto
        .createHmac('sha256', process.env.JWT_SECRET)
        .update(`${header}.${payload}`)
        .digest('base64');

    if (verifiedSignature !== signature) {
        throw new Error('Invalid signature');
    }

    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
    return { sessionId: decodedPayload.sessionId };
};





module.exports = tokenMiddleware;