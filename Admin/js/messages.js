const token = JSON.parse(window.localStorage.getItem('token'));
const adminBody =document.querySelector('.admin-body');
let messagesList = document.querySelector('.message-list');
let output='';

window.onload=()=>{
    fetch('https://myportofoliobrand.herokuapp.com/',{
    method:"GET",
    headers:{
        "authorization":`Bearer ${token}`
    }
})
.then(res => res.json())
.then(blogData => {
    if(blogData.Error){
        window.location.href="./login.html";
        alert(blogData.Error);
    }else{
        let account = document.querySelector(".user .useremail");
        account.innerHTML = blogData.user.user.email;
    }
})
}

const getMessages = (message)=>{
    Object.values(message).forEach(element => {
        output +=`<a href='messages_area.html?article_id=${element._id}'>                
            <div class='message-details'>
                <span>${element.Firstname} ${element.Lastname}</span>
                <p>${element.Message}</p>
            </div>
            <div class='status-dot'>
                <i class='bi bi-circle-fill'></i>
            </div>
            
        </a>`
    })
    messagesList.innerHTML = output;
}

if(!token){
    adminBody.innerHTML="";
    adminBody.innerHTML =`
    <div class='adminblog-card' style='width:700px; height:200px; margin:auto; text-align:center'>
        <div class='card-text'>
            <div style="padding:20px">
                <p>you must login first</p>
            </div>
            <div>
                <a href='./login.html' style="text-decoration:none; background:black; color:white">Back to login</button>
            </div>
        </div>   
    </div>`;

}else{
    fetch('https://myportofoliobrand.herokuapp.com/messages',{
        method:"GET",
        headers:{
        "authorization":`Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(blogData => getMessages(blogData))


    document.querySelector(".user .useremail").href = 'settings.html?token=' + token;
    document.querySelector(".sidebar .settings").href = 'settings.html?token=' + token;
    document.querySelector(".sidebar .messages").href = 'messages.html?token=' + token;
    document.querySelector(".sidebar .blogs").href = 'blogadmin.html?token=' + token;
    document.querySelector(".sidebar .home").href = 'index.html?token=' + token;

}


function deletemessage(key){
    firebase.database().ref('contactsMessages/'+key).remove();
        alert("message "+ key + " deleted succesfully")
        getmessages();
}
