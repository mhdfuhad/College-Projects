const Entertainment = require("../models/entertainmentSchema");
const axios = require("axios");

module.exports.getGenres = () => {
  return new Promise((resolve, reject) => {
    const movieGenres = axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "en-US",
        },
      }
    );

    const tvGenres = axios.get("https://api.themoviedb.org/3/genre/tv/list", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
      },
    });

    movieGenres
      .then((response) => {
        tvGenres
          .then((response2) => {
            resolve({
              status: 200,
              message: "Successfully retrieved genres",
              movieGenres: response.data.genres,
              tvGenres: response2.data.genres,
            });
          })
          .catch((err) => {
            reject({
              status: 500,
              message: err.message,
            });
          });
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error.message,
        });
      });
  });
};

module.exports.GetDetails = (id, mvt) => {
  return new Promise((resolve, reject) => {
    const data = axios.get(
      `https://www.movieofthenight.com/api/${mvt}/${id}/en`
    );

    data
      .then((response) => {
        if (response.data.result > 0) {
          resolve({
            status: 200,
            message: "Successfully retrieved content",
            data: response.data,
          });
        } else {
          reject({
            status: 400,
            message: "Does not exist",
          });
        }
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error.message,
        });
      });
  });
};

module.exports.Search = (req) => {
  return new Promise((resolve, reject) => {
    const tv = req.tv || false;

    const search = axios.get(
      `https://www.movieofthenight.com/api/recommend/${
        tv ? "series" : "movie"
      }`,
      {
        params: {
          userLanguage: "en",
          multiple: true,
          country: "ca",
          keyword: req.query,
          genres: req.genres,
          services: req.services,
          movieLanguage: req.lang,
          type: req.type,
        },
      }
    );

    search
      .then((response) => {
        resolve({
          status: 200,
          message: "Success",
          data: response.data,
        });
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error.message,
        });
      });
  });
};

module.exports.GetRecommended = () => {
  return new Promise((resolve, reject) => {
    const search = axios.get(
      `https://www.movieofthenight.com/api/recommend/movie`,
      {
        params: {
          userLanguage: "en",
          multiple: true,
          country: "ca",
          type: "unpopular",
          yearLow: new Date().getFullYear().toString(),
          yearHigh: new Date().getFullYear().toString(),
        },
      }
    );

    search
      .then((response) => {
        resolve({
          status: 200,
          message: "Success",
          data: response.data,
        });
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error.message,
        });
      });
  });
};

module.exports.GetRandom = () => {
  return new Promise((resolve, reject) => {
    const search = axios.get(
      `https://www.movieofthenight.com/api/recommend/series`,
      {
        params: {
          userLanguage: "en",
          multiple: true,
          country: "ca",
          type: "random",
        },
      }
    );

    search
      .then((response) => {
        resolve({
          status: 200,
          message: "Success",
          data: response.data,
        });
      })
      .catch((error) => {
        reject({
          status: 500,
          message: error.message,
        });
      });
  });
};

module.exports.AddToList = (body, fav) => {
  return new Promise((resolve, reject) => {
    Entertainment.find({ id: body.id, favorite: fav })
      .then((entertainment) => {
        if (entertainment.length > 0) {
          reject({
            status: 400,
            message: "Already in list",
          });
        } else {
          Entertainment.create(body)
            .then((result) => {
              resolve({
                status: 200,
                message: "Success",
                data: result,
              });
            })
            .catch((err) => {
              reject({
                status: 500,
                message: err.message,
              });
            });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.GetList = (userID, fav) => {
  return new Promise((resolve, reject) => {
    Entertainment.find({ userID: userID, favorite: fav })
      .then((entertainment) => {
        if (entertainment.length > 0) {
          resolve({
            status: 200,
            message: "Success",
            data: entertainment,
          });
        } else {
          reject({
            status: 400,
            message: "Nothing exists in list",
          });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.RemoveFromList = (entID, userID, fav) => {
  return new Promise((resolve, reject) => {
    Entertainment.findOneAndDelete({
      entID: entID,
      userID: userID,
      favorite: fav,
    })
      .then((entertainment) => {
        if (entertainment) {
          resolve({
            status: 200,
            message: "Success",
            data: entertainment,
          });
        } else {
          reject({
            status: 400,
            message: "Does not exist",
          });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};
