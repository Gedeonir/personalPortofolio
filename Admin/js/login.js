let error = document.querySelector(".error-text");


form.addEventListener('submit',(e)=>{
  e.preventDefault()

  app.auth().signInWithEmailAndPassword(form.email.value,form.password.value)
  .then(()=>{

    alert("you are logged in as :"+ form.email.value);
    window.location = "index.html";  
  })
  .catch(()=>{
    error.style.display="block";
    error.innerHTML ="Login failed, Invalid email or password";
  });
})


  