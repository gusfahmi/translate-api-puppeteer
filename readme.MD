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
 

or you can try it directly from my online API.
```
https://gus-translate-api.herokuapp.com/translate
```
make a post request to the URL like below.
```json
{"text": "chair", "to": "id"}
```
here is the example response of the API
```json
{
"status": "success",
"translate": "kursi",
"moreTranslate": [
{
"kursi": "chair, seat, position"
},
{
"ketua": "chairman, head, chief, president, chair, elder"
},
{
"pimpinan": "leadership, management, command, direction, guidance, chair"
},
{
"jabatan": "position, office, post, occupation, function, chair"
},
{
"mengetuai": "preside, chair, chairman, moderate"
}
]
}

```
