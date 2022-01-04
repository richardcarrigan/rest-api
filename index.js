import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

let users = [
  { id: uuidv4(), firstName: 'Richard', lastName: 'Carrigan' },
  { id: uuidv4(), firstName: 'John', lastName: 'Doe' },
  { id: uuidv4(), firstName: 'Jane', lastName: 'Doe' }
];

// Get a list of all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Create a new user
app.post('/api/users', (req, res) => {
  if (req.body.firstName && req.body.lastName) {
    const { firstName, lastName } = req.body;
    const id = uuidv4();

    const newUser = { id, firstName, lastName };

    users = [...users, newUser];

    res.status(201).json(newUser);
  } else {
    res
      .status(400)
      .send('First name and last name are required. Please try again');
  }
});

// Update a specific user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;

  if (req.body.firstName && req.body.lastName) {
    let isFound = false;
    const { firstName, lastName } = req.body;

    users = users.map(user => {
      if (user.id === req.params.id) {
        isFound = !isFound;
        return { ...user, firstName, lastName };
      } else {
        return user;
      }
    });

    if (isFound) {
      res.status(200).send(`User id ${id} updated`);
    } else {
      res.status(400).send(`User id ${id} not found. Please try again`);
    }
  } else {
    res
      .status(400)
      .send('First name and last name are required. Please try again');
  }
});

// Delete a specific user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  let isFound = false;

  users = users.filter(user => {
    if (user.id === id) {
      isFound = true;
    }
    return user.id !== id;
  });

  if (isFound) {
    res.status(200).send(`User id ${id} deleted`);
  } else {
    res.status(400).send(`User id ${id} not found. Please try again`);
  }
});

app.get('*', (req, res) => {
  res.send('Connected');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
