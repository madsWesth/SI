import { Router } from 'express';
const router = Router();

const users = [
    {id: 1, name: "John Doe"},
    {id: 2, name: "Jane Doe"},
]

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get all users.
 *     responses:
 *       200:
 *         description: Returns all users.
 */
router.get('/api/users', (req, res) => {
    res.send({data: users});
})

/**
 * @openapi
 * /api/users:
 *   post:
 *     description: Create a new user.
 *     content:
 *       application/json:
 *     responses:
 *       200:
 *         description: Returns the created user.
 */
router.post('/api/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send({data: user});
})

export default router;