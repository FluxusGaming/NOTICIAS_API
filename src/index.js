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

async function abc() {
  const { data } = await scrapeIt("https://www.abc.es/tecnologia/", {
    title: {
      selector: ".articulo-portada .imagen",
      attr: "title",
    },
    url: {
      selector: ".articulo-portada .imagen",
      attr: "href",
    },
  });
  return {
    title: data.title,
    url: `https://www.abc.es${data.url}`,
  };
}
async function bbc() {
  const { data } = await scrapeIt(
    "https://www.bbc.com/mundo/topics/cyx5krnw38vt",
    {
      title: {
        listItem: ".lx-stream-post__header-link > .lx-stream-post__header-text",
      },
      url: {
        selector: ".qa-heading-link",
        attr: "href",
      },
    }
  );
  return {
    title: data.title[0],
    url: `https://www.bbc.com${data.url}`,
  };
}

async function computerhoy() {
  const { data } = await scrapeIt("https://computerhoy.com/noticias", {
    title: {
      listItem: ".col-xs-12 > article",
    },
    url: {
      selector: ".block-title > h3 > a",
      attr: "href",
    },
  });
  return {
    title: data.title[0],
    url: `https://computerhoy.com${data.url}`,
  };
}

async function googlenews() {
  const { data } = await scrapeIt(
    "https://news.google.com/topstories?hl=es-419&gl=US&ceid=US:es-419",
    {
      title: {
        listItem: ".Cc0Z5d > .ipQwMb",
      },
      url: {
        selector: ".Cc0Z5d > .ipQwMb > a",
        attr: "href",
      },
    }
  );
  return {
    title: data.title[0],
    url: `https://news.google.com${data.url.substring(1)}`,
  };
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
    abc: await abc(),
    bbc: await bbc(),
    computerhoy: await computerhoy(),
    googlenews: await googlenews(),
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${process.env.PORT || 3000} :D`);
});
