const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)

// NOTE: DO NOT ADD THE RELATIVE PATH TO THE CSS FILE. JUST THE NAME
module.exports = withNativeWind(config, { input: 'global.css' })
