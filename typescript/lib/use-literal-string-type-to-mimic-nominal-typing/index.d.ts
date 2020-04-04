declare abstract class Bird {
    abstract_class_name: "Bird";
}
declare class Duck extends Bird {
}
declare class Cuckoo extends Bird {
}
declare class Ostrich extends Bird {
}
declare abstract class Fish {
    abstract_class_name: "Fish";
}
declare class Tuna extends Fish {
}
declare class Carp extends Fish {
}
declare function bird_fly(bird: Bird): void;
