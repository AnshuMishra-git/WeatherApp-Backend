const response = require('../modules/service/response');
const message = require('../config/message');
const Users = require("../models/Users");
const Cities = require("../models/City");

exports.createCity = async function (req, res) {
    try {
        await Cities.create(req.body, function (err, CitiesResponse) {
            if (CitiesResponse) return res.json(response.success(200, message.serverResponseMessage.CITY_CREATED, CitiesResponse));
            else return res.json(response.success(204, message.serverResponseMessage.FAILURE_CITY_CREATE, err));
        });
    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error, error)
        );
    }
};



exports.myCity = async function (req, res) {

    try {
        const {isShowAll} =  req.body;
        let whereArr = {};
        if(isShowAll){
            whereArr = { userId: req.body.userId };
        }

        console.log('whereArr', whereArr)
        Cities.countDocuments(whereArr, async function (err, count) {
            const data = await Cities.find(whereArr).sort({ updatedAt: -1 });
            const responseObj = {};
            responseObj["data"] = data;
            return res.json(response.success(200, message.serverResponseMessage.YOUR_CITYS, responseObj));
        });

    } catch (error) {
        console.log('error', error);
        return res.json(response.failure(204, message.serverResponseMessage.Catch_Error, error));
    }
};


