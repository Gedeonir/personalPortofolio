const token = JSON.parse(window.localStorage.getItem('token'));

let account = document.querySelector(".user .useremail");
document.querySelector(".user .useremail").href = 'settings.html?token=' + token;
document.querySelector(".sidebar .settings").href = 'settings.html?token=' + token;
document.querySelector(".sidebar .messages").href = 'messages.html?token=' + token;
document.querySelector(".sidebar .blogs").href = 'blogadmin.html?token=' + token;
document.querySelector(".sidebar .home").href = 'index.html?token=' + token;
document.querySelector(".sidebar .users").href = 'users.html?token=' + token;




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

        let outputUsers ='';
        let userList = document.querySelector('.users-list');

        const getUsers = (user)=>{
            document.querySelector('.usercounts').innerHTML=user.data.length +' Users'
            Array.from(user.data).forEach(element => {

                if (blogData.user.user._id !== element._id) {
                     outputUsers+=
                        `
                            <div class="usercard">
                                <div>
                                <p>names</p>${element.firstname} ${element.lastname}
                                </div>
                                <div><p>email</p>${element.email} </div>
                                <div><p>username</p>${element.username}</div>
                                <div><p>contacts</p>${element.contact}</div>
                                <div><p>role</p>${element.role}</div>
                                <div><button class="delete" onclick=deleteuser(this.id) id='${element._id}'>delete</button></div>
                            
                            </div>
                        `
                } else {
                    outputUsers+=
                    `
                    <div class="usercard">
                        <div>
                        <p>names</p>${element.firstname} ${element.lastname}
                        </div>
                        <div><p>email</p>${element.email} </div>
                        <div><p>username</p>${element.username}</div>
                        <div><p>contacts</p>${element.contact}</div>
                        <div><p>role</p>${element.role} (you)</div>
                        <div><button id='${element._id}' onclick=getuser(this.id)>edit</button></div>
                    
                    </div>
                    `
                }
               
            })
            

            userList.innerHTML = outputUsers;
        }
        fetch(`https://myportofoliobrand.herokuapp.com/users/`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(blogData => {
            getUsers(blogData)

        })
        

    }
})
}

function getuser(key){
    console.log(key);
    localStorage.setItem("userId",JSON.stringify(key));
    window.location.href="updateuser.html?article_id="+ key;
    
}

function deleteuser(key){
    if (confirm(`Are you sure you want to delete user ${key}?`)) {
        const url = `https://myportofoliobrand.herokuapp.com/users/delete/${key}`;

        fetch(url,{
            method:"DELETE",
            headers:{
                "authorization":`Bearer ${token}`
            }

        })
        .then(res => res.json())
        .then(blogData => {
            alert(blogData.message||blogData.Error);
            location.reload()
        })
        
    } else {
        let txt = "You pressed Cancel!";
        console.log(txt)
    }
}


