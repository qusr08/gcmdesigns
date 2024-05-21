class Swoopy {
    constructor(wrapper, pointSpeed, scrollSpeed) {
        this.wrapper = wrapper;
        this.canvas = wrapper.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.simplexNoise = new SimplexNoise();
        this.fillColor = window.getComputedStyle(wrapper).color;
        this.pointSpeed = pointSpeed;
        this.scrollSpeed = scrollSpeed;
        this.point1 = { x: 0, y: 0, n: Math.random() * 100 };
        this.point2 = { x: 0, y: 0, n: Math.random() * 100 };
        this.shapes = [[]];
        this.crossed = null;

        this.resize();

        // Generate a bunch of shapes in the beginning when the page loads
        let preGenIterations = Math.abs(window.screen.width / scrollSpeed);
        for (let i = 0; i < preGenIterations; i++) {
            this.update(false);
        }
    }

    resize() {
        this.canvas.width = this.wrapper.offsetWidth;
        this.canvas.height = this.wrapper.offsetHeight;
    }

    update(doDraw) {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Set draw style
        this.ctx.fillStyle = this.fillColor;

        // Shift all shapes to the left and then draw them
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            // Only draw the shape if there are at least two points in the shape
            if (this.shapes[i].length < 3) {
                continue;
            }

            // If the rightmost point of the current shape is off the left side of the screen, then delete the shape
            if (this.shapes[i][Math.ceil(this.shapes[i].length / 2)].x < -window.screen.width) {
                this.shapes.splice(i, 1);
                continue;
            }

            // Create a path using all of the points in the shape
            // All points should already be listed counter clockwise
            if (doDraw) {
                this.ctx.beginPath();
                this.ctx.moveTo((this.shapes[i][0].x += this.scrollSpeed) + this.canvas.width, this.shapes[i][0].y * (this.canvas.height / 2) + (this.canvas.height / 2));
                for (let j = 1; j < this.shapes[i].length; j++) {
                    this.ctx.lineTo((this.shapes[i][j].x += this.scrollSpeed) + this.canvas.width, this.shapes[i][j].y * (this.canvas.height / 2) + (this.canvas.height / 2));
                }
                this.ctx.closePath();
                this.ctx.fill();
            } else {
                for (let j = 0; j < this.shapes[i].length; j++) {
                    this.shapes[i][j].x += this.scrollSpeed;
                }
            }
        }

        // Update points
        this.point1.n += this.pointSpeed;
        this.point2.n -= this.pointSpeed;
        this.point1.y = this.simplexNoise.noise(0, this.point1.n, 0);
        this.point2.y = this.simplexNoise.noise(this.point2.n, 0, 0);

        // If crossed is equal to null, then set its initial value based on the positions of the points
        // This prevents the points from "crossing" when the program first starts
        if (this.crossed == null) {
            this.crossed = this.point1.y > this.point2.y;
        }

        // If the two points have crossed, make a new shape
        if ((this.crossed && this.point1.y < this.point2.y) || (!this.crossed && this.point2.y < this.point1.y)) {
            // Invert the crossed variable
            this.crossed = !this.crossed;

            // Get the index in the center of the shape
            let currentShapeIndex = this.shapes.length - 1;
            let centerIndex = Math.ceil(this.shapes[currentShapeIndex].length / 2);

            // https://www.topcoder.com/thrive/articles/Geometry%20Concepts%20part%202:%20%20Line%20Intersection%20and%20its%20Applications
            let prevDrawPoint1 = this.shapes[currentShapeIndex][centerIndex - 1];
            let a1 = this.point1.y - prevDrawPoint1.y;
            let b1 = prevDrawPoint1.x - 0;
            let c1 = (a1 * prevDrawPoint1.x) + (b1 * prevDrawPoint1.y);

            let prevDrawPoint2 = this.shapes[currentShapeIndex][centerIndex];
            let a2 = this.point2.y - prevDrawPoint2.y;
            let b2 = prevDrawPoint2.x - 0;
            let c2 = (a2 * prevDrawPoint2.x) + (b2 * prevDrawPoint2.y);

            let det = (a1 * b2) - (a2 * b1);
            if (det != 0) {
                let x = ((b2 * c1) - (b1 * c2)) / det;
                let y = ((a1 * c2) - (a2 * c1)) / det;

                this.shapes[currentShapeIndex].splice(centerIndex, 0, { x: x, y: y });
                this.shapes.push([{ x: x, y: y }]);
            } else {
                this.shapes.push([]);
            }
        }

        // Get the index in the center of the shape
        // Need to do this again because the current shape may have changed
        let currentShapeIndex = this.shapes.length - 1;
        let centerIndex = Math.ceil(this.shapes[currentShapeIndex].length / 2);

        // Push the new points to the current shape
        // Since the points need to be counter clockwise inside the array, they need to be inserted into the middle of the list
        this.shapes[currentShapeIndex].splice(centerIndex, 0, { x: 0, y: this.point1.y });
        this.shapes[currentShapeIndex].splice(centerIndex + 1, 0, { x: 0, y: this.point2.y });
    }
}