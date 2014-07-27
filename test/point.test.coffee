point = require "../src/point"
line = require "../src/line"

assert = require "assert"

describe "point", ->
  describe "create", ->
    it "should initialize an array", ->
      assert.deepEqual [2, 2], point.create(2, 2)

  describe "distance", ->
    it "should be calculated correctly", ->
      assert.equal point.distance(point.create(-2, 1), point.create(1, 5)), 5

  describe "add", ->
    it "should sum two points", ->
      a = point.add(point.create(0, 0), point.create(2, 2))
      assert.deepEqual [2, 2], a

    it "should modify target point", ->
      a = point.create(0, 0)
      b = point.create(2, 2)
      c = point.create(0, 0)

      point.add(a, b, c)
      assert.deepEqual [2, 2], c
      assert.deepEqual [0, 0], a

  describe "distanceFromLine", ->
    it "should be calculated correctly", ->
      l = line.create(0, 0, 10, 10)
      p = point.create(5, 5)

      assert.equal point.distanceFromLine(point.create(5, 5), l), 0
      assert.equal Math.floor(point.distanceFromLine(point.create(5, 6), l) * 100), 70

