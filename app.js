const http = require('http');
const routes = require('./router');

const server = http.createServer(routes.routes);
console.log(routes.text);

server.listen(3000, () => {
    console.log('Server listening to port 3k')
});