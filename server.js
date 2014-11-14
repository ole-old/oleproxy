var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxy();

var options = {  
	"18.85.44.139":"http://127.0.0.1:5984", // DO NOT DELETE, this will crash the entire router if you do once someone hits the server by IP 
	"earthbell-qa.ole.org": "http://127.0.0.1:5985", 
	"nationalbell-qa.ole.org": "http://127.0.0.1:5986", 
	"somaliabell.ole.org": "http://127.0.0.1:5987", 
	"ubuntubell.ole.org": "http://127.0.0.1:5988", 
	"earthbell.ole.org": "http://127.0.0.1:5989"
}

require('http').createServer(function(req, res) {  
	var target = options[req.headers.host] 
	if (target) {
		proxy.web(req, res, {
			target: options[req.headers.host]
		}, function(e) {
			console.log(e)
		})
	}
	else {
		console.log('No match in options. req.headers.host is ' + req.headers.host)
	}
}).listen(80);

