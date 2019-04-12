# Listening Habits App

## Description

React + Express app. Build with Spotify API. The app would give you insights some basic statistics of your favorite music genres, artists, songs. More on that, the app would tell you about the mood you have compared to people in your region.

### Express Endpoints

|Type|Endpoint|Description|Parameters|Headers|
|-|-|-|-|-|
|GET|`/api/user/authorize`|Authorizes user. They will be redirected after as successful authorization.|||
|GET|`/api/user/profile`|Returns generic information about the authenticated user.||{spotify_auth : given_token}|
|GET|`/api/user/artists/:time_range`|Returns user's favorite artists for the given time range.|time_range : `short_term/ medium_term/ long_term`|{spotify_auth : given_token}|
|GET|`/api/user/tracks/:time_range`|Returns user's favorite tracks for the given time range.|time_range : `short_term/ medium_term/ long_term`|{spotify_auth : given_token}|
|GET|`/api/tracks/features/:ids`|Returns mood features for the given song `ids` (comma separated) |ids: `spotify track ids (comma separated)`|{spotify_auth : given_token}|
|GET|`/api/search/playlists/:l/:q`|Searches Spotify for playlists and returns playlist ids|l: `items limit(0 will be set to 10)` q: `search query`|{spotify_auth : given_token}|
|GET|`/api/playlist/:id/tracks`|Returns all the tracks in a the given Spotify playlist|id: `playlist id`|{spotify_auth : given_token}|
