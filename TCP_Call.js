const net = require('net').Socket();

net.connect(80, 'google.com');
net.write('GET https://nodejs.org/api/net.html');

net.on('data', function(d){
    console.log(d.toString());
})

net.end();