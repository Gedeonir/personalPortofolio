
let articlepost = document.querySelector('.blogslist');
let output = ""

const token = JSON.parse(window.localStorage.getItem('userToken'));
let headerList = document.querySelector('.header .navbar ');


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

const getBlogs = (blogs)=>{
    Object.values(blogs).forEach(element => {

        // let postedDate = new Date(element.time);
        // let todayDate = new Date()
        // let Difference_In_Time =new Date( todayDate - postedDate)
        
        // console.log(Difference_In_Time.getHours(),element._id);


        output +=
       ` <a  id='${element._id}' onclick='getblogid(this.id)'>
            <div class='blog-card'>

                <div style='width:100%;height:100%'>
                    <div class='card-text'>
                        <div class='datetime'>
                            <p>${element.time}</p>
                            <p>${element.status}</p>
                        </div>
                        <div class='card-title'>
                            <p>${element.title}</p>
                        </div>
                        <div class='card-details'><p>${element.body}</p></div>
                        <div class='icons'>
                            <label><i class='bi bi-heart'></i> ${element.likes}</label>
                            <label><i class='bi bi-chat'></i> ${element.comments}</label>

                        </div>
                     
                    </div>
                    
                </div>
            </div>
        </a>`;
    });
    
    articlepost.innerHTML = output;     
}

const url = 'https://myportofoliobrand.herokuapp.com/blogs';

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

