'use strict';

let dataMentors = [];
let dataCourses = [];
let dataUser = {};
let dataSlider = [];

const formatName = /^[A-Z]{1}[a-z]+$/;
const formatPass = /(?=^.{8,}$)/;
const formatEmail = /^[0-9a-z.-]{1,}@[a-z0-9.-]{1,}\.[a-z]{2,4}$/i;