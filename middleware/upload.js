const path = require("path");
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = {
    store: multer({ storage: storage, fileFilter: fileFilter }),
    posixfmt: (pathstring) => {
        // And heck, you don't even need to put it in a function unless
        // you need this conversion all over the place in your code.
        return pathstring.split(path.sep).join(path.posix.sep);
    }
}

module.exports = upload;