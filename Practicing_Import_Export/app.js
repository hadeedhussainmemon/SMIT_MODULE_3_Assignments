const {sum} = require('./sum.js');
const {sub} = require('./sub.js');
const {div} = require('./div.js');
const {multi} = require('./multi.js');

let a = prompt('Enter first number: ')
let b = prompt('Enter second number: ')

sum(a,b)
sub(a,b)
div(a,b)
multi(a,b)