form = document.querySelector('#signupform')

form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    
   const firstname = document.querySelector('.firstname').value;
   const lastname = document.querySelector('.lastname').value;
   const contact = document.querySelector('.contact').value;
   const email = document.querySelector('.email').value;
   const password = document.querySelector('.password').value;
   const confirmpassword = document.querySelector('.confirmpassword').value;
   const gender= document.querySelector('.gender').value;
   const username = document.querySelector('.username').value;
   const role = document.querySelector('.role').value;
   const feedbacktext = document.querySelector('.feedback-text');

    
    if(password != confirmpassword){
        feedbacktext.style.color = "red";
        feedbacktext.innerHTML = "Passwords do not match"
    }
    else{
        fetch('https://myportofoliobrand.herokuapp.com/newUser',{
            method:"POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify(
                {
                 firstname:firstname,
                 lastname:lastname,
                 contact:contact,
                 email:email,
                 password:password,
                 gender:gender,
                 username:username,
                 role:role
                }
            )
        })
        .then(res => res.json())
        .then(json =>  {
            if(json.message){
                feedbacktext.style.color = "green";
                feedbacktext.innerHTML=json.message;
            }else{
                feedbacktext.style.color = "red";
                feedbacktext.innerHTML = json.Error;
            }
        })
        form.reset();
    }    
})
