topbutton = document.querySelector('#top')

window.onscroll = function(){scrollFunction()};

function scrollFunction(){
    if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        topbutton.style.display="block";
        
    }else{
        topbutton.style.display="none"; 
    }
}

function Backtop(){
    document.documentElement.scrollTop = 0;
}
