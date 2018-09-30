// socket http fs
var http = require('http');
var socketio = require('socket.io');
// ファイルシステム
var fs = require('fs');

// httpサーバのcreate
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});

    //ディレクトリ＋index.htmlを読み込む
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
}).listen(3000);  // ポート競合の場合は値を変更

// websocketのリスナーをserverに追加する。
var io = socketio.listen(server);

io.set('heartbeat interval', 5000);
io.set('heartbeat timeout', 15000);

//接続時のEvent Handle
io.sockets.on('connection', function(socket) {
  console.log('connectを確率しました');
  //clientからデータを受信する。
  socket.on('client_to_server', function(data) {
    //clientからデータを送信する。
    io.sockets.emit('server_to_client', {
      value : data.value,
      typeMsg: data.typeMsg,
      grid: data.grid,
    });
  });
});

io.sockets.on('disconnect', function(){
  console.log("dissconnect");
});

console.log('test');
//emit データの送信 response
//on データの受信 request