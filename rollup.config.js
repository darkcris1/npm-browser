// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const libraryName = 'npm' // Change with your library's name

const banner = `/*!
 * ${pkg.name}
 * ${pkg.description}
 *
 * @version v${pkg.version}
 * @author ${pkg.author}
 * @license ${pkg.license}
 */`

export default (commandLineArgs) => {
	const isProd = commandLineArgs.environment === 'BUILD:production'
  const configs = [
  	    {
      input: 'src/index.js',
      output: {
        banner,
        name: libraryName,
        file: `dist/npm-browser.min.js`,
        format: 'umd',
      },
      plugins: [
        // Uncomment the following 2 lines if your library has external dependencies
        // resolve(), // teach Rollup how to find external modules
        // commonjs(), // so Rollup can convert external modules to an ES module
        isProd && babel({
          exclude: ['node_modules/**'],
        }),
        isProd && terser({
          output: {
            comments: /^!/,
          },
        }),
      ],
    }
  ]
  return configs
}
