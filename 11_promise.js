let work = false;
let money = 0;

let willItBeBetter = new Promise(
    function(resolve, reject){
        if(work){
            money += 1000;
            resolve("Excellent. Your bank balance: " + money);
        }
        else{
            let reason = "You didn't work! Your bank balance: " + money;
            reject(reason);
        }
    }
);

let askYourself = () => {
    return willItBeBetter
        .then(function(fulfilled) {
            console.log(fulfilled + 1);
            return 4;
        })
        .catch(function(error) {
            console.log(error);
            return 5
        });
};

const f = async () => {
    console.log(await askYourself());
    console.log(askYourself());
    //console.log(await willItBeBetter)
    console.log(willItBeBetter)

}

f();