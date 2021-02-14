const { server } = require('./app');

const serverConnection = server.listen(process.env.PORT || 3000, () => {
    console.log(`Express Server / Ready on`, serverConnection.address());
});