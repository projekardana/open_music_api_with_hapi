/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable("albums", {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        name: {
            type: 'TEXT',
            notNull: true
        },
        year: {
            type: 'INTEGER',
            notNull: true
        },
    });

    pgm.createTable("songs", {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        title: {
            type: 'TEXT',
            notNull: true
        },
        year: {
            type: 'INTEGER',
            notNull: true
        },
        genre: {
            type: 'TEXT',
            notNull: true
        },
        performer: {
            type: 'TEXT',
            notNull: true
        },
        duration: {
            type: 'INTEGER',
        },
        album_id: {
            type: 'VARCHAR(50)',
            references: 'albums',
            onDelete: 'CASCADE',
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable("songs");
    pgm.dropTable("albums");
};
