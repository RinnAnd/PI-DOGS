require("dotenv").config();
const axios = require("axios");

const { apiKey } = process.env;
const { Dog, Temper } = require("../db");

// Getting dogs from API

const getDogsApi = async () => {
  try {
    const getApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);
    const info = await getApi.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        minHeight: item.height.metric.split("-")[0],
        maxHeight: item.height.metric.split("-")[1],
        minWeight: item.weight.metric.split("-")[0],
        maxWeight: item.weight.metric.split("-")[1],
        lifeSpan: item.life_span,
        temper: item.temperament,
        created: false,
        image: item.image.url,
      };
    });
    return info;
  } catch (error) {
    console.error(error.message);
  }
};

// Getting dogs from DataBase

const dogsDatB = async () => {
    try {
      const inst = await Dog.findAll({ include: { all: true, nested: true }}); //Fetch all models associated with User and their nested associations (recursively)
      const data = JSON.parse(JSON.stringify(inst))
      if(data === null) {
        return []
      }
      const doges = data.map(dbDog => {
        const dog = {...dbDog, temper: dbDog.tempers.map(t => t.name)}
        delete dog.tempers
        return dog
      })
      return doges
    } catch (error) {
        console.error(error.message)
    }
}

// Joining these functions together

const getAllDogs = async () => {
    let api = await getDogsApi();
    let db = await dogsDatB();
    const allInfo = api.concat(db)
    return allInfo;
}

// Making the big get function

const nameOrAll = async (req, res) => {
  try {
      const { name } = req.query
      let dogsTotal = await getAllDogs();
      if (name) {
          let dogName = dogsTotal.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
          dogName.length? res.status(200).send(dogName):res.status(404).send('Dog breed not found')
      } else {
          res.status(200).send(dogsTotal)
      }  
  } catch (error) {
      console.error(error.message)
  }
}

// getting dogs by ID

const dogsID = async (req, res) => {
  const { id } = req.params;
    const allDogs = await getAllDogs();
    if (id) {
        let dogId = await allDogs.filter( dog => dog.id == id);
        dogId.length ?
        res.status(200).send(dogId):
        res.status(404).send('Id not found');
    };
}

// getting the existent tempers

const dogTemp = async (req, res) => {
  const tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`)
  let tempers = await tempApi.data.map(el => el.temperament).toString();
  let noSpace = await tempers.split(",");
  noSpace = noSpace.map(e => e.trim());
  noSpace.forEach(async (t) => {
    if (t) {
      await Temper.findOrCreate({
        where: {name:t}
      })
    }
  })
  const allTemps = await Temper.findAll()
    res.status(200).send(allTemps)
}


module.exports = {nameOrAll, dogsID, dogTemp};
