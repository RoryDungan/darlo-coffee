# Darlo coffee checker ☕️
### aka _ohdamndarlocoffeefuckyeah_ 

My favourite online [cold press coffee store](https://www.darlocoffee.com/) 
is out of stock and I need to know as soon as they're 
back. 
This program scrapes their store page to work out whether 
or not orders have opened up again.

## Setting up
Save a `config.yaml` file in the root directory of the 
repo with the following format:
```
user: ohdamndarlocoffeefukyeah@gmail.com
pass: (your gmail password) 
recipients: 
 - rorydungan@gmail.com 
```
Replace "ohdamndarlocoffeefukyeah@gmail.com" with your 
own Gmail account and add however many recipients you 
like at the end. 

For best results run the script as a cron job to 
automatically check on a regular basis (although Darlo
Coffee co are nice people so don't make it _too_ regular). 
