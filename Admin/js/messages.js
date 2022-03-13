window.onload=function(){
    this.getmessages();
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            let account = document.querySelector(".user .useremail");
            account.innerHTML = user.email; 
            document.querySelector(".user .useremail").href = 'settings.html?user=' + user.uid;
            document.querySelector(".sidebar .settings").href = 'settings.html?user=' + user.uid;
            document.querySelector(".sidebar .messages").href = 'messages.html?user=' + user.uid;
            document.querySelector(".sidebar .blogs").href = 'blogadmin.html?user=' + user.uid;
            document.querySelector(".sidebar .home").href = 'index.html?user=' + user.uid;
    
            
        }
        else{
            window.location = "login.html";
        }
    });
}

function getmessages(){
	firebase.database().ref('contactsMessages/').once('value').then(function(snapshot){
    let messages = document.querySelector('.message-list');
    messages.innerHTML="";
    let message = snapshot.val();

    for(let[key,value] of Object.entries(message)){
        messages.innerHTML = "<a href='messages_area.html?message_id="+key+"'>"+
                                "<div class='message-content'>"+
                                    
                                "<div class='message-details'><span>"+ value.Firstname +" " +value.Lastname +"</span><p>"+ value.Message+"</p></div>"+
                                "<div class='status-dot'><i class='bi bi-circle-fill'></i></div>"+"</a>"+
                                "<div class='action'><button type='submit' onclick='deletemessage(this.id)' id='"+ key +"'><i class='bi bi-trash-fill'></i></button></div>"+
                            messages.innerHTML;
    }
    });
}

function deletemessage(key){
    firebase.database().ref('contactsMessages/'+key).remove();
        alert("message "+ key + " deleted succesfully")
        getmessages();
}

function logout() {
    app.auth().signOut().then(function(){
        window.location="login.html"
        alert("you have signed out succesfully");
    }).catch(function(error){
        alert("Error:",error);
    })
}