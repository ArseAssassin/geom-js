module.exports = {
  create: function(x0, y0, x1, y1) {
    return [x0, y0, x1, y1];
  },
  length: function(line) {
    return Math.sqrt(Math.pow(Math.abs(line[0] - line[2]), 2) + Math.pow(Math.abs(line[1] - line[3]), 2))
  },
  add: function(line, point, target) {
    if (!target)
      target = line;

    target[0] = line[0] + point[0]
    target[1] = line[1] + point[1]
    target[2] = line[2] + point[0]
    target[3] = line[3] + point[1]

    return target;
  }
}