const LinkedList = require('./23_LInkedListClass');

let ll = new LinkedList();

ll.printList();

ll.add(12);

ll.printList();

ll.add(31);
ll.add(3);
ll.add(11);
ll.add(43);
ll.add(321);
ll.add(2432);
ll.add(56645);

ll.printList();

ll.removeElAt(3);
ll.printList();
ll.removeEl(3);
ll.printList();
ll.removeElAt(-1);
ll.addAt(392, 5);
ll.printList();