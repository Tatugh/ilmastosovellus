import { Electricity } from '../database/schemas.js';


const addPrice = async (price, date, spot=false, seller="") =>{
    const newPrice = new Electricity({
        price: price,
        date: date,
        spot: spot,
        seller: seller
    });

    await newPrice.save()
    .then(price => {
        console.log("Price Added", price);
    })
    .catch(e =>{
        console.error("Error adding price:", e);
    });
};

const getPriceByDate = async (date) =>{
    await Electricity.findOne({date: date})
    .then(price =>{
        console.log("Price:", price)
    })
    .catch(e =>{
        console.log("Error price:", e);
    });
};


const getPriceInRange = async (startDate, endDate) =>{
    await Electricity.find({date:
         {
            $gte: startDate,
            $lte: endDate
        }
    })
    .then(price =>{
        console.log("Price Range:", price)
    })
    .catch(e =>{
        console.log("Error retrieving:", e);
    });
};

export {addPrice, getPriceByDate, getPriceInRange};