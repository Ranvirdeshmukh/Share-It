// .src/index.js
/* eslint-disable eol-last */
import $ from 'jquery';
import './style.scss';
import dotenv from 'dotenv';

dotenv.config();

// Initialize a counter variable
let secondsPassed = 0;

setInterval(() => {
  secondsPassed += 1;
  $('#main').html(`You've been on this page for ${secondsPassed} seconds.`);
}, 1000);
