const app = require("./src/app");

const PORT = 3055

const server = app.listen(3055, () => {
    console.log('App listening on port 3055!');
});

process.on("SIGINT", () => {
    server.close(() => console.log('Server closed'));
    // notify.send( ping... )
})