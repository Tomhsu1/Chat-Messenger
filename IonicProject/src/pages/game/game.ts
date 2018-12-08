// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

// /**
//  * Generated class for the GamePage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @IonicPage()
// @Component({
//   selector: 'page-game',
//   templateUrl: 'game.html',
// })
// export class GamePage {

//   constructor(public navCtrl: NavController, public navParams: NavParams) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad GamePage');
//   }

// }

// var canvas: HTMLCanvasElement;
// var ctx: CanvasRenderingContext2D;

// var asteroid_array: Array<cAsteroid> = new Array<cAsteroid>();
// var bullet_array: Array<cBullet> = new Array<cBullet>();
// var space_ship: cSpaceShip;

// var deltaTime: number = 0;
// var lastTime: number = 0;
// var bulletWait: number = 0;

// function gameLoop(): void {
//     deltaTime = (new Date().getTime() - lastTime) / 1000;
//     lastTime = Date.now();
//     if (bulletWait > 0) {
//         bulletWait -= deltaTime;
//     }

//     requestAnimationFrame(gameLoop);
//     ctx.fillStyle = "black";
//     ctx.fillRect(0, 0, 1280, 720);

//     var bullet: cBullet;
//     var asteroid: cAsteroid;

//     keyInput.inputLoop();
//     space_ship.draw();

//     for (var i: number = 0; i < bullet_array.length; i++) {
//         bullet = bullet_array[i];
//         bullet.draw();
//     }

//     for (i = 0; i < asteroid_array.length; i++) {
//         asteroid = asteroid_array[i];
//         if (asteroid.active == false) {
//             continue;
//         }

//         asteroid.draw();

//         if (asteroid.hitTest(space_ship) == true) {
//             space_ship.alive = false;
//         }

//         for (var j: number = 0; j < bullet_array.length; j++) {
//             bullet = bullet_array[j];
//             if (bullet.active == false) {
//                 continue;
//             }

//             if (asteroid.hitTest(bullet) == true) {
//                 var asteroid_pos: cVector = asteroid.position.duplicate();
//                 var asteroid_size: number = asteroid.getSize();
//                 asteroid.active = false;
//                 bullet.active = false;

//                 if (asteroid_size >= 5) {

//                     cAsteroid.SpawnAsteroid(asteroid_pos.x + Math.random() * asteroid_size - asteroid_size / 2,
//                         asteroid_pos.y + Math.random() * asteroid_size - asteroid_size / 2,
//                         asteroid_size / 2);

//                     cAsteroid.SpawnAsteroid(asteroid_pos.x + Math.random() * asteroid_size - asteroid_size / 2,
//                         asteroid_pos.y + Math.random() * asteroid_size - asteroid_size / 2,
//                         asteroid_size / 2);
//                 }
//             }
//         }
//     }

// }

// function callback(): void {
//     console.log("the callback");
// }

// class cKeyboardInput {
//     public keyCallback: { [keycode: number]: () => void; } = {};
//     public keyDown: { [keycode: number]: boolean; } = {};
//     constructor() {
//         document.addEventListener('keydown', this.keyboardDown);
//         document.addEventListener('keyup', this.keyboardUp);
//     }

//     public addKeycodeCallback = (keycode: number, f: () => void): void => {
//         this.keyCallback[keycode] = f;
//         this.keyDown[keycode] = false;
//     }

//     public keyboardDown = (event: KeyboardEvent): void => {
//         event.preventDefault();
//         this.keyDown[event.keyCode] = true;
//     }

//     public keyboardUp = (event: KeyboardEvent): void => {
//         this.keyDown[event.keyCode] = false;
//     }

//     public inputLoop = (): void => {
//         for (var key in this.keyDown) {
//             var is_down: boolean = this.keyDown[key];

//             if (is_down) {
//                 var callback: () => void = this.keyCallback[key];
//                 if (callback != null) {
//                     callback();
//                 }
//             }
//         }        
//     }
// }

// interface iShape {
//     draw(): void;
//     position: cVector;
//     color: string;
//     lineWidth: number;
// }

