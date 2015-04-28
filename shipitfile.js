module.exports = function (shipit) {
    require('shipit-deploy')(shipit);
    shipit.initConfig({
        default: {
            workspace: './',
            deployTo: 'site',
            repositoryUrl: 'https://github.com/ironsidevsquincy/darrenhurley.co.uk.git',
            keepReleases: 2
        },
        production: {
            servers: 'darrenhu@darrenhurley.co.uk'
        }
    });
};
