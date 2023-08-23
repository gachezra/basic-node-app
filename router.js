const fs = require('fs');

const routes = (req,res) => {
    if(req.url == '/'){
        return setHomepage(req,res);
    }

    if(req.url == '/username' && req.method.toLowerCase() == 'post'){
        return submitUsername(req,res)
    }
}

function submitUsername(req,res){
    res.setHeader('Content-Type', 'text/html');
    const body = [];
    req.on('data', (data) => {
        body.push(data);
    })

    req.on('end', () => {
        console.log(body)
        const requestBody = Buffer.concat(body).toString();
        const userName = requestBody.split('=')[1];
        fs.writeFile('username.txt', userName, () => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();});
    });
}

function setHomepage(req,res){
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
    <!doctype html>
    <html>
        <head>EventKick</head>
        <body>
            <form action="/username" method="post">
                <div>
                    <label>Enter Username</label>
                    <input type="text" name="username"/>
                </div>
                <div>
                    <input type="submit" value="send"/>
                </div>
            </form>
        </body>
    </html>
    `);
}

module.exports = {
    routes,
    text: 'Helloooo'
};