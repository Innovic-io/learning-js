// @TODO make functions in such way that calls can be linked
/*
    for Example so I can use ll.add(1).add(2).printList()
 */
const LinkedList = require('./23_LInkedListClass');

let ll = new LinkedList();

ll.add(12).add(123);
ll.addAt(1, 0).add(43).printList();

ll.printEl(0);

ll.add(31);

ll.add(3).add(123132).removeEl(12).removeElAt(0);
ll.printList();
ll.add(11).addAt(12, 6).printList();

ll.add(43);
ll.add(321);
ll.add(2432);
ll.add(56645);

ll.printList();

ll.removeElAt(3);
ll.printList();
ll.removeEl(3).removeEl(43);
ll.printList();
ll.removeElAt(-1);
ll.addAt(392, 5);
ll.printList();
