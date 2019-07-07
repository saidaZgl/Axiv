var express = require("express");
var router = express.Router();

function G(x, y, z) {
  if (z == "N") {
    return [x, y, "W"];
  } else if (z == "W") {
    return [x, y, "S"];
  } else if (z == "S") {
    return [x, y, "E"];
  } else if (z == "E") {
    return [x, y, "N"];
  }
}
function D(x, y, z) {
  if (z == "N") {
    return [x, y, "E"];
  } else if (z == "E") {
    return [x, y, "S"];
  } else if (z == "S") {
    return [x, y, "W"];
  } else if (z == "W") {
    return [x, y, "N"];
  }
}
function A(x, y, z) {
  if (z == "N" && x <= 5 && y < 5) {
    return [x, (y += 1), "N"];
  } else if (z == "E" && x < 5 && y <= 5) {
    return [(x += 1), y, "E"];
  } else if (z == "S" && x <= 5 && y <= 5 && y > 0) {
    return [x, (y -= 1), "S"];
  } else if (z == "W" && x <= 5 && x > 0 && y <= 5) {
    return [(x -= 1), y, "W"];
  } else {
    return [x, y, z];
  }
}

router.get("/", function(req, res, next) {
  res.render("index", { title: "HELLO" });
});
/* GET home page. */
router.post("/position", function(req, res, next) {
  var positionIni = [Number(req.body.x), Number(req.body.y), req.body.z];
  var position = positionIni;
  console.log("GOTIT", position);
  var instruction = req.body.instruction;
  console.log("YYYYYYYYYY--------->", req.body.instruction);
  var mouvement = instruction.split("");
  console.log("PPPPPPPP$$$$$$$$$$$", mouvement);
  for (let i = 0; i < mouvement.length; i++) {
    const move = mouvement[i];
    console.log("MOVE*************", move);
    if (move == "G") {
      position = G(position[0], position[1], position[2]);
    } else if (move == "A") {
      position = A(position[0], position[1], position[2]);
    } else if (move == "D") {
      position = D(position[0], position[1], position[2]);
    }
    console.log(position);
  }

  res.render("index", { title: position });
});

module.exports = router;
