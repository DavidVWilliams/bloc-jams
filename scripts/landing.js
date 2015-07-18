var pointsArray = document.getElementsByClassName('point');

var animatePoint = function (point) {
	point.style.opacity = 1;
	point.style.transform = "scaleX(1) translateY(0)";
	point.style.msTransform = "scaleX(1) translateY(0)";
	point.style.WebkitTransform = "scaleX(1) translateY(0)";
}


window.onload = function () {
		// Automatically animates the points on a tall screen where scrolling can't trigger the animation
		if (window.innerHeight > 950) {
		console.log("screen is tall")
			forEach(pointsArray, animatePoint)
		}

		window.addEventListener('scroll', function (event) {
			console.log("Current offset from the top is " + pointsArray[0].getBoundingClientRect().top + " pixels");

			if (pointsArray[0].getBoundingClientRect().top <= 500) {
			console.log("scrolled")
				forEach(pointsArray, animatePoint)
			}
		});