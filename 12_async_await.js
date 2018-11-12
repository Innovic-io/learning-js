async function fulfilled() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("You did it!"), 2000);
    })

    let result = await promise;
    console.log(result);
}

fulfilled();
