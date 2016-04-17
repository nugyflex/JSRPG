var keypressed =
{
    w: false,
    s: false,
    a: false,
    d: false,
    space: false,
    z: false,
    shootcooldown: false,
    x: false,
    e: false,
    f: false,
    mouse: false,
    k: false,
    q: false,
    r: false
};
function mouseDown(event) {
keypressed.mouse = 1;	
}

function mouseUp(event) {
keypressed.mouse = 0;	
}

function onKeyDown(event) {

    var e = event.keyCode;

    switch (e)//if (e == 39) {
    {
        case 68:
            keypressed.d = 1;
            break;
            
        case 16:
            keypressed.shift = 1;
            break;


        case 65:
            keypressed.a = 1;
            break;

        case 32:

            keypressed.space = 1;
            break;

        case 87:
            keypressed.w = 1;
            break;

        case 83:
            keypressed.s = 1;
            break;

        case 88:
            keypressed.x = 1;
            break;

        case 90:
            keypressed.z = 1;
            break;

        case 81:
            keypressed.q = 1;
            break;

        case 82:
            keypressed.r = 1;
            break;
            
        case 27:
            if (debug == 1){
				debug = 0;
			}
			else {
				debug = 1;
			}
            break;

        case 69:
            keypressed.e = 1;
            break;

        case 70:
            keypressed.f = 1;
            break;
        case 71:
            keypressed.g = 1;
            break;

        case 75:
            keypressed.k = 1;
            break;
    }


}

function onKeyUp(event) {

    var k = event.keyCode;

    switch (k) {
        case 68:
            keypressed.d = 0;
            break;
            
         case 16:
            keypressed.shift = 0;
            break;


        case 65:
            keypressed.a = 0;
            break;


        case 32:

            keypressed.space = 0;

            break;

        case 87:
            keypressed.w = 0;
            break;

        case 83:
            keypressed.s = 0;
            break;

        case 88:
            keypressed.x = 0;
            break;

        case 90:
            keypressed.z = 0;
            break;

        case 69:
            keypressed.e = 0;
            break;

        case 70:
            keypressed.f = 0;
            break;

        case 71:
            keypressed.g = 0;
            break;
        case 75:
            keypressed.k = 0;
            break;
            
        case 81:
            keypressed.q = 0;
            break;

        case 82:
            keypressed.r = 0;
            break;
    }
}

