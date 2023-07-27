const ROUNDING_PLACES = 4

function normalcdf(x) {
	var t = 1 / (1 + .2316419 * Math.abs(x));
	var d = .3989423 * Math.exp(-x * x / 2);
	var area = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
	if (x > 0) {
		area = 1 - area;
	}
	return Math.round(area * (10 ** ROUNDING_PLACES)) / (10 ** ROUNDING_PLACES);
} 