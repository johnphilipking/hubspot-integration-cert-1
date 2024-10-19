const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.PRIVATE_ACCESS_KEY;

// homepage
app.get("/", async (req, res) => {
  const artists = "https://api.hubapi.com/crm/v3/objects/p47792500_artists";
  const params =
    "?properties=name&properties=artist_type&properties=artist_work&associations=contacts&archived=false";

  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(artists + params, { headers });
    res.render("homepage", {
      title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
      artists: response.data.results,
    });
  } catch (error) {
    console.error(error);
  }
});

// update form view
app.get("/update-cobj", async (req, res) => {
  console.log(PRIVATE_APP_ACCESS);
  res.render("updates", {
    title: "Update Custom Object Form | Integrating With HubSpot I Practicum.",
  });
});

// update post
app.post("/update-cobj", async (req, res) => {
  const artists = "https://api.hubapi.com/crm/v3/objects/p47792500_artists";
  const props = {
    properties: req.body,
  };

  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(artists, props, { headers });
    res.redirect("/?updated");
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
