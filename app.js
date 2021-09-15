const express = require('express');
const cors = require('cors'); 
const translate = require('./translate');

const app = express(); 
app.use(express.json());
app.use(cors());

app.post('/translate', async (req, res) =>{

    const {text, to} = req.body;
    try{
        const textTranslate = await translate(text, to);
		res.send(textTranslate);
    }catch(e){
        res.send(e.message);
    }
    

});

app.listen(process.env.PORT || 3030);
