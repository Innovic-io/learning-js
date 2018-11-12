const { Node } = require('./23_NodeClass')

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

     add(el) {
        const node = new Node(el);

        if (this.head == null)
            this.head = node;
        else {
            let current = this.head;

            while (current.next ) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

     addAt(el, index) {
        if (index < 0 || index > this.size)
            return false;
        else {
            const node = new Node(el);

            if (index == 0) {
                node.next = head;
                this.head = node;
            }
            else {
                let prev;
                let curr = this.head;
                let it = 0;

                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }

                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }


    removeEl(el) {
        let current = this.head;
        let prev = null;

        while (current != null) {
            if (current.el === el) {
                if (prev == null) {
                    this.head = current.next;
                }
                else {
                    prev.next = current.next;
                }
                this.size--;
                return current.el;

            }
            prev = current;
            current = current.next;
        }
        return ;
    }


    removeElAt(index) {
        if (index < 0 || index > this.size)
            return;
        else {
            let it = 0, curr, prev;
            curr = this.head;
            prev = curr;

            if (index == 0) {
                this.head = curr.next;
            }
            else {
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
                prev.next = curr.next;
            }
            this.size--;
            return curr.el;
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
        if(index < 0 || index > this.size)
            return;


    }
}


module.exports = LinkedList;




