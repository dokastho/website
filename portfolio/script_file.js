// written by thomas dokas, dokastho@umich.edu
const extractLinks = async () => {
  // Fetching HTML
  const request = require('request');
  let options = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
  };
  request(options, function(err, resp, html) {
    // fix indent
    if (err) {
      console.log(err.response.body);
    }
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
      // going to want to load index.html down below and update it here using cheerio.
      // simply update the document's div with the snapshots/ projects, and add the
      // sidebar either via a seperate function or inline
      // res.end(links.toString().concat('\n'));
      $('h2.title').text('tester hello');
      $('h2').addClass('tester welcome');
      links.forEach((elt) => {
        $('h2').text(elt);
      });
      $.html();
    });
};


const cheerio = require('cheerio');
const http = require('http');
const url = 'http://github.com/dokastho';

http.createServer(function (req,res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  extractLinks();
}).listen(8088,'localhost');
console.log('Server running at http://localhost:8088');