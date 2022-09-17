import asteroids from "./asteroids";

// Basic geometry stuff

type Point = { x: number; y: number };

type Triangle = [Point, Point, Point];

type Circle = { center: Point; radius: number };

type Line = { norm: Point; dist: number };

const linePointDistance = (line: Line, point: Point) => {
  return line.norm.x * point.x + line.norm.y * point.y - line.dist;
};

const normalize = (point: Point) => {
  const length = Math.sqrt(point.x * point.x + point.y * point.y);
  return { x: point.x / length, y: point.y / length };
};

const pointsToLine = (p1: Point, p2: Point) => {
  const norm = normalize({ x: p2.y - p1.y, y: p1.x - p2.x });
  const dist = norm.x * p1.x + norm.y * p1.y;
  return { norm, dist };
};

const linesFromTriangle = (triangle: Triangle) => {
  const [p1, p2, p3] = triangle;
  return [pointsToLine(p1, p2), pointsToLine(p2, p3), pointsToLine(p3, p1)];
};

const isPointInTriangle = (triangle: Triangle, point: Point) => {
  const lines = linesFromTriangle(triangle);
  const side1 = linePointDistance(lines[0], point);
  const side2 = linePointDistance(lines[1], point);
  const side3 = linePointDistance(lines[2], point);
  return side1 >= 0 && side2 >= 0 && side3 >= 0;
};

const isPointInCircle = (circle: Circle, point: Point) => {
  const dx = circle.center.x - point.x;
  const dy = circle.center.y - point.y;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
};

const isTriangleVertexInCircle = (triangle: Triangle, circle: Circle) => {
  return triangle.some((vertex) => isPointInCircle(circle, vertex));
};

const isLineIntersectingCircle = (line: Line, circle: Circle) => {
  const dist = linePointDistance(line, circle.center);
  return dist * dist <= circle.radius * circle.radius;
};

const perpendicularLine = (line: Line, point: Point) => {
  const norm = normalize({ x: -line.norm.y, y: line.norm.x });
  const dist = norm.x * point.x + norm.y * point.y;
  return { norm, dist };
};

const perpendicularLinesForTriangle = (triangle: Triangle) => {
  const lines = linesFromTriangle(triangle);
  const [p1, p2, p3] = triangle;
  return [
    perpendicularLine(lines[0], p1),
    perpendicularLine(lines[0], p2),
    perpendicularLine(lines[1], p2),
    perpendicularLine(lines[1], p3),
    perpendicularLine(lines[2], p3),
    perpendicularLine(lines[2], p1),
  ];
};

const isPointBetweenLines = (point: Point, line1: Line, line2: Line) => {
  const dist1 = linePointDistance(line1, point);
  const dist2 = linePointDistance(line2, point);
  return dist1 * dist2 <= 0;
};

const doesTriangleEdgeIntersectCircle = (triangle: Triangle, circle: Circle) => {
  const perps = perpendicularLinesForTriangle(triangle);
  const lines = linesFromTriangle(triangle);
  for (let i = 0; i < 3; i++) {
    if (isLineIntersectingCircle(lines[i], circle)) {
      if (isPointBetweenLines(circle.center, perps[i * 2], perps[i * 2 + 1])) {
        return true;
      }
    }
  }
  return false;
};

// This is slow, I should probably optimize to remove recalculating the lines
const isCircleIntersectingOrInsideTriangle = (triangle: Triangle, circle: Circle) => {
  return isTriangleVertexInCircle(triangle, circle) || doesTriangleEdgeIntersectCircle(triangle, circle) || isPointInTriangle(triangle, circle.center);
};

// drawing code for the basic geometry stuff

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const setupCanvas = () => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawTriangle = (triangle: Triangle) => {
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(triangle[0].x, triangle[0].y);
  ctx.lineTo(triangle[1].x, triangle[1].y);
  ctx.lineTo(triangle[2].x, triangle[2].y);
  ctx.closePath();
  ctx.stroke();
};

const drawPoint = (point: Point) => {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
  ctx.fill();
};

const drawCircle = (circle: Circle) => {
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
  ctx.stroke();
};

