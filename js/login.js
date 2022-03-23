form = document.querySelector('#signupform'),



form.addEventListener('submit',async(e)=>{
e.preventDefault();

const emailAddress = document.querySelector('.email').value;
const psd = document.querySelector('.password').value;
feedbacktext = document.querySelector('.feedback-text'); 

fetch('https://myportofoliobrand.herokuapp.com/login',{
method:"POST",
headers: {
    "Content-type": "application/json; charset=UTF-8"
},
body:JSON.stringify(
    {
        email: emailAddress,
        password:psd
    }
)
})
.then(res => res.json())
.then(json => {
    if(json.message){
        alert(json.message);
        localStorage.setItem("token",JSON.stringify(json.token));

    }else{
        feedbacktext.style.color = "red";
        feedbacktext.innerHTML = json.Error;
    }
})
form.reset()

})
