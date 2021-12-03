const admin = require('../utils/firebase_config');
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};
const sendNotification = (req, res, next) => {
    const registrationToken = req.body.registrationToken;
    const message = {
        notification: {
            title: "test",
            body: "Happy Birthday, succesfuly",
        }
    };
    const options = notification_options;

    admin.messaging().sendToDevice(registrationToken, message, options).then(() => res.status(200).json({ body: "completed" })).catch((err) => {
        console.log(err);
        res.status(400).json({ err: "not completed" });
    });
}

module.exports = {
    sendNotification: sendNotification
}