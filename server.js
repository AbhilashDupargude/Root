import express, { Router, static } from 'express';
var app = express();
var port = process.env.PORT || 8080;
import morgan from 'morgan';
import { connect } from 'mongoose';
import User from './app/models/user';
import { json, urlencoded } from 'body-parser';
var router = Router();
var appRoutes = require('./app/routes/api')(router);
import { join } from 'path';

app.use(morgan('dev'));
app.use(json()); // for parsing application/json
app.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(static(__dirname + '/public'));
app.use('/api',appRoutes);

//http://localhost:8080/users

connect('mongodb://localhost:27017/tutorial', function(err){
    if(err){
        console.log('Not connected to database', + err);
        }
        else{
            console.log('Connected successfully to MongoDB');
        }
});
app.get('*',function(req, res){
res.sendfile(join(__dirname + '/public/app/views/index.html'));
});
app.listen(port, function(){
console.log('Running the server on port ' + port);
});