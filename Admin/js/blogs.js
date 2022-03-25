const token = JSON.parse(window.localStorage.getItem('token'));

let account = document.querySelector(".user .useremail");
document.querySelector(".user .useremail").href = 'settings.html?token=' + token;
document.querySelector(".sidebar .settings").href = 'settings.html?token=' + token;
document.querySelector(".sidebar .messages").href = 'messages.html?token=' + token;
document.querySelector(".sidebar .blogs").href = 'blogadmin.html?token=' + token;
document.querySelector(".sidebar .home").href = 'index.html?token=' + token;


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

let formsave = document.querySelector(".postarticleform");

function savearticle(){
    formsave.addEventListener('submit',(e)=>{
        e.preventDefault()
        let articletitle = document.querySelector('.articletitle').value;
        let article = document.querySelector('.article').value;
        feedbacktext = document.querySelector('.feedback-text'); 
        
        fetch('https://myportofoliobrand.herokuapp.com/blogs/createBlog',{
            method:"POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8",
                "authorization":`Bearer ${token}`
            },
            cache:"default",
            body:JSON.stringify(
                {
                    title:articletitle,
                    body:article,
                }
            ) 
            
        })
        .then(res => res.json())
        .then(json => {
           alert(json.message || json.Error);
           window.location = `blogadmin.html?token=${token}`
        })
        formsave.reset()        
    })
}

let output = "";

let articlepost = document.querySelector('.blogs-content');

const getBlogs = (blogs)=>{
    Object.values(blogs).forEach(element => {
        output +=
       `<div class='adminblog-card'>
        <div style='width: 100%; height:100%' class='article_div'>
          <div class='card-text'>
            <div class='datetime'>
                <p>${element.time}</p>
                <p> ${element.status}</p>
            </div>
            <div class='card-title'>
                <p> ${element.title}</p>
            </div>
            <div class='card-details'><p>${element.body}</p></div>
            <div class='interaction'>
            <div class='icons'>
                <label><i class='bi bi-heart'></i> ${element.likes}</label>
                <label><i class='bi bi-chat'></i> ${element.comments} </label>
                <label><i class='bi bi-share'></i> 100</label>
            </div>
            </div>
            <div class='action'>
                <button onclick='deletearticle(this.id)' id='${element._id}' class='delete'><i class='bi bi-trash'></i></button>
                <button onclick='getarticle(this.id)' id='${element._id}' class='edit'><i class='bi bi-pen'></i></button>
                
            </div>
        </div>
      
        </div>
      
       
      </div>`;
    });
    
    articlepost.innerHTML = output;     
}


fetch('https://myportofoliobrand.herokuapp.com/blogs',{
    method:"GET"
})
.then(res => res.json())
.then(blogData => getBlogs(blogData))

function getarticle(key){
    console.log(key);
    localStorage.setItem("articleId",JSON.stringify(key));
    window.location.href="updateBlog.html?article_id="+ key;
    
}
function deletearticle(key){
    if (confirm(`Are you sure you want to delete article ${key}?`)) {
        const url = `https://myportofoliobrand.herokuapp.com/blogs/deleteblog/${key}`;

        fetch(url,{
            method:"DELETE",
            headers:{
                "authorization":`Bearer ${token}`
            }

        })
        .then(res => res.json())
        .then(blogData => {
            alert(blogData.message||blogData.Error);
            window.location = `blogadmin.html?token=${token}`
        })
        
    } else {
        let txt = "You pressed Cancel!";
        console.log(txt)
    }
}
