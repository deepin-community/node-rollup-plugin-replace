import pkg from './package.json';

const external = Object.keys(pkg.dependencies).concat('path');

var plugins = [];

switch(process.env.TRANSPILE) {
case 'babel6':
    var babel=require('rollup-plugin-babel');
    const plugins_babel6 = [
      babel({
	babelrc: false,
	presets: [[process.env.BABEL_PRESET, { modules: false }]],
    }),
    ];
    plugins = plugins_babel6; break;
case 'babel7':
    var babel=require('rollup-plugin-babel');
    const plugins_babel7 = [
      babel(),
    ];
    plugins = plugins_babel7; break;
case 'none':
    plugins = []; break;
default:
    var buble=require('rollup-plugin-buble');
    const plugins_buble = [
    buble()
    ];
    plugins = plugins_buble;
}

export default {
  input: 'src/index.js',
  plugins: plugins,
  external,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ]
};
