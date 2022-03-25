
let blogId = JSON.parse(window.localStorage.getItem('articleId'));
const token = JSON.parse(window.localStorage.getItem('userToken'));

let headerList = document.querySelector('.header .navbar ');

const url = `https://myportofoliobrand.herokuapp.com/blogs/${blogId}`;

fetch(url,{
    method:"GET"
})
.then(res => res.json())
.then(blogData => {
    let articlepost = document.querySelector('.blog-contents');

    if(!token){
        articlepost.innerHTML = `<div class='readBlogcard'>
    <div class='datetime'>
    <p>${blogData.data.time}</p>
    <p>${blogData.data.status}</p>
    </div>
    <div class='card-text'>
    <div class='card-title'>${blogData.data.title}</div>
    <div class='card-details'><p>${blogData.data.body}</p></div>
    <p>author:${blogData.data.author}</p
    </div>
    <div class='interaction'>
    <div class='icons'>
        <label><i class='bi bi-heart'></i> ${blogData.data.likes}</label>
        <label><i class='bi bi-chat'></i> ${blogData.data.comments}</label>
        <label><i class='bi bi-share'></i> 100</label>
    </div>
    </div>
    </div>`

    articlepost.innerHTML+=`<div class='adminblog-card' style='width:700px; height:200px; margin:auto; text-align:center'>
            <div style="padding:20px">
                <p>you must login first,to comment, please login <a href="./signin.html">here</a></p>
            </div>  
        </div>`

        document.querySelector('.comment').style.display = 'none'
    }
    else{
        headerList.innerHTML =""

        headerList.innerHTML =`
        <ul>
                <li>
                    <a href="index.html">Home</a>
                </li>
                  <li>
                    <a href="projects.html">projects</a>
                </li>
                <li>
                    <a href="blogs.html">blog</a>
                </li>
                <li>
                    <a href="contact.html">contact</a>
                </li>
                <li>
                    <a onclick= logout()>Logout</a>
                </li>
            </ul>
        `

        articlepost.innerHTML=`<div class='readBlogcard'>
        <div class='datetime'>
        <p>${blogData.data.time}</p>
        <p>${blogData.data.status}</p>
        </div>
        <div class='card-text'>
        <div class='card-title'>${blogData.data.title}</div>
        <div class='card-details'><p>${blogData.data.body}</p></div>
        <p>author:${blogData.data.author}</p
        </div>
        <div class='interaction'>
        <div class='icons'>
            <label><i class='bi bi-heart'></i> ${blogData.data.likes}</label>
            <label><i class='bi bi-chat'></i> ${blogData.data.comments}</label>
            <label><i class='bi bi-share'></i> 100</label>
        </div>
        </div></div>`
    }


})



//comments

const form = document.querySelector(".commentForm");

function sendcomment(){
    form.addEventListener('submit',(e)=>{
        e.preventDefault()

        const comment = document.querySelector('#comment').value;
        fetch(`https://myportofoliobrand.herokuapp.com/blogs/${blogId}/sendcomment`,{
                method:"POST",
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                    "authorization":`Bearer ${token}`
                },
                body:JSON.stringify(
                    {
                        comment:comment
                    }
                ) 
                
        })
        .then(res => res.json())
        .then(json => {
        alert(json.message||json.Error);
        window.location.href = './Readblog.html?article_id='+blogId;
        })
    })

}


    const commentsArea = document.querySelector('.comments');


    fetch(`https://myportofoliobrand.herokuapp.com/blogs/${blogId}/comments`,{
        method:"GET"
    })
    .then(res => res.json())
    .then(blogData => getBlogComments(blogData))


const getBlogComments = (comments)=>{
    Object.values(comments).forEach(element => {
        const comments = element.comments
        if (element.commentsCount == 0) {
            commentsArea.innerHTML ='No comments yet!'
        } else {
           commentsArea.innerHTML =`${element.commentsCount} comment(s)` 

           Array.from(comments).forEach(comment=>{
            commentsArea.innerHTML += `<div class='comment-name'><label>${comment.names}(${comment.email})</label><br><p>${comment.comment}</p></div>`;
        })
        }
        
       
    })
}

