require.config({
    paths: {
        //Main Framework object.
        emerald:'../core/emerald',
        helper:'../core/helper',
        // User and basic usage imports.
        coreImports:'../core/imports',
        userImports:'../../imports',
        // Main script with user logic.
        main:'../../main'
    }
});
require(['emerald','helper'], function() {
    require(['coreImports','userImports'], function () {
        var tmpPlugins = Emerald.getPlugins();
        Emerald.plugins = {};
        tmpPlugins = orderDependencies(tmpPlugins);
        require(tmpPlugins, function () {
            require(['main']);
            applicationStart();
        });
    });
});
function applicationStart(){
    Emerald.init();
}
