# OspreyApiTest
My solution for the camera API. Thanks for taking the time to take a look at my efforts.

Please note camera's 8 and 9 are the most interesting for testing my aggregates. 8 is 386 images all of file size 1, so you can test my image-count and data-usage aggregates. 9 is 4441 images of increasing file size starting at 0 and increasing by 1 each one 4440(4440+1)/2 formula is 1...4440 added together. 

## Server
I actually hosted this solution since I used a hosted database and express. It's reachable at https://camera-api.now.sh/

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
###### data-usage
Query parameter of ?aggregate=data-usage will return a list of cameras with their data usage sorted by data usage decreasing
Can also specify a count of how many images you want in that array. Top ten would be ?count=10. 
`example: GET https://camera-api.now.sh/camera/9?aggregate=most-data&count=5`

## Author's Notes
I couldn't get my tests to work since I couldn't figure out how to get the mocking working. I wrote an explanation in my test file for camera-router.test.js. I did write stubs to show something. I realize this is partially due to what I explain below and not having a simpler solution but I think I still managed to demonstrate my abilities in the way you're looking to test them... that's my hope at least.

The test didn't seem to be asking for an actual hook up to a database (it actually says specifically there won't be a real endpoint..), but I hooked it up to a hosted mongodb on mlabs.. Hopefully that's okay and I don't fail for not just using arrays like a sane person. My general thought process was that first, if I did a full end to end solution, I could re-use this as a portfolio piece regardless of the outcome (plus it seemed like a really good learning opportunity) and secondly because I thought it would make it a lot more fun/intersting to work on if I could actually build a working server. It definitely slowed me down to have to learn them as I go but I did learn a lot... and I think it's kind of cool that it actually works.

I actually had never written an api from scratch (I usually only ever need to add to existing apis or use someone elses) so I had never written anything in express. I also had not ever used mongoDB or mongoose, but I had worked with postgresql, dynamodb and elasticsearch so it wasn't to sort out.