// class cVector {
//     public x: number = 0;
//     public y: number = 0;

//     constructor(x: number = 0, y: number = 0) {
//         this.x = x;
//         this.y = y;
//     }

//     public magnitude = (): number => {
//         return Math.sqrt(this.x * this.x + this.y * this.y);
//     }

//     public magSq = (): number => {
//         return this.x * this.x + this.y * this.y;
//     }

//     public normalize = (magnitude: number = 1): cVector => {
//         var len: number = Math.sqrt(this.x * this.x + this.y * this.y);
//         this.x /= len;
//         this.y /= len;
//         return this;
//     }

//     public zero = (): void => {
//         this.x = 0;
//         this.y = 0;
//     }

//     public copy = (point: cVector): void => {
//         this.x = point.x;
//         this.y = point.y;
//     }

//     public duplicate = (): cVector => {
//         var dup: cVector = new cVector(this.x, this.y);
//         return dup;
//     }

//     public rotate = (radians: number): void => {
//         var cos: number = Math.cos(radians);
//         var sin: number = Math.sin(radians);
//         var x: number = (cos * this.x) + (sin * this.y);
//         var y: number = (cos * this.y) - (sin * this.x);
//         this.x = x;
//         this.y = y;
//     }

//     public rotate90 = (): void => {
//         var x: number = -this.y;
//         var y: number = this.x;
//         this.x = x;
//         this.y = y;
//     }

//     public getAngle = (): number => {
//         return Math.atan2(this.x, this.y);
//     }

//     public multiply = (value: number): void => {
//         this.x *= value;
//         this.y *= value;
//     }

//     public add = (value: cVector): void => {
//         this.x += value.x;
//         this.y += value.y;
//     }

//     public subtract = (value: cVector): void => {
//         this.x -= value.x;
//         this.y -= value.y;
//     }

//     public dot = (vec: cVector): number => {
//         return this.x * vec.x + this.y * vec.y;
//     }

//     public project = (onto: cVector): cVector => {
//         var proj: cVector = this.duplicate();
//         var d: number = onto.magSq();

//         if (d != 0) {
//             var mult: cVector = new cVector(onto.x, onto.y);
//             mult.multiply(proj.dot(onto) / d);
//             return mult;
//         }
//         return onto;
//     }
// }


// class cLine {
//     public position: cVector = new cVector();
//     public endPosition: cVector = new cVector(1, 1);
//     constructor() {
//     }
// }

// class cRange {
//     public min: number = 0;
//     public max: number = 0;

//     constructor(min: number = 0, max: number = 0) {
//         this.min = min;
//         this.max = max;
//     }

//     public overlap = (other: cRange): boolean => {
//         return other.min <= this.max && this.min <= other.max;
//     }

//     public sort = (): void => {
//         if (this.min > this.max) {
//             var temp: number = this.min;
//             this.min = this.max;
//             this.max = temp;

//         }
//     }

//     public copy = (range: cRange): void => {
//         this.min = range.min;
//         this.max = range.max;
//     }

//     public duplicate = (): cRange => {
//         return new cRange(this.min, this.max);
//     }

//     public combine = (range: cRange): cRange => {
//         var combined: cRange = new cRange();
//         combined.min = this.min;
//         combined.max = this.max;
//         if (range.min < this.min) {
//             combined.min = range.min;
//         }

//         if (range.max > this.max) {
//             combined.max = range.max;
//         }
//         return combined;
//     }

//     public extend = (value: number): void => {
//         if (value > this.max) {
//             this.max = value;
//         }
//         else if (value < this.min) {
//             this.min = value;
//         }
//     }

//     public clamp = (value: number): number => {
//         if (value < this.min) {
//             return this.min;
//         }
//         if (value > this.max) {
//             return this.max;
//         }
//         return value;
//     }
// }

// class cCollider {
//     public position: cVector = new cVector();
//     public rotation: number = 0;
//     protected _pointList: Array<cVector> = new Array<cVector>();
//     protected _edgeList: Array<cLine> = new Array<cLine>();
//     protected _finalEdge: cLine = new cLine();

