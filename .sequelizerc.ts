// .sequelizerc

import * as path from "path";

export default {
    'config': path.resolve('config', 'db.config.ts'),
    'models-path': path.resolve('db', 'models'),
    'seeders-path': path.resolve('db', 'seeders'),
    'migrations-path': path.resolve('db', 'migrations')
};