const drawLine = (line: Line) => {
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, line.dist / line.norm.y);
  ctx.lineTo(canvas.width, (line.dist - canvas.width * line.norm.x) / line.norm.y);
  ctx.stroke();
};

const clearCanvas = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// I forgot that asteroids is on a torus and I made the above math for affine space

enum Boundaries {
  Top,
  Right,
  Bottom,
  Left,
}

const nearBoundary = (point: Point, canvasSize: Point) => {
  const { x, y } = point;
  const { x: width, y: height } = canvasSize;
  const nearTop = y < 50;
  const nearRight = x > width - 50;
  const nearBottom = y > height - 50;
  const nearLeft = x < 50;
  const bounds: Boundaries[] = [];
  if (nearTop) bounds.push(Boundaries.Top);
  if (nearRight) bounds.push(Boundaries.Right);
  if (nearBottom) bounds.push(Boundaries.Bottom);
  if (nearLeft) bounds.push(Boundaries.Left);
  return bounds;
};

const pointEquivalence = (point: Point, canvasSize: Point) => {
  const near = nearBoundary(point, canvasSize);
  const { x, y } = point;
  if (near.length === 1) {
    const [boundary] = near;
    switch (boundary) {
      case Boundaries.Top:
        return [{ x, y: y + canvasSize.y }];
      case Boundaries.Right:
        return [{ x: x - canvasSize.x, y }];
      case Boundaries.Bottom:
        return [{ x, y: y - canvasSize.y }];
      case Boundaries.Left:
        return [{ x: x + canvasSize.x, y }];
    }
  }
  if (near.length === 2) {
    const [boundary1, boundary2] = near;
    if (boundary1 === Boundaries.Top && boundary2 === Boundaries.Right) {
      return [
        { x, y: y + canvasSize.y },
        { x: x - canvasSize.x, y },
        { x: x - canvasSize.x, y: y + canvasSize.y },
      ];
    }
    if (boundary1 === Boundaries.Right && boundary2 === Boundaries.Bottom) {
      return [
        { x: x - canvasSize.x, y },
        { x, y: y - canvasSize.y },
        { x: x - canvasSize.x, y: y - canvasSize.y },
      ];
    }
    if (boundary1 === Boundaries.Bottom && boundary2 === Boundaries.Left) {
      return [
        { x, y: y - canvasSize.y },
        { x: x + canvasSize.x, y },
        { x: x + canvasSize.x, y: y - canvasSize.y },
      ];
    }
    if (boundary1 === Boundaries.Top && boundary2 === Boundaries.Left) {
      return [
        { x: x + canvasSize.x, y },
        { x, y: y + canvasSize.y },
        { x: x + canvasSize.x, y: y + canvasSize.y },
      ];
    }
  }
  if (near.length > 3) {
    console.assert(false, "shouldn't be possible");
  }
  return [];
};

const toroidalDistance = (point1: Point, point2: Point, canvasSize: Point) => {
  const { x: width, y: height } = canvasSize;
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  const dx = Math.min(Math.abs(x1 - x2), Math.abs(x1 - x2 + width), Math.abs(x1 - x2 - width));
  const dy = Math.min(Math.abs(y1 - y2), Math.abs(y1 - y2 + height), Math.abs(y1 - y2 - height));
  return Math.sqrt(dx * dx + dy * dy);
};

// The actual game

type Entity = { heading: Point; position: Point; speed: number };

type Ship = Entity & { framesSinceFired: number };

type Asteroid = Entity & { radius: number };

type Bullet = Entity & { lifetime: number };

type GameState = {
  ship: Ship;
  asteroids: Asteroid[];
  bullets: Bullet[];
  score: number;
  alive: boolean;
};

const repositionedEntity = (entity: Entity, position: Point) => {
  const copy = { ...entity };
  copy.position = position;
  return copy as Entity;
};

const allEquivalences = (entity: Entity, canvasSize: Point) => {
  const { position } = entity;
  const equivalences = pointEquivalence(position, canvasSize);
  const ret: Entity[] = equivalences.map((equivalence) => repositionedEntity(entity, equivalence));
  ret.push(entity);
  return ret;
};

