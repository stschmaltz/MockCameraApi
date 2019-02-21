# MockCameraApi
Mock api to get fake camera details from fake cameras using a real server and a real database. I had never made an api before from scratch and this was great practice. I used express and mongodb with mlabs.

## Running Locally
Run `npm install` in root of project
Start simply with `npm start`.
The api will be accessible by default on port 5656 at http://localhost:5656

Can set the **timeout** in .env file, but it will default to 25 seconds.
I liked this more than making it a command line variable since it seemed more "production code ready" to me.

## API
### /camera/
#### GET
Basic get with no query params will return a list of cameras and their id
`example: GET https://camera-api.now.sh/camera`
##### Aggregates
###### data-usage
Query parameter of ?aggregate=data-usage will return a list of cameras with their data usage sorted by data usage decreasing
`example: GET https://camera-api.now.sh/camera?aggregate=data-usage`
###### image-count
Query parameter of ?aggregate=image-count will return a list of cameras with their data usage sorted by data usage decreasing
`example: GET https://camera-api.now.sh/camera?aggregate=image-count`
#### POST
I implemented this one just to create data and for testing purposes.
It creates a new camera with an id and array of images.
`example: POST https://camera-api.now.sh/camera/ body: {
	"camera_id": 8,
	"images": [
        	{
            		"file_size": 111
        	}
	]
}`
### /camera/:id
#### GET
Basic get with no query parameters will return the camera with the matching id's images
`example: GET https://camera-api.now.sh/camera/4`

#### Pagination
Query parameters of ?pagesize=#&pagecount=# will return camera with matching id's images paginated ... both are required or it will default to the first page with a pagesize of 10000. I wanted to also have a "next" link but I didn't have time to implement it.
`example: GET https://camera-api.now.sh/camera/8?pagesize=100&pagecount=5`

#### Aggregate
###### most-data
Query parameter of ?aggregate=data-usage will return a list of cameras with their data usage sorted by data usage decreasing
Can also specify a count of how many images you want in that array. Top ten would be ?count=10. 
`example: GET https://camera-api.now.sh/camera/9?aggregate=most-data&count=5`
