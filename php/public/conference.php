<?php

// conference design
// abstract management software,
// program development
// registration,
// site and venue selection and booking,
// audiovisuals,
// IT support,
// logistics,
// leisure management,
// marketing,
// printing and web services,
// sourcing speakers,
// funding,
// sponsorship and exhibitor sales
// financial management and budget control.

class conference_t {
    public $sponsors;

    public function __construct($sponsors) {
        $this->sponsors = $sponsors;
    }

    public function __toString() {
        return __CLASS__;
    }
}
