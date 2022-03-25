let settingListsBtn = document.querySelector('.settings-lists ul li .personal-info');
let personal_details = document.querySelector('.settings-lists ul li .personal-settings-details');

settingListsBtn.onclick = ()=>{
    personal_details.classList.toggle('active');
    settingListsBtn.classList.toggle('active')
}



let settingListsBtn2 = document.querySelector('.settings-lists ul li .yourskills');
let skills = document.querySelector('.settings-lists ul li .skills-settings');

settingListsBtn2.onclick = ()=>{
   skills.classList.toggle('active');
    settingListsBtn2.classList.toggle('active');
}

let addSkill = document.querySelector('.skills-settings .action-button .addnew');
let addSkillForm = document.querySelector('.skills-settings .add-skills');

addSkill.onclick = ()=>{
    addSkillForm.classList.toggle('active');
    addSkill.classList.toggle('active');
}

//firebase codes


// const EditForm = document.querySelector(".editform")

// EditForm .addEventListener('submit',(e)=>{
//     e.preventDefault()
//     let firstname = document.querySelector('.Firstname').value;
//     let lastname = document.querySelector('.Lastname').value;
//     let email= document.querySelector('.emailaddress').value;
//     let bio = document.querySelector('.Bio').value;
//     let password = document.querySelector('.password').value;
//     let phone = document.querySelector('.phone').value;
//     let gender = document.querySelector('.gender');


// })
// window.onload=function(){
// 	this.getdata();
// }

// function getdata(key){
// 	firebase.database().ref('Users/').once('value').then(function(snapshot){

//     let info = snapshot.val();

//     for(let[key,value] of Object.entries(info)){
//         personalInfo.innerHTML =
// 	});
// }

const token = JSON.parse(window.localStorage.getItem('token'));

let account_details = document.querySelector('.personal-settings-details');

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

      

        account_details.innerHTML = `
        <div class="identifications">

        <div class="names">
            <div class="identification-item">
                <label for="firstname">Firstname</label>
                <p>${blogData.user.user.firstname}</p>
            </div>
            <div class="identification-item">
                <label for="lastname">lastname</label>
                <p>${blogData.user.user.lastname}</p>
            </div>
            
        </div>
        <div class="identification-item">
            <label for="email">Email Address</label>
            <p>${blogData.user.user.email}</p>
        </div>
        <div class="identification-item">
            <label for="username">username</label>
            <p>${blogData.user.user.username}</p>
        </div>
        <div class="identification-item">
            <label for="contacts">Contact</label>
            <p>${blogData.user.user.contact}</p>
        </div>
        <div class="identification-item">
            <label for="gender">gender</label>
            <p>${blogData.user.user.gender}</p>
        </div>
        <div class="identification-item">
            <label for="dob">Role</label>
            <p>${blogData.user.user.role}</p>
        </div>
    </div>
        
        `
    }
})
}




const formSkill = document.querySelector('.skillForm');



formSkill.addEventListener('submit',(e)=>{
    e.preventDefault();

    let Skill = document.querySelector('.skill').value;
    let skillLevel = document.querySelector('.level').value;
    
    fetch('https://myportofoliobrand.herokuapp.com/skills/createskill',{
        method:"POST",
        headers:{
            "Content-type": "application/json; charset=UTF-8",
            "authorization":`Bearer ${token}`
        },
        cache:"default",
        body:JSON.stringify(
            {
                skillTitle:Skill,
                description:skillLevel
            }
        ) 
        
    })
    .then(res => res.json())
    .then(json => {
       alert(json.message || json.Error);
    })
    formSkill.reset()
    
    
})


let output = "";

let skillList = document.querySelector('.skillsList');

const getSkills = (skills)=>{
    Array.from(skills.data).forEach(element => {

        output +=
       `<div class="identification-item d-flex text-center">
       <p>${element.skillTitle}</p>
       <p>${element.description}</p>

       <div>
           <a onclick=editskill(this.id) id=${element._id}><i class="bi bi-pencil-fill"></i></a>
           <a onclick=deleteskill(this.id) id=${element._id}><i class="bi bi-trash-fill"></i></a>
       </div>
           
   </div>`;
    });    
    
    skillList.innerHTML = output
}


fetch('https://myportofoliobrand.herokuapp.com/skills',{
    method:"GET"
})
.then(res => res.json())
.then(skillData => {
    getSkills(skillData)
})


function deleteskill(key){
    if (confirm(`Are you sure you want to delete skill ${key}?`)) {
        const url = `https://myportofoliobrand.herokuapp.com/skills/deleteskill/${key}`;

        fetch(url,{
            method:"DELETE",
            headers:{
                "authorization":`Bearer ${token}`
            }

        })
        .then(res => res.json())
        .then(blogData => {
            alert(blogData.message||blogData.Error);
            location.reload()
        })
        
    } else {
        let txt = "You pressed Cancel!";
        console.log(txt)
    }
}

