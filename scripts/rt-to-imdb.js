// @ts-check
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

const RT_URL = `https://editorial.rottentomatoes.com/guide/best-netflix-shows-and-movies-to-binge-watch-now/`;
const OMDB_API = (title, year) =>
  `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=${process.env.API_KEY}`;

const doIt = async () => {
  const res = await fetch(RT_URL);
  const content = await res.text();
  const Html = cheerio.load(content).root();

  const getParams = () =>
    new Promise((res) => {
      const paramArr = [];
      Html.find('.countdown-item').each(async (i, el) => {
        const itemEl = cheerio.load(el).root();
        const titleEl = itemEl.find('.article_movie_title');
        const title = titleEl.find('a').text();
        let year = titleEl.find('.start-year').text();
        year = year.slice(1, 5);
        paramArr.push([title, year]);
      });
      res(paramArr);
    });

  const getData = () => {
    return new Promise(async (res) => {
      const params = await getParams();
      const promises = params.map(async ([title, year]) => {
        const s = await fetch(OMDB_API(title, year));
        return s.json();
      });

      const data = Promise.all(promises);
      res(data);
    });
  };
  const data = await getData();

  fs.writeFileSync(
    'output.json',
    JSON.stringify({
      data,
    })
  );
};

doIt();
