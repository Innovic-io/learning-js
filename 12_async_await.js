// @TODO could this be done better? REASON: you don't use reject, and don't need it
async function fulfilled() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("You did it!"), 2000);
    })

    let result = await promise;
    console.log(result);
}

fulfilled();
