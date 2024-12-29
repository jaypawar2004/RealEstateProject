const mongoose = require('mongoose');




const { Schema } = mongoose;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/.+@.+\..+/, 'Please enter a valid email address'] 
  },
  contactNumber: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'] 
  },
  message: { 
    type: String, 
   default:"i am intrested in buying some properties"
   
  },



propertyType:{
  type: String,
  enum: ['Residential', 'Commercial','OffPlan'],
  // required: true

},
propertyArea:{
  type: String,
  // required: true
},

  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
