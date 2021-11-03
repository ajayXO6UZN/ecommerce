// Create Token and saving in cookie

const sendEmail = (email) => {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'xo6uzn99699@gmail.com',
            pass: 'anujdsaaxo6uzn'
        }
    });

    var mailOptions = {
        from: 'xo6uzn99699@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: `Hi friends, I am very glad to send you message.
                    This is only for testing purpose. `
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;
