const mapDBToModel = ({id, name, year }) => ({ id,  name, year,});

const mapDBToModelSongs = ({
                               id,
                               title,
                               year,
                               genre,
                               performer,
                               duration,
                               albumId: album_id,
                           }) => ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId: album_id,})

module.exports = { mapDBToModel, mapDBToModelSongs};