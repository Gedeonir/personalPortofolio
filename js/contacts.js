let form = document.querySelector("#contactform");

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




form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let firstnameField = document.querySelector('.firstname').value;
    let lastnameField= document.querySelector('.lastname').value;
    let emailField = document.querySelector('.email').value;
    let messageField = document.querySelector('.message').value;
    let feedbacktext = document.querySelector('.feedback-text'); 
    
    fetch('https://myportofoliobrand.herokuapp.com/messages/createmessage',{
        method:"POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body:JSON.stringify(
            {
                firstname:firstnameField,
                lastname: lastnameField,
                email: emailField,
                message:messageField,
            }
        ) 
        
    })
    .then(res => res.json())
    .then(json => {
        if(json.message){
            feedbacktext.style.color = "green";
            feedbacktext.innerHTML=json.message;
        }else{
            feedbacktext.style.color = "red";
            feedbacktext.innerHTML = json.Error;
        }
    })
    
})
form.reset()
