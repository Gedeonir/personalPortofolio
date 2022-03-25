
let messageId = JSON.parse(window.localStorage.getItem('messageId'));
const token = JSON.parse(window.localStorage.getItem('token'));


window.onload=()=>{
    fetch('https://myportofoliobrand.herokuapp.com/',{
    method:"GET",
    headers:{
        "authorization":`Bearer ${token}`
    }
})
.then(res => res.json())
.then(messageData => {
    if(messageData.Error){
        window.location.href="./login.html";
        alert(messageData.Error);
    }
})
}

const url = `https://myportofoliobrand.herokuapp.com/messages/${messageId}`;

fetch(url,{
    method:"GET",
    headers:{
        "authorization":`Bearer ${token}`
    }
})
.then(res => res.json())
.then(messageData => {
    let messages = document.querySelector('.messages-section');

    messages.innerHTML=`<div class="message-header">
					<a href="messages.html" class="back"><i class="bi bi-arrow-left"></i></a>
					<div class="message-details">
						<span>${messageData.data.Firstname} ${messageData.data.Lastname}</span>
						<p>${messageData.data.email}</p>
					</div>
                    <div class='action'>
                        <button onclick='deletemessage(this.id)' id='${messageData.data._id}' class='delete'><i class='bi bi-trash'></i></button>
                    </div>
                    
                </div>
				<div class="message-body">
					<div class="left-body">
						<p>${messageData.data.Message}</p>
						<span>11:00</span>
					</div>
				
				</div>` 


})
document.querySelector(".sidebar .settings").href = 'settings.html?token=' + token;
document.querySelector(".sidebar .messages").href = 'messages.html?token=' + token;
document.querySelector(".sidebar .blogs").href = 'blogadmin.html?token=' + token;
document.querySelector(".sidebar .home").href = 'index.html?token=' + token;

function deletemessage(key){
    if (confirm(`Are you sure you want to delete message ${key}?`)) {
        const url = `https://myportofoliobrand.herokuapp.com/messages/deletemessage/${key}`;

        fetch(url,{
            method:"DELETE",
            headers:{
                "authorization":`Bearer ${token}`
            }

        })
        .then(res => res.json())
        .then(blogData => {
            alert(blogData.message||blogData.Error);
            window.location = `messages.html?token=${token}`
        })
        
    } else {
        let txt = "You pressed Cancel!";
        console.log(txt)
    }

}

