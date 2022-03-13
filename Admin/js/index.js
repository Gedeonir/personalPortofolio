window.onload=function(){
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


  
  
  





function logout() {
    app.auth().signOut().then(function(){
        window.location="login.html"
        alert("you have signed out succesfully");
    }).catch(function(error){
        alert("Error:",error);
    })
}