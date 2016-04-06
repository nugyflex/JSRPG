function drawEllipse(centerX, centerY, width, height) {
	
  ctx.beginPath();
  
  ctx.moveTo(centerX, centerY - height/2); // A1
  
  ctx.bezierCurveTo(
    centerX + width/2, centerY - height/2, // C1
    centerX + width/2, centerY + height/2, // C2
    centerX, centerY + height/2); // A2

  ctx.bezierCurveTo(
    centerX - width/2, centerY + height/2, // C3
    centerX - width/2, centerY - height/2, // C4
    centerX, centerY - height/2); // A1

  ctx.fill();
  ctx.closePath();	
}
function rectangle(x, y, width, height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}