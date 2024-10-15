## how to run
run frontend: 
```
npm run start
```

run backend:

```
cd _backend
tsc
node src/backend.js
```

# documentation
## user manual
- click on the map to add a new location
- existing locations are on the left sidebar

## development
entity: MapLocation -> src/app/model/...


### data access
- Access through interface **LocationDataService**, allows various different data sources
- Usage: inject **LocationDataService**, using token LOCATION_DATA_SERVICE
- LocationDataService is provided in main.ts
