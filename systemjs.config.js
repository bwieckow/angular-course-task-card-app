(function (global) {
    System.config({
        paths: {
            'npm:': 'node_modules/'      // Tells where to install dependencies files
        },
        map: {
            app: 'app',                 // Tells where things are?
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',           // Shows where to find those modules -- 'npm:' == 'node_modules/'
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': "npm:@angular/compiler/bundles/compiler.umd.js",
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api'
        },

        packages: {
            app: {  // File names extensions -- we define that for default use .js
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);