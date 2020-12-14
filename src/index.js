require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const scrapeIt = require("scrape-it");
const app = express();
/* Simple NEWS API by FluxusGaming */

/* Websites xataka, muycomputer, wwwhatsnew, eltiempo, gizmodo */

async function xataka_poster() {
  const { data } = await scrapeIt("https://www.xataka.com", {
    title: {
      listItem: ".poster-title",
    },
    url: {
      selector: ".poster-title > a",
      attr: "href",
    },
  });
  return { title: data.title[0], url: `https://www.xataka.com${data.url}` };
}
async function xataka() {
  const { data } = await scrapeIt("https://www.xataka.com", {
    title: {
      listItem: ".abstract-title",
    },
    url: {
      selector: ".abstract-title> a",
      attr: "href",
    },
  });
  return { title: data.title[0], url: data.url };
}
async function muycomputer() {
  const { data } = await scrapeIt("https://www.muycomputer.com", {
    title: {
      selector: ".mvp-feat5-small-main h2",
    },
    url: {
      selector: ".mvp-feat5-small-wrap a",
      attr: "href",
    },
  });
  return { title: data.title, url: data.url };
}

async function wwwhatsnew() {
  const { data } = await scrapeIt("https://wwwhatsnew.com/", {
    title: {
      listItem: ".site-main > article > .entry-header > .entry-title",
    },
    url: {
      selector: ".site-main > article > .entry-header > .entry-title a",
      attr: "href",
    },
  });
  return { title: data.title[0], url: data.url };
}

async function eltiempo() {
  const { data } = await scrapeIt("https://www.eltiempo.com/tecnosfera", {
    title: {
      listItem: ".nota > .informacion > .titulo a",
    },
    url: {
      selector: ".nota > .informacion > .titulo a",
      attr: "href",
    },
  });
  return { title: data.title[0], url: `https://www.eltiempo.com${data.url}` };
}

async function gizmodo() {
  const { data } = await scrapeIt("https://es.gizmodo.com/c/tecnologia", {
    title: {
      listItem: "article > .cw4lnv-11 > .cw4lnv-4 > .cw4lnv-5 > a > h2",
    },
    url: {
      selector: "article > .cw4lnv-11 > .cw4lnv-4 > .cw4lnv-5 > a",
      attr: "href",
    },
  });

  return { title: data.title[0], url: data.url };
}
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  res.json({
    xataka_poster: await xataka_poster(),
    xataka: await xataka(),
    muycomputer: await muycomputer(),
    gizmodo: await gizmodo(),
    eltiempo: await eltiempo(),
    wwwhatsnew: await wwwhatsnew(),
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${process.env.PORT || 3000} :D`);
});
