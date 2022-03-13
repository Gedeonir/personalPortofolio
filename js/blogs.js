window.onload=function(){
	this.getdata();
}

function getdata(){
	firebase.database().ref('Articles/').once('value').then(function(snapshot){
    let articlepost = document.querySelector('.blogslist');
    articlepost.innerHTML="";
    let posts = snapshot.val();


    for(let[key,value] of Object.entries(posts)){
        articlepost.innerHTML ="<a  id='"+key+"' onclick='getblogid(this.id)'>"+
                        "<div class='blog-card'>"+
        
                            "<div class='card-image'>"+
                                "<img src='"+ value.image+"' alt=''>"+
                            "</div>"+
                            "<div style='width:100%;height:100%'>"+
                                "<div class='card-text'>"+
                                    "<div class='datetime'>"+
                                        "<p> Posted:"+ value.Date+"</p>"+
                                        "<p>"+value.Time+"</p>"+
                                    "</div>"+
                                    "<div class='card-title'>"+
                                        "<p>"+ value.title+"</p>"+
                                    "</div>"+
                                    " <div class='card-details'><p>"+ value.post +"</p></div>"+
                                "</div>"+
                            "</div></div>"+
                            "</a>"+articlepost.innerHTML;
           
        }
	})
}


function getblogid(key){
    console.log(key);
    localStorage.setItem("articleId",JSON.stringify(key));
    window.location.href="Readblog.html?article_id="+ key;
}

