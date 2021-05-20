let User = function(email,password){
    this.email=email;
    this.password=password;
    this.login = function(){
        console.log('login succesfull');
    }
}

//adding logout using prototype
User.prototype.logout = function(){
    console.log('logout done');
}

let user1= new User('vaibhav','password');
console.log(user1.email,user1.password);
user1.login();

user1.logout();