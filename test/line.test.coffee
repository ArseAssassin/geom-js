line = require "../src/line"
point = require "../src/point"

assert = require "assert"

describe "line", ->
  describe "create", ->
    it "should initialize an array", ->
      assert.deepEqual [2, 2, 3, 3], line.create(2, 2, 3, 3)

  describe "length", ->
    it "should be calculated correctly", ->
      assert.equal line.length(line.create(-2, 1, 1, 5)), 5

  describe "add", ->
    it "should add point to both ends", ->
      a = line.add(line.create(0, 0, 3, 3), point.create(2, 2))
      assert.deepEqual [2, 2, 5, 5], a

    it "should modify target line", ->
      a = line.create(0, 0, 3, 3)
      b = line.create(0, 0, 0, 0)
      c = point.create(2, 2)

      line.add(a, c, b)
      assert.deepEqual [0, 0, 3, 3], a
      assert.deepEqual [2, 2, 5, 5], b




