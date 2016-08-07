/* global require, module, process */
(function() {

    'use strict';

    var lookupRoot,
        fs = require('fs'),
        path = require('path');

    /**
     *
     *
     *
     */
    function __look (filepath) {
        try {
            fs.statSync(filepath);
            return filepath;
        } catch (e) {
            throw new Error('Unable to find ' + filepath);
        }
    }

    /**
     *
     *
     *
     */
    function __findInModule (filename) {
        var fpath, dirname;
        try {
            dirname = path.dirname(module.parent.id);
            fpath = path.join(dirname, filename);
            __look(fpath);
            return fpath;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     *
     *
     *
     */
    function __findInHome (filename) {
        var fpath;
        try {
            fpath = path.join(process.env.HOME, filename);
            __look(fpath);
            return fpath;
        } catch (e) {
            return __findInModule(filename);
        }
    }

    /**
     *
     *
     *
     */
    function __findInCurrent (filename) {
        var fpath;
        try {
            fpath = path.join(process.cwd(), filename);
            __look(fpath);
            return fpath;
        } catch (e) {
            return __findInHome(filename);
        }
    }

    /**
     *
     *
     *
     */
    lookupRoot = function(filename) {
        try {
            return __findInCurrent(filename);
        } catch (e) {
            throw new Error(e.message);
        }
    };

    module.exports = lookupRoot;

}());
