// Starter Code courtesy of Kindacode.com
// https://www.kindacode.com/article/how-to-get-all-links-from-a-webpage-using-node-js/

const got = require('got');
const cheerio = require('cheerio');

const url = 'http://github.com/dokastho';

const extractLinks = async () => {
  // Fetching HTML
  const response = await got(url);
  const html = response.body;

  // Using cheerio to extract <a> tags
  const $ = cheerio.load(html);

  const linkObjects = $('a');
  // this is a mass object, not an array

  // Collect the "href" and "title" of each link and add them to an array
  const links = [];
  linkObjects.each((index, element) => {
    const text = $(element).text();
      if (text.endsWith('snapshot')) {
        for (let i = 0; i < links.length; i++) {
          const checkLink = links[i];
          if (checkLink.endsWith(text)) {
            return;
          }
        }
        const repoLink = url.concat(text);
        links.push(repoLink);
      }
    
  });

  // console.log(links);
  return links;
};

exports.links = [];
exports.links = extractLinks();