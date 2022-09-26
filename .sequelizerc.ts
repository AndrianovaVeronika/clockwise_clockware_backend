// .sequelizerc

import * as path from "path";

export default {
    'config': path.resolve('./src/config', 'dbConfig.ts'),
    'models-path': path.resolve('db', './src/models'),
    'seeders-path': path.resolve('db', './src/seeders'),
    'migrations-path': path.resolve('db', './src/migrations')
};