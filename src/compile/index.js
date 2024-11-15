import "dotenv/config";
import fs from "fs";

import getTumblrData from "./tumblr.js";

async function printTumblrData() {
  let first_call = await getTumblrData();
  let second_call = await getTumblrData(50);

  return {
    blog: first_call.blog,
    posts: [...first_call.posts, ...second_call.posts],
  };
}

const outputFolder = "../data/";

const tumblr = [
  outputFolder + "tumblr.json",
  JSON.stringify(await printTumblrData(), null, 2),
  function (error) {
    if (error) console.log("there was an error: ", error);
  },
];

fs.writeFile(...tumblr);

console.log("data compiled!");
