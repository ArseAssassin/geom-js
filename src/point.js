module.exports = {
  create: function(x, y) {
    return [x, y];
  },
  distance: function(a, b) {
    return Math.sqrt(
      Math.pow(Math.abs(a[0] - b[0]), 2) + Math.pow(Math.abs(a[1] - b[1]), 2)
    )
  },
  distanceFromLine: function (point, line){
    function dist2(v, w) {  }

    var x0 = point[0];
    var y0 = point[1];

    var x1 = line[0];
    var y1 = line[1];

    var x2 = line[2];
    var y2 = line[3];

    var Dx = (x2 - x1);
    var Dy = (y2 - y1);

    var numerator = Math.abs(Dy*x0 - Dx*y0 - x1*y2 + x2*y1);
    var denominator = Math.sqrt(Dx*Dx + Dy*Dy);
    if (denominator == 0) 
      return Math.pow(point[0] - line[0], 2) + Math.pow(point[1] - line[1], 2)

    return numerator/denominator;
  },
  add: function(a, b, target) {
    if (!target)
      target = a;

    target[0] += a[0] + b[0]
    target[1] += a[1] + b[1]

    return target;
  }
}