const initialState = () => {
  return {
    ship: {
      heading: { x: 0, y: -1 },
      position: { x: canvas.width / 2, y: canvas.height / 2 },
      speed: 0,
      framesSinceFired: Infinity,
    },
    asteroids: [],
    bullets: [],
    score: 0,
    alive: true,
  } as GameState;
};

const shipTriangle = (ship: Entity) => {
  const triangle = [
    {
      x: ship.position.x + ship.heading.x * 10,
      y: ship.position.y + ship.heading.y * 10,
    },
    {
      x: ship.position.x + ship.heading.y * 5 - ship.heading.x * 5,
      y: ship.position.y - ship.heading.x * 5 - ship.heading.y * 5,
    },
    {
      x: ship.position.x - ship.heading.y * 5 - ship.heading.x * 5,
      y: ship.position.y + ship.heading.x * 5 - ship.heading.y * 5,
    },
  ];
  return triangle as Triangle;
};

const moveEntity = (entity: Entity) => {
  entity.position.x += entity.heading.x * entity.speed;
  entity.position.y += entity.heading.y * entity.speed;
};

const turnEntity = (entity: Entity, angle: number) => {
  const { x, y } = entity.heading;
  entity.heading.x = x * Math.cos(angle) - y * Math.sin(angle);
  entity.heading.y = x * Math.sin(angle) + y * Math.cos(angle);
};

const accelerateEntity = (entity: Entity, amount: number) => {
  entity.speed += amount;
};

const decelerateEntity = (entity: Entity, amount: number) => {
  entity.speed -= amount;
  if (entity.speed < 0) {
    entity.speed = 0;
  }
};

const fireBullet = (gameState: GameState) => {
  const { ship } = gameState;
  const bullet = {
    heading: { ...ship.heading },
    position: { ...ship.position },
    speed: ship.speed + 5,
    lifetime: 0,
  };
  gameState.bullets.push(bullet);
};

type InputState = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  space: boolean;
};

const positiveModulo = (x: number, n: number) => {
  return ((x % n) + n) % n;
};

