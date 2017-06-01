import Koa from 'koa';
import serve from 'koa-static';
import co from 'co';
import render from 'koa-swig';
import router from 'koa-simple-router';
import babel_co from 'babel-core/register';
import babel_po from 'babel-polyfill';

import initController from './controller/initController';
import Config from './config/config';

const app = new Koa();

var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);

initController.init(app, router);

app.context.render = co.wrap(render({
    root: Config.get('viewDir'),
    autoescape: true,
    cache: 'memory', // disable, set to false 
    ext: 'html',
    writeBody: false
}));

app.use(serve(Config.get('staticDir')));

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

app.listen(Config.get('port'));

export default app;
