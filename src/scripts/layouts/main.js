import $ from "~scripts/selectors";
import { gsap } from "gsap";

let snapText = (target) => ({ innerText: target, snap: { innerText: 1 } });

let city_buttons = ".city-button";

let city_titles = ".city-title";

function resetTimeline() {
  gsap.globalTimeline.clear();

  $.progress_dot.style.background = "#696969";

  $.progress_fill.style.removeProperty("width");

  [$.miles_gone, $.travel_hours, $.time_zones].forEach(function (item) {
    gsap.set(item, { innerText: 0 });
  });

  document.querySelectorAll(city_titles).forEach(function (title) {
    title.style.removeProperty("color");
  });

  document.querySelectorAll(city_buttons).forEach(function (button) {
    button.replaceWith(button.cloneNode(true));
  });
}

function buildTimeline() {
  let tl = gsap.timeline({ paused: true, defaults: { delay: 1 } });

  let segments = 7;

  let segment = $.progress_line.offsetWidth / segments;

  document.querySelectorAll(city_buttons).forEach(function (button, index) {
    let { label, miles, hours, zones } = button.dataset;

    function updateProgress() {
      // prettier-ignore
      let move = (width) => [$.progress_fill, { width }, label];

      // prettier-ignore
      let mark = (position) => [document.querySelectorAll(city_titles)[position], { color: "black", delay: 0, duration: 0.1 }]

      // prettier-ignore
      let clear = (position) => [document.querySelectorAll(city_titles)[position], { color: "#696969" }, label ];

      if (label == "start") tl.to(...mark(index));

      if (label == "victoria")
        return tl.to(...move("-=" + segment)).to(...clear(index));

      if (label == "vancouver_return")
        return tl
          .to(...move("+=" + segment * 2))
          .to(...mark(index - 1))
          .to(...mark(index + 1));

      if (label != "finish")
        return tl.to(...move("+=" + segment)).to(...mark(index + 1));
    }

    function updateNumbers() {
      let targets = [
        { elem: $.miles_gone, text: miles },
        { elem: $.travel_hours, text: hours },
        { elem: $.time_zones, text: zones },
      ];

      targets.forEach(function ({ elem, text }) {
        tl.to(elem, { ...snapText(text) }, label);
      });
    }

    tl.add(updateProgress).add(updateNumbers);

    button.addEventListener("click", function () {
      tl.pause().seek(label).delay(1).play();
    });
  });

  $.progress_dot.style.removeProperty("background");

  tl.play();
}

buildTimeline();

(function () {
  let total = $.grid_images.length - 1;
  let length = 6;
  let clicks = 0;

  function updatePostsLength() {
    let posts = length + length * clicks;

    if (posts > total) posts = total;

    function onComplete() {
      $.grid_images.forEach(function (item, index) {
        if (index > posts) return;

        item.style.display = "initial";
      });

      if (total - posts > 0) return;

      $.show_more.style.display = "none";
    }

    // prettier-ignore
    gsap.to($.show_count_length, { ...snapText(posts), onComplete });
  }

  $.show_more.addEventListener("click", function () {
    clicks++;
    updatePostsLength();
  });

  updatePostsLength();
})();

let timeout = false;

window.addEventListener("resize", function () {
  resetTimeline();

  clearTimeout(timeout);

  timeout = setTimeout(buildTimeline, 300);
});
