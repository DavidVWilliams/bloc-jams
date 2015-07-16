//var houseStark = ["Ned", "Catelyn", "Robb", "Sansa", "Arya", "Bran", "Rickon"];
//
//function battleCry(element) {
//    console.log(element + " cries: For Winterfell!");
//}
//
//houseStark.forEach(battleCry); // prints "Ned cries: For Winterfell!"
//                               //        ...
//                               //        "Rickon cries: For Winterfell!"

/*
- Write a forEach function like the one we implement in the resource in the utilities.js file.
- Replace the for loop in the animatePoints function with a forEach block and confirm that the selling points still animate properly.
*/

var pointsArray = document.getElementsByClassName('point');
var animatePoints = function (points) {
  var revealPoint = function (element) {
    element.style.opacity = 1;
    element.style.transform = "scaleX(1) translateY(0)";
    element.style.msTransform = "scaleX(1) translateY(0)";
    element.style.WebkitTransform = "scaleX(1) translateY(0)";
    };
  Array.prototype.forEach.call(points,revealPoint);
  /*for (var i = 0; i < points.length; i++){
    revealPoint(i);
  } */
};
window.onload = function() {
  if (window.innerHeight > 950){
    animatePoints(pointsArray);
  }
  window.addEventListener('scroll', function(event){
    if (pointsArray[0].getBoundingClientRect().top <= 500) {
      animatePoints(pointsArray);
    }
  });
};
