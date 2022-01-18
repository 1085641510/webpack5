import "./a.scss"
import nn from "../static/a.txt"
console.log(nn)
var gggg = ()=>{
    console.log(this)
    console.log('22222')
}
var cc= new Promise(function(a){
    a(2222)
}).then((b)=>{
    console.log(b)
})
var a  =222
gggg()

console.log("webpack 1");
let aaa = 1515
console.log(aaa)
let date = ["hello", "world", "this", "is", "es6", "code"];

((theDate) => {
    theDate.forEach(item => console.log(item));
})(date)
const b= Array.from([])

let array = [1, 2, 3, 4, 5, 6];
array.includes(item => item > 2);
array[10] = 4

async function gggxxxxxg(){
    await cc
    console.log(21441212)
}
gggxxxxxg()
// function component() {
//     const element = document.createElement('div');

//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//     return element;
// }
// document.body.appendChild(component());