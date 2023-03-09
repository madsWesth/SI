import { Router } from "express";
const router = Router();

const spacecrafts = [
    { id: 1, name: "Voyager 1" },
    { id: 2, name: "Voyager 2" },
];

/**
 * @openapi
 * /api/spacecrafts:
 *  get:
 *    description: Get all spacecrafts.
 *    responses:
 *     200:
 *      description: Returns all spacecrafts.
 */
router.get("/api/spacecrafts", (req, res) => {
    res.send({ data: spacecrafts });
});

/**
 * @openapi
 * /api/spacecrafts/{id}:
 *   get:
 *     description: Get a spacecraft.
 *     responses:
 *       200:
 *         description: Returns a spacecraft.
 *     parameters:
 *       id: ID of the spacecraft.
 */
router.get("/api/spacecrafts/:id", (req, res) => {
    const spacecraft = spacecrafts.find((spacecraft) => spacecraft.id === parseInt(req.params.id));
    res.send({ data: spacecraft });
});

/**
 * @openapi
 * /api/spacecrafts:
 *   post:
 *     description: Create a new spacecraft.
 *     responses:
 *       200:
 *         description: Returns the created spacecraft.
 */
router.post("/api/spacecrafts", (req, res) => {    
    const spacecraft = req.body;
    spacecrafts.push(spacecraft);
    res.send({ data: spacecraft });
});

export default router;