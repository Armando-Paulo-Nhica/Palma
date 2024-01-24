const express = require('express');
const { PrismaClient } = require('./generated/client');

const prisma = new PrismaClient();
const app = express();

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
