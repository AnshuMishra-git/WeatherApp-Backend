
const userCreate = require("../models/Users");
const message = require("../config/message");
const auth = require("../modules/service/auth")
const response = require("../modules/service/response");

exports.userCreate = async function (req, res) {
    try {
        const userChecking = await userCreate.findOne({ email: req.body.email });
        if (!userChecking) {
            await userCreate.create(req.body, async function (err, userCreateResponse) {
                if (userCreateResponse) {
                    let token = await auth.generateToken(userCreateResponse._id.toString());
                    await userCreate.findOneAndUpdate({ _id: userCreateResponse._id }, { userToken: token }, { new: true }).lean();
                    userCreateResponse._doc.userToken = token;
                    return res.json(response.success(200, message.serverResponseMessage.USER_CREATED, userCreateResponse));
                }
                else return res.json(response.failure(204, message.serverResponseMessage.FAILURE_USER_CREATE, err));
            });
        } else {
            let token = await auth.generateToken(userChecking._id.toString());
            await userCreate.findOneAndUpdate({ _id: userChecking._id }, { userToken: token }, { new: true }).lean();
            // userChecking._doc.userToken = token;
            return res.json(response.success(200, message.serverResponseMessage.LOGIN_SUCCESSFFULLY, userChecking)
            );
        }
    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error, error)
        );
    }
};
exports.userLogout = async function (req, res) {
    try {
        const userChecking = await userCreate.findOne({ _id: req.body.userId });
        if (userChecking.userToken) {
            const userLogout = await userCreate.findOneAndUpdate({ _id: req.body.userId }, { userToken: null }, { new: true }).lean();
            if (userLogout) return res.json(response.success(200, message.serverResponseMessage.LOGOUT_SUCCESSFFULLY, userChecking))
            else return res.json(response.success(200, message.serverResponseMessage.LOGOUT_UNABLE, userChecking))
        } else return res.json(response.success(200, message.serverResponseMessage.LOGOUT_UNABLE, userChecking))

    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error, error)
        );
    }
};