//     public hitTest = (obj: cCollider): boolean => {
//         var edge: cLine;

//         for (var i: number = 0; i < this.edgeCount; i++) {
//             edge = this.getEdge(i);
//             if (obj.axisOverlap(edge, this) == false) {
//                 return false;
//             }
//         }

//         for (var i: number = 0; i < obj.edgeCount; i++) {
//             edge = obj.getEdge(i);
//             if (this.axisOverlap(edge, obj) == false) {
//                 return false;
//             }
//         }

//         return true;
//     }

//     public static isConvex(collider: cCollider ): boolean {
//         var point_count: number = collider.pointCount();
//         if (point_count < 4) {
//             return true;
//         }

//         var point: cVector = new cVector();
//         var d1: cVector = new cVector();
//         var d2: cVector = new cVector();
//         var sign: boolean = false;

//         for (var i: number = 0; i < point_count; i++) {
//             point.copy(collider.getPoint(i));

//             if (i < point_count - 2) {
//                 d1.copy(collider.getPoint(i + 1));
//                 d2.copy(collider.getPoint(i + 2));

//                 d2.subtract(d1);
//                 d1.subtract(point);

//             }
//             else if (i < point_count - 1) {
//                 d1.copy(collider.getPoint(i + 1));
//                 d2.copy(collider.getPoint(0));

//                 d2.subtract(d1);
//                 d1.subtract(point);
//             }
//             else {
//                 d1.copy(collider.getPoint(0));
//                 d2.copy(collider.getPoint(1));

//                 d2.subtract(d1);
//                 d1.subtract(point);
//             }

//             d2.rotate90();
//             var dot: number = d1.dot(d2);

//             if (i == 0) {
//                 sign = dot > 0;
//             }
//             else if (sign != (dot > 0)) {
//                 return false;
//             }

//         }

//         return true;
//     }

//     public axisOverlap = (axis: cLine, p2: cCollider): boolean => {
//         var edge: cLine;

//         var direction: cVector = axis.position.duplicate();
//         direction.subtract(axis.endPosition);
//         direction.normalize();
//         direction.rotate90();

//         var axis_range: cRange = new cRange();
//         for (var i: number = 0; i < p2.edgeCount; i++) {
//             edge = p2.getEdge(i);
//             range = cCollider.ProjectLine(edge, direction);
//             if (i == 0) {
//                 axis_range.copy(range);
//             }
//             else {
//                 axis_range = axis_range.combine(range);
//             }
//         }

//         var range: cRange;

//         var projection: cRange = new cRange();

//         for (var i: number = 0; i < this.edgeCount; i++) {
//             edge = this.getEdge(i);
//             range = cCollider.ProjectLine(edge, direction);
//             if (i == 0) {
//                 projection.copy(range);
//             }
//             else {
//                 projection = projection.combine(range);
//             }
//         }

//         return axis_range.overlap(projection);
//     }

//     public findClosePointNum = (point: cVector): number => {
//         var close_dist_sq: number = 99999999;
//         var temp_point: cVector;
//         var dist_vec: cVector = new cVector();
//         var close_point_num = -1;

//         for (var i: number = 0; i < this._pointList.length; i++) {
//             temp_point = this._pointList[i];
//             dist_vec.copy(point);
//             dist_vec.subtract(temp_point);

//             if (dist_vec.magSq() < close_dist_sq) {
//                 close_dist_sq = dist_vec.magSq();
//                 close_point_num = i;
//             }
//         }
//         return close_point_num;
//     }
//     public static ProjectLine = (line: cLine, onto: cVector): cRange => {
//         var ontoNormalized: cVector = onto.duplicate();
//         ontoNormalized.normalize();

//         var range: cRange = new cRange();
//         var dot1: number = ontoNormalized.dot(line.position);
//         var dot2: number = ontoNormalized.dot(line.endPosition);

//         if (dot2 > dot1) {
//             range.min = dot1;
//             range.max = dot2;
//         }
//         else {
//             range.min = dot2;
//             range.max = dot1;
//         }

//         return range;

//     }

