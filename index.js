const express = require('express');
const app = express();
const admin = require('./utils/firebase_config.js');
const routerNotif = require('./routes/notification.js');
const bodyParser = require('body-parser');
const cron = require("node-cron");
const CheckDate = require("./utils/what_msg_to_send.js");
const getCampagnes = require("./utils/get_campagnes.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    // getCampagnes();
    new CheckDate().aboutDateSemis(["2021", "3", "29"], ["2021", "3", "28"]);
    let result = new CheckDate().generateNextDate(["2021", "3", "28"], 15);
    // console.log("Date Now===>" + result);
    res.send("Our Backend");
})
app.use('/firebase', routerNotif);

// * * * * * Tout les 1 minutes
// 0 6 * * * Tout les jours a 6heures
cron.schedule('0 6 * * *', () => {
    console.log("Run this every day at 06pam");
});

app.listen(3005, () => {
    console.log("Everything is okay");
})