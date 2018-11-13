const requestPromise = require('request-promise');
const request = require('request');


const rp = requestPromise('http://www.recipepuppy.com/api/?oi=1&q=milk+cheese+salt&p=1', {json: true}, (error, response, body) => {

});

const r = request('http://www.recipepuppy.com/api/?oi=1&q=milk+cheese+salt&p=1', {json: true}, (error, response, body) => {

});

const fun = async (t) => {
    const aw  = await t;

    console.log(aw);
};

fun(rp);
fun(r);


