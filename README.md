## Installation
``` 
#Clone to local
git clone https://github.com/mehmetsenavci/powerus-challange.git

#Install dependencies
npm install
```

## Running the application
There are two options to run the application:
1- You can pull images for mongodb and redis from dockerhub directly
```
#Pull image from dockerhub
docker pull mongo
#Run the mongo container
docker run -d -p 27017:27017 --name **example-mongo** mongo:latest

#Same steps above for redis
docker pull redis
docker run --name **my-redis** -p 6379:6379 -d redis
```
After pulling the images and runing the containers you can run the api by using
```
npm run start
```

2- You can directly use:
```
docker-compose up
```
This will pull the needed images and build the image for our api according to the docker-compose.yml.

## API
The API has only one developed endpoint which is;
```
GET:
http://localhost:3000/api/v1/flight
```
It runs on port 3000 on localhost.
**/api/v1** is a prefix which is applied to all endpoints
It always returns a successful response.
````
{

	"statusCode":  200,

	"results":  8,

	"data":  {

		"flights":  [

					{

						"id":  "144-8542",

						"slices":  [

							{

								"origin_name":  "Schonefeld",

								"destination_name":  "Stansted",

								"departure_date_time_utc":  "2019-08-08T04:30:00.000Z",

								"arrival_date_time_utc":  "2019-08-08T06:25:00.000Z",

								"flight_number":  "144",

								"duration":  115,

							},

							{

								"origin_name":  "Stansted",

								"destination_name":  "Schonefeld",

								"departure_date_time_utc":  "2019-08-10T05:35:00.000Z",

								"arrival_date_time_utc":  "2019-08-10T07:35:00.000Z",

								"flight_number":  "8542",

								"duration":  120,


							}

					],
			}

}
````

Until the system receives successful request from both of the endpoints it returns the same response above with the empty flights array. This could have been overcome by adding a starting data to database, but to keep it simple to setup followed this approach.
