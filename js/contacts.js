let form = document.querySelector("#contactform");

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let firstname = document.querySelector('.firstname').value;
    let lastname= document.querySelector('.lastname').value;
    let email = document.querySelector('.email').value;
    let message = document.querySelector('.message').value;
    let date = new Date();

    firebase.database().ref('contactsMessages/').push().set({
        Firstname:firstname,
        Lastname:lastname,
        Email:email,
        Message:message,
        Date: date

    },function(error){
        if(error){
           document.querySelector('.error-text').innerHTML="ERROR: Message not sent!";
        }
        else{
            document.querySelector('.error-text').innerHTML="Message sent!";
            form.reset();
        }
    });
})
