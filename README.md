# Node Cache API Using MongoDB

## SETUP

1. Create `env` folder in root folder
2. Create `local.env` file in env folder.

Example .local.env
```
DATABASE_URI=mongodb://localhost:27017/test
MAX_CACHE_ENTRIES=10
CACHE_TTL=10
```

## Run the app

1) Install dependencies.
```javascript
npm install
```

2) Run
```
npm start
```

## API Documentation
- `Success response format`
 ``` 
        {
            "success": true,
            "data":{} 
        }
```
- `Failure response format`
 ``` 
        {
            "success": false,
            "message":""
        }
```

- `ERROR codes`
   - 200 - All OK
   - 400 - Invalid request
   - 500 - Internal Server Error

- `GET` /api/v1/cache/:key 
    - Retrieves the cache entry if exists else creates a new entry with a random value
    

- `GET` /api/v1/cache
    - Retrieves all cache entries

- `PATCH` /api/v1/cache/:key
    - Updates the cache entry value with passed value else creates cache entry with the given value.
    - Request Body (JSON)
    ``` 
        {
            "value": String,    
        }
    ```
     - Example Payload
    
    ``` 
        {
            "value": "123",    
        }
    ```

- `DELETE` /api/v1/cache/:key
    - Deletes the matching cache entry

- `DELETE` /api/v1/cache
    - Clears the cache

## Additional information

1) When the cache is full, entries are deleted in LIFO(Last in first out) manner

2) Cache's TTL is reset after every read/hit


