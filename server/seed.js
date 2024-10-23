const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log('MongoDB connection error:', err));

const seedProducts = async () => {
  const products = [
    { 
      name: 'Notebook', 
      price: 50, 
      offers: [{ type: 'flat', discountValue: 5 }] 
    },
    { 
      name: 'Ballpoint Pen', 
      price: 10, 
      offers: [{ type: 'percentage', discountValue: 10 }] 
    },
    { 
      name: 'Pencil', 
      price: 5, 
      offers: [{ type: 'flat', discountValue: 1 }] 
    },
    { 
      name: 'Eraser', 
      price: 2, 
      offers: [{ type: 'flat', discountValue: 0.5 }] 
    },
    { 
      name: 'Ruler', 
      price: 15, 
      offers: [{ type: 'percentage', discountValue: 5 }] 
    },
    { 
      name: 'Marker', 
      price: 20, 
      offers: [{ type: 'flat', discountValue: 2 }] 
    },
    { 
      name: 'Highlighter', 
      price: 25, 
      offers: [{ type: 'percentage', discountValue: 15 }] 
    },
    { 
      name: 'Glue Stick', 
      price: 30, 
      offers: [{ type: 'product', freeProduct: null }] 
    }, // Free product offer (will be updated after insertion)
    { 
      name: 'Sketch Pen Set', 
      price: 100, 
      offers: [{ type: 'flat', discountValue: 10 }] 
    },
    { 
      name: 'Stapler', 
      price: 40, 
      offers: [{ type: 'percentage', discountValue: 5 }] 
    },
    { 
      name: 'Paper Clips (Box)', 
      price: 20, 
      offers: [{ type: 'flat', discountValue: 3 }] 
    },
    { 
      name: 'Scissors', 
      price: 50, 
      offers: [{ type: 'flat', discountValue: 5 }] 
    },
    { 
      name: 'Sticky Notes (Pack)', 
      price: 25, 
      offers: [{ type: 'percentage', discountValue: 10 }] 
    },
    { 
      name: 'Calculator', 
      price: 150, 
      offers: [{ type: 'flat', discountValue: 20 }] 
    },
    { 
      name: 'Binder', 
      price: 60, 
      offers: [{ type: 'flat', discountValue: 5 }] 
    }
  ];

  const insertedProducts = await Product.insertMany(products);
  console.log('Products added!');

  // Update "Glue Stick" offer to provide a free "Eraser"
  const glueStick = insertedProducts.find(p => p.name === 'Glue Stick');
  const freeProduct = insertedProducts.find(p => p.name === 'Eraser');
  if (glueStick && freeProduct) {
    await Product.updateOne(
      { _id: glueStick._id },
      { $set: { 'offers.0.freeProduct': freeProduct._id } }
    );
    console.log(`Updated "Glue Stick" to include a free "${freeProduct.name}"!`);
  }

  mongoose.disconnect();
};

seedProducts();
