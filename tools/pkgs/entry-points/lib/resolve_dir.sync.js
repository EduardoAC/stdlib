'use strict';

// MODULES //

var dirname = require( '@stdlib/utils/dirname' );
var resolveParentPath = require( '@stdlib/fs/resolve-parent-path' ).sync;


// MAIN //

/**
* Resolves a package directory.
*
* @private
* @param {string} main - main file path
* @returns {(string|Error)} package directory or an error
*/
function resolveDir( main ) {
	var path;
	var opts;
	opts = {
		'dir': dirname( main )
	};
	path = resolveParentPath( 'package.json', opts );
	if ( path instanceof Error ) {
		return path;
	}
	if ( path === null ) {
		return new Error( 'unexpected error. Unable to resolve package directory as unable to find a `package.json` in a parent directory.' );
	}
	return dirname( path );
} // end FUNCTION resolveDir()


// EXPORTS //

module.exports = resolveDir;
