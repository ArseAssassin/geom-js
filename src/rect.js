var INSIDE = 0; // 0000
var LEFT = 1;   // 0001
var RIGHT = 2;  // 0010
var BOTTOM = 4; // 0100
var TOP = 8;    // 1000

function computeOutCode(point, rect)
{
  var code;
 
  code = INSIDE;          // initialised as being inside of clip window
 
  if (point[0] < rect[0])           // to the left of clip window
    code |= LEFT;
  else if (point[0] > rect[2])      // to the right of clip window
    code |= RIGHT;
  if (point[1] < rect[1])           // below the clip window
    code |= BOTTOM;
  else if (point[1] > rect[3])      // above the clip window
    code |= TOP;
 
  return code;
}

module.exports = {
  create: function(x0, y0, x1, y1) {
    return [x0, y0, x1, y1];
  },
  area: function(rect) {
    return Math.abs(rect[2] - rect[0]) * Math.abs(rect[3] - rect[1]);
  },
  pointIntersects: function(point, rect) {
    return point[0] > rect[0] && point[0] < rect[2] && point[1] > rect[1] && point[1] < rect[3];
  },
  rectIntersects: function(a, b) {
    var x1 = a[0],
        x2 = a[2],
        x3 = b[0],
        x4 = b[2],
        y1 = a[1],
        y2 = a[3],
        y3 = b[1],
        y4 = b[3];

    var w1 = Math.abs(x1 - x2)
    var h1 = Math.abs(y1 - y2)
    var w2 = Math.abs(x3 - x4)
    var h2 = Math.abs(y3 - y4)

    var _x = Math.max(x1, x3);
    var num1 = Math.min(x1 + w1, x3 + w2);
    var _y = Math.max(y1, y3);
    var num2 = Math.min(y1 + h1, y3 + h2);

    return num1 > _x && num2 > _y;
  },
  lineIntersects: function(rect, line) {
    var x0 = line[0],
        y0 = line[1],
        x1 = line[2],
        y1 = line[3],
        xmin = rect[0],
        ymin = rect[1],
        xmax = rect[2],
        ymax = rect[3];

    var outcode0 = computeOutCode([x0, y0], rect);
    var outcode1 = computeOutCode([x1, y1], rect);

    var accept = false;
   
    while (true) {
      if (!(outcode0 | outcode1)) { // Bitwise OR is 0. Trivially accept and get out of loop
        accept = true;
        break;
      } else if (outcode0 & outcode1) { // Bitwise AND is not 0. Trivially reject and get out of loop
        break;
      } else {
        var x, y;
   
        // At least one endpoint is outside the clip rectangle; pick it.
        var outcodeOut = outcode0 ? outcode0 : outcode1;
   
        // Now find the intersection point;
        // use formulas y = y0 + slope * (x - x0), x = x0 + (1 / slope) * (y - y0)
        if (outcodeOut & TOP) {           // point is above the clip rectangle
          x = x0 + (x1 - x0) * (ymax - y0) / (y1 - y0);
          y = ymax;
        } else if (outcodeOut & BOTTOM) { // point is below the clip rectangle
          x = x0 + (x1 - x0) * (ymin - y0) / (y1 - y0);
          y = ymin;
        } else if (outcodeOut & RIGHT) {  // point is to the right of clip rectangle
          y = y0 + (y1 - y0) * (xmax - x0) / (x1 - x0);
          x = xmax;
        } else if (outcodeOut & LEFT) {   // point is to the left of clip rectangle
          y = y0 + (y1 - y0) * (xmin - x0) / (x1 - x0);
          x = xmin;
        }
   
        // Now we move outside point to intersection point to clip
        // and get ready for next pass.
        if (outcodeOut == outcode0) {
          x0 = x;
          y0 = y;
          outcode0 = computeOutCode([x0, y0], rect);
        } else {
          x1 = x;
          y1 = y;
          outcode1 = computeOutCode([x1, y1], rect);
        }
      }
    }

    return accept;
  }
}