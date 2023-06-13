require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//routers
const publicRouter = require('./routes/public.routes');

app.use('/api/v1', publicRouter);

// const attachUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: 'Authentication invalid' });
//   }
//   const decodedToken = jwtDecode(token);

//   if (!decodedToken) {
//     return res.status(401).json({
//       message: 'There was a problem authorizing the request',
//     });
//   } else {
//     req.user = decodedToken;
//     next();
//   }
// };

// app.use(attachUser);

// const requireAuth = jwt({
//   secret: process.env.JWT_SECRET,
//   audience: 'api.orbit',
//   issuer: 'api.orbit',
//   getToken: (req) => req.cookies.token,
// });

// app.use(csrfProtection);

// app.get('/api/v1/csrf-token', (req, res) => {
//   return res.json({ csrfToken: req.csrfToken(), token: req.cookies.token });
// });

// const requireAdmin = (req, res, next) => {
//   const { role } = req.user;
//   if (role !== 'admin') {
//     return res.status(401).json({ message: 'Insufficient role' });
//   }
//   next();
// };
//
// app.get('/api/v1/dashboard-data', requireAuth, (req, res) =>
//   res.json(dashboardData)
// );

// app.patch('/api/v1/user-role', async (req, res) => {
//   try {
//     const { role } = req.body;
//     const allowedRoles = ['user', 'admin'];

//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({ message: 'Role not allowed' });
//     }
//     await User.findOneAndUpdate({ _id: req.user.sub }, { role });
//     res.json({
//       message: 'User role updated.',
//     });
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// });

// app.get('/api/v1/inventory', requireAuth, requireAdmin, async (req, res) => {
//   try {
//     const user = req.user.sub;
//     const inventoryItems = await InventoryItem.find({
//       user,
//     });
//     res.json(inventoryItems);
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// });

// app.post('/api/v1/inventory', requireAuth, requireAdmin, async (req, res) => {
//   try {
//     const userId = req.user.sub;
//     const input = Object.assign({}, req.body, {
//       user: userId,
//     });
//     const inventoryItem = new InventoryItem(input);
//     await inventoryItem.save();
//     res.status(201).json({
//       message: 'Inventory item created!',
//       inventoryItem,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       message: 'There was a problem creating the item',
//     });
//   }
// });

// app.delete(
//   '/api/v1/inventory/:id',
//   requireAuth,
//   requireAdmin,
//   async (req, res) => {
//     try {
//       const deletedItem = await InventoryItem.findOneAndDelete({
//         _id: req.params.id,
//         user: req.user.sub,
//       });
//       res.status(201).json({
//         message: 'Inventory item deleted!',
//         deletedItem,
//       });
//     } catch (err) {
//       return res.status(400).json({
//         message: 'There was a problem deleting the item.',
//       });
//     }
//   }
// );

// app.get('/api/v1/users', requireAuth, async (req, res) => {
//   try {
//     const users = await User.find()
//       .lean()
//       .select('_id firstName lastName avatar email');

//     res.json({
//       users,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       message: 'There was a problem getting the users',
//     });
//   }
// });

// app.get('/api/v1/bio', requireAuth, async (req, res) => {
//   try {
//     const { sub } = req.user;
//     const user = await User.findOne({
//       _id: sub,
//     })
//       .lean()
//       .select('bio');

//     res.json({
//       bio: user.bio,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       message: 'There was a problem updating your bio',
//     });
//   }
// });

// app.patch('/api/v1/bio', requireAuth, async (req, res) => {
//   try {
//     const { sub } = req.user;
//     const { bio } = req.body;
//     const updatedUser = await User.findOneAndUpdate(
//       {
//         _id: sub,
//       },
//       {
//         bio,
//       },
//       {
//         new: true,
//       }
//     );

//     res.json({
//       message: 'Bio updated!',
//       bio: updatedUser.bio,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       message: 'There was a problem updating your bio',
//     });
//   }
// });

async function connect() {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log('Mongoose error', err);
  }
  app.listen(3001);
  console.log('API listening on localhost:3001');
}

connect();
