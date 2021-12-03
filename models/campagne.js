class Campagne {
    constructor(dateOfSemis, id, userId, dataBeginCampagne) {
        this.dateOfSemis = dateOfSemis;
        this.id = id;
        this.userId = userId;
        this.dateBeginCampagne = dataBeginCampagne;
    }

    toCampagne(dataMap) {
        return new Campagne(
            dataMap["dateOfSemis"],
            dataMap["id"],
            dataMap["userId"],
            dataMap["dataBeginCampagne"],
        );
    }

    // set dateBeginCampagne(value) {
    //     this.dateBeginCampagne = value;
    // }
}

module.exports = Campagne;