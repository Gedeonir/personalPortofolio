function logout(){
    if (confirm(`Are you sure you want to logout!`)) {
        localStorage.removeItem('token');
        window.location = './login.html';

        alert("successfully logged out")
    } else {
        txt = "You pressed Cancel!";
      }
}