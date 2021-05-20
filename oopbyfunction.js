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

let Admin = function(...args){
    User.apply(this,args);
}

Admin.prototype = Object.create(User.prototype);

Admin.prototype.deleteuser = function(){
    console.log('user is deleted by admin');
}

let admin1 = new Admin('vaibhav','password');
console.log('admin',admin1.email,admin1.password);
admin1.deleteuser();

