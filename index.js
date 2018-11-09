const server = require('./api/server.js');

const port = process.env.PORT || 8500;
server.listen(port, () => console.log(`${port} is open for business`))