//     public getEdge = (edge_num: number): cLine => {
//         var p1: cVector;
//         var p2: cVector;

//         if (edge_num < this._pointList.length - 1) {
//             p1 = this.getPoint(edge_num);
//             p2 = this.getPoint(edge_num + 1);
//         }
//         else {
//             p1 = this.getPoint(edge_num);
//             p2 = this.getPoint(0);
//         }

//         if (p1 == null || p2 == null) {
//             return null;
//         }

//         var p1_transform: cVector = p1.duplicate();
//         var p2_transform: cVector = p2.duplicate();

//         p1_transform.rotate(this.rotation);
//         p1_transform.add(this.position);

//         p2_transform.rotate(this.rotation);
//         p2_transform.add(this.position);

//         var edge: cLine = new cLine();
//         edge.position = p1_transform;
//         edge.endPosition = p2_transform;
//         return edge;
//     }

//     public getPoint = (point_num: number): cVector => {
//         return this._pointList[point_num];
//     }

//     public pointCount = (): number => {
//         return this._pointList.length;
//     }

//     get edgeCount(): number {
//         return this._pointList.length;
//     }

//     public clearPoints = (): void => {
//         this._pointList = new Array<cVector>();
//         this._edgeList = new Array<cLine>();
//     }

//     public addPoint = (point: cVector): void => {
//         this._pointList.push(point);
//     }
//     public projectEdge = (edge_num: number, onto: cVector): cRange => {
//         var line: cLine = this.getEdge(edge_num);
//         var ontoNormalized: cVector = onto.duplicate();
//         ontoNormalized.normalize();

//         var range: cRange = new cRange();
//         var dot1: number = ontoNormalized.dot(line.position);
//         var dot2: number = ontoNormalized.dot(line.endPosition);

//         if (dot2 > dot1) {
//             range.min = dot1;
//             range.max = dot2;
//         }
//         else {
//             range.min = dot2;
//             range.max = dot1;
//         }

//         return range;
//     }
// }

// class cBullet extends cCollider implements iShape {
//     public active: boolean = true;
//     public lineWidth: number = 5;
//     private _size: number = 0;
//     private _halfSize: number = 0;
//     public color: string = "red";

//     public lineWidthAnimVal: number = 0;
//     public widthUp: boolean = true;

//     public velocity: cVector = new cVector();
//     public speed: number = 5;

//     public launch = (orientation: cVector): void => {
//         this.velocity.copy(orientation);
//         this.velocity.multiply(this.speed);
//     }

//     public draw = (): void => {
//         if (this.active == false) {
//             return;
//         }

//         if (this.widthUp == true) {
//             this.lineWidthAnimVal += 0.1;

//             if (this.lineWidthAnimVal >= 2) {
//                 this.widthUp = false;
//             }
//         }
//         else {
//             this.lineWidthAnimVal -= 0.1;
//             if (this.lineWidthAnimVal <= -2) {
//                 this.widthUp = true;
//             }
//         }
//         this.position.x += this.velocity.x;
//         this.position.y += this.velocity.y;

//         if (this.position.x < -10 || this.position.x > 1290 || this.position.y < -10 || this.position.y > 730) {
//             this.active = false;
//         }

//         ctx.save();
//         ctx.beginPath();
//         ctx.strokeStyle = this.color;
//         ctx.lineWidth = this.lineWidth + this.lineWidthAnimVal;
//         ctx.rect(this.position.x - this._halfSize, this.position.y - this._halfSize, this._size, this._size);
//         ctx.stroke();
//         ctx.restore();
//     }

//     public constructor(x: number, y: number, size: number, color: string = "red", lineWidth: number = 5) {
//         super();
//         this.position.x = x;
//         this.position.y = y;
//         this.setSize( size );
//         this.color = color;
//         this.lineWidth = lineWidth;
//     }

//     public setSize = (size: number): void => {
//         this._size = size;
//         this._halfSize = size / 2;
//         while (this._pointList.length > 0) {
//             this._pointList.pop();
//         }
//         this._pointList.push(new cVector(-this._halfSize, -this._halfSize));
//         this._pointList.push(new cVector(this._halfSize, -this._halfSize));
//         this._pointList.push(new cVector(this._halfSize, this._halfSize));
//         this._pointList.push(new cVector(-this._halfSize, this._halfSize));
//     }
    
