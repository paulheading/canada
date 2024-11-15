let $ = {};

$.body = document.querySelector("body");

$.progress_container = document.querySelector(".progress-container");
$.progress_line = $.progress_container.querySelector(".progress-line");
$.progress_fill = $.progress_container.querySelector(".progress-fill");
$.progress_dot = $.progress_container.querySelector(".progress-dot");

$.miles_gone = document.querySelector(".miles-gone");
$.travel_hours = document.querySelector(".travel-hours");
$.time_zones = document.querySelector(".time-zones");

$.grid_images = document.querySelectorAll(".grid-image");

$.show_count = document.querySelector(".show-count");
$.show_count_length = $.show_count.querySelector(".length");
$.show_more = document.querySelector(".show-more");

export default $;
