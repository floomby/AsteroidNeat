var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require(['index']);
define("asteroids", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = [
        { heading: { x: 0.24659300101214976, y: -0.11066311653737948 }, position: { x: 639.5966589923804, y: 300.9383572452827 }, speed: 0.7741208522201983, radius: 20 },
        { heading: { x: 0.425045855226285, y: 0.1585146371754138 }, position: { x: 175.93979689915304, y: 55.8658023526839 }, speed: 1.5987627238451405, radius: 20 },
        { heading: { x: -0.2642206069173445, y: 0.05529981796292205 }, position: { x: 712.5153863645352, y: 231.36527779070124 }, speed: 0.8005509086003744, radius: 20 },
        { heading: { x: 0.0721580491949716, y: 0.4953368952530812 }, position: { x: 46.33964388999399, y: 335.232460239502 }, speed: 1.860982760701861, radius: 20 },
        { heading: { x: -0.21287487040214037, y: -0.27552644966104034 }, position: { x: 45.2990049624411, y: 252.44789330746315 }, speed: 0.5276663659690106, radius: 20 },
        { heading: { x: -0.3794020158765181, y: 0.0019672949962568076 }, position: { x: 606.577621502165, y: 244.81867559220584 }, speed: 1.5069666901051884, radius: 20 },
        { heading: { x: 0.3240204427341242, y: 0.27861700452229377 }, position: { x: 375.19134792941816, y: 470.6943845938987 }, speed: 0.694472290807933, radius: 20 },
        { heading: { x: 0.06344771387787196, y: 0.17325274855879025 }, position: { x: 642.8979821015399, y: 384.63862705594795 }, speed: 0.9088297169156001, radius: 20 },
        { heading: { x: 0.3171709782804266, y: -0.2010902269328383 }, position: { x: 642.4963296133099, y: 66.89841381950261 }, speed: 0.30632256544642145, radius: 20 },
        { heading: { x: 0.24977928600685595, y: -0.48351304373469217 }, position: { x: 679.2011628182141, y: 597.2789625771209 }, speed: 0.9449852402166208, radius: 20 },
    ];
});
define("game", ["require", "exports", "asteroids"], function (require, exports, asteroids_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tester = void 0;
    asteroids_1 = __importDefault(asteroids_1);
    var linePointDistance = function (line, point) {
        return line.norm.x * point.x + line.norm.y * point.y - line.dist;
    };
    var normalize = function (point) {
        var length = Math.sqrt(point.x * point.x + point.y * point.y);
        return { x: point.x / length, y: point.y / length };
    };
    var pointsToLine = function (p1, p2) {
        var norm = normalize({ x: p2.y - p1.y, y: p1.x - p2.x });
        var dist = norm.x * p1.x + norm.y * p1.y;
        return { norm: norm, dist: dist };
    };
    var scalePoint = function (point, scale) {
        return { x: point.x * scale, y: point.y * scale };
    };
    var dot = function (p1, p2) {
        return p1.x * p2.x + p1.y * p2.y;
    };
    var subtractPoints = function (p1, p2) {
        return { x: p1.x - p2.x, y: p1.y - p2.y };
    };
    var linesFromTriangle = function (triangle) {
        var _a = __read(triangle, 3), p1 = _a[0], p2 = _a[1], p3 = _a[2];
        return [pointsToLine(p1, p2), pointsToLine(p2, p3), pointsToLine(p3, p1)];
    };
    var isPointInTriangle = function (triangle, point) {
        var lines = linesFromTriangle(triangle);
        var side1 = linePointDistance(lines[0], point);
        var side2 = linePointDistance(lines[1], point);
        var side3 = linePointDistance(lines[2], point);
        return side1 >= 0 && side2 >= 0 && side3 >= 0;
    };
    var isPointInCircle = function (circle, point) {
        var dx = circle.center.x - point.x;
        var dy = circle.center.y - point.y;
        return dx * dx + dy * dy <= circle.radius * circle.radius;
    };
    var isTriangleVertexInCircle = function (triangle, circle) {
        return triangle.some(function (vertex) { return isPointInCircle(circle, vertex); });
    };
    var isLineIntersectingCircle = function (line, circle) {
        var dist = linePointDistance(line, circle.center);
        return dist * dist <= circle.radius * circle.radius;
    };
    var perpendicularLine = function (line, point) {
        var norm = normalize({ x: -line.norm.y, y: line.norm.x });
        var dist = norm.x * point.x + norm.y * point.y;
        return { norm: norm, dist: dist };
    };
    var perpendicularLinesForTriangle = function (triangle) {
        var lines = linesFromTriangle(triangle);
        var _a = __read(triangle, 3), p1 = _a[0], p2 = _a[1], p3 = _a[2];
        return [
            perpendicularLine(lines[0], p1),
            perpendicularLine(lines[0], p2),
            perpendicularLine(lines[1], p2),
            perpendicularLine(lines[1], p3),
            perpendicularLine(lines[2], p3),
            perpendicularLine(lines[2], p1),
        ];
    };
    var isPointBetweenLines = function (point, line1, line2) {
        var dist1 = linePointDistance(line1, point);
        var dist2 = linePointDistance(line2, point);
        return dist1 * dist2 <= 0;
    };
    var doesTriangleEdgeIntersectCircle = function (triangle, circle) {
        var perps = perpendicularLinesForTriangle(triangle);
        var lines = linesFromTriangle(triangle);
        for (var i = 0; i < 3; i++) {
            if (isLineIntersectingCircle(lines[i], circle)) {
                if (isPointBetweenLines(circle.center, perps[i * 2], perps[i * 2 + 1])) {
                    return true;
                }
            }
        }
        return false;
    };
    // This is slow, I should probably optimize to remove recalculating the lines
    var isCircleIntersectingOrInsideTriangle = function (triangle, circle) {
        return isTriangleVertexInCircle(triangle, circle) || doesTriangleEdgeIntersectCircle(triangle, circle) || isPointInTriangle(triangle, circle.center);
    };
    // drawing code for the basic geometry stuff
    var canvas;
    var ctx;
    var setupCanvas = function () {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    var drawTriangle = function (triangle) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(triangle[0].x, triangle[0].y);
        ctx.lineTo(triangle[1].x, triangle[1].y);
        ctx.lineTo(triangle[2].x, triangle[2].y);
        ctx.closePath();
        ctx.stroke();
    };
    var drawPoint = function (point) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    };
    var drawCircle = function (circle, color) {
        if (color === void 0) { color = "black"; }
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
        ctx.stroke();
    };
    var drawLine = function (line) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, line.dist / line.norm.y);
        ctx.lineTo(canvas.width, (line.dist - canvas.width * line.norm.x) / line.norm.y);
        ctx.stroke();
    };
    var clearCanvas = function () {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // I forgot that asteroids is on a torus and I made the above math for affine space
    var Boundaries;
    (function (Boundaries) {
        Boundaries[Boundaries["Top"] = 0] = "Top";
        Boundaries[Boundaries["Right"] = 1] = "Right";
        Boundaries[Boundaries["Bottom"] = 2] = "Bottom";
        Boundaries[Boundaries["Left"] = 3] = "Left";
    })(Boundaries || (Boundaries = {}));
    var nearBoundary = function (point, canvasSize) {
        var x = point.x, y = point.y;
        var width = canvasSize.x, height = canvasSize.y;
        var nearTop = y < 50;
        var nearRight = x > width - 50;
        var nearBottom = y > height - 50;
        var nearLeft = x < 50;
        var bounds = [];
        if (nearTop)
            bounds.push(Boundaries.Top);
        if (nearRight)
            bounds.push(Boundaries.Right);
        if (nearBottom)
            bounds.push(Boundaries.Bottom);
        if (nearLeft)
            bounds.push(Boundaries.Left);
        return bounds;
    };
    var pointEquivalence = function (point, canvasSize) {
        var near = nearBoundary(point, canvasSize);
        var x = point.x, y = point.y;
        if (near.length === 1) {
            var _a = __read(near, 1), boundary = _a[0];
            switch (boundary) {
                case Boundaries.Top:
                    return [{ x: x, y: y + canvasSize.y }];
                case Boundaries.Right:
                    return [{ x: x - canvasSize.x, y: y }];
                case Boundaries.Bottom:
                    return [{ x: x, y: y - canvasSize.y }];
                case Boundaries.Left:
                    return [{ x: x + canvasSize.x, y: y }];
            }
        }
        if (near.length === 2) {
            var _b = __read(near, 2), boundary1 = _b[0], boundary2 = _b[1];
            if (boundary1 === Boundaries.Top && boundary2 === Boundaries.Right) {
                return [
                    { x: x, y: y + canvasSize.y },
                    { x: x - canvasSize.x, y: y },
                    { x: x - canvasSize.x, y: y + canvasSize.y },
                ];
            }
            if (boundary1 === Boundaries.Right && boundary2 === Boundaries.Bottom) {
                return [
                    { x: x - canvasSize.x, y: y },
                    { x: x, y: y - canvasSize.y },
                    { x: x - canvasSize.x, y: y - canvasSize.y },
                ];
            }
            if (boundary1 === Boundaries.Bottom && boundary2 === Boundaries.Left) {
                return [
                    { x: x, y: y - canvasSize.y },
                    { x: x + canvasSize.x, y: y },
                    { x: x + canvasSize.x, y: y - canvasSize.y },
                ];
            }
            if (boundary1 === Boundaries.Top && boundary2 === Boundaries.Left) {
                return [
                    { x: x + canvasSize.x, y: y },
                    { x: x, y: y + canvasSize.y },
                    { x: x + canvasSize.x, y: y + canvasSize.y },
                ];
            }
        }
        if (near.length > 3) {
            console.assert(false, "shouldn't be possible");
        }
        return [];
    };
    var toroidalDistance = function (point1, point2, canvasSize) {
        var width = canvasSize.x, height = canvasSize.y;
        var x1 = point1.x, y1 = point1.y;
        var x2 = point2.x, y2 = point2.y;
        var dx = Math.min(Math.abs(x1 - x2), Math.abs(x1 - x2 + width), Math.abs(x1 - x2 - width));
        var dy = Math.min(Math.abs(y1 - y2), Math.abs(y1 - y2 + height), Math.abs(y1 - y2 - height));
        return Math.sqrt(dx * dx + dy * dy);
    };
    var positiveModulo = function (x, n) {
        return ((x % n) + n) % n;
    };
    var repositionedEntity = function (entity, position) {
        var copy = __assign({}, entity);
        copy.position = position;
        return copy;
    };
    var allEquivalences = function (entity, canvasSize) {
        var position = entity.position;
        var equivalences = pointEquivalence(position, canvasSize);
        var ret = equivalences.map(function (equivalence) { return repositionedEntity(entity, equivalence); });
        ret.push(entity);
        return ret;
    };
    var initialState = function () {
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
        };
    };
    var shipTriangle = function (ship) {
        var triangle = [
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
        return triangle;
    };
    var moveEntity = function (entity) {
        entity.position.x += entity.heading.x * entity.speed;
        entity.position.y += entity.heading.y * entity.speed;
    };
    var turnEntity = function (entity, angle) {
        var _a = entity.heading, x = _a.x, y = _a.y;
        entity.heading.x = x * Math.cos(angle) - y * Math.sin(angle);
        entity.heading.y = x * Math.sin(angle) + y * Math.cos(angle);
    };
    var accelerateEntity = function (entity, amount) {
        entity.speed += amount;
    };
    var decelerateEntity = function (entity, amount) {
        entity.speed -= amount;
        if (entity.speed < 0) {
            entity.speed = 0;
        }
    };
    var fireBullet = function (gameState) {
        var ship = gameState.ship;
        var bullet = {
            heading: __assign({}, ship.heading),
            position: __assign({}, ship.position),
            speed: ship.speed + 5,
            lifetime: 0,
        };
        gameState.bullets.push(bullet);
    };
    // A bit discombobulated, but whatever
    var updateGameState = function (gameState, inputs) {
        var ship = gameState.ship, asteroids = gameState.asteroids, bullets = gameState.bullets;
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
        asteroids.forEach(function (asteroid) { return moveEntity(asteroid); });
        bullets.forEach(function (bullet) { return moveEntity(bullet); });
        bullets.forEach(function (bullet) { return bullet.lifetime++; });
        // check for collisions
        var newAsteroids = [];
        var xOffset = 0;
        var yOffset = 0;
        var near = nearBoundary(ship.position, { x: canvas.width, y: canvas.height });
        if (near.includes(Boundaries.Top) || near.includes(Boundaries.Bottom)) {
            yOffset = canvas.height / 2;
        }
        if (near.includes(Boundaries.Left) || near.includes(Boundaries.Right)) {
            xOffset = canvas.width / 2;
        }
        asteroids.forEach(function (asteroid) {
            var tri = shipTriangle(ship).map(function (_a) {
                var x = _a.x, y = _a.y;
                return ({ x: positiveModulo(x + xOffset, canvas.width), y: positiveModulo(y + yOffset, canvas.height) });
            });
            if (toroidalDistance(asteroid.position, ship.position, { x: canvas.width, y: canvas.height }) < 100 &&
                isCircleIntersectingOrInsideTriangle(tri, {
                    center: { x: positiveModulo(asteroid.position.x + xOffset, canvas.width), y: positiveModulo(asteroid.position.y + yOffset, canvas.height) },
                    radius: asteroid.radius,
                })) {
                gameState.alive = false;
            }
            bullets.forEach(function (bullet) {
                if (asteroid.radius > 0 && bullet.lifetime < 100 && toroidalDistance(asteroid.position, bullet.position, { x: canvas.width, y: canvas.height }) < asteroid.radius) {
                    gameState.score++;
                    var radius = asteroid.radius - 5;
                    var heading = { x: asteroid.heading.x + (bullet.heading.x * 4) / radius, y: asteroid.heading.y + (bullet.heading.y * 4) / radius };
                    if (radius > 0) {
                        var a = {
                            heading: __assign({}, heading),
                            position: { x: asteroid.position.x, y: asteroid.position.y },
                            speed: asteroid.speed,
                            radius: radius,
                        };
                        turnEntity(a, 5.1);
                        asteroids.push(a);
                        var b = {
                            heading: heading,
                            position: { x: asteroid.position.x, y: asteroid.position.y },
                            speed: asteroid.speed,
                            radius: radius,
                        };
                        turnEntity(b, -5.1);
                        asteroids.push(b);
                    }
                    asteroid.radius = 0;
                    bullet.lifetime = 100;
                }
            });
        });
        gameState.bullets = gameState.bullets.filter(function (bullet) { return bullet.lifetime < 100; });
        // remove asteroids that have been destroyed
        gameState.asteroids = gameState.asteroids.filter(function (asteroid) { return asteroid.radius > 0; });
        // wrap everything
        gameState.ship.position.x = positiveModulo(gameState.ship.position.x, canvas.width);
        gameState.ship.position.y = positiveModulo(gameState.ship.position.y, canvas.height);
        gameState.asteroids.forEach(function (asteroid) {
            asteroid.position.x = positiveModulo(asteroid.position.x, canvas.width);
            asteroid.position.y = positiveModulo(asteroid.position.y, canvas.height);
        });
        gameState.bullets.forEach(function (bullet) {
            bullet.position.x = positiveModulo(bullet.position.x, canvas.width);
            bullet.position.y = positiveModulo(bullet.position.y, canvas.height);
        });
    };
    var drawEverything = function (gameState) {
        var e_1, _a;
        clearCanvas();
        try {
            for (var _b = __values(allEquivalences(gameState.ship, { x: canvas.width, y: canvas.height })), _c = _b.next(); !_c.done; _c = _b.next()) {
                var shipInstance = _c.value;
                drawTriangle(shipTriangle(shipInstance));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        gameState.asteroids.forEach(function (asteroid) {
            var e_2, _a;
            try {
                for (var _b = __values(allEquivalences(asteroid, { x: canvas.width, y: canvas.height })), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var asteroidInstance = _c.value;
                    drawCircle({ center: asteroidInstance.position, radius: asteroid.radius }, asteroidInstance.highlighted ? "red" : "black");
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
        gameState.bullets.forEach(function (bullet) {
            var e_3, _a;
            try {
                for (var _b = __values(allEquivalences(bullet, { x: canvas.width, y: canvas.height })), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var bulletInstance = _c.value;
                    drawPoint(bulletInstance.position);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
    };
    // NEAT stuff
    // There are so many arbitrary decisions in this section
    var positionDelta = function (a, b, canvasSize) {
        var minX = Math.min(a.x, b.x);
        var maxX = Math.max(a.x, b.x);
        var minY = Math.min(a.y, b.y);
        var maxY = Math.max(a.y, b.y);
        var directX = maxX - minX;
        var directY = maxY - minY;
        var wrapX = directX - canvasSize.x;
        var wrapY = directY - canvasSize.y;
        var x = Math.abs(wrapX) < Math.abs(directX) ? wrapX : directX;
        var y = Math.abs(wrapY) < Math.abs(directY) ? wrapY : directY;
        return { x: x, y: y };
    };
    // model parameters
    var closestCount = 5;
    var speedAdjustedCount = 5;
    var stateSpace = function (gameState) {
        var ship = gameState.ship, asteroids = gameState.asteroids;
        var shipTheta = Math.atan2(ship.heading.y, ship.heading.x);
        var closestAsteroids = new Array(5).fill({ distance: Infinity, data: { velocity: 0, theta: 0, distance: 0, phi: 0, asteroid: null } });
        // I may want to have an additional field for the danger value
        var dangerAsteroids = new Array(5).fill({ danger: 0, data: { velocity: 0, theta: 0, distance: 0, phi: 0, asteroid: null } });
        var nextShipPosition = {
            x: positiveModulo(ship.position.x + ship.heading.x * ship.speed, canvas.width),
            y: positiveModulo(ship.position.y + ship.heading.y * ship.speed, canvas.height),
        };
        asteroids.forEach(function (asteroid) {
            var _a = positionDelta(ship.position, asteroid.position, { x: canvas.width, y: canvas.height }), x = _a.x, y = _a.y;
            var distance = Math.sqrt(x * x + y * y);
            var phi = Math.atan2(asteroid.heading.y, asteroid.heading.x) - shipTheta;
            if (phi > Math.PI) {
                phi -= 2 * Math.PI;
            }
            else if (phi < -Math.PI) {
                phi += 2 * Math.PI;
            }
            var theta = Math.atan2(y, x);
            var velocityDifference = subtractPoints(scalePoint(asteroid.heading, asteroid.speed), scalePoint(ship.heading, ship.speed));
            var velocity = Math.sqrt(velocityDifference.x * velocityDifference.x + velocityDifference.y * velocityDifference.y);
            for (var i = 0; i < closestAsteroids.length; i++) {
                if (distance < closestAsteroids[i].distance) {
                    closestAsteroids.splice(i, 0, { distance: distance, data: { velocity: velocity, theta: theta, distance: distance, phi: phi, asteroid: asteroid } });
                    asteroid.highlighted = true;
                    var ast = closestAsteroids.pop().data.asteroid;
                    if (ast) {
                        ast.highlighted = false;
                    }
                    break;
                }
            }
            var nextAsteroidPosition = {
                x: positiveModulo(asteroid.position.x + asteroid.heading.x * asteroid.speed, canvas.width),
                y: positiveModulo(asteroid.position.y + asteroid.heading.y * asteroid.speed, canvas.height),
            };
            var _b = positionDelta(nextShipPosition, nextAsteroidPosition, { x: canvas.width, y: canvas.height }), nextX = _b.x, nextY = _b.y;
            var nextDistance = Math.sqrt(nextX * nextX + nextY * nextY);
            // This is attempting to capture the idea of asteroids moving towards the ship that are nearby
            // dimensionally danger is time^-1 (distance differential over distance)
            // I chose this because it has good numerical stability
            var danger = (distance - nextDistance) / distance;
            for (var i = 0; i < dangerAsteroids.length; i++) {
                if (danger > 0 && danger > dangerAsteroids[i].danger) {
                    dangerAsteroids.splice(i, 0, { danger: danger, data: { velocity: velocity, theta: theta, distance: distance, phi: phi, asteroid: asteroid } });
                    asteroid.highlighted = true;
                    var ast = dangerAsteroids.pop().data.asteroid;
                    if (ast) {
                        ast.highlighted = false;
                    }
                    break;
                }
            }
        });
        // Idk the best way to show that the data is empty, I am using negative velocities
        return closestAsteroids
            .map(function (_a) {
            var distance = _a.distance, data = _a.data;
            if (distance === Infinity) {
                return { velocity: -2, deltaTheta: 0, distance: 0 };
            }
            return data;
        })
            .concat(dangerAsteroids.map(function (_a) {
            var danger = _a.danger, data = _a.data;
            if (danger === 0) {
                return { velocity: -2, deltaTheta: 0, distance: 0 };
            }
            return data;
        }));
    };
    // temporary test code
    var tester = function () {
        setupCanvas();
        var state = initialState();
        // We load the asteroids the same every time for now
        state.asteroids = asteroids_1.default;
        state.asteroids.forEach(function (asteroid) { return (asteroid.heading = normalize(asteroid.heading)); });
        var inputs = {
            left: false,
            right: false,
            up: false,
            down: false,
            space: false,
        };
        document.onkeydown = function (e) {
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
        document.onkeyup = function (e) {
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
        var frame = 0;
        var loop = function () {
            updateGameState(state, inputs);
            if (!state.alive) {
                console.log("You died!");
                return;
            }
            if (state.asteroids.length === 0) {
                console.log("You won!");
                return;
            }
            var space = stateSpace(state);
            frame++;
            if (frame % 20 === 0) {
                console.log(space);
            }
            drawEverything(state);
            requestAnimationFrame(loop);
        };
        loop();
    };
    exports.tester = tester;
});
// import assert from "assert";
define("neat", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.computePlan = exports.printPlan = exports.printGenome = exports.compute = exports.progenerate = void 0;
    var crossover = function (a, b) {
        var e_4, _a, e_5, _b, e_6, _c;
        console.assert(a.domain.inputs === b.domain.inputs);
        console.assert(a.domain.outputs === b.domain.outputs);
        var innovations = new Set();
        try {
            for (var _d = __values(a.edges), _e = _d.next(); !_e.done; _e = _d.next()) {
                var edge = _e.value;
                innovations.add(edge.innovation);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_4) throw e_4.error; }
        }
        try {
            for (var _f = __values(b.edges), _g = _f.next(); !_g.done; _g = _f.next()) {
                var edge = _g.value;
                innovations.add(edge.innovation);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var edges = [];
        var _loop_1 = function (innovation) {
            var edgeA = a.edges.find(function (edge) { return edge.innovation === innovation; });
            var edgeB = b.edges.find(function (edge) { return edge.innovation === innovation; });
            if (!edgeA) {
                edges.push(edgeB);
                return "continue";
            }
            else if (!edgeB) {
                edges.push(edgeA);
                return "continue";
            }
            console.assert(edgeA.from === edgeB.from);
            console.assert(edgeA.to === edgeB.to);
            edges.push({
                from: edgeA.from,
                to: edgeA.to,
                weight: Math.random() < 0.5 ? edgeA.weight : edgeB.weight,
                innovation: innovation,
                enabled: edgeA.enabled && edgeB.enabled,
            });
        };
        try {
            for (var innovations_1 = __values(innovations), innovations_1_1 = innovations_1.next(); !innovations_1_1.done; innovations_1_1 = innovations_1.next()) {
                var innovation = innovations_1_1.value;
                _loop_1(innovation);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (innovations_1_1 && !innovations_1_1.done && (_c = innovations_1.return)) _c.call(innovations_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return {
            domain: a.domain,
            edges: edges,
            nodeCount: Math.max(a.nodeCount, b.nodeCount),
        };
    };
    var insertEdgeMutation = function (genome, edgeIndex, innovation) {
        var edges = genome.edges.map(function (edge) { return (__assign({}, edge)); });
        var edge = edges[edgeIndex];
        console.assert(edge.enabled);
        edge.enabled = false;
        edges.push({
            from: edge.from,
            to: genome.nodeCount,
            weight: Math.random() * 2 - 1,
            innovation: innovation,
            enabled: true,
        });
        edges.push({
            from: genome.nodeCount,
            to: edge.to,
            weight: Math.random() * 2 - 1,
            innovation: innovation + 1,
            enabled: true,
        });
        return {
            genome: {
                domain: genome.domain,
                edges: edges,
                nodeCount: genome.nodeCount + 1,
            },
            innovationIndex: innovation + 2,
        };
    };
    var connectMutation = function (genome, innovation, from, to) {
        console.assert(to !== from);
        console.assert(to < genome.nodeCount);
        console.assert(from < genome.nodeCount);
        var edgeCheck = genome.edges.find(function (edge) { return edge.from === from && edge.to === to; });
        if (edgeCheck) {
            return { genome: genome, innovationIndex: innovation };
        }
        var edges = genome.edges.map(function (edge) { return (__assign({}, edge)); });
        edges.push({
            from: from,
            to: to,
            weight: Math.random() * 2 - 1,
            innovation: innovation,
            enabled: true,
        });
        return {
            genome: {
                domain: genome.domain,
                edges: edges,
                nodeCount: genome.nodeCount,
            },
            innovationIndex: innovation + 1,
        };
    };
    var printGenome = function (genome) {
        var e_7, _a;
        console.log("Genome: ".concat(genome.nodeCount, " nodes"));
        try {
            for (var _b = __values(genome.edges), _c = _b.next(); !_c.done; _c = _b.next()) {
                var edge = _c.value;
                console.log("Edge: ".concat(edge.from, " -> ").concat(edge.to, " (").concat(edge.weight, ") ").concat(edge.enabled ? "enabled" : "disabled", " Innovation: ").concat(edge.innovation));
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    exports.printGenome = printGenome;
    // This hangs if the dag is not a dag (it shouldn't)
    var computePlan = function (genome) {
        var e_8, _a;
        var nodeDeps = new Array(genome.nodeCount);
        try {
            for (var _b = __values(genome.edges), _c = _b.next(); !_c.done; _c = _b.next()) {
                var edge = _c.value;
                if (!edge.enabled) {
                    continue;
                }
                if (!nodeDeps[edge.to]) {
                    nodeDeps[edge.to] = [];
                }
                nodeDeps[edge.to].push(edge);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
        var nodeComputed = new Array(genome.nodeCount).fill(false);
        for (var i = 0; i < genome.domain.inputs; i++) {
            nodeComputed[i] = true;
        }
        var plan = [];
        var computeNode = function (node) {
            var e_9, _a;
            if (nodeComputed[node]) {
                return;
            }
            var deps = nodeDeps[node];
            if (!deps) {
                throw new Error("Invalid topology found while building compute plan (non-input node has no inputs)");
            }
            try {
                for (var deps_1 = __values(deps), deps_1_1 = deps_1.next(); !deps_1_1.done; deps_1_1 = deps_1.next()) {
                    var dep = deps_1_1.value;
                    computeNode(dep.from);
                    plan.push(dep);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (deps_1_1 && !deps_1_1.done && (_a = deps_1.return)) _a.call(deps_1);
                }
                finally { if (e_9) throw e_9.error; }
            }
            nodeComputed[node] = true;
            plan.push("activation");
        };
        for (var i = 0; i < genome.domain.outputs; i++) {
            computeNode(genome.domain.inputs + i);
        }
        return { plan: plan, nodeCount: genome.nodeCount };
    };
    exports.computePlan = computePlan;
    var printPlan = function (plan) {
        var e_10, _a;
        console.log("Plan: ".concat(plan.length, " steps"));
        try {
            for (var plan_1 = __values(plan), plan_1_1 = plan_1.next(); !plan_1_1.done; plan_1_1 = plan_1.next()) {
                var step = plan_1_1.value;
                if (typeof step === "string") {
                    console.log("Step: ".concat(step));
                    continue;
                }
                console.log("Step: ".concat(step.from, " -> ").concat(step.to, " (").concat(step.weight, ") ").concat(step.enabled ? "enabled" : "disabled", " Innovation: ").concat(step.innovation));
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (plan_1_1 && !plan_1_1.done && (_a = plan_1.return)) _a.call(plan_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
    };
    exports.printPlan = printPlan;
    // Sigmoid activation function from the NEAT paper
    var activation = function (x) { return 1 / (1 + Math.exp(-x)); };
    var compute = function (_a, inputs) {
        var e_11, _b;
        var plan = _a.plan, nodeCount = _a.nodeCount;
        var nodes = new Array(nodeCount).fill(0);
        for (var i = 0; i < inputs.length; i++) {
            nodes[i] = inputs[i];
        }
        var lastNode = Number.NaN;
        try {
            for (var plan_2 = __values(plan), plan_2_1 = plan_2.next(); !plan_2_1.done; plan_2_1 = plan_2.next()) {
                var step = plan_2_1.value;
                if (typeof step === "string") {
                    // console.assert(step === "activation");
                    nodes[lastNode] = activation(nodes[lastNode]);
                    continue;
                }
                nodes[step.to] += nodes[step.from] * step.weight;
                lastNode = step.to;
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (plan_2_1 && !plan_2_1.done && (_b = plan_2.return)) _b.call(plan_2);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return nodes.slice(inputs.length);
    };
    exports.compute = compute;
    var mutateWeights = function (genome) {
        var e_12, _a;
        var edges = genome.edges.map(function (edge) { return (__assign({}, edge)); });
        try {
            for (var edges_1 = __values(edges), edges_1_1 = edges_1.next(); !edges_1_1.done; edges_1_1 = edges_1.next()) {
                var edge = edges_1_1.value;
                if (Math.random() < 0.8) {
                    edge.weight += Math.random() * 0.4 - 0.2;
                }
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (edges_1_1 && !edges_1_1.done && (_a = edges_1.return)) _a.call(edges_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return {
            domain: genome.domain,
            edges: edges,
            nodeCount: genome.nodeCount,
        };
    };
    var progenerate = function (domain, size) {
        var genomes = [];
        var progenitor = {
            domain: domain,
            edges: [],
            nodeCount: domain.inputs + domain.outputs,
        };
        var innovation = 0;
        for (var i = 0; i < domain.outputs; i++) {
            for (var j = 0; j < domain.inputs; j++) {
                var _a = connectMutation(progenitor, innovation, j, domain.inputs + i), genome = _a.genome, innovationIndex = _a.innovationIndex;
                progenitor = genome;
                innovation = innovationIndex;
            }
        }
        for (var i = 0; i < size; i++) {
            genomes.push(mutateWeights(progenitor));
        }
        return { genomes: genomes, innovation: innovation };
    };
    exports.progenerate = progenerate;
});
define("index", ["require", "exports", "game"], function (require, exports, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // const test = () => {
    //   const domain = { inputs: 3, outputs: 2 };
    //   const { genomes, innovation } = progenerate(domain, 10);
    //   for (const genome of genomes) {
    //     printGenome(genome);
    //     const plan = computePlan(genome);
    //     printPlan(plan.plan);
    //     console.log(compute(plan, [1, 2, 3]));
    //   }
    // };
    if (document.readyState === "complete") {
        (0, game_1.tester)();
    }
    else {
        document.addEventListener("DOMContentLoaded", game_1.tester);
    }
});
