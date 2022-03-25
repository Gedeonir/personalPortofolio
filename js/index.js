const token = JSON.parse(window.localStorage.getItem('userToken'));
let headerList = document.querySelector('.header .navbar ');
let articlepost = document.querySelector('.blog-body');
let feedbacktext = document.querySelector('.feedback-text'); 
    

if (token) {
    headerList.innerHTML =""

        headerList.innerHTML =`
        <ul>
                <li>
                    <a href="" class ='home'>Home</a>
                </li>
                <li>
                    <a href="" class='project-link'>projects</a>
                </li>
                <li>
                    <a href="" class='blogs'>blog</a>
                </li>
                <li>
                    <a href="contact.html" class='contact'>contact</a>
                </li>
                <li>
                    <a onclick= logout()>Logout</a>
                </li>
            </ul>
        `

        document.querySelector(".navbar .home").href = 'index.html?token=' + token;
        document.querySelector(".navbar .project-link").href = 'projects.html?token=' + token;
        document.querySelector(".navbar .blogs").href = 'blogs.html?token=' + token;
        document.querySelector(".navbar .contact").href = 'contact.html?token=' + token;
}



function getdata(){
 
    articlepost.innerHTML="";
    
        articlepost.innerHTML ="<a  id='"+key+"' onclick='getblogid(this.id)'>"+
                        "<div class='blog-col'>"+
        
                            "<div class='blog-image'>"+
                                "<img src='"+ value.image+"' alt=''>"+
                            "</div>"+
                            "<div style='width:90%; margin:auto'>"+
                                "<div class='datetime'>"+
                                    "<p> Posted:"+ value.Date+"</p>"+
                                    "<p>"+value.Time+"</p>"+
                                "</div>"+
                                "<div class='blog-title'>"+
                                    "<p>"+ value.title+"</p>"+
                                "</div>"+
                                " <div class='blog-details'><p>"+ value.post +"</p></div>"+
                            
                            "</div>"+
                        "</div>"+
                        "</a>"+articlepost.innerHTML;
           
}

let output = '';

const getBlogs = (blogs)=>{
    Object.values(blogs).forEach(element => {
        
        output +=
       ` <a  id='${element._id}' onclick='getblogid(this.id)'>
       <div class='blog-col'>
            <div class='datetime'>
                <p> Posted:${element.time}</p>
            </div>
            <div class='blog-title'>
                <p>${element.title}</p>
            </div>
            <div class='blog-details'><p>${element.body}</p></div>
       </div>
       </a>`;
    });
    
    articlepost.innerHTML = output;     
}

const url = 'https://myportofoliobrand.herokuapp.com/blogs?limit=4';

fetch(url,{
    method:"GET"
})
.then(res => res.json())
.then(blogData => getBlogs(blogData))


function getblogid(key){
    console.log(key);
    localStorage.setItem("articleId",JSON.stringify(key));
    window.location.href="Readblog.html?article_id="+ key;
}

const form = document.querySelector('.newsletter-form')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let emailField = document.querySelector('#email').value;

    
    fetch('https://myportofoliobrand.herokuapp.com/subscriptions/createsubscription',{
        method:"POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body:JSON.stringify(
            {
                email: emailField,
            }
        ) 
        
    })
    .then(res => res.json())
    .then(json => {
        if(json.subscription){
            feedbacktext.style.color = "green";
            feedbacktext.innerHTML=json.subscription;
            form.reset()
        }else{
            feedbacktext.style.color = "red";
            feedbacktext.innerHTML = json.Error;
        }
    })
    
})

let output2 = '';

let skillList = document.querySelector('.skills-image');
const getSkills = (skills)=>{
    Array.from(skills.data).forEach(element => {

        output2 +=
       `<div class="identification-item d-flex text-center">
            <p>${element.skillTitle}</p>
            <p>${element.description}</p>
           
        </div>`;
    });    
    
    skillList.innerHTML = output2
}


fetch('https://myportofoliobrand.herokuapp.com/skills',{
    method:"GET"
})
.then(res => res.json())
.then(skillData => {
    getSkills(skillData)
})