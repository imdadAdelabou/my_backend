const admin = require("./firebase_config");
const db = admin.firestore();
const Campagne = require("../models/campagne");
const CheckDate = require("./what_msg_to_send");


const getUserToken = async(userId) => {
    const users = db.collection("users");
    const datas = await users.doc(userId).get();
    if (!datas.exists) {
        console.log("Document exists");
        return false;
    } else {
        const userData = datas.data();
        return userData["userToken"];
    }
}

const getCampagnes = async() => {
    const campagnesDb = db.collection("campagnes").get().
    then(async(doc) => {

            console.log("get data");
            const listsCampagne = doc.docs.map((e) => {
                let data = e.data();
                let campagne = new Campagne().toCampagne(data);
                let toObject = data.dateBeginCampagne;
                let seconds = toObject["_seconds"];
                let campagneDate = new Date(seconds * 1000);
                campagne.dateBeginCampagne = campagneDate.toISOString().split(':')[0];
                console.log("<===== VALUE CAMPAGNE ====>");
                console.log(campagne);
                return campagne;
            });
            console.log("====> NEXT <====");
            let index = 0;
            console.log(listsCampagne);
            console.log(listsCampagne.length);

            console.log("NextDate ==>> ", new CheckDate().generateNextDate(listsCampagne[0].dateOfSemis.split(' '), 22));
            while (index < listsCampagne.length) {
                console.log("DEBUTYTTT");
                // let msgCampagne = new CheckDate().aboutDateCampagne(30, Number(listsCampagne[0].dateBeginCampagne.split('-')[2].substr(0, 2)));
                let msgSemis = new CheckDate().aboutDateSemis("2021 4 19".split(' '), listsCampagne[index].dateOfSemis.split(' ') /* Number(listsCampagne[index].dateOfSemis.split(' ')[0]*/ );
                let userToken = await getUserToken(listsCampagne[index].userId);

                console.log("UserToken ==> " + userToken);
                // if (msgCampagne != false && userToken != false) {
                //     console.log("Message ==> " + msgCampagne);
                //     await new CheckDate().sendNotification(userToken, msgCampagne);
                // }
                if (msgSemis != false && userToken != false) {
                    await CheckDate.sendNotification(userToken, msgSemis);
                }
                console.log("FINN");
                index += 1;
            }
        })
        .catch((err) => { console.log(err); });
    console.log(campagnesDb);
}

module.exports = getCampagnes;