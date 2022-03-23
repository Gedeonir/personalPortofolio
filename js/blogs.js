
let articlepost = document.querySelector('.blogslist');
let output = ""

const getBlogs = (blogs)=>{
    Object.values(blogs).forEach(element => {
        
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

