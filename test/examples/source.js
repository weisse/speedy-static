const p = require("path");
const fs = require("fs");
const zlib = require("zlib");
const uglifyjs = require("uglify-js");
const etag = require("etag");
const sourceInfo = require(p.resolve(__dirname, "./sourceInfo.js"));

module.exports = function(fileName){
	
	var object = sourceInfo(fileName);
	var buffer = fs.readFileSync(fileName);
	var minimizedBuffer = new Buffer(uglifyjs.minify(buffer.toString("utf8"), {
		mangle:false,
		fromString:true
	}).code, "utf8");
	var minimizedMangledBuffer = new Buffer(uglifyjs.minify(buffer.toString("utf8"), {
		mangle:true,
		fromString:true
	}).code, "utf8");
	var bestBuffer = zlib.gzipSync(minimizedMangledBuffer,{level:zlib.Z_BEST_COMPRESSION});
	
	object.MINIMIZED_SIZE = minimizedBuffer.length;
	object.MINIMIZED_MANGLED_SIZE = minimizedMangledBuffer.length;
	object.BEST_SIZE = bestBuffer.length;
	
	return object;
	
}(__filename);