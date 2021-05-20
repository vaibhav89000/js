
class User {
    constructor(email,password){
        this.email=email;
        this.password=password;
    }
    login(){
        console.log(`you have ${this.email} logged in successfuly`);
    }
}

let user1 = new User('vaibhav','password');
// console.log(user1);
user1.login();