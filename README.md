# websoket-sample

## データの送受信に関して

| メソッド | 効果               |
| :------- | :----------------- |
| on       | データの受信を行う |
| emit     | データの送信を行う |

## サーバを介したやりとり

サーバが仲介役となり、データの送受信を行う。

### サーバ側

`/app.js`から重要な部分の抜粋

```javascript:app.js

// serverには `http.createServer` の帰り値が入る
// socket.ioのリスナを登録
var io = socketio.listen(server);

// io.sockets.on('event名', function );
// Event名は任意で記述できるがわかりやすい方が良いよね。
io.sockets.on('connection', function(s){
  socket.on('client_to_server, function(data){
    io.sockets.emit('servet_to_client', {value: data.value})
  })
})

```

#### connection

クライアントが接続を確率する際に発火する、このなかの処理に関しては接続している限り有効となる。

#### client_to_server

クライアントがサーバに対してアクションを起こした時点で発火

#### server_to_client

サーバがクライアントにデータを送信した時点で発火

onでリスナーの作成を行い、emitで発火させると覚える