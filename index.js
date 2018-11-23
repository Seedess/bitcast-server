const Server = require("upnpserver");

const path = process.argv[2];
if (!path) {
  throw new Error('A path to mount is required as last argument. eg: bitcast-server /Users/gabe/Movies')
}

const server = new Server({ 
    hostname: 'localhost',
    httpPort: 8888,
    name: 'BitCast mount:' + path,
    modelName: 'BitCast-1.0',
    log: true,
    logLevel: 'TRACE',
    ssdpLog: true,
    ssdpLogLevel: 'TRACE'
 }, [
  { path, mountPoint: '/Media', type: 'directory'},
  //{ path: '/Users/chandra/Downloads', mountPoint: '/Movies', type: 'movie'},
  //{ path: '/Users/chandra/Downloads', mountPoint: '/Music', type: 'music'},
  //{ path: '/Users/chandra/Music/iTunes/iTunes Media', mountPoint: '/iTunes'}
]);

server.start();

function onExit(event) {
  console.info('Closing server due to ' + event);
  server.stop(function () {
    console.info("Closed UpnpServer due to " + event);
    process.exit();
  });
}

//do something when app is closing
process.on('exit', onExit.bind(null, 'exit'));

//catches ctrl+c event
process.on('SIGINT', onExit.bind(null, 'SIGINT'));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', onExit.bind(null, 'SIGUSR1'));
process.on('SIGUSR2', onExit.bind(null, 'SIGUSR2'));

//catches uncaught exceptions
process.on('uncaughtException', onExit.bind(null, 'uncaughtException'));