var initState=0;
function updateUI(data){
    document.querySelectorAll('.box .box__notification').forEach( item=>item.classList.remove('box__update') );
    data.forEach( item => {  var elm=document.querySelector(".box-" + item.id + " .box__notification");
                             elm.innerHTML=item.count;
                             elm.classList.add('box__update');
                        });
}

var socket = io.connect('http://localhost:5000',{'forceNew': true});

socket.on('messages', function (data) {
    
    console.table(data);
    if(initState){
        updateUI(data);
    }
    initState=1;

});