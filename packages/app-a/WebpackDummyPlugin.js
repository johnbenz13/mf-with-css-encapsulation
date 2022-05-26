const STAGE_DEFAULT = 0;
const filteredLibraries = [
    'wix-style-react', 
    '@johnbenz13/shared-library'
];

module.exports = class WebpackDummyPlugin {
    constructor() {
        this.totalWsr = 0;
        this.requestedWsr = [];
    }
    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {
        // Specify the event hook to attach to
        compiler.hooks.compilation.tap('WebpackDummyPlugin', 
        (compilation, { normalModuleFactory }) => {
            // normalModuleFactory.hooks.module.tap('WebpackDummyPlugin',
            // (module, { resource, resourceResolveData }, resolveData) => {
            //     const { request } = resolveData;

            //     if (request.includes('wix-style-react')) {
            //         console.log('WSR MAN');
            //         this.totalWsr++;
            //         this.requestedWsr.push({request});
            //     }

            //     return module; // Why do we need to return?
            // });

            compilation.hooks.optimizeDependencies.tap({
                name: "WebpackDummyPlugin",
                stage: STAGE_DEFAULT
            }, modules => {
                for (const module of modules) {
                    for (const dep of module.dependencies) {
                        try {
                            if (module.userRequest && dep.userRequest && filteredLibraries.some(lib => dep.userRequest.includes(lib))) { 
                                // Inspired by https://github.com/webpack/webpack/blob/main/lib/FlagDependencyUsagePlugin.js#L213
                                // And https://developpaper.com/webpack-principle-series-9-tree-shaking-implementation-principle/
                                const depRef = compilation.getDependencyReferencedExports(dep);
                            
                                console.log(`${module.userRequest} -> ${dep.userRequest}`, depRef);
                            }
                            
                        } catch(e) {
                            console.log(`Not refExp for ${module.userRequest} -> ${dep.userRequest}`);
                        }
                    }
                }
            })
        });

        compiler.hooks.finishMake.tapPromise("WebpackDummyPlugin", compilation => {
            console.log('The End', this.totalWsr, this.requestedWsr);
            return Promise.resolve();
        });
    }
}