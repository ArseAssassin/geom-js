rect = require "../src/rect"
point = require "../src/point"
line = require "../src/line"

assert = require "assert"

describe "rect", ->
  describe "create", ->
    it "should initialize an array", ->
      assert.deepEqual [2, 2, 3, 3], rect.create(2, 2, 3, 3)

  describe "area", ->
    it "should be calculated correctly", ->
      assert.equal rect.area(rect.create(2, 2, 4, 4)), 4

  describe "pointIntersects", ->
    it "should be calculated correctly", ->
      assert rect.pointIntersects(point.create(3, 3), rect.create(0, 0, 4, 4)) 

  describe "rectIntersects", ->
    it "should be calculated correctly", ->
      l = [
        {
          a: [0, 0, 3, 3]
          b: [2, 2, 5, 5]
        }
        {
          a: [2, 2, 5, 5]
          b: [0, 0, 3, 3]
        }
        {
          a: [2, 0, 4, 5]
          b: [0, 2, 5, 4]
        }
        {
          b: [2, 0, 4, 5]
          a: [0, 2, 5, 4]
        }
        {
          a: [0, 0, 5, 5]
          b: [1, 1, 4, 4]
        }
        {
          a: [0, 0, 5, 5]
          b: [-2, 1, 4, 4]
        }
      ]

      for testCase in l
        assert rect.rectIntersects(rect.create.apply(null, testCase.a), rect.create.apply(null, testCase.b))

  describe "lineIntersects", ->
    it "should be calculated correctly", ->
      l = [
        {
          a: [0, 0, 3, 3]
          b: [1, -1, 1, 4]
        }
        {
          a: [0, 0, 3, 3]
          b: [-1, 1, 4, 1]
        }
        {
          a: [1, 1, 2, 2]
          b: [0, 0, 3, 3]
        }

      ]

      for testCase in l
        assert rect.lineIntersects(rect.create.apply(null, testCase.a), line.create.apply(null, testCase.b))


