const router = express.Router();
const express = require(`express`);

router.get(`/`),
  (req, res) => {
    res.json({ success: true });
  };

module.exports = router;
