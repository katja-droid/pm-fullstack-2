const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port', process.env.PORT || 5000);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);
app.use('/api/product', productRoute);
app.get('/api', (req, res) => {
  try {
    console.log('Test route accessed');
    res.send('Hello, this is a test route!');
  } catch (error) {
    console.error('Error in route handler:', error);
    res.status(500).send('Internal Server Error');
  }
});

// New route to fetch data from the public API and save it to MongoDB// New route to fetch data from the public API and save it to MongoDB
// New route to fetch data from the public API and save it to MongoDB
app.get('/api/fetch-and-save-data', async (req, res) => {
  try {
    // Fetch data from the public API
    const apiEndpoint = 'https://publicapi.meest.com/branches'; // Replace with the actual API endpoint
    const response = await axios.get(apiEndpoint);

    // Assuming the branches are within the 'result' property
    const branchesData = response.data.result;

    // Ensure branchesData is an array before proceeding
    if (!Array.isArray(branchesData)) {
      throw new Error('Invalid data structure. Expected an array of branches.');
    }

    // Save each branch to MongoDB
    for (const branchData of branchesData) {
      const branch = new Branch({
        br_id: branchData.br_id,
        num: branchData.num,
        num_showcase: branchData.num_showcase,
        type_id: branchData.type_id,
        city_id: branchData.city_id,
        lng: branchData.lng,
        lat: branchData.lat,
        parcel_max_kg: branchData.parcel_max_kg,
        type_public: branchData.type_public,
        city: branchData.city,
        // Add other properties as needed
      });

      await branch.save();
    }

    console.log('Data successfully fetched and saved to MongoDB');
    res.send('Data fetched and saved to MongoDB');
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    res.status(500).send('Error fetching or saving data');
  }
});
