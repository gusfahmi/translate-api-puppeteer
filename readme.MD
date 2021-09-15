# Translate API Using Puppeteer

i build this project by using Node.js 15.2.1

to start using the API, you need to install [Puppeteer](https://github.com/puppeteer/puppeteer).
```
npm i puppeteer
```
After that, just import the translate.js to your main project
```javascript
const translate = require('./translate');
```
Translate API expected 2 argument, the **text** that you want to translate and the [Alpha-2 of country code](https://www.iban.com/country-codes) that you want to translate to.
```javascript
translate(text, countryCode).then(response=>console.log(response));
```
or with async await
```javascript
const dataTranslate = await translate(text, countryCode);
console.log(dataTranslate);
```


