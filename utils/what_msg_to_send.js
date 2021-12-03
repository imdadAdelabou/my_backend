const admin = require("./firebase_config");

class CheckDate {

    aboutDateCampagne(dayNow, dayBeginCampagne) {

        let msgToSend = {
            1: "Fauchage/ défrichement et essouchage",
            2: "Ramassage des herbes",
        };

        for (items of Object.keys(msgToSend)) {
            if (this.compareTwoDate(dayNow, this.generateNextDate(dayBeginCampagne, Number(items))) === true) {
                console.log(msgToSend[items]);
                return msgToSend[items];
            }
        }
        return false;
    }

    aboutDateSemis(dayNow, daySemis) {


        let msgToSend = {
            "-20": "1er Labour",
            "-15": "Fumure de fond",
            "-10": "2e Labour",
            "-9": "Confection des digues /diguettes et canaux d’irrigation / drainage",
            "-8": "Parcellisation",
            "-7": "Mise en eau et mise en boue",
            "-6": "Nivelage",
            "-5": "Pépinière et Fumure d’entretien et decouverture",
            "-4": "Planage",
            "-3": "Semis direct",
            1: "Repiquage",
            2: "Gestion de l’eau / Irrigation et Gestion des adventices",
            3: "Epuration du champ et Contrôle des ravageurs",
            4: "Lutte aviaire",
            14: "Récolte (coupe et mise en bottes)",
            15: "Battage",
            16: "Vannage",
            17: "Séchage",
            18: "Ensachage",
            19: "Stockage",
            20: "Suivi des stocks",
            21: "Transport",
            22: "Triage / calibrage (pour la semence surtout)",
        };


        let allKeys = Object.keys(msgToSend);
        for (let key of allKeys) {
            if (this.compareTwoDate(dayNow, this.generateNextDate(daySemis, Number(key))) === true) {
                console.log("ok");
                return msgToSend[key];
            }
        }
        return false;
    }

    static sendNotification(userToken, msg) {
        let state = false;
        const notification_options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        const message = {
            notification: {
                title: "APP CEREAL NOTIFICATION",
                body: msg,
            }
        };
        return admin.messaging().sendToDevice(userToken, message, notification_options).then(() => state = true).catch((err) => {
            console.log("okay");
            state = false;
        });

    }

    async whatMsgToSend() {
        let dayOfToday = new Date();
        let dayNow = 15; //dayOfToday.getDate() - 20;
        let dayBeginCampagne = 14;

        let userToken = "exsBHm-3RnajWzjgNiJmXi:APA91bGN7vTfCYDXVmvUQlPjMXX0-53of74lIF3tY19K9EDh1OUNXsNk2PADYMfGCUy78iGJZ99B2K9Yy_bsAWcwoEitWi8F85zdbZh1QHY4qp2fQJN2ihiNZfxgDiZJcSIqFDVZBePD";
        let token2 = "fAPildrGRIyjxUt-W2QNlV:APA91bE2Vh0IO-KKFG-FHFFacIjeE_2hwusmnRkdU1okr3wWaXKzBBmVM2_o8XBtljy-ziGInRaiiVbQfXT7m8YzuszIqBxkIWoi6bl0gnVPFeM6UH6Hb7mRezYPmcoMYwbQ9PE5kNGV";
        let users = [{ token: userToken, dayBeginCampagne: 14, dayBeginSemis: 10, dayNow: 15 }, { token: token2, dayBeginCampagne: 14, dayBeginSemis: 14, dayNow: 16 }];

        for (let i = 0; i < users.length; i++) {
            let msgCampagne = this.aboutDateCampagne(users[i].dayNow, users[i].dayBeginCampagne);
            let msgSemis = this.aboutDateSemis(users[i].dayNow, users[i].dayBeginSemis);

            if (msgCampagne != false) {
                this.sendNotification(users[i].token, msgCampagne);
            }
            if (msgSemis != false) {
                this.sendNotification(users[i].token, msgSemis);
            }
        }
    }

    compareTwoDate(firstDate, secondDate) {
        let [year1, month1, day1] = firstDate;
        let [year2, month2, day2] = secondDate;

        console.log("DayNow==>> " + firstDate + typeof firstDate);
        console.log("DayNext==>" + secondDate + typeof secondDate);

        if (year1 === year2 && month1 === month2 && day1 === day2) {
            console.log("meme date");
            return true;
        } else {
            console.log("different date");
            return false;
        }
    }

    numberToAdd(day, numberToAdd, maxDay) {
        let value = day + numberToAdd;
        let sousTrac = value - maxDay;
        return sousTrac;
    }

    generateNextDate(currentDate, numberToAdd) {

        let [year, month, day] = [...currentDate];
        console.log(day);
        let toInt = Number(day);

        if (Number(month) === 2 && ((toInt + numberToAdd) > 28)) {
            let sousTrac = this.numberToAdd(Number(day), numberToAdd, 28);
            return `${year} ${Number(month) + 1} ${sousTrac}`.split(' ');
        }
        if (month == 4 || month == 6 || month == 9 ||  month == 11) {
            if (toInt + numberToAdd > 30) {
                let sousTrac = this.numberToAdd(Number(day), numberToAdd, 30);
                return `${year} ${Number(month) + 1} ${sousTrac}`.split(' ');
            }

        } else {
            if (toInt + numberToAdd > 31) {
                let sousTrac = this.numberToAdd(Number(day), numberToAdd, 31);
                let test = `${year} ${Number(month) + 1} ${sousTrac}`.split(' ');

                return `${year} ${Number(month) + 1} ${sousTrac}`.split(' ');
            } else {
                let value = Number(day) + numberToAdd;

                return `${year} ${month} ${value}`.split(' ');
            }
        }
    }
}

module.exports = CheckDate;