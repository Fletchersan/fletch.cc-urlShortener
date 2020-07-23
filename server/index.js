const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path')
const urls = require('./db/urls');

const app = express();


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('./public'))

app.get('/:name', (req, res) => {
    urls.find(req.params.name)
    .then(result => {
        if(result === undefined || result === null)
        {
            res.redirect(`/404.html?name=${req.params.name}`);
        } else {
            res.redirect(result.url);
        }
    })
})


app.post('/api/fletch', async (req,res)=> {
    console.log(req.body);
    try {
        const url = await urls.create(req.body);
        res.json(url);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json(error);
    }
    
})

app.get('/', (req, res) => {
    res.render('index.html');
})




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
})