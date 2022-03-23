let form = document.querySelector("#contactform");

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
