// @TODO could this be done better? REASON: you don't use reject, and don't need it
async function fulfilled() {
    let promise = new Promise((resolve) => {
        setTimeout(() => resolve("You did it!"), 1000);
    });

    let result = await promise;
    console.log(result);
}

fulfilled();

async function ChangeAge(age) {

    const promise2 = new Promise((resolve, reject) => {
        if(age !== 18) {
            setTimeout(() => resolve(age = 18), 2000);
        } else {
            setTimeout(() => reject(age = 17), 4000);
        }
    });

    let currAge = await promise2
        .then(() => this.age = age)
        .catch(() => this.age = age);
    console.log(currAge);
}

ChangeAge(18);
ChangeAge(17);
