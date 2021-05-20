
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

// inheritance of user class
class Admin extends User {
    deleteuser(){
        console.log('The user is deleted by admin');
    }
}

let admin1 = new Admin('vaibhav','password');
console.log(admin1.email,admin1.password);
admin1.deleteuser();