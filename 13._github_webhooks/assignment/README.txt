Server is the actual server while webhookstest was for testing locally

Basic REST API with endpoints for profiles.
You can post a new profile (the form does not matter) and you can delete a profile by its id. They use JSON format

profiles endpoints:
GET /profiles
GET /profiles/:id
POST /profiles
DELETE /profiles/:id

you can subscribe to profile creation (POST) and profile deletion (DELETE).

endpoints to subscribe:
profileCreation: POST /webhook/subscribe-profile-creation
profileDeletion: POST  /webhook/subscribe-profile-deletion

When you subscribe you will recieve a token in the response that you can you use to unsubscribe called subToken

endpoints to unsubscribe:
profileCreation: DELETE /webhook/unsubscribe-profile-creation/:subToken
profileDeletion: DELETE /webhook/unsubscribe-profile-deletion/:subToken
