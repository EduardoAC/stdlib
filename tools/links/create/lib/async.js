'use strict';

// MODULES //

var debug = require( 'debug' )( 'links:create:async' );
var writeFile = require( 'fs' ).writeFile;
var resolve = require( 'path' ).resolve;
var instanceOf = require( '@stdlib/assert/instance-of' );
var isFunction = require( '@stdlib/assert/is-function' );
var readJSON = require( '@stdlib/fs/read-json' );
var cwd = require( '@stdlib/utils/cwd' );
var config = require( './defaults.js' );
var validate = require( './validate.js' );
var insert = require( './insert.js' );


// MAIN //

/**
* Creates a link entry in a links database.
*
* @param {Options} options - options
* @param {string} options.uri - link URI
* @param {string} options.id - unique link identifier
* @param {string} options.description - link description
* @param {StringArray} [options.keywords] - link keywords
* @param {string} [options.database] - path to a link database file (JSON)
* @param {Callback} clbk - callback to invoke upon completion
* @throws {TypeError} first argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} second argument must be a function
*
* @example
* var opts = {
*     'uri': 'http://stdlib.io/',
*     'id': 'stdlib',
*     'description': 'A standard library for JavaScript and Node.js.'
* };
*
* function done( error ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( 'Success' );
* }
*
* create( opts, done );
*/
function create( options, clbk ) {
	var fopts;
	var opts;
	var err;
	var db;

	fopts = {
		'encoding': 'utf8'
	};
	opts = {
		'database': config.database
	};
	err = validate( opts, options );
	if ( instanceOf( err, Error ) ) {
		throw err;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Last argument must be a function. Value: `'+clbk+'`.' );
	}
	opts.database = resolve( cwd(), opts.database );
	debug( 'Link details: %s', JSON.stringify( opts ) );

	readJSON( opts.database, fopts, onRead );

	/**
	* Callback invoked upon reading a database file.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {JSON} database - database contents
	* @returns {void}
	*/
	function onRead( error, database ) {
		if ( error ) {
			debug( 'Encountered an error when reading a database file: %s', error.message );
			return done( error );
		}
		debug( 'Successfully read a database file.' );
		db = database;

		debug( 'Attempting to create database entry...' );
		entry();
	} // end FUNCTION onRead()

	/**
	* Attempts to insert a link into a database file.
	*
	* @private
	* @returns {void}
	*/
	function entry() {
		var out = insert( db, opts );
		if ( instanceOf( out, Error ) ) {
			debug( 'Encountered an error when attempting to create database entry: %s', out.message );
			return done( out );
		}
		debug( 'Successfully created database entry.' );

		debug( 'Writing updated database to file...' );
		out = JSON.stringify( out, null, 2 );
		writeFile( opts.database, out, fopts, onWrite );
	} // end FUNCTION entry()

	/**
	* Callback invoked upon updating a database on disk.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {void}
	*/
	function onWrite( error ) {
		if ( error ) {
			debug( 'Encountered an error when writing a database to file: %s', error.message );
			return done( error );
		}
		debug( 'Successfully wrote database to file.' );
		done();
	} // end FUNCTION onWrite()

	/**
	* Callback invoked upon completion.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {void}
	*/
	function done( error ) {
		if ( error ) {
			return clbk( error );
		}
		debug( 'Finished.' );
		clbk();
	} // end FUNCTION done()
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
