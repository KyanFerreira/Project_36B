// An instructor can only access their own students' data.
const router = require("express").Router();
const db = require("../db");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Deny access if user is not logged in

router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

// Get all students Works with Prisma
router.get("/", async (req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    console.log(students);
    res.send(students);
  } catch (error) {
    next(error);
  }
});

// Get a student by id (/api/students/:id) Works with Prisma Need User ID stuff
router.get("/:id", async (req, res, next) => {
  try {

    const student = await prisma.student.findUnique({
      where: {
        id: Number(req.params.id)/*,
        instructorId: req.body.instructorId
        */
      },
    })

    res.send(student);

/*
    const {
      rows: [student],
    } = await db.query(
      "SELECT * FROM student WHERE id = $1 AND instructorId = $2",
      [req.params.id, req.user.id]
    );

    if (!student) {
      return res.status(404).send("Student not found.");
    }

    res.send(student);
    */
  } catch (error) {
    next(error);
  }
});

// Create a new student Works with Prisma

router.post("/", async (req, res, next) => {
  try {
    /*
    const {
      rows: [student],
    } = await db.query(
      "INSERT INTO student (name, cohort, instructorId) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.cohort, req.user.id]
    );
    
  */
    const student = await prisma.student.create({
      data: {
        name: req.body.name,
        cohort: req.body.cohort,
        instructorId: req.user.id,
        password: "Test"
      },
    })
    res.status(201).send(student);
  } catch (error) {
    next(error);
  }
});

// Update a student Works with Prisma
router.put("/:id", async (req, res, next) => {
  try {
    
    
    const updateStudent = await prisma.student.update({
      where: {
        id: Number(req.params.id),
        instructorId: req.body.instructorId
      },
      data: {
        name: req.body.name,
        cohort: req.body.cohort
      },
    })
    res.status(201).send(updateStudent);
    
    
    /*
    const {
      rows: [student],
    } = await db.query(
      "UPDATE student SET name = $1, cohort = $2 WHERE id = $3 AND instructorId = $4 RETURNING *",
      [req.body.name, req.body.cohort, req.params.id, req.user.id]
    );

    if (!student) {
      return res.status(404).send("Student not found.");
    }
      res.send(student);
*/
    
  } catch (error) {
    next(error);
  }
});

// Delete a student by id works with Prisma
router.delete("/:id", async (req, res, next) => {
  try {
    

    const deleteStudent = await prisma.student.delete({
      where: {
        id: Number(req.params.id)
      },
    })
    
    res.send('Delete Successful');

    /*
    const {
      rows: [student],
    } = await db.query(
      "DELETE FROM student WHERE id = $1 AND instructorId = $2 RETURNING *",
      [req.params.id, req.user.id]
    );

    if (!student) {
      return res.status(404).send("Student not found.");
    }
*/
    res.send(student);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
