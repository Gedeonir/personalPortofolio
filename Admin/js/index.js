const token = JSON.parse(window.localStorage.getItem('token'));
const adminBody =document.querySelector('.admin-body');

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

    fetch('https://myportofoliobrand.herokuapp.com/',{
    method:"GET",
    headers:{
    "authorization":`Bearer ${token}`
    }
    })
    .then(res => res.json())
    .then(blogData => {
        if(blogData.Error){
            adminBody.innerHTML="";
            adminBody.innerHTML =`
            <div class='adminblog-card' style='width:700px; height:200px; margin:auto; text-align:center'>
                <div class='card-text'>
                    <div style="padding:20px">
                        <p>${blogData.Error}</p>
                    </div>
                    <div>
                        <a href='../signin.html' style="text-decoration:none; background:black; color:white">Back to current User login</button>
                    </div>
                </div>   
            </div>`;
        }else{
            let account = document.querySelector(".user .useremail");
            account.innerHTML = blogData.user.user.email;
        }
    })
   
    document.querySelector(".user .useremail").href = 'settings.html?token=' + token;
    document.querySelector(".sidebar .settings").href = 'settings.html?token=' + token;
    document.querySelector(".sidebar .messages").href = 'messages.html?token=' + token;
    document.querySelector(".sidebar .blogs").href = 'blogadmin.html?token=' + token;
    document.querySelector(".sidebar .home").href = 'index.html?token=' + token;

}
