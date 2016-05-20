var request = require('request-promise');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');

var url = 'https://www.darlocoffee.com/store/p8/Cold_Brew_in_a_Box_%282_Pack%29.html';
var recipients = ['rorydungan@gmail.com'];

var sendEmail = function() {
    var transport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "ohdamndarlocoffeefukyeah@gmail.com",
			pass: "",
		},
	});
    
    recipients.forEach(function (recipient) {
        
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

request(url)
    .then(function (html) {

        var $ = cheerio.load(html);

        var quantityInput = $('#wsite-com-product-quantity-input');
        var isOutOfStock = quantityInput.hasClass('wsite-com-product-disabled');
        if (!isOutOfStock) {
            // send email
            sendEmail();
            
            console.log("Not out of stock any more!");
        }
        else {
            console.log("Still out of stock");
        }
    });
    