//     public static GetInactiveBullet(): cBullet {
//         var bullet: cBullet = null;
//         for (var i: number = 0; i < bullet_array.length; i++) {
//             bullet = bullet_array[i];
//             if (bullet.active == false) {
//                 break;
//             }
//         }
//         return bullet;
//     }
// }


// class cAsteroid extends cCollider implements iShape {
//     public active: boolean = true;
//     public lineWidth: number = 5;
//     public color: string = "white";
//     private _size: number = 20;
//     public rotation: number = 0;
//     public rotationSpeed: number = 0;
//     public velocity: cVector = new cVector();

//     public setSize = (size: number): void => {
//         this._size = size;
//         var xrand: number = 0;
//         var yrand: number = 0;

//         xrand = Math.round(Math.random() * size - size / 2);
//         yrand = Math.round(Math.random() * size - size / 2);

//         do {
//             while (this._pointList.length > 0) {
//                 this._pointList.pop();
//             }
//             this._pointList.push(new cVector(xrand, yrand + 3 * size));

//             xrand = Math.round(Math.random() * size - size / 2);
//             yrand = Math.round(Math.random() * size - size / 2);

//             this._pointList.push(new cVector(xrand + 3 * size, yrand + size));

//             xrand = Math.round(Math.random() * size - size / 2);
//             yrand = Math.round(Math.random() * size - size / 2);

//             this._pointList.push(new cVector(xrand + 3 * size, yrand - size));

//             xrand = Math.round(Math.random() * size - size / 2);
//             yrand = Math.round(Math.random() * size - size / 2);

//             this._pointList.push(new cVector(xrand + size, yrand - 3 * size));

//             xrand = Math.round(Math.random() * size - size / 2);
//             yrand = Math.round(Math.random() * size - size / 2);

//             this._pointList.push(new cVector(xrand - size, yrand - 3 * size));

//             xrand = Math.round(Math.random() * size - size / 2);
//             yrand = Math.round(Math.random() * size - size / 2);

//             this._pointList.push(new cVector(xrand - 3 * size, yrand - size));

//             xrand = Math.round(Math.random() * size - size / 2);
//             yrand = Math.round(Math.random() * size - size / 2);

//             this._pointList.push(new cVector(xrand - 3 * size, yrand + size));

//             xrand = Math.round(Math.random() * size - size / 2);
//             yrand = Math.round(Math.random() * size - size / 2);

//             this._pointList.push(new cVector(xrand - size, yrand + 3 * size));

//         } while (cCollider.isConvex(this) == false);
//     }

//     public getSize = (): number => {
//         return this._size;
//     }

//     public static SpawnAsteroid(x: number, y: number, size: number, color: string = "white", line_width: number = 2) {
//         var temp_asteroid: cAsteroid;
//         for (var i: number = 0; i < asteroid_array.length; i++) {
//             temp_asteroid = asteroid_array[i];
//             if (temp_asteroid.active == false) {
//                 temp_asteroid.active = true;
//                 temp_asteroid.position.x = x;
//                 temp_asteroid.position.y = y;
//                 temp_asteroid.setSize( size );
//                 temp_asteroid.color = color;
//                 temp_asteroid.lineWidth = line_width;
//                 temp_asteroid.SetRandVelocity();
//                 return;
//             }
//         }
//         asteroid_array.push(new cAsteroid(x, y, size, color, line_width));
//     }
//     /*
//     public static GetInactiveAsteroid(): cAsteroid {
//         var asteroid: cAsteroid = null;
//         for (var i: number = 0; i < asteroid_array.length; i++) {
//             asteroid = asteroid_array[i];
//             if (asteroid.active == false) {
//                 break;
//             }
//         }
//         return asteroid;
//     }
//     */
//     public draw = (): void => {
//         this.position.add(this.velocity);

//         if (this.position.x < -this._size * 4) {
//             this.position.x = 1280 + this._size * 4;
//         }
//         else if (this.position.x > 1280 + this._size * 4) {
//             this.position.x = -4 * this._size;
//         }

//         if (this.position.y < -this._size * 4) {
//             this.position.y = 720 + this._size * 4;
//         }
//         else if (this.position.y > 720 + this._size * 4) {
//             this.position.y = -4 * this._size;
//         }

//         this.rotation += this.rotationSpeed;
//         ctx.save();
//         ctx.translate(this.position.x, this.position.y);
//         ctx.rotate(this.rotation);
//         ctx.beginPath();
//         ctx.strokeStyle = this.color;
//         ctx.lineWidth = this.lineWidth;

//         ctx.moveTo(this._pointList[this._pointList.length - 1].x, this._pointList[this._pointList.length - 1].y);

//         for (var i: number = 0; i < this._pointList.length; i++) {
//             ctx.lineTo(this._pointList[i].x, this._pointList[i].y);
//         }

//         ctx.closePath();
//         ctx.stroke();
//         ctx.restore();
//     }

//     public SetRandVelocity = (): void => {
//         var size_sq: number = this._size * this._size;
//         this.velocity.x = 80 * Math.random() / size_sq - 40 / size_sq;
//         this.velocity.y = 80 * Math.random() / size_sq - 40 / size_sq;
//     }

//     constructor(x: number, y: number, size: number, color: string = "white", line_width: number = 2) {
//         super();
//         this.SetRandVelocity();
//         this.position.x = x;
//         this.position.y = y;
//         this.setSize(size);

//         this.rotationSpeed = Math.random() * 0.06 - 0.03;
//         this.color = color;
//         this.lineWidth = line_width;
//     }
// }

// class cSpaceShip extends cCollider implements iShape {
//     public alive: boolean = true;
//     public velocity: cVector = new cVector(0, 0);
//     public orientation: cVector = new cVector(1, 0);
//     public maxSpeedSQ: number = 25;
//     private _maxSpeed: number = 5;
//     public acceleration: number = 0.1;
//     protected _drawPointList: Array<cVector> = new Array<cVector>();

//     public lineWidth: number = 5;
//     public color: string = "white";
//     public size: number = 20;
//     public rotation: number = 0;

//     private _tempVec: cVector = new cVector(0, 0);

//     public accelerate = (): void => {
//         if (this.velocity.x == 0 && this.velocity.y == 0) {
//             this.velocity.copy(this.orientation);
//             this.velocity.multiply(this.acceleration);
//         }

//         this._tempVec.copy(this.orientation);
//         this._tempVec.multiply(this.acceleration);
//         this.velocity.add(this._tempVec);
//         if (this.velocity.magSq() >= this.maxSpeedSQ) {
//             this.velocity.multiply(this.maxSpeed / this.velocity.magnitude());
//         }
//     }

//     public shoot = (): void => {
//         if (bulletWait > 0) {
//             return;
//         }
//         bulletWait = 0.5;
//         var bullet: cBullet = cBullet.GetInactiveBullet();

//         if (bullet == null || bullet.active == true) {
//             bullet = new cBullet(this.position.x, this.position.y, 3);
//             bullet_array.push(bullet);
//         }
//         else {
//             bullet.position.x = this.position.x;
//             bullet.position.y = this.position.y;
//             bullet.active = true;
//         }
//         bullet.launch(this.orientation);
//     }

//     public decelerate = (): void => {
//         this.velocity.multiply(0.9);

//         if (this.velocity.magSq() < 1) {
//             this.velocity.x = 0;
//             this.velocity.y = 0;
//         }
//     }

//     get maxSpeed(): number {
//         return Math.sqrt(this.maxSpeedSQ);
//     }

//     set maxSpeed(value: number) {
//         this._maxSpeed = value;
//         this.maxSpeedSQ = value * value;
//     }

//     public draw = (): void => {
//         if (this.alive == false) {
//             return;
//         }

//         this.position.add( this.velocity );

