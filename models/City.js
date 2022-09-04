const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema(
    {
        country: {

            type: String,

        },
        city: {

            type: String,

        },
        userId: {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'users'
        },
    },
    {
        timestamps: true,
    },
)


const Cities = mongoose.model("cities", citySchema);

module.exports = Cities;