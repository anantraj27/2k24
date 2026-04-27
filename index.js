// class Animal {

//     constructor( name){
//         this.name = name ;

//     }
//  sound(){
//  console.log("animal is sounding ");
// }
// }


// let A = new Animal("dog");

// // A.eat = ()=>{
// //     console.log(this.name + "is eating");
// // }
// A.eat = function (){
//     console.log(this.name + "is eating");
// }
// console.log(A.eat())
class Student {
    constructor(name) {
        this.name = name;
    }

    greet() {

        run() {
             setTimeout(function() {
             console.log(this.name);
          }.bind(this), 1000);
        }

        run();
       
}
}
let s = new Student("anant");
s.greet()
