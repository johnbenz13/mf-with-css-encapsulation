const STAGE_DEFAULT = 0;
const filteredLibraries = [
    'wix-style-react', 
    '@johnbenz13/shared-library'
];
const ProvideSharedDependency = require('webpack/lib/sharing/ProvideSharedDependency');

module.exports = class WebpackDummyPlugin {
    constructor() {
        this.wsrImportedModules = [];
    }
    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {
        compiler.hooks.finishMake.tapPromise("WebpackDummyPlugin", compilation => {
            const wsrImportedModules = [];
            const { modules } = compilation;
            for (const module of modules) {
                for (const dep of module.dependencies) {
                    try {
                        if (module.userRequest && dep.userRequest && filteredLibraries.some(lib => dep.userRequest === lib)) { 
                            // Inspired by https://github.com/webpack/webpack/blob/main/lib/FlagDependencyUsagePlugin.js#L213
                            const depRefs = compilation.getDependencyReferencedExports(dep) || [];
                            
                            depRefs.forEach(depRef => {
                                depRef.forEach(ref => {
                                    wsrImportedModules.push(ref);
                                });
                            });
                        }
                    } catch(e) {
                        console.log(`Not refExp for ${module.userRequest} -> ${dep.userRequest}`);
                    }
                }
            }


            // Inspired by https://github.com/webpack/webpack/blob/main/lib/sharing/ProvideSharedPlugin.js#L190
            return Promise.all(wsrImportedModules.map(depRef => new Promise((resolve, reject) => {
                compilation.addInclude(
                    compiler.context,
                    new ProvideSharedDependency(
                        'default',
                        depRef,
                        false,
                        `/Users/jonathanbe/Code/Wix/Playground/mf-with-css-encapsulation/packages/shared-library/src/components/${depRef}.js`,
                        true
                    ),
                    {
                        name: undefined
                    },
                    err => {
                        if (err) return reject(err);
                        resolve();
                    }
                );
            }))).then(() => {});
        });
    }
}