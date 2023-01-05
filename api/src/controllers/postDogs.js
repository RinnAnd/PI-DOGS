const { Dog, Temper } = require("../db");

const postDog = async (req, res) => {
  const { name, minHeight, maxHeight, minWeight, maxWeight, lifeSpan, image, temper } = req.body;
  let newDog = await Dog.create({
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    lifeSpan,
    image,               
});

let temperDB = await Temper.findAll({
  where: {name : temper}
})

newDog.addTempers(temperDB)
res.status(200).send('A new dog has been created');
};

module.exports = postDog;

// POST FORMAT ->
// "name": "Chandosa",
// "minHeight": "23",
// "maxHeight": "29",
// "minWeight": "3",
// "maxWeight": "6",
// "lifeSpan": "10 - 12 years",
// "temper": ["Bold", "Reliable", "Lively"]