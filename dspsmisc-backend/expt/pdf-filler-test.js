const pdfFiller = require('pdffiller');

// does not work on mac
// requires pdftk which is available on windows and linux

const sourcePDF = "./LateAddTest.pdf";
const  destinationPDF = "./test_complete.pdf";

const data = {
    "collegeId" : "G01234567",
    "lastName" : "Doe"
};

fillForm = () => {

    try {

        pdfFiller.fillForm(sourcePDF, destinationPDF, data, function (err) {
            if (err) throw err;
            console.log("In callback (we're done).");
        });
            
    } catch (err) {
        console.log(err);
    }

} 


module.exports = fillForm;