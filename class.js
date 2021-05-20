
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
    assigntask(){
        console.log('The task is assigned by admin');
    }
}

let admin1 = new Admin('vaibhav','password');
console.log(admin1.email,admin1.password);
admin1.assigntask();