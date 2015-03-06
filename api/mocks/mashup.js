'use strict'

module.exports = {
  mashup: mashup
}

function mashup(req, res, next) {
  res.json([{name:'name', title:'title', speaker:'speaker'}])
}
