let blogId = JSON.parse(window.localStorage.getItem('articleId'));
const token = JSON.parse(window.localStorage.getItem('token'));

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

document.querySelector(".user .useremail").href = 'settings.html?token=' + token;
document.querySelector(".sidebar .settings").href = 'settings.html?token=' + token;
document.querySelector(".sidebar .messages").href = 'messages.html?token=' + token;
document.querySelector(".sidebar .blogs").href = 'blogadmin.html?token=' + token;
document.querySelector(".sidebar .home").href = 'index.html?token=' + token;

let singleblog = document.querySelector('.single-blog');
let update = document.querySelector('.updatearticleform');
let blog = document.querySelector('.single-blog');
singleblog.style.display="block";
let articlepost = document.querySelector('.blogs-content');
document.querySelector('.article-post-form').style.display = "flex";


fetch(`https://myportofoliobrand.herokuapp.com/blogs/${blogId}`,{
    method:"GET",        
})
.then(res => res.json())
.then(blogData => {
    update.innerHTML = `
        <div class='input-group'>
            <input type='text' name='title' value='${blogData.data.title}' class='articletitle' >
        </div>
        <div class='input-group'>
            <textarea row='1000'  name='article' class='article' >${blogData.data.body}</textarea>
        </div>
        <div class='input-group button'>
            <button type='submit' name='Update' onclick='updatearticle(this.id)' id='${blogData.data._id}'>Update</button>
        </div>`;

    blog.innerHTML = `
        <div class='datetime'>
        <p> Posted:${blogData.data.time}</p>
        </div>
        <div class='card-text'>
        <div class='card-title'><p>${blogData.data.title}</p></div>
        <div class='card-details'><p>${blogData.data.body}</p></div>
        </div>
        <div class='interaction'>
        <div class='icons'>
            <label><i class='bi bi-heart'></i> ${blogData.data.likes}</label>
            <label><i class='bi bi-chat'></i> ${blogData.data.comments}</label>
            <label><i class='bi bi-share'></i> 100</label>
        </div>`




})

let formupdate = document.querySelector(".updatearticleform");

function updatearticle(key){
    formupdate.addEventListener('submit',(e)=>{
        e.preventDefault()

        let articletitle = document.querySelector('.articletitle').value;
        let article = document.querySelector('.article').value;

        fetch(`https://myportofoliobrand.herokuapp.com/blogs/updateblog/${key}`,{
            method:'PATCH',
            headers:{
                "Content-type": "application/json; charset=UTF-8",
                "authorization":`Bearer ${token}`
            },
            body:JSON.stringify(
                {
                    title:articletitle,
                    body:article,
                }
            ) 

        })
        .then(res => res.json())
        .then(blogData => {
            console.log(blogData.data)
            alert(blogData.message|| blogData.Error);
        })
        .then(()=> location.reload())
    })
}


    