const models = require('../models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);

exports.seed = function(knex, Promise) {
  return knex('taglets').del()
  .then(function() {
    return knex('taglets').insert([
      { value: "Calculus",  tag_id: 1},
      { value: "Algebra", tag_id: 1},
      { value: "Geometry", tag_id: 1},
      { value: "Precalculus", tag_id: 1},
      { value: "Trignometry", tag_id: 1},
      { value: "Derivatives", tag_id: 1},
      { value: "Logarithmic functions", tag_id: 1},
      { value: "Limits", tag_id: 1},
      { value: "Functions", tag_id: 1},
      { value: "Exponential functions", tag_id: 1},
      { value: "Matrices", tag_id: 1},
      { value: "Vectors", tag_id: 1},
      { value: "Polynomials", tag_id: 1},
      { value: "Quadratic functions", tag_id: 1},
      { value: "Probability", tag_id: 1},
      { value: "Statistics", tag_id: 1},
      { value: "Roots and Rational Exponents", tag_id: 1},
      { value: "Radical functions", tag_id: 1},
      { value: "Inequalities", tag_id: 1},
      { value: "Polar form", tag_id: 1},
      { value: "Sequences and series", tag_id: 1},
      { value: "Ellipses", tag_id: 1},
      { value: "Hyperbolas", tag_id: 1},
      { value: "Angles", tag_id: 1},
      { value: "Factoring", tag_id: 1},
      { value: "Complex numbers", tag_id: 1},
      { value: "Parabolas", tag_id: 1},
      { value: "Circles", tag_id: 1},
      { value: "Variable Expressions", tag_id: 1},
      { value: "Congruent triangles", tag_id: 1},
      { value: "Quadrilaterals", tag_id: 1},
      { value: "Right triangles", tag_id: 1},
      { value: "Coordinate Plane", tag_id: 1},
      { value: "Points, lines, segments", tag_id: 1},
      { value: "Area", tag_id: 1},
      { value: "Perimeter", tag_id: 1},
      { value: "Ratios", tag_id: 1},
      { value: "Absolute value", tag_id: 1},
      { value: "Scientific Notation", tag_id: 1},
      { value: "Percents", tag_id: 1},
      { value: "Graphs", tag_id: 1},
      { value: "Prime numbers", tag_id: 1},
      { value: "Rational numbers", tag_id: 1},
      { value: "Addition", tag_id: 1},
      { value: "Multiplication", tag_id: 1}

    ]);
  })
  .catch((error) => {
    console.log(error);
  });
};