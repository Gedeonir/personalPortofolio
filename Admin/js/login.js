
const form = document.querySelector(".loginform")
const feedbacktext = document.querySelector('.feedback-text');



form.addEventListener('submit',(e)=>{
  e.preventDefault()
  let email = document.querySelector('.email').value;
  let password = document.querySelector('.password').value

  fetch('https://myportofoliobrand.herokuapp.com/login',{
    method:"POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
  },
    body:JSON.stringify(
      {
        email: email,
        password:password
      }
    )
    
  })
  .then(res => res.json())
  .then(json =>{
    if(json.token){
      alert(json.message)
   
      localStorage.setItem("token",JSON.stringify(json.token));
      window.location.href="index.html?token="+ json.token;
    }else{
        feedbacktext.style.color = "red";
        feedbacktext.innerHTML = json.Error;
    }
  })
})



  