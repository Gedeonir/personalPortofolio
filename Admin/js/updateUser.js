let userId = JSON.parse(window.localStorage.getItem('userId'));



let user_details =document.querySelector('.editform');




const token = JSON.parse(window.localStorage.getItem('token'));


window.onload=()=>{
    fetch('https://myportofoliobrand.herokuapp.com/',{
    method:"GET",
    headers:{
        "authorization":`Bearer ${token}`
    }
})
.then(res => res.json())
.then(blogData => {
    if(blogData.Error){
        window.location.href="./login.html";
        alert(blogData.Error);
    }else{
        let account = document.querySelector(".user .useremail");
        account.innerHTML = blogData.user.user.email;
    }
})
}

fetch(`https://myportofoliobrand.herokuapp.com/users/${userId}`,{
    method:"GET",
    headers:{
        "authorization":`Bearer ${token}`
    }
})
.then(res => res.json())
.then(blogData => {

    document.querySelector('.firstname').value = blogData.data.firstname;
    document.querySelector('.lastname').value=blogData.data.lastname;
    document.querySelector('.phone').value=blogData.data.contact;
    document.querySelector('.emailaddress').value=blogData.data.email;
    document.querySelector('.gender').value;
    document.querySelector('.username').value=blogData.data.username;

})
   

    

const formUpdate = document.querySelector('.editform');

const firstname = document.querySelector('.firstname').value;
const lastname = document.querySelector('.lastname').value;
const contact = document.querySelector('.phone').value;
const email = document.querySelector('.emailaddress').value;
const gender= document.querySelector('.gender').value;
const username = document.querySelector('.username').value;



formUpdate.addEventListener('submit',(e)=>{
    e.preventDefault()

    
    const firstname = document.querySelector('.firstname').value;
    const lastname = document.querySelector('.lastname').value;
    const contact = document.querySelector('.phone').value;
    const email = document.querySelector('.emailaddress').value;
    const gender= document.querySelector('.gender').value;
    const username = document.querySelector('.username').value;

    console.log(firstname)

    fetch(`https://myportofoliobrand.herokuapp.com/users/update/${userId}`,{
            method:"PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization":`Bearer ${token}`

            },
            body:JSON.stringify(
                {
                 firstname:firstname,
                 lastname:lastname,
                 contact:contact,
                 email:email,
                 gender:gender,
                 username:username,
                }
            )
        })
        .then(res => res.json())
        .then(json =>  {
            alert(json.message||json.Error);
            window.location = './users.html?'+token
        })


})