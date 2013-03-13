var AbstractAnnotation = require('sonata-annotationparser').AbstractAnnotation,
    path = require('path'),
    Utils = require('./Utils'),
    inherits = require('util').inherits;

function RessourceAnnotation() {
    RessourceAnnotation.super_.call(this);
    this.tagName = 'Ressource';
    this.containerConfig = require('../ConfigManagers/ContainerConfig');
}

inherits(RessourceAnnotation, AbstractAnnotation);

RessourceAnnotation.prototype.run = function(value, target, file, filePath) {
    if (Utils.isString(value) || (value === Object(value) && value.hasOwnProperty('name'))) {
        var ref;
        if (Utils.isString(value)) {
            ref = value;
        } else {
            ref = value.name;
        }

        var realPath = filePath;
        var name = path.basename(file, '.js');
        if (Utils.isString(target) && target.toLowerCase() !== 'function') {
            this.addConfig(name, realPath, target, ref);
        }
    }
};


RessourceAnnotation.prototype.addConfig = function(name, path, target, ref) {
    var config = {};
    config.module = path;
    config.props = {};
    config.props[target] = {ref: ref};
    this.containerConfig.addConfig(name, config);
};

module.exports = RessourceAnnotation;