import { get } from "../scripts/helpers.js";

async function getTumblrData(offset = 0) {
  const gem = await get.JSON(
    `https://api.tumblr.com/v2/blog/paulhsocial.tumblr.com/posts?limit=50&offset=${offset}&api_key=${process.env.TUMBLR_API}`
  );

  const { response } = gem;

  const { blog, posts } = response;

  return { blog, posts };
}

export default getTumblrData;
