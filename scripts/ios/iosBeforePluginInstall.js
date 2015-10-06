#!/usr/bin/env node
// File: iosBeforePluginInstall.js
//
// Only runs when installing a plugin on iOS.  No need to specifically
// check for the iOS platform in the code below.

var dirname = 'OpenTok-iOS-2.6.0'
var tarball = dirname + '.tar.bz2';
var url = 'https://s3.amazonaws.com/artifact.tokbox.com/rel/ios-sdk/' + tarball;
var pluginDir, childProcess, execSync;

module.exports = function(context) {
  child_process =  context.requireCordovaModule('child_process');
  execSync = child_process.execSync;

  pluginDir = context.opts.plugin.dir;

  execSync('cd ' + pluginDir + '/src/ios; curl --silent ' + url + ' --output ' + tarball);
  execSync('cd ' + pluginDir + '/src/ios; if [ -d ' + dirname + ' ]; then rm -rf ' + dirname + '; fi');
  execSync('cd ' + pluginDir + '/src/ios; tar -zxvf ' + tarball);
  execSync('cd ' + pluginDir + '/src/ios; mv ' + dirname + '/OpenTok.framework .');
  execSync('cd ' + pluginDir + '/src/ios; if [ -d ' + dirname + ' ]; then rm -rf ' + dirname + '; fi');
}