//         if (this.position.x < -this.size * 2) {
//             this.position.x = 1280 + this.size * 2;
//         }
//         else if (this.position.x > 1280 + this.size * 2) {
//             this.position.x = -2 * this.size;
//         }

//         if (this.position.y < -this.size * 2) {
//             this.position.y = 720 + this.size * 2;
//         }
//         else if (this.position.y > 720 + this.size * 2) {
//             this.position.y = -2 * this.size;
//         }

//         ctx.save();
//         ctx.translate(this.position.x, this.position.y);
//         ctx.rotate(this.rotation);
//         ctx.beginPath();

//         ctx.strokeStyle = this.color;
//         ctx.lineWidth = this.lineWidth;

//         ctx.moveTo(this._drawPointList[this._drawPointList.length - 1].x,
//                             this._drawPointList[this._drawPointList.length - 1].y);

//         for (var i: number = 0; i < this._drawPointList.length; i++) {
//             ctx.lineTo(this._drawPointList[i].x, this._drawPointList[i].y);
//         }

//         ctx.closePath();

//         ctx.stroke();
//         ctx.restore();
//     }

//     public turnLeft = (): void => {
//         this.rotation -= 0.1;
//         if (this.rotation < 0) {
//             this.rotation += Math.PI * 2;
//         }
//         this.orientation.x = 1;
//         this.orientation.y = 0;
//         this.orientation.rotate(-this.rotation);
//     }

//     public turnRight = (): void => {
//         this.rotation += 0.1;
//         this.rotation %= Math.PI * 2;
//         this.orientation.x = 1;
//         this.orientation.y = 0;
//         this.orientation.rotate(-this.rotation);
//     }

//     constructor(x: number, y: number, size: number, color: string = "white", line_width: number = 2) {
//         super();
//         this.position.x = x;
//         this.position.y = y;
//         this.size = size;

//         this._pointList.push(new cVector(3 * size, 0));
//         this._pointList.push(new cVector(-2 * size, -2 * size));
//        // this._pointList.push(new cVector(-1 * size, 0));
//         this._pointList.push(new cVector(-2 * size, 2 * size));

//         this._drawPointList.push(new cVector(3 * size, 0));
//         this._drawPointList.push(new cVector(-2 * size, -2 * size));
//         this._drawPointList.push(new cVector(-1 * size, 0));
//         this._drawPointList.push(new cVector(-2 * size, 2 * size));
        

//         this.color = color;
//         this.lineWidth = line_width;
//     }

// }

// var keyInput: cKeyboardInput;

// window.onload = () => {
//     canvas = <HTMLCanvasElement>document.getElementById('cnvs');
//     ctx = canvas.getContext("2d");

//     space_ship = new cSpaceShip(200, 450, 8);

//     asteroid_array.push(new cAsteroid(850, 600, 20));
//     asteroid_array.push(new cAsteroid(150, 100, 20));
//     asteroid_array.push(new cAsteroid(650, 200, 20));
//     asteroid_array.push(new cAsteroid(1200, 500, 20));
//     asteroid_array.push(new cAsteroid(200, 600, 20));

//     keyInput = new cKeyboardInput();
    
//     // PRESS LEFT ARROW OR 'A' KEY
//     keyInput.addKeycodeCallback(37, space_ship.turnLeft);
//     keyInput.addKeycodeCallback(65, space_ship.turnLeft);

//     // PRESS UP ARROW OR 'W' KEY
//     keyInput.addKeycodeCallback(38, space_ship.accelerate);
//     keyInput.addKeycodeCallback(87, space_ship.accelerate);

//     // PRESS RIGHT ARROW OR 'D' KEY
//     keyInput.addKeycodeCallback(39, space_ship.turnRight);
//     keyInput.addKeycodeCallback(68, space_ship.turnRight);

//     // PRESS DOWN ARROW OR 'S' KEY
//     keyInput.addKeycodeCallback(40, space_ship.decelerate);
//     keyInput.addKeycodeCallback(83, space_ship.decelerate);

//     // PRESS SPACE BAR
//     keyInput.addKeycodeCallback(32, space_ship.shoot);

//     gameLoop();

// }

