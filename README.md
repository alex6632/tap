# tap
MEAN exercise

Requirements
------------
* mongodb
* node.js v8.9 or later
* angular v^5.0.0

Install
-------
On first install, run
```
npm install
```

Run
-------

1/ Run node server
```
npm run start
```
or just
```
nodemon
```

2/ Run mongodb (on OSX)
```
mongod
```
If you have access problem,
```
sudo mongod
```

2 bis/ On windows, run (update path if necessary)
```
"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
```

3/ Run angular
```
cd client
npm install
ng serve --proxy-config proxy-conf.json
```
