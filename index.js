var request = require('request-promise');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var yaml = require('js-yaml');
var fs = require('fs');

var url = 'https://www.darlocoffee.com/store/p8/Cold_Brew_in_a_Box_%282_Pack%29.html';

var sendEmail = function(config) {
    var transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: config.user,
            pass: config.pass,
        },
    });
    
    if (!config.recipients || !(config.recipients instanceof Array)) {
        console.error("No email recipients set up in config");
        return;
    }
    
    config.recipients.forEach(function (recipient) {
        
        transport.sendMail(
            {
                to: recipient,
                from: 'ohdamndarlocoffeefukyeah@gmail.com',
                replyTo: 'ohdamndarlocoffeefukyeah@gmail.com',
                subject: 'Darlo coffee available for order again ☕️',
                text: "Hell yeah " + url,
                attachments: [],
            }, 
            function (err, response) {

                if (err) {
                    console.error('Error occured sending email', err);
                }
                else {
                    console.log("Message sent: ");
                    console.log(response);
                }
            });
    });
};

// 
// Get config
//
try {
    var config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf-8'));
    
    //
    // Execute request
    //
    request(url)
        .then(function (html) {

            var $ = cheerio.load(html);

            var quantityInput = $('#wsite-com-product-quantity-input');
            var isOutOfStock = quantityInput.hasClass('wsite-com-product-disabled');
            if (!isOutOfStock) {
                // send email
                sendEmail(config);
                
                console.log("Not out of stock any more!");
            }
            else {
                console.log("Still out of stock");
            }
        })
        .catch(function (err) {
            console.error(err);
        });
        
}
catch (e) {
    console.error(e);
}
