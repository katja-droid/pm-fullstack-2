const router = require("express").Router();

router.get("/user", (req, res) => {
    try {
      console.log("Test route accessed");
      res.send("User, this is a test route!");
    } catch (error) {
      console.error("Error in route handler:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  router.post("/userposttest", (req, res) =>{
    const username = req.body.username;
    console.log(username);
    res.send("ahahah")
  })

  module.exports = router;