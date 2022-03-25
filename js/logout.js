function logout(){
    if (confirm(`Are you sure you want to logout!`)) {
        localStorage.removeItem('userToken');
        window.location = './signin.html';

        alert("successfully logged out")
    } else {
        txt = "You pressed Cancel!";
      }
}