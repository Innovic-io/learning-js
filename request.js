const request = require('request');


request('http://www.recipepuppy.com/api/?oi=1&q=milk+cheese+salt&p=1', {json: true}, (error, response, body) => {
    if(error){
        console.log(error);
    }
    else{
        console.log('status Code: ', response && response.statusCode);
        console.log('Body: ', body);
    }
});