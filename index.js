// import Platform from './img/platform.JPG'

// console.log(platform)
const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

let platformImg = new Image();
platformImg.src = "./img/platform.JPG";

let rabbitImg = new Image();
rabbitImg.src = "./img/토끼.JPG";

let doorImg = new Image();
doorImg.src = "./img/문.JPG";

let floorImg = new Image();
floorImg.src = "./img/floor.JPG";

let backImg = new Image();
backImg.src = "/img/backImg.JPG";

let backIm = new Image();
backIm.src = "/img/backImg.JPG";

let victoryImg = new Image();
victoryImg.src = "/img/victory.jpg";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var done = false;
const gravity = 1.5;
// let jumpCount = 0
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 40;
    this.height = 40;
  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x , this.position.y,
    //     this.width, this.height)
    c.drawImage(
      rabbitImg,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.velocity.y + this.height <=
      canvas.height - 150
    ) {
      //캐릭터랑 바닥위치 조정
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
      // jumpCount =0
    }
  }
}

class Victory {
  constructor() {
    this.position = {
      x: canvas.width * 0.2 - 800,
      y: canvas.height * 0.2,
    };
    this.width = canvas.width * 0.2;
    this.height = canvas.height * 0.6;
  }
  draw() {
    c.drawImage(
      victoryImg,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Platform {
  constructor({ x, y }) {
    this.position = {
      x, // x: x,
      y, // y:y
    };

    this.width = 400;
    this.height = 40;
  }
  draw() {
    // c.fillStyle = 'green'
    // c.fillRect(this.position.x, this.position.y,
    //     this.width, this.height)
    c.drawImage(
      platformImg,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class Door {
  constructor() {
    this.position = {
      x: 1600,
      y: 400 - 220,
    };
    this.width = 100;
    this.height = 220;
  }

  draw() {
    c.drawImage(
      doorImg,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Floor {
  constructor() {
    this.position = {
      x: 0,
      y: canvas.height - 150,
    };
    this.width = canvas.width;
    this.height = 150;
  }

  draw() {
    // c.fillStyle = "red"
    // c.fillRect(this.position.x,this.position.y,
    //     this.width,this.height)

    c.drawImage(
      floorImg,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Back {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.width = canvas.width;
    this.height = canvas.height;
  }

  draw() {
    c.drawImage(
      backIm,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
var xdirec = false;
var ydirec = false;

var platformLeftBoundary = 300;
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  back.draw();
  floor.draw();
  door.draw();

  player.update();

  platforms.forEach((platform) => {
    platform.draw();
  });
  console.log(platformLeftBoundary);

  if (xdirec == false) {
    platforms[1].position.x += 6;
    if (platforms[1].position.x == platformLeftBoundary + 300) xdirec = true;
  }
  if (xdirec == true) {
    platforms[1].position.x -= 6;
    if (platforms[1].position.x == platformLeftBoundary) xdirec = false;
  }
  if (ydirec == false) {
    platforms[2].position.y += 2;
    if (platforms[2].position.y == 500) ydirec = true;
  }
  if (ydirec == true) {
    platforms[2].position.y -= 2;
    if (platforms[2].position.y == 100) ydirec = false;
  }

  if (done == false) {
    if (keys.right.pressed && player.position.x < 400) {
      player.velocity.x = 5;
    } else if (keys.left.pressed && player.position.x > 100) {
      player.velocity.x = -5;
    } else {
      player.velocity.x = 0;

      if (keys.right.pressed) {
        platforms.forEach((platform) => {
          platform.position.x -= 5;
        });
        platformLeftBoundary -= 5;
        door.position.x -= 5;
      } else if (keys.left.pressed) {
        platforms.forEach((platform) => {
          platform.position.x += 5;
        });
        platformLeftBoundary += 5;
        door.position.x += 5;
      }
    }
  }

  //platform 위에 올라서기
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  //platform 바닥 못 넘기
  platforms.forEach((platform) => {
    if (
      player.position.y >= platform.position.y &&
      player.position.y <= platform.position.y + platform.height &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.position.y = platform.position.y + platform.height;
      player.velocity.y = 2;
    }
  });

  if (
    door.position.x <= player.position.x &&
    door.position.x + door.width >= player.position.x + player.width &&
    door.position.y + door.height / 2 <= player.position.y + player.height &&
    door.position.y + door.height >= player.position.y + player.height
  ) {
    done = true;
    if (victory.position.x < canvas.width * 0.2) {
      victory.position.x += 100;
      victory.draw();
    } else victory.draw();
  }
}

const player = new Player();
const platforms = [
  new Platform({ x: 200, y: 300 }),
  new Platform({ x: 300, y: 700 }),
  new Platform({ x: 800, y: 200 }),
  new Platform({ x: 1300, y: 400 }),
];
// const platform = new Platform()
const door = new Door();
const floor = new Floor();
const back = new Back();
const victory = new Victory();
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

animate();

addEventListener("keydown", ({ code }) => {
  // console.log(code)
  switch (code) {
    case "ArrowLeft":
      console.log("left");
      keys.left.pressed = true;
      break;
    case "ArrowUp":
      console.log("up");
      if (done == false) player.velocity.y -= 20;
      break;
    case "ArrowRight":
      console.log("right");
      keys.right.pressed = true;
      break;
    case "ArrowDown":
      console.log("down");
      break;
  }
  // console.log(keys.right.pressed)
});

addEventListener("keyup", ({ code }) => {
  switch (code) {
    case "ArrowLeft":
      console.log("left up");
      keys.left.pressed = false;
      break;
    case "ArrowUp":
      console.log("up up");
      break;
    case "ArrowRight":
      console.log("right up");
      keys.right.pressed = false;
      break;
    case "ArrowDown":
      console.log("down  up");
      break;
  }
  // console.log(keys.right.pressed)
});
