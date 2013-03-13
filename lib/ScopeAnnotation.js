var AbstractAnnotation = require('sonata-annotationparser').AbstractAnnotation,
    path = require('path'),
    Utils = require('./Utils'),
    inherits = require('util').inherits;

var SCOPE = {
    SINGLETON: 'singleton',
    PROTOTYPE: 'prototype',
    STATIC: 'static'
};

function ScopeAnnotation() {
    ScopeAnnotation.super_.call(this);
    this.tagName = 'Scope';
    this.containerConfig = require('../ConfigManagers/ContainerConfig.js');
}

inherits(ScopeAnnotation, AbstractAnnotation);

ScopeAnnotation.prototype.run = function(value, target, file, filePath) {
    if (Utils.isString(value) || (value === Object(value) && value.hasOwnProperty('name'))) {
        var scope;
        if (Utils.isString(value)) {
            scope = value;
        } else {
            scope = value.name;
        }

        var realPath = filePath;
        var name = path.basename(file, '.js');
        if (Utils.isString(target) && target.toLowerCase() === 'function') {
            this.addConfig(name, realPath, scope);
        }
    }
};

ScopeAnnotation.prototype.addConfig = function(name, path, scope) {
    var config = {};
    config.module = path;
    config.scope = scope;
    this.containerConfig.addConfig(name, config);
};

module.exports = ScopeAnnotation;