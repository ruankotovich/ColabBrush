# ColabBrush
A simple and dumb colaboratory paint to learn more about Socket.IO and Mongoose, made with hate by Kotovich.
The objectives here were to try something weird like colaboratory painting in a blank canvas, saving its real-time states and sending to everyone (it's not optimized to send only to the users on the session, but it's quite simple trying to tweak and improve this). The current state is saved in MongoDB to keep the beautiful painting saved to everyone see!

# Usage

```sh
node server.js
```

or 

```sh
nodemon server.js
```

or 

```sh
npm start
```

or 

```sh
yarn start
```

Or some other esoteric way to start a node server.

**Obs**: it's quite interesting to remember to run `yarn install ` or `npm install` before it.