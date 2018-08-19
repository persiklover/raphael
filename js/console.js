function Console (imgWidth, imgHeight) {
	this.visible = true;

	this.borderWidth = 2;
	this.width = 650;
	this.height = 100;
	this.x = imgWidth/2 - this.width/2;
	this.y = imgHeight - this.height - this.borderWidth;
	
	this.icon = new Image();
	this.icon.src = 'img/icons/raphael-shy.png';
	this.text = new Text('*Мур-мяу');
	this.text.color = 'white';
	this.text.font = new Image();
	this.text.font.src = 'img/font8.png';

	this.canvas = document.getElementById('console-canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.canvas.style.bottom = this.y + 20 +'px';
	this.ctx = this.canvas.getContext('2d');
	this.ctx.scale(4, 4 * .8);

	this.ctx.imageSmoothingEnabled = false;
	this.ctx.mozImageSmoothingEnabled = false;
	this.ctx.oImageSmoothingEnabled = false;
	this.ctx.webkitImageSmoothingEnabled = false;
	this.ctx.msImageSmoothingEnabled = false;
}

Console.prototype.write = function (str) {
	this.text = new Text(str);
};

Console.prototype.update = function () {
	this.text.update();
};

Console.prototype.draw = function () {
	// ctx.save();

	// ctx.fillStyle = 'black';
	// ctx.fillRect(
	// 	this.x,
	// 	this.y,
	// 	this.width,
	// 	this.height
	// );

	// ctx.strokeStyle = 'pink';
	// ctx.lineWidth = this.borderWidth;
	// ctx.strokeRect(this.x, this.y, this.width, this.height);
	
	// ctx.restore();

	this.ctx.drawImage(this.icon, 2, 2);
	this.text.draw(this.ctx, 30, 5);
};