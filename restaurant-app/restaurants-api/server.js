
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB();
const app = express();

app.use(cors());
app.use(express.json());

//DOTENV setup
dotenv.config({ path: "./apikey.env" });

app.get("/", (req, res) => {
  res.json({ message: "API Listening" });
});

//Add new restaurant
app.post("/api/restaurants", (req, res) => {
  db.addNewRestaurant(req.body)
    .then(() => {
      res.status(201).json({ message: `Successfully added restaurant.` });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Failed to add restaurant due to ${err}` });
    });
});

//Return restaurant object for a specific page
app.get("/api/restaurants", (req, res) => {
  db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((objs) => {
      res.status(201).json(objs);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Failed to find restaurants due to ${err}` });
    });
});

//Return specific restaurant object through route param
app.get("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((obj) => {
      res.status(201).json(obj);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Failed to find a restaurant due to ${err}` });
    });
});

//Update specific objects through body contents and route param
app.put("/api/restaurants/:id", (req, res) => {
  db.updateRestaurantById(req.body, req.params.id)
    .then(() => {
      res.status(201).json({ message: `Successfully updated restaurant.` });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Failed to update restaurant due to ${err}` });
    });
});

//Remove restaurant object using route param
app.delete("/api/restaurants/:id", (req, res) => {
  db.deleteRestaurantById(req.params.id)
    .then(() => {
      res.status(201).json({ message: `Successfully removed restaurant.` });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Failed to remove restaurant due to ${err}` });
    });
});

//Constants
//Bad request response
app.use((req, res) => {
  res.status(404).send(`Error 404! API could not fetch any data.`);
});

// Initialize db connection and listen on port 8080.
db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server listening on: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
