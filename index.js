var Server = require("upnpserver");

var server = new Server({ 
    hostname: 'localhost',
    httpPort: 8888,
    name: 'StreamCaster ' + (new Date().getTime()),
    modelName: 'StreamCaster-1.0',
    log: true,
    logLevel: 'TRACE',
    ssdpLog: true,
    ssdpLogLevel: 'TRACE'
 }, [
  { path: '/Users/chandra/Downloads', mountPoint: '/All', type: 'directory'},
  { path: '/Users/chandra/Downloads', mountPoint: '/Movies', type: 'movie'},
  { path: '/Users/chandra/Downloads', mountPoint: '/Music', type: 'music'},
  //{ path: '/Users/chandra/Music/iTunes/iTunes Media', mountPoint: '/iTunes'}
]);

server.start();