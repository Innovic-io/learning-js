const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const request = new XMLHttpRequest();

const url = 'http://www.recipepuppy.com/api/?oi=1&q=milk+cheese+salt&p=1';

request.open("GET", url);

request.send();

request.onreadystatechange = () => {
    if(request.readyState === 4)
    console.log(request.responseText);
}