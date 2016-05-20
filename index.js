var request = require('request-promise');
var cheerio = require('cheerio');

request('https://www.darlocoffee.com/store/p8/Cold_Brew_in_a_Box_%282_Pack%29.html')
    .then(function (html) {

        var $ = cheerio.load(html);

        var quantityInput = $('#wsite-com-product-quantity-input');
        var isOutOfStock = quantityInput.hasClass('wsite-com-product-disabled');
        if (!isOutOfStock) {
            // send email.
            
            console.log("Not out of stock any more!");
        }
        else {
            console.log("Still out of stock");
        }
    });