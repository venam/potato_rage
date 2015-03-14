function cramerResolution(a,b,c,d,e,f) {
	/*
	 * ax+by = e
	 * cx+dy = f
	 */
	var determinant = a*d - b*c;
	var x = (e*d - b*f)/determinant;
	var y = (a*f - e*c)/determinant;
	return {
		x: x,
		y: y
	};
}

function linearEquation(x,a,b) {
	return (a*x+b);
}

