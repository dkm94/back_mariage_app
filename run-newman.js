require('dotenv').config();
const newman = require('newman');

newman.run({
    collection: require('./src/collection/Api_MEM.postman_collection.json'), // Chemin vers votre collection Postman
    reporters: 'aiotests', // Utilisez le reporter AIO Tests
    reporter: {
        aiotests: {
            "enableReporting": true, // Activer le reporting vers AIO Tests
            "jiraProjectId": process.env.JIRA_PROJECT_KEY, // Remplacez par la clé de votre projet JIRA
            "aioApiToken": process.env.AIO_API_KEY, //AIO Tests API Key
            "createNewCycle": false, // Ne pas créer un nouveau cycle
            "newCycleTitle": '', // Nom du cycle de test dans AIO Tests
            "cycleKey": process.env.AIO_CYCLE_KEY, // Clé du cycle de test dans AIO Tests,
            "createNewRun": true, // Ne pas créer un nouveau run
            "createCase": false, // Créer un nouveau cas de test si aucune clé n'est mappée
            "bddForceUpdateCase": true // Update les steps dans un TC AIO avec les changements les données de la requête
        },
    },
}, function (err) {
    if (err) {
        console.error('Erreur lors de l\'exécution de Newman :', err);
        process.exit(1); // Quitte le script avec un code d'erreur
    }
    console.log('Collection exécutée avec succès !');
});