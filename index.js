'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');
var rimraf = require('rimraf');
var chalk = require('chalk');

function upperCaseWindowsRoot(dir) {
  var splitPath = dir.split(path.sep);
  splitPath[0] = splitPath[0].toUpperCase();
  return splitPath.join(path.sep);
}

function CleanThemeWebpackPlugin(options) {

  options = options || {};
  options.root = options.root || path.dirname(module.parent.filename);

  this.options = options;
  this.paths = this.options.theme.map((item) => {
    return `${this.options.root}/${item}/*.js`;
  });
}

var clean = function(compilation) {
  var _this = this;
  var results = [];
  var workingDir;
  var dirName;
  var projectRootDir;

  if (_this.paths === void 0) {
    return null;
  }

  _this.paths.forEach(function(rimrafPath) {
    rimrafPath = path.resolve(_this.options.root, rimrafPath);

    if (os.platform() === 'win32') {
      rimrafPath = upperCaseWindowsRoot(rimrafPath);
    }

    rimraf.sync(rimrafPath);
    Object.keys(compilation.assets).forEach((item) => {
      const dir = path.parse(item).dir;
      const ext = path.parse(item).ext;
      _this.options.theme.forEach((i) => {
        if (dir && dir.indexOf(i) > -1 && ext === '.js') {
          delete compilation.assets[item];
        }
      })
    })

  });
};

CleanThemeWebpackPlugin.prototype.apply = function(compiler) {
  const _this = this;
  compiler.plugin("emit", function(compilation, callback) {
    clean.call(_this, compilation);
    callback();
  });
};

module.exports = CleanThemeWebpackPlugin;
