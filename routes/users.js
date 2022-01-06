const express = require('express');
const userRouter = express.Router();
const { v4: uuidv4 } = require('uuid');

/**
 * @openapi
 * tags:
 *  - name: users
 *    description: Perform CRUD operations on user profiles
 */

let users = [
  { id: uuidv4(), firstName: 'Richard', lastName: 'Carrigan' },
  { id: uuidv4(), firstName: 'John', lastName: 'Doe' },
  { id: uuidv4(), firstName: 'Jane', lastName: 'Doe' }
];

/**
 * @openapi
 * /users:
 *  get:
 *    summary: Get a list of users
 *    tags:
 *      - users
 *    responses:
 *      '200':
 *        description: A JSON array of user names
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 */
userRouter.get('/', (req, res) => {
  res.json(users);
});

/**
 * @openapi
 * /users:
 *  post:
 *    summary: Create a new user
 *    tags:
 *      - users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      '201':
 *        description: The new user object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *      '400':
 *        description: First name and last name are required. Please try again
 */
userRouter.post('/', (req, res) => {
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

/**
 * @openapi
 * /users/{id}:
 *  put:
 *    summary: Update a specific user
 *    tags:
 *      - users
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      '200':
 *        description: User id {id} updated
 *      '400':
 *        description: User id {id} not found. Please try again || First name and last name are required. Please try again
 */
userRouter.put('/:id', (req, res) => {
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

/**
 * @openapi
 * /users/{id}:
 *  delete:
 *    summary: Delete a specific user
 *    tags:
 *      - users
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: User id {id} deleted
 *      '400':
 *        description: User id {id} not found. Please try again
 */
userRouter.delete('/:id', (req, res) => {
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

module.exports = userRouter;
