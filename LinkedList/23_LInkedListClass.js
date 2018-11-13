const { Node } = require('./23_NodeClass')

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

     add(el) {
        const node = new Node(el);

        if (this.head == null){
            this.head = node;
        } else {
            let current = this.head;

            while (current.next ) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
        console.log(`element '${el}' is added`);
        return this;
    }

     addAt(el, index) {
        if (index < 0 || index > this.size + 1){

        } else {
            const node = new Node(el);

            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let prev;
                let curr = this.head;
                let tempIndex = 0;

                while (tempIndex < index) {
                    tempIndex++;
                    prev = curr;
                    curr = curr.next;
                }

                node.next = curr;
                prev.next = node;
            }
            this.size++;
            console.log(`element '${el}' is added at position [${index}]`);
            return this;
        }
    }


    removeEl(el) {
        let current = this.head;
        let prev = null;

        while (current != null) {
            if (current.el === el) {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
            }
            prev = current;
            current = current.next;
        }
        console.log(`element '${el}' is removed`);
        return this;

    }


    removeElAt(index) {
        if (index < 0 || index > this.size){

        } else {
            let tempIndex = 0, curr, prev;
            curr = this.head;
            prev = curr;

            if (index === 0) {
                this.head = curr.next;
            } else {
                while (tempIndex < index) {
                    tempIndex++;
                    prev = curr;
                    curr = curr.next;
                }
                prev.next = curr.next;
            }
            this.size--;
            console.log(`element '${curr.el}' at the position [${index}] is removed`);
            return this;

        }
    }

    printList() {
        let curr = this.head;
        let str = "";
        while (curr) {
            str += curr.el + " ";
            curr = curr.next;
        }
        console.log(str);
    }

    printEl (index) {
        if(index < 0 || index > this.size){

        }else{
            let tempIndex = 0;
            let curr = this.head;
            let prev = null;

            while(tempIndex < index) {
                prev = curr;
                curr = curr.next;
                tempIndex++;
            }
            console.log(curr.el);

        }


    }
}


module.exports = LinkedList;




