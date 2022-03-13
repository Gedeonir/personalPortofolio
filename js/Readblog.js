
 let blogId = JSON.parse(window.localStorage.getItem('articleId'));
 console.log(blogId);

window.onload=function(){
    this.getBlogData(blogId)
}
function getBlogData(key){
    let articlepost = document.querySelector('.blog-contents');
    firebase.database().ref('Articles/'+key).once('value').then(function(snapshot){
  
    let posts = snapshot.val();
    articlepost.innerHTML = "<div class='readBlogcard'><div class='card-image'><img src='"+ posts.image +"' alt=''></div>"+
                            "<div class='datetime'>"+
                            "<p>"+posts.Date+"</p>"+
                            "<p>"+posts.Time+"</p>"+
                            "</div>"+
                            "<div class='card-text'>"+
                            "<div class='card-title'>"+posts.title+"<p></p></div>"+
                            " <div class='card-details'><p>"+ posts.post +"</p></div>"+
                            "</div>"+
                            "<div class='interaction'>"+
                            "<div class='icons'>"+
                                "<label><i class='bi bi-heart'></i> 20</label>"+
                                "<label><i class='bi bi-chat'></i> 26</label>"+
                                "<label><i class='bi bi-share'></i> 100</label>"+
                            "</div>"+
                            "<div class='comment'>"+
                                "<form action='' method='post' class='commentForm'>"+
                                "<input type='hidden' name='article_id' id='articleid'  value='"+key+"' required>"+
                                "<input type='text' name='names' id='names' placeholder='Enter name'  required>"+
                                "<input type='text' name='comment' id='comment' placeholder='comment' required>"+
                                "<button type='submit' name='post' onclick='sendcomment()'>Send</button>"+
                                "</form>"+
                                "</div>"+
                                "<div class='comments'></div>"+
                            "</div></div>";
    
    })
     
}

//comments

let form = document.querySelector(".commentForm");

function sendcomment(){

    let name = document.querySelector('#names').value;
    let comment = document.querySelector('#comment').value;
    let article = document.querySelector('#articleid').value;
    let date = new Date();

    firebase.database().ref('Comments/').push().set({
        article:article,
        comment:comment,
        names:name,
        Date: date

    },function(error){
        if(error){
            alert("comment not sent");
        }
        else{
            alert("comment sent")

            form.reset();
            getcomments();
        }
    });
    window.location = "Readblog.html?article_id="+ article;
}



function getcomments(){
	firebase.database().ref('Comments/').once('value').then(function(snapshot){
    let comments = document.querySelector('.comments');
    let posts = snapshot.val();

    for(let[key,value] of Object.entries(posts)){
       comments.innerHTML = "<div class='comment-name'><label>"+ value.names +"</label><p>"+ value.comment+" </p></div>"+comments.innerHTML;
    }
	})
}