// A bit discombobulated, but whatever
const updateGameState = (gameState: GameState, inputs: InputState) => {
  const { ship, asteroids, bullets } = gameState;

  // update ship
  if (inputs.left) {
    turnEntity(ship, -0.1);
  }
  if (inputs.right) {
    turnEntity(ship, 0.1);
  }
  if (inputs.up) {
    accelerateEntity(ship, 0.1);
  }
  if (inputs.down) {
    decelerateEntity(ship, 0.1);
  }
  if (inputs.space) {
    if (ship.framesSinceFired > 10) {
      fireBullet(gameState);
      ship.framesSinceFired = 0;
    }
  }

  moveEntity(ship);
  ship.framesSinceFired++;

  asteroids.forEach((asteroid) => moveEntity(asteroid));
  bullets.forEach((bullet) => moveEntity(bullet));
  bullets.forEach((bullet) => bullet.lifetime++);
  // check for collisions
  const newAsteroids = [];
  asteroids.forEach((asteroid) => {
    let xOffset = 0;
    let yOffset = 0;
    const near = nearBoundary(asteroid.position, { x: canvas.width, y: canvas.height });
    if (near.includes(Boundaries.Top) || near.includes(Boundaries.Bottom)) {
      yOffset = canvas.height / 2;
    }
    if (near.includes(Boundaries.Left) || near.includes(Boundaries.Right)) {
      xOffset = canvas.width / 2;
    }
    const tri = shipTriangle(ship).map(({ x, y }) => ({ x: positiveModulo((x + xOffset), canvas.width), y: positiveModulo((y + yOffset), canvas.height) })) as Triangle;
    if (
      toroidalDistance(asteroid.position, ship.position, { x: canvas.width, y: canvas.height }) < 100 &&
      isCircleIntersectingOrInsideTriangle(tri, {
        center: { x: positiveModulo((asteroid.position.x + xOffset), canvas.width), y: positiveModulo((asteroid.position.y + yOffset), canvas.height) },
        radius: asteroid.radius,
      })
    ) {
      gameState.alive = false;
    }
    bullets.forEach((bullet) => {
      if (
        asteroid.radius > 0 &&
        bullet.lifetime < 100 &&
        toroidalDistance(asteroid.position, bullet.position, { x: canvas.width, y: canvas.height }) < asteroid.radius
      ) {
        gameState.score++;
        const radius = asteroid.radius - 5;
        const heading = { x: asteroid.heading.x + bullet.heading.x * 4 / radius, y: asteroid.heading.y + bullet.heading.y * 4 / radius }
        if (radius > 0) {
          const a = {
            heading: { ...heading },
            position: { x: asteroid.position.x, y: asteroid.position.y },
            speed: asteroid.speed,
            radius,
          };
          turnEntity(a, 5.1);
          asteroids.push(a);
          const b = {
            heading,
            position: { x: asteroid.position.x, y: asteroid.position.y },
            speed: asteroid.speed,
            radius,
          };
          turnEntity(b, -5.1);
          asteroids.push(b);
        }
        asteroid.radius = 0;
        bullet.lifetime = 100;
      }
    });
  });
  gameState.bullets = gameState.bullets.filter((bullet) => bullet.lifetime < 100);
  // remove asteroids that have been destroyed
  gameState.asteroids = gameState.asteroids.filter((asteroid) => asteroid.radius > 0);
  // wrap everything
  gameState.ship.position.x = positiveModulo(gameState.ship.position.x, canvas.width);
  gameState.ship.position.y = positiveModulo(gameState.ship.position.y, canvas.height);
  gameState.asteroids.forEach((asteroid) => {
    asteroid.position.x = positiveModulo(asteroid.position.x, canvas.width);
    asteroid.position.y = positiveModulo(asteroid.position.y, canvas.height);
  });
  gameState.bullets.forEach((bullet) => {
    bullet.position.x = positiveModulo(bullet.position.x, canvas.width);
    bullet.position.y = positiveModulo(bullet.position.y, canvas.height);
  });
};

const drawEverything = (gameState: GameState) => {
  clearCanvas();
  const { ship, asteroids, bullets } = gameState;
  for (const shipInstance of allEquivalences(ship, { x: canvas.width, y: canvas.height })) {
    drawTriangle(shipTriangle(shipInstance));
  }

  gameState.asteroids.forEach((asteroid) => {
    for (const asteroidInstance of allEquivalences(asteroid, { x: canvas.width, y: canvas.height })) {
      drawCircle({ center: asteroidInstance.position, radius: asteroid.radius });
    }
  });
  gameState.bullets.forEach((bullet) => {
    for (const bulletInstance of allEquivalences(bullet, { x: canvas.width, y: canvas.height })) {
      drawPoint(bulletInstance.position);
    }
  });
};

// temporary test code

const tester = () => {
  setupCanvas();

  const state = initialState();

  // We load the asteroids the same every time for now
  state.asteroids = asteroids;

  const inputs: InputState = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
  };

  document.onkeydown = (e) => {
    if (e.key === "ArrowLeft") {
      inputs.left = true;
    }
    if (e.key === "ArrowRight") {
      inputs.right = true;
    }
    if (e.key === "ArrowUp") {
      inputs.up = true;
    }
    if (e.key === "ArrowDown") {
      inputs.down = true;
    }
    if (e.key === " ") {
      inputs.space = true;
    }
  };

  document.onkeyup = (e) => {
    if (e.key === "ArrowLeft") {
      inputs.left = false;
    }
    if (e.key === "ArrowRight") {
      inputs.right = false;
    }
    if (e.key === "ArrowUp") {
      inputs.up = false;
    }
    if (e.key === "ArrowDown") {
      inputs.down = false;
    }
    if (e.key === " ") {
      inputs.space = false;
    }
  };

  const loop = () => {
    updateGameState(state, inputs);
    if (!state.alive) {
      console.log("You died!");
      return;
    }
    drawEverything(state);
    requestAnimationFrame(loop);
  };

  loop();
};

export { tester };
