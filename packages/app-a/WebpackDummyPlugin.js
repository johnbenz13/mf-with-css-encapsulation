module.exports = class WebpackDummyPlugin {
    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {
        // Specify the event hook to attach to
        compiler.hooks.emit.tapAsync(
            'MyExampleWebpackPlugin',
            (compilation, callback) => {
                
                console.log('size is', compilation.modules.size);
                compilation.modules
                .filter(module => module.type === 'javascript/auto')
                .forEach(module => {
                    console.log('Module', module.resource, module.type);
                });
               

                callback();
            }
        );
    }
}