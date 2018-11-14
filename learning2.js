
/* 1. the difference between the initialization and declaration is that the declarated variable has the value, while initialization doesn't have it. */

/* 2. var can be re-defined and updated. If it is declared into the block, it can be used also outside the block.
*     let can't be re-defined, but it can be updated. It is also block scoped. It means, if it is declared inside the block, it will be not defined outside the block.
*     const can't be re-defined neither updated. It is also block scoped
*     */

// re-defined

var n1 = "Branislav";         let n2 = "Branislav";                 const n3 = "Branislav";
var n1 = "Ivan";//allowed     let n2 = "Ivan"; //error              const n3 = "Ivan"; //error

updated

var na1 = "Branislav";         let na2 = "Branislav";                 const na3 = "Branislav";
na1 = "Ivan"; //allowed        na2 = "Ivan"; //allowed                na3 = "Ivan"; //error

scoped

var name1 = "Branislav";         let name2 = "Branislav";
var b1 = 1;                      let b2 = 1;

if(b1 == 1)                      if(b2 == 1)
{                               {
    var name1 = "Ivan";              let name2 = "Ivan";
                                    console.log(name2); //"Ivan"
}                               }
console.log(name1); /*"Ivan"*/     console.log(name2); //"Branislav"

/* 3. First-class citizens means that function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value of variable. */

/* 4. Asynchronous programming means that it keeps web applications responsive by allowing several tasks to be processed at the same time.
 *    It means that a process doesn't need to wait the other process be finished, like in synchronous programming. */

/* 5. Type inference means that data type is automatically detected in programming language. So we do not have to declare strings or integers.  */

/* 6. Spread operators for arrays or object is "...". It takes the array or object and expands it into its set of items */

/* 7. Functional programming is a programming paradigm where the output value of function depends only on the argument that is passed to the function. One of key foundation of
functional programming is its use of arrays and array operation. In Javascript we have functions map, filter and reduce that given array of things transform in something else, while
keeping the original array.
 */

// 8. Example

// 9. Example

// 10. Arrow function can't be used as a 'new', it means it is not a constructor, but arrow function can return a value without using a 'return' keyword. (3_first-class.js)

/* 11. Promise is an object that may product a value in future, either a resolved value or a reason why it is not resolved. It has three states:
fulfilled, rejected or pending.
*/

/* 12. The async before a function means that a function returns always a promise. Await can be used only in async function, and it
makes Javascript waits until the promise is fulfilled. */

// 13. Example
// 14. Examples

// 15. Symbol value represents a unique identifier. So if we have two symbols with the same description, they are not equal.

// 16. Unit tests check the block of code to ensure that runs all as expected. It allows developers to check individual areas of program, to see where and why error exists.

/* 17. Modules in programming are just like chapter in a book. Good modules are self-contained with different functionality allowing them to be changed, deleted or shuffled without
    disrupting system as a whole.
    CommonJS load modules synchronous, while AMD do it asynchronous. And the other difference between them is that CommonJS support only objects as modules
    while for AMD modules can be objects, functions,constructors, JSON, strings and many other types.
*/

/* 18. Operators === and !== are strict comparison operators, while == and != are not. It means that operators === and !== checks the objects value and type,
    while operators == and != checks only the object value. There are examples in 16_unit_test.js.
 */

/* 19. JSON is format for storing and transporting data, and it is often used when data is sent from a server to a web page. JSON stands for
    JavaScript Object Notation. In JSON, values must be one of the following data types:
    -string
    -number
    -null
    -object
    -array
    -boolean
    It can't be a function, date or undefined.
 */

/* 24. Internet Protocol is a method or protocol by which the data is sent from one computer to another on the internet. Each computer on the internet has at least one IP adress that
is uniquely identifies it from the othe computer on the internet.
 */

