const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/realEstate")
  .then(async () => {
    console.log("Database connected!");
  })
  .catch((err) => console.error("Database connection error:", err));

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true }, // Property title/name
                                                       
  mainCategory: { 
    type: String, 
    enum: ["Residential", "Commercial", "OffPlan"], 
    required: true 
  }, // Main category
  subCategory: { 
    type: String,
     enum: { 
      values: ['Apartment', 'Bungalow', 'Palace', 'Plot','Shop', 'Studio'],
       message: 'Invalid subcategory for the selected category' }, 
//        validate: { 
//         validator: function(v) {
//            if (this.category === 'Residential')
//              { 
//               return ['Apartment', 'Bungalow',].includes(v); 

//             } else if (this.category === 'Commercial') { 

//               return ['Shop', 'Studio'].includes(v);

//             } else if (this.category === 'Off Plan') { 

//               return ['Palace', 'Plots'].includes(v); 

//             } else { 
              
//               return true;
            
//             } },
  
  
//   message: 'Subcategory does not match the selected category'
//  }
},
 // Sub-category
  Images:[{type:String}],
  bedrooms: { type: Number, required: true }, // Number of bedrooms
  area: { type: Number, required: true }, // Number of bedrooms
  location: { type: String, required: true }, // Location (used for "Keyword")
  price: { type: Number, required: true }, // Property price
  description : {type : String},
  createdAt: { type: Date, default: Date.now }, // Creation date
});

module.exports = mongoose.model("Property", PropertySchema);
