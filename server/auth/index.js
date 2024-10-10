const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

//Login using Github
router.get("/github", (req, res) => {
  const redirect_url = "http://localhost:3000/auth/github/callback";
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_Client_ID}&redirect_uri=${redirect_url}&scope=user:email`;
  res.redirect(githubAuthURL);
});

//Callback route
router.get("/github/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_Client_ID,
          client_secret: process.env.GITHUB_Client_Secret,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    //     // Get user info using access token - step 2
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();
    console.log(userData.login);
    let user = await prisma.instructor.findUnique({
      where: {
        username: userData.login,
      },
    });
    if (!user) {
      user = await prisma.instructor.create({
        data: {
          username: userData.login,
          password: ''
        },
      });
    }
    console.log(user);
    // // Redirect back to frontend with the user ID
    //const token = jwt.sign({id:user.id}, process.env.JWT);
    res.redirect(`http://localhost:5173?user_id=${userData.id}`);
    //     // console.log(response);
  } catch (err) {
    console.log(err);
  }
});

// Register a new instructor account (Works with Prisma)
router.post("/register", async (req, res, next) => {
  try {
    const instructor = await prisma.instructor.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });

    /*
    const {
      rows: [instructor],
    } = await db.query(
      "INSERT INTO instructor (username, password) VALUES ($1, $2) RETURNING *",
      [req.body.username, req.body.password]
    );

*/

    // Create a token with the instructor id
    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// Login to an existing instructor account Works with Prisma
router.post("/login", async (req, res, next) => {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });

    /*
    const {
      rows: [instructor],
    } = await db.query(
      "SELECT * FROM instructor WHERE username = $1 AND password = $2",
      [req.body.username, req.body.password]
    );

    if (!instructor) {
      return res.status(401).send("Invalid login credentials.");
    }

    */
    // Create a token with the instructor id

    if (!instructor) {
      return res.status(401).send("Invalid login credentials.");
    }

    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in instructor (Works with Prisma)
router.get("/me", async (req, res, next) => {
  try {
    if(!req.user){
      return
    }
    const instructor = await prisma.instructor.findUnique({
      where: {
        id: req.user?.id,
      },
    });
    res.send(instructor);

    /*
    const {
      rows: [instructor],
    } = await db.query("SELECT * FROM instructor WHERE id = $1", [
      req.user?.id,
    ]);

    res.send(instructor);
    */
  } catch (error) {
    next(error);
  }
});

module.exports = router;
