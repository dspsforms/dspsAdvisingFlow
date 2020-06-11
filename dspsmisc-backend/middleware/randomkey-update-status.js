
const RandomKey = require("../models/random-key.model");

module.exports = (req, res, next) => {
    try {
        const randomStr = req.randomStr;

        if (!randomStr) {
            next();
            return;
        }

        const status = req['randomStrStatus'] || 'used';

        // see https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        const filter = { key: randomStr };
        const update = {
            status: status,
            usedIP: req.ip,
            useDate: new Date()
        };

        // if randomStr is found
        RandomKey.findOneAndUpdate(filter, update).then(randomKey => {
            console.log("randomKey updated to:", randomKey);
        }).catch(err => {
            console.log("findOneAndUpdate error", err);
        });
    
    } catch (err) {
        console.log("outer error", err);
    }
    
    // next();

};
