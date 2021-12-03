const admin = require("firebase-admin");
const serviceAccount = require('./appcereal-firebase-adminsdk-nzmdu-1b23405c8c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
module.exports = admin;