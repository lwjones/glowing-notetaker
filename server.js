const fs = require('fs');
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
// TODO: Require html routes

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);
// TODO: Use html routes

app.listen(PORT, () => {
  console.log(`  Server listening on port ${PORT}`);
});
