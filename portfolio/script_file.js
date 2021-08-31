// Starter Code courtesy of Kindacode.com
// https://www.kindacode.com/article/how-to-get-all-links-from-a-webpage-using-node-js/
const got = require('got');
const cheerio = require('cheerio');

const url = 'http://github.com/dokastho';

const extractLinks = async (res) => {
  try {
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
    // return links;
    // console.log(links.toString())
    res.end(links.toString().concat('\n'));
  } catch (error) {
    console.log(error.response.body);
  }
};

const http = require('http');

http.createServer(function (req,res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    extractLinks(res);
}).listen(8088,'192.168.0.170');
console.log('Server running at http://192.168.0.170:8088');