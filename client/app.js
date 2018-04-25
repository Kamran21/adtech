function updateUI(data){
    data.forEach( item => document.querySelector(".box-" + item.id + " span").innerHTML=item.count );
}

var socket = io.connect('http://localhost:5000',{'forceNew': true});

socket.on('messages', function (data) {
    
    console.table(data);
    updateUI(data);

});