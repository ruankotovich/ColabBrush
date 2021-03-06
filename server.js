const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const { BrushPainter, db } = require('./database');

async function updatePage(event) {
    console.log('Updating brush...');
    let curPage = await getPage(event.page);
    let { newActions, newFp } = { newActions: curPage.actions, newFp: event.fp };
    newActions.push(event.list);

    return await BrushPainter.updateOne({ page: event.page }, { fp: newFp, actions: newActions });
}

async function clearPage(event) {
    console.log(event);
    return await BrushPainter.updateOne({ page: event.page }, { actions: [] });
}

async function createPage(page) {
    return await BrushPainter.create({ fp: null, list: null, page });
}

async function getPage(page) {
    let result = await BrushPainter.findOne({ page });

    if (!result || result.length === 0) {
        console.log('Created a brand new page ', page)
        result = await createPage(page);
    }
    return result;
}

app.use('/', express.static('fe'));

io.on('connection', function (socket) {
    socket.on('request-state', async function (pl) {
        if (pl && pl.hasOwnProperty('page')) {
            socket.emit('response-state', await getPage(pl.page));
        } else {
            socket.emit('response-error', { message: 'No page in payload' })
        }
    });

    socket.on('request-sync', async function (event) {
        console.log('Synchronizing...');
        if (event && event.hasOwnProperty('page')) {
            updatePage(event);
            socket.broadcast.emit('response-sync', { page: event.page, fp: event.fp, list: event.list });
        } else {
            socket.emit('response-error', { message: 'No page in payload' })
        }
    });

    socket.on('request-clear', async function (event) {
        if (event && event.hasOwnProperty('page')) {
            let updatedState = await clearPage(event);
            socket.broadcast.emit('response-state', updatedState);
        }
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});