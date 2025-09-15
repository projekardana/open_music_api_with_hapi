# API Pengelolaan Data Song

Endpoint : POST/songs

Body Request :

Keterangan :

[//]: # Menambahkan lagu

[//]: # status code : 201 (created)

```json
{
  "title" : "string",
  "year": "number",
  "genre": "string",
  "performer": "string",
  "duration": "number?",
  "albumId": "string?"
}
```

Response Body :
```json
{
  "status": "success",
  "data": {
    "songId": "song_id"
  }
}
```

Endpoint : GET/songs

Body Request :

Keterangan :

[//]: # Menamdapatkan seluruh lagu

[//]: # status code : 200 (OK)

Response Body :
```json
{
  "status": "success",
  "data": {
    "songs": [
      {
        "id": "nanoid",
        "title": "Life in Technicolor",
        "performer": "Coldplay"
      },
      {
        "id": "nanoid",
        "title": "Centimeteries of London",
        "performer": "Coldplay"
      },
      {
        "id": "nanoid",
        "title": "Lost!",
        "performer": "Coldplay"
      }
    ]
  }
}
```

Endpoint : GET/songs/{id}

Keterangan :

[//]: # Menamdapatkan lagu berdasarkan id

[//]: # status code : 200 (OK)

Response Body :
```json
{
  "status": "success",
  "data": {
    "song": {
      "id": "song-Qbax5Oy7L8WKf74l",
      "title": "Life in Technicolor",
      "year": 2008,
      "performer": "Coldplay",
      "genre": "Indie",
      "duration": 120,
      "albumId": "album-Mk8AnmCp210PwT6B"
    }
  }
}
```

Endpoint : PUT/songs/{id}

Keterangan :

[//]: # Mengubah lagu berdasarkan id

[//]: # status code : 200 (OK)

Body Request :
```json
{
  "title": "string",
  "year": "number",
  "genre": "string",
  "perfomer": "string",
  "duration": "number?",
  "albumId": "string?"
}
```
Response Body :
```json
{
  "status": "success",
  "message" : "any"
}
```

Endpoint : DELETE/songs/{id}

```json
{
  "statuscode": "200 OK",
  "body": {
    "status": "success",
    "message": "any"
  }
}
```
