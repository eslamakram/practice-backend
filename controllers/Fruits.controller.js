// link : www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

const axios = require('axios');
const {Fruits, fruitModel} = require('../models/fruits.model');



const getFruitsController = async (req, res) => {
    const url = 'https://fruit-api-301.herokuapp.com/getFruit';
    await axios.get(url).then(results => {
        const modellingData = results.data.fruits.map(fruit => {
            return new Fruits(fruit)
        });
        res.send(modellingData);
    }).catch(err => {
        console.log('===========================')
        console.log('An Error Occurred:')
        console.log(err)
        console.log('===========================')
        res.status(500).send(err)

    });
}


//================================================================
const addtoFavController = async(req,res) =>{
      
    const {name, image, price, email} = req.body;
    fruitModel.find({}, (error, data)=>{
        if(error){
            console.log('===========================')
            console.log('An Error Occurred:')
            console.log(error)
            console.log('===========================')
            res.status(500).send(error)        }
            else{
                let newFruit = new fruitModel({
                       name:name,
                       image:image,
                       price:price,
                       email:email
                })
                  newFruit.save();
                  res.send(newFruit);
            }
    })
}
//====================================================================

const getFavController = async(req,res)=>{
    const email = req.query.email;
    fruitModel.find({email:email},(error,data)=>{
       if(error){
       console.log('===========================')
       console.log('An Error Occurred:')
       console.log(error)
       console.log('===========================')
       res.status(500).send(error)
       }else{
        res.send(data);

       }

    })
}
//=========================================================================

const deleteFavController = async(req,res)=>{

    let fruitId = req.params.id;
    const email = req.query.email;
    fruitModel.findByIdAndDelete(fruitId, (error,data)=>{
        if(error){
            console.log('===========================')
            console.log('An Error Occurred:')
            console.log(error)
            console.log('===========================')
            res.status(500).send(error)
        }else{
         fruitModel.find({email:email}).then(fruits =>{
             res.json(fruits)
         })
        }
    })
}
//=============================================================================

const updateFavController = async(req,res)=>{

    const fruitId = req.params.id;
    const{name, image,price,email} = req.body;
    fruitModel.findByIdAndUpdate(fruitId,{name, image,price,email} , (error,data)=>{
        fruitModel.find({email:email}, (error,data) =>{
        if(error){
            console.log('===========================')
            console.log('An Error Occurred:')
            console.log(error)
            console.log('===========================')
            res.status(500).send(error) 
        }else{
            res.json(data)}
        })
    })

    // fruitModel.findOne({_id:fruitId}).then( fruit =>
    //      { fruit.name = name;
    //       fruit.img = image;
    //       fruit.price = price;
    //       fruit.email = email;
    //       fruit.save();

    //      })
    // let updatedList =  await fruitModel.find({})
    // res.send(updatedList);
}





module.exports = {getFruitsController,
                  addtoFavController,
                  getFavController,
                  deleteFavController,
                  updateFavController
                };
