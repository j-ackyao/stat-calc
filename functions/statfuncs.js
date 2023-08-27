const ROUNDING_PLACES = 4;
const APPROX_WIDTH = 0.0001;
const STOP_SD = 100;

const DENSITY_ITER = 1 / APPROX_WIDTH;


// uses trapezoid approximation
function normcdf(x, width = APPROX_WIDTH, stop_sd = STOP_SD) {
    var sum = (normpdf(x) + normpdf(-stop_sd * 2))/2;
    curr_x = x - width;
    while (curr_x >= -stop_sd) {
        sum += normpdf(curr_x);
        curr_x -= width;
    }
    return sum * width;
} 

function normpdf(x, mu = 0, sd = 1) {
    return 1 / (sd * Math.sqrt(2 * Math.PI) * Math.exp(0.5 * Math.pow((x-mu)/sd, 2)));
}

function normd(mu = 0, sd = 1, iter = DENSITY_ITER, stop_sd = STOP_SD) {
    var y_density = [];
    var x_density = [];
    var width = stop_sd * 2 * sd / iter;
    var center = Math.floor(iter / 2);

    for (var i = 0; i <= iter; i++) {
        x = (i - center) * width;
        x_density.push(x * sd + mu);
        y_density.push(normpdf(x, mu, sd));
    }

    return [x_density, y_density];
}

function drawnormmodel(canvas, mean, sd) {
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const density = normd(mean, sd);

    context.beginPath();
    
    context.moveTo(0, height - density[1][0] - 10);
    for (var i = 0; i < density[0].length; i++) {
        context.lineTo(width / 2 + density[0][i] / 10 * width / 2, height - density[1][i] * 100 - 10);
    }

    context.stroke();
    context.closePath();

    // context.fillStyle = "rgba(255, 0, 0, 0.3)";
    // context.fill();


}


function round(x, decimals = ROUNDING_PLACES) {
    return Math.round(x * Math.pow(10, decimals));
}