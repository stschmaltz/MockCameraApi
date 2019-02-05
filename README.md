# OspreyApiTest
My solution for the camera API

Run simply with `npm start`.

Can set the **timeout** in .env file. I liked this more than making it a command line variable since it seemed more "production code ready" to me.

The test didn't seem to be asking for an actual hook up to a database, so that part seems like a bit overkill. I used mlabs sandbox server and MongoDB. Hopefully that's okay and I don't fail for not just using arrays like a sane person. My thought process was basically that I've never actually built my own api from scratch and so I might as well get an end to end learning experience. Plus it made it way more motivating/fun to work on. I had never used mongodb/mongoose and I had never written an express server (my spotify app uses one... but I just re-used spotify tutorial code for that). It definitely slowed me down to have to learn them as I go but I did learn a lot... and I think it's kind of cool that it actually works.
