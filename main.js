const express = require('express');
var session = require('express-session');
var MySqlStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');

var options = {
    host : 'localhost',
    user : 'root',
    password : '0807',
    database : 'webdb2024'
};
var sessionStore = new MySqlStore(options);
const app = express();
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
    store : sessionStore
}));

app.set('views',__dirname + '/views');
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: false }));

const rootrouter = require('./router/rootrouter');
const noticerouter = require('./router/noticerouter');
const qnarouter = require('./router/qnarouter');
const satisrouter = require('./router/satisrouter');
const statrouter = require('./router/statrouter');
const userrouter = require('./router/userrouter')

app.use(express.static('public'));

app.use('/',rootrouter);
app.use('/notice',noticerouter);
app.use('/qna', qnarouter);
app.use('/satis', satisrouter);
app.use('/stat', statrouter);
app.use('/user', userrouter);

app.get('/favicon.ico', (req,res)=>res.writeHead(404));
app.listen(3000, ()=>console.log('Example app listening on port 3000'));

