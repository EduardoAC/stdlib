# Infer Licenses

> Infer license information from file content.


<section class="intro">

</section>

<!-- /.intro -->


<section class="usage">

## Usage

``` javascript
var infer = require( '@stdlib/tools/licenses/infer' );
```

#### infer( pkgs, pattern, clbk )

Infers license information from the content of files found using a provided glob `pattern`.

``` javascript
var licenses = require( '@stdlib/tools/licenses/licenses' );

var pattern = '{readme*,licen[cs]e*,copying*}';

licenses( onResults );

function onResults( error, results ) {
    if ( error ) {
        throw error;
    }
    infer( results, pattern, onInfer ) );
}

function onInfer( error, results ) {
    if ( error ) {
        throw error;
    }
    console.dir( results );
}
```

</section>

<!-- /.usage -->


<section class="examples">

<!-- ## Examples

``` javascript

``` -->

</section>

<!-- /.examples -->


---

<section class="cli">

## CLI

<section class="usage">

### Usage

``` bash
Usage: licenses-infer [options]

Options:

  -h,    --help                      Print this message.
  -V,    --version                   Print the package version.
         --pattern pattern           Glob pattern used to find files.
```

</section>

<!-- /.usage -->


<section class="notes">

### Notes

* Use as part of a standard stream pipeline.

</section>

<!-- /.notes -->


<section class="examples">

### Examples

To pretty print license results,

``` bash
$ licenses | licenses-infer
```

Example output:

``` text

Package license information:

fs.realpath@1.0.0
├── path: /path/to/node_modules/fs.realpath
├── repo: https://github.com/isaacs/fs.realpath
├── package.json: ISC
├── license: ISC
└── license: MIT

spdx-correct@1.0.2
├── path: /path/to/node_modules/spdx-correct
├── repo: https://github.com/kemitchell/spdx-correct.js
├── package.json: Apache-2.0
├── license: Apache-2.0
└── readme: MIT

spdx-expression-parse@1.0.3
├── path: /path/to/node_modules/spdx-expression-parse
├── repo: https://github.com/kemitchell/spdx-expression-parse.js
├── package.json: (MIT AND CC-BY-3.0)
├── readme: MIT
└── license: MIT
```

To use as part of a pipeline,

``` bash
$ licenses | licenses-infer | cat
{"id":"...","parents":["..."],...,"licenses":{...}}
{"id":"...","parents":["..."],...,"licenses":{...}}
...
```


</section>

<!-- /.examples -->

</section>

<!-- /.cli -->


<section class="links">

</section>

<!-- /.links -->
