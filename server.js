var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port=5000;

app.use(express.static('client'));

server.listen(port, () => console.log(`listening on port ${port}!`));

var mockDB = [
    {
      id:1,
      count:0
    },{
      id:2,
      count:0
    },{
      id:3,
      count:0
    },{
        id:4,
        count:0
    },{
        id:5,
        count:0
    }
];

mockDBchange = (mockDB, io) => {

    
    return function(){

                var index=-1, item, i;
                var arr=[];
                var clonedTable=[...mockDB];
                var elements=Math.floor(Math.random() * Math.floor(mockDB.length));

                for(i=0;i<elements;i++){
                    
                    newIndex = p => {
                        var index=Math.floor(Math.random() * Math.floor(clonedTable.length)); 
                        while( p == index )
                        {
                            index=Math.floor(Math.random() * Math.floor(clonedTable.length));
                        }
                        return index;
                    }
                    
                    index=newIndex(index);

                    mockDB[index].count++;

                    item=clonedTable.splice(index, 1)[0];
                    item.count++;
                    arr=[...arr, item ];

                }

                io.sockets.emit('messages',arr);
        };

}



io.on('connection',function(socket){
    
    console.log("user connected :)");

    socket.emit('messages', mockDB);

    setInterval( mockDBchange(mockDB, io),20000);

    socket.on('disconnect', function(){
        console.log('user disconnected :(');
    });
    
});

