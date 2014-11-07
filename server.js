var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxy();

var options = {  
    "18.85.44.139":"http://hammock.media.mit.edu:5984", 
    "qa.ole.org": "http://hammock.media.mit.edu:5984", 
    "somaliabell.ole.org": "http://hammock.media.mit.edu:5985", 
    "ubuntubell.ole.org": "http://hammock.media.mit.edu:5986", 
    "cambridge.ole.org": "http://hammock.media.mit.edu:5987"
}

require('http').createServer(function(req, res) {  
  proxy.web(req, res, {
    target: options[req.headers.host]
  }, function(e) {
    console.log(e)
  });
}).listen(80);

