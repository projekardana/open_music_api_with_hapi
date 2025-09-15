# OpenMusic API with Framework Hapi

## API Pengelolaan Data Album 

Endpoint : POST/albums

Keterangan : 

[//]: # # Menambahkan Album

status code : 201 (created)

Body Request : 

```json
{
  "name" : "string",
  "year" : "number"
}
```

Response Body :

```json
{
  "status": "success",
  "data": {
    "album": "album"
  }
}
```

Endpoint : GET/albums/{id}

[//]: # Mendapatkan album berdasarkan id

status code : 200 OK

```json
{
  "status": "success",
  "data": {
    "album": "album"
  }
}
```

Endpoint : PUT/albums/{id}

Keterangan :

[//]: # Mengubah album berdasarkan id album

status code : 200 OK

Body Request :

```json
{
  "name" : "string",
  "year" : "number"
}
```

Response Body :

```json
{
  "status": "success",
  "message" : "any"
}
```

Endpoint : DELETE/albums/{id}

Body Request :

Keterangan :

[//]: # Menghapus Album berdasarkan id album

status code : 200 OK

Response Body :

```json
{
  "status": "success",
  "message": "any"
}
```