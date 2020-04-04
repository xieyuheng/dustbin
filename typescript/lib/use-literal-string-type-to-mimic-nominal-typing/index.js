"use strict";
class Bird {
    constructor() {
        this.abstract_class_name = "Bird";
    }
}
class Duck extends Bird {
}
class Cuckoo extends Bird {
}
class Ostrich extends Bird {
}
class Fish {
    constructor() {
        this.abstract_class_name = "Fish";
    }
}
class Tuna extends Fish {
}
class Carp extends Fish {
}
function bird_fly(bird) {
    console.log(`bird: ${bird.constructor.name} fly`);
}
bird_fly(new Ostrich());
// bird_fly(new Carp())
// ERROR:
// Argument of type 'Carp' is not assignable to parameter of type 'Bird'.
//   Types of property 'abstract_class_name' are incompatible.
//     Type '"Fish"' is not assignable to type '"Bird"'.
