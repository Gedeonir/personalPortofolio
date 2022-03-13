let settingListsBtn = document.querySelector('.settings-lists ul li .personal-info');
let personal_details = document.querySelector('.settings-lists ul li .personal-settings-details');

settingListsBtn.onclick = ()=>{
    personal_details.classList.toggle('active');
    settingListsBtn.classList.toggle('active')
}

let settingListsBtn1 = document.querySelector('.settings-lists ul li .about-info');
let abouts = document.querySelector('.settings-lists ul li .about-me');

settingListsBtn1.onclick = ()=>{
    abouts.classList.toggle('active');
    settingListsBtn1.classList.toggle('active');
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

function Editform(){
    let personalInfo = document.querySelector('.identifications');
    let EditForm = document.querySelector('.editform');

    personalInfo.classList.toggle('notActive');
    EditForm.classList.toggle('active');
}

//firebase codes


const EditForm = document.querySelector(".editform")

EditForm .addEventListener('submit',(e)=>{
    e.preventDefault()
    let firstname = document.querySelector('.Firstname').value;
    let lastname = document.querySelector('.Lastname').value;
    let email= document.querySelector('.emailaddress').value;
    let bio = document.querySelector('.Bio').value;
    let password = document.querySelector('.password').value;
    let phone = document.querySelector('.phone').value;
    let gender = document.querySelector('.gender');
    let dob = document.querySelector('.date');
    let profileimage = document.querySelector('.profileimage').files[0];

    let imagename = profileimage.name;


    let storageRef = firebase.storage().ref('images/'+imagename);

    let uploadTask=storageRef.put(profileimage);

    uploadTask.on('state_changed',function(snapshot){
        let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is "+progress+" done");
    },function(error){
        console.log(error.message);
    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            firebase.database().ref('Users/').push().set({
                Firstname:firstname,
                Lastname:lastname,
                Email:email,
                Bio:bio,
                Password:password,
                Contact:phone,
                Sex:gender,
                DOB:dob,
                image:downloadURL,

            },function(error){
                if(error){
                    alert("error while uploading");
                }
                else{
                    alert("successfully uploaded")

                    EditForm.reset();
                    getdata();
                }
            });
        });
    });
})
window.onload=function(){
	this.getdata();
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            let account = document.querySelector(".user .useremail");
            account.innerHTML = user.email; 
            document.querySelector(".user .useremail").href = 'settings.html?user=' + user.uid;
            document.querySelector(".sidebar .settings").href = 'settings.html?user=' + user.uid;
            document.querySelector(".sidebar .messages").href = 'messages.html?user=' + user.uid;
            document.querySelector(".sidebar .blogs").href = 'blogadmin.html?user=' + user.uid;
            document.querySelector(".sidebar .home").href = 'index.html?user=' + user.uid;
            getdata();
            
        }
        else{
            window.location = "login.html";
        }
    });
}

function getdata(key){
	firebase.database().ref('Users/'+ user.uid).once('value').then(function(snapshot){
    let personalInfo = document.querySelector('.Editform');
    personalInfo.innerHTML="";
    let info = snapshot.val();

    for(let[key,value] of Object.entries(info)){
        personalInfo.innerHTML ="<div class='input-group'><input type='text' value='"+key+"' ></div>"+
                                 "<div class='names'>"+
                                    "<div class='input-group'><input type='text' name='Firstname' value='"+value.Firstname+"' class='Firstname' ></div>"+
                                    "<div class='input-group'><input type='text' name='lastname' placeholder='Lastname' class='Lastname'>"+
                                "</div></div>"+
                                "<div class='input-group'><input type='email' name='email' class='emailaddress' placeholder='email'></div>"+
                                "<div class='input-group'><input type='text' class='Bio' placeholder='Bio'></div>"+
                                "<div class='input-group'><input type='password' class='password' placeholder='password'></div>"+
                                "<div class='input-group'><input type='number' class='phone' placeholder='contacts'></div>"+
                                "<div class='input-group'><select name='gender' class='gender'><option value='Female'>Female</option><option value='Male'>Male</option></select></div>"+
                                "<div class='input-group'><input type='date' class='date' placeholder='DOB'></div>"+
                                "<div class='input-group'><input type='file' name='image' class='profileimage'></div>"+personalInfo.innerHTML;
    }
	});
}