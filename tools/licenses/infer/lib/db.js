'use strict';

// MODULES //

var debug = require( 'debug' )( 'licenses:infer:db' );
var join = require( 'path' ).join;
var readFile = require( '@stdlib/fs/read-file' ).sync;
var replace = require( '@stdlib/string/replace' );
var removePuncutation = require( '@stdlib/string/remove-punctuation' );
var RE_WHITESPACE = require( './re_whitespace.js' );
var RE_LIST_MARKS = require( './re_list_marks.js' );


// VARIABLES //

var LICENSES;
var names;
var fpath;
var text;
var opts;
var id;
var i;

opts = {
	'encoding': 'utf8'
};
names = [
	{
		'spdx': 'Artistic-2.0',
		'fname': 'artistic-2.0.txt'
	},
	{
		'spdx': 'Apache-2.0',
		'fname': 'apache-2.0.txt'
	},
	{
		'spdx': 'BSD-2-Clause',
		'fname': 'bsd-2-clause.txt'
	},
	{
		'spdx': 'BSD-3-Clause',
		'fname': 'bsd-3-clause.txt'
	},
	{
		'spdx': 'BSD-3-Clause',
		'fname': 'bsd-3-clause.d3.txt'
	},
	{
		'spdx': 'BSL-1.0',
		'fname': 'bsl-1.0.txt'
	},
	{
		'spdx': 'CC0-1.0',
		'fname': 'cc0-1.0.txt'
	},
	{
		'spdx': 'ISC',
		'fname': 'isc.txt'
	},
	{
		'spdx': 'MIT',
		'fname': 'mit.txt'
	},
	{
		'spdx': 'MPL-2.0',
		'fname': 'mpl-2.0.txt'
	},
	{
		'spdx': 'Unlicense',
		'fname': 'unlicense.txt'
	},
	{
		'spdx': 'WTFPL',
		'fname': 'wtfpl.txt'
	}
];

LICENSES = {};

debug( 'Loading license text...' );
for ( i = 0; i < names.length; i++ ) {
	id = names[ i ].spdx;
	fpath = join( __dirname, 'licenses', names[ i ].fname );

	debug( 'Reading license file: %s.', fpath );
	text = readFile( fpath, opts );
	if ( text instanceof Error ) {
		throw text;
	}
	debug( 'Normalizing license text.' );
	text = removePuncutation( text );
	text = replace( text, RE_LIST_MARKS, '' );
	text = replace( text, RE_WHITESPACE, '|' );
	text = replace( text, /\|$/, '' ); // remove final `|` (if present)

	debug( 'Storing license text using SPDX identifier: %s.', id );
	LICENSES[ id ] = {
		'spdx': id,
		'text': text
	};
}
debug( 'Successfully loaded licenses.' );


// EXPORTS //

module.exports = LICENSES;
