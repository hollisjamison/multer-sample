const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    res.redirect("/");
  } else {
    res.status(400).send("File upload failed!");
  }
});

app.get("/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) {
      res.status(500).send("Error reading files");
    } else {
      res.json(files);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
