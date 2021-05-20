let User = function(email,password){
    this.email=email;
    this.password=password;
    this.login = function(){
        console.log('login succesful');
    }
}

let user1= new User('vaibhav','password');
console.log(user1.email,user1.password);
user1.login();

//adding logout using prototype
