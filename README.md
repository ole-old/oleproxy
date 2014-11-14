# OLE Server 

## How to set up a new National BeLL

### Step 1 - On GoDaddy.com, add a CNAME Record to DNS Server to point the new Domain to the server
For example:
examplebell.ole.org -> hammock.media.mit.edu


### Step 2 - On the server, start a new Docker Container running CouchDB
Example: Use the `docker run` command to create a new container based on the `klaemo/couchdb` image, call it `examplebell` (or whatever new name you desire) and set it to map port `5984` on the inside of the container to the outside host machine's port of `5990` (or whatever new port you desire). 
```
docker run -d -p 5990:5984 --name examplebell klaemo/couchdb;
```
Now run `docker ps` and you'll see that the `examplebell` container is running.  Doing a `curl -XGET http://127.0.0.1:5990` will return a hello from CouchDB running inside the `examplebell` container.


### Step 3 - On the server, Configure the Docker Container to start after a reboot
On the Edit the `/root/hammock.sh` script that run at boot. After the last `docker start xxx` script, add two lines to start your new Docker Container at boot.
```
sleep 3;
docker start examplebell;
``` 


### Step 4 - On the server, map the Domain to the Container Port number 
Add a new mapping to the `options` object found in `/root/oleproxy/server.js`. Example: To map `examplebell.ole.org` to port `5990` on the host machine, edit the `options` object in `/root/oleproxy/server.js` from this...
```
var options = {  
  "18.85.44.139":"http://127.0.0.1:5984", // DO NOT DELETE, this will crash the entire router if you do once someone hits the server by IP 
  "earthbell-qa.ole.org": "http://127.0.0.1:5985", 
  "nationalbell-qa.ole.org": "http://127.0.0.1:5986", 
  "somaliabell.ole.org": "http://127.0.0.1:5987", 
  "ubuntubell.ole.org": "http://127.0.0.1:5988", 
  "earthbell.ole.org": "http://127.0.0.1:5989"
}
```
to this...
```
var options = {  
  "18.85.44.139":"http://127.0.0.1:5984", // DO NOT DELETE, this will crash the entire router if you do once someone hits the server by IP 
  "earthbell-qa.ole.org": "http://127.0.0.1:5985", 
  "nationalbell-qa.ole.org": "http://127.0.0.1:5986", 
  "somaliabell.ole.org": "http://127.0.0.1:5987", 
  "ubuntubell.ole.org": "http://127.0.0.1:5988", 
  "earthbell.ole.org": "http://127.0.0.1:5989",
  "examplebell.ole.org": "http://127.0.0.1:5990"
}
```

### Step 5 - Install the BeLL Apps
Coming soon...

### Step 6 - Install the Resources, Courses, etc.
Coming soon...

