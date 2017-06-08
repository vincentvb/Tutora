const models = require('../models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);

exports.seed = function(knex, Promise) {
  return knex('taglets').del()
  .then(function() {
    // return knex('taglets').insert([{
  //     value: "Calculus", 
  //     tag_id: 1
  //   }]);
  // })
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
      { value: "Multiplication", tag_id: 1}, 
      { value: "Mechanics", tag_id: 5},
      { value: "Kinematics", tag_id: 5},
      { value: "Fluid Mechanics", tag_id: 5},
      { value: "Thermodynamics", tag_id: 5},
      { value: "Electricity", tag_id: 5},
      { value: "Magnetism", tag_id: 5},
      { value: "Oscillations and Waves", tag_id: 5},
      { value: "Particle Physics", tag_id: 5},
      { value: "Atomic Physics", tag_id: 5},
      { value: "Nuclear Physics", tag_id: 5},
      { value: "Gauss's law", tag_id: 5},
      { value: "Quantum Mechanics", tag_id: 5},
      { value: "Newton's Laws", tag_id: 5},
      { value: "Homeostasis", tag_id: 9},
      { value: "Cell", tag_id: 9},
      { value: "Virology", tag_id: 9},
      { value: "Immunology", tag_id: 9},
      { value: "Evolution", tag_id: 9},
      { value: "Taxonomy", tag_id: 9},
      { value: "Botany", tag_id: 9},
      { value: "Zoology", tag_id: 9},
      { value: "Ecology", tag_id: 9},
      { value: "Diffusion and Osmosistop", tag_id: 9},
      { value: "World History", tag_id: 3},
      { value: "US History", tag_id: 3},
      { value: "Presidents", tag_id: 3},
      { value: "American Revolution", tag_id: 3},
      { value: "Cold War", tag_id: 3},
      { value: "Acids and Bases", tag_id: 6},
      { value: "Elements", tag_id: 6},
      { value: "Compounds", tag_id: 6},
      { value: "Measurement", tag_id: 6},
      { value: "Gases", tag_id: 6},
      { value: "Periodic Table", tag_id: 6},
      { value: "Covalent Bond", tag_id: 6},
      { value: "Metals", tag_id: 6},
      { value: "Oxidation-Reduction", tag_id: 6},
      { value: "Conjunctions", tag_id: 8},
      { value: "Punctuation", tag_id: 8},
      { value: "Articles/Determiners", tag_id: 8},
      { value: "Prepositions", tag_id: 8},
      { value: "Causatives", tag_id: 8},
      { value: "Conditionals", tag_id: 8},
      { value: "Adverbs", tag_id: 8},
      { value: "Nouns", tag_id: 8},
      { value: "Verbs", tag_id: 8}




    ]);
  })
  .catch((error) => {
    console.log(error);
  });
};