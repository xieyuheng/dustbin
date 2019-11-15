<?php

class garden_t implements JsonSerializable {
    function jsonSerialize() {
        unset($this->herbs);
        return $this;
    }
}

$garden = new garden_t();
$garden->flowers = array("clematis", "geranium", "hydrangea");
$garden->herbs = array("mint", "sage", "chives", "rosemary"); // this field will be unset during jsonSerialize
$garden->fruit = array("apple", "rhubarb");

echo json_encode($garden);
