
let databaseRef = firebase.database().ref('Articles/'); 
let formsave = document.querySelector(".postarticleform");

function savearticle(){
    formsave.addEventListener('submit',(e)=>{
        e.preventDefault()
        let current= new Date();

        let date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
        console.log(date);
        let time = current.getHours()+':'+current.getMinutes();
        console.log(time)

        document.querySelector('.date').value = date;
        document.querySelector('.time').value = time;
        let image = document.querySelector('#articleimage').files[0];
        let articletitle = document.querySelector('.articletitle').value;
        let imagename = image.name;
        let article = document.querySelector('.article').value;
        let dat = document.querySelector('.date').value;
        let t = document.querySelector('.time').value;

        

        let storageRef = firebase.storage().ref('images/'+imagename);

        let uploadTask=storageRef.put(image);

        uploadTask.on('state_changed',function(snapshot){
            let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log("upload is "+progress+" done");
        },function(error){
            console.log(error.message);
        },function(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            let uid =  firebase.database().ref().child('Articles').push().key;

                let data={
                    articleid:uid,
                    image:downloadURL,
                    post:article,
                    title:articletitle,
                    Date: dat,
                    Time:t,
                    

                }
                let save;
                let updates = {}
                updates['/Articles/'+uid]= data;
                save=firebase.database().ref().update(updates);
                if(save){
                    alert("Article successfully uploaded")

                    formsave.reset();
                    getdata();
                }
                else{
                    alert("error while uploading");
                }
            });
        });
    })
}

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

        
    }
    else{
        window.location = "login.html";
    }
});
}

function getdata(){
	firebase.database().ref('Articles/').once('value').then(function(snapshot){
    let articlepost = document.querySelector('.blogs-content');
    articlepost.innerHTML="";
    let posts = snapshot.val();

    for(let[key,value] of Object.entries(posts)){
        articlepost.innerHTML = "<div class='adminblog-card'>"+
       " <div class='card-image'>"+
            "<img src='"+ value.image+"' alt=''>"+
        "</div>"+
        "<div style='width: 100%; height:100%' class='article_div'>"+
          "<div class='card-text'>"+
            "<div class='datetime'>"+
                "<p> Posted:"+ value.Date+"</p>"+
                "<p>"+ value.Time+"</p>"+
            "</div>"+
            "<div class='card-title'>"+
                "<p>"+ value.title+"</p>"+
            "</div>"+
            "<div class='interaction'>"+
            "<div class='icons'>"+
                " <label><i class='bi bi-heart'></i> 20</label>"+
                "<label><i class='bi bi-chat'></i> 26</label>"+
                "<label><i class='bi bi-share'></i> 100</label>"+
            "</div>"+
            "</div>"+
            " <div class='action'>"+
                "<button onclick='deletearticle(this.id)' id='"+key+"' class='delete'><i class='bi bi-trash'></i></button>"+
                "<button onclick='getarticle(this.id)' id='"+key+"' class='edit'><i class='bi bi-pen'></i></button>"+
                
            "</div>"+
        " </div>"+
      
        "</div>"+
      
       
      "</div>"+articlepost.innerHTML;
    }
	})
}
function getarticle(key){
    formsave.classList="updatearticleform";
    singleblog = document.querySelector('.single-blog');
    singleblog.style.display="block";
    let articlepost = document.querySelector('.blogs-content');
    articlepost.innerHTML =""
    document.querySelector('.article-post-form').style.display = "flex";
    firebase.database().ref('Articles/'+key).once('value').then(function(snapshot){
        let update = document.querySelector('.updatearticleform'); 
        update.innerHTML="";

        let blog = document.querySelector('.single-blog');

        blog.innerHTML="";
        let posts = snapshot.val();

        
        update.innerHTML = " <div class='input-group'><input type='text' name='title' value='"+ posts.title+"' class='articletitle' ></div>"+ 
                            "<div class='input-group'><input type='file' name='image' value='"+posts.image+"' id='articleimage'></div>"+
                            "<div class='input-group'><textarea row='1000'  name='article' class='article'>"+ posts.post+"</textarea></div>"+
                            "<div class='input-group'>"+
                            "<input type='hidden' value='' class='year'>"+
                            "<input type='hidden' value='' class='month'>"+
                            "<input type='hidden' value='' class='date'>"+
                            "<input type='hidden' value='' class='hour'>"+
                            "<input type='hidden' value='' class='minutes'>"+
                            "</div>"+
                            "<div class='input-group button'><button type='submit' name='Update' onclick='updatearticle(this.id)' id='"+ key +"'>Update</button></div>"+update.innerHTML
        

        blog.innerHTML = "<div class='singleBlogcard'><div class='card-image'><img src='"+ posts.image +"' alt=''></div>"+
                        "<div class='datetime'>"+
                        "<p> Posted:"+posts.Date+"/"+ posts.Month+"/"+ posts.Year +"</p>"+
                        "</div>"+
                        "<div class='card-text'>"+
                        "<div class='card-title'><p>"+ posts.title+"</p></div>"+
                        " <div class='card-details'><p>"+ posts.post+"</p></div>"+
                        "</div>"+
                        "<div class='interaction'>"+
                        "<div class='icons'>"+
                            "<label><i class='bi bi-heart'></i> 20</label>"+
                            "<label><i class='bi bi-chat'></i> 26</label>"+
                            "<label><i class='bi bi-share'></i> 100</label>"+
                        "</div>"+ blog.innerHTML
    })

}
function updatearticle(key){
    let formupdate = document.querySelector(".updatearticleform");
   formupdate.addEventListener('submit',(e)=>{
    e.preventDefault()
    let current= new Date();
    let year=current.getFullYear();
    let month = current.getMonth()+1;
    let date = current.getDate();
    let hour = current.getHours();
    let minute = current.getMinutes();

    document.querySelector('.year').value = year;
    document.querySelector('.month').value = month;
    document.querySelector('.date').value =date;
    document.querySelector('.hour').value = hour;
    document.querySelector('.minutes').value = minute;
    let image = document.querySelector('#articleimage').files[0];
    let articletitle = document.querySelector('.articletitle').value;
    let imagename = image.name;
    let article = document.querySelector('.article').value;
    let dat = document.querySelector('.date').value;
    let mon = document.querySelector('.month').value;
    let ye = document.querySelector('.year').value;
    let hou = document.querySelector('.hour').value;
    let min = document.querySelector('.minutes').value;

    let storageRef = firebase.storage().ref('images/'+imagename);

    let uploadTask=storageRef.put(image);

    uploadTask.on('state_changed',function(snapshot){
        let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is "+progress+" done");
    },function(error){
        console.log(error.message);
    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){

            let data={
                image:downloadURL,
                post:article,
                title:articletitle,
                Date: dat,
                Month:mon,
                Year:ye,
                Hour:hou,
                Minute:min,

            }
            let save;
            let updates = {}
            updates['/Articles/'+key]= data;
            save=firebase.database().ref().update(updates);
            if(save){
                alert("Article successfully updated")
                window.location = "blogadmin.html";
                formupdate.reset();
                getdata();
            }
            else{
                alert("error while updating");
            }
        });
    });
})
   

}
function deletearticle(key){
    let txt
    if (confirm("Are you sure you want to delete!")) {
         firebase.database().ref('Articles/'+key).remove();
        alert("article deleted succesfully")
    } else {
        txt = "You pressed Cancel!";
      }
   
    getdata();
}


function logout() {
    app.auth().signOut().then(function(){
        window.location="login.html"
        alert("you have signed out succesfully");
    }).catch(function(error){
        alert("Error:",error);
    })
}