 
module.exports = (req) => {
 
    // this works when the node server is behind apache proxy
    let serverName = req.header('x-forwarded-server');
    // console.log('x-forwarded-server', serverName);

    if (!serverName) {
        // in dev environments.
        serverName = req.header['origin']; // dev angular client
    }

    if (!serverName) {
        serverName = req.header['host']; // dev sever
    }

    if (!serverName) {
        serverName = req.host;
    }

    if (!serverName) {
        console.log('serverName could not be determined. mail not sent to student');
        return;
    }


    const url = req.protocol + '://' + serverName;

    return url;
     
}