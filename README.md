# Listening Habits App

## Description

React + Express app. Build with Spotify API. The app would give you insights some basic statistics of your favorite music genres, artists, songs. More on that, the app would tell you about the mood you have compared to people in your region.

### Express Endpoints

|Endpoint|Description|Parameters|Body|
|-|-|-|-|
|`/api/user/authorize`|Authorizes user. They will be redirected after as successful authorization.|||
|`/api/user/profile`|Returns generic information about the authenticated user.||{token : given_token}|
|`/api/user/artists/:time_range`|Returns user's favorite artists for the given time range.|time_range : `short_term/ medium_term/ long_term`|{token : given_token}|
|`/api/user/tracks/:time_range`|Returns user's favorite tracks for the given time range.|time_range : `short_term/ medium_term/ long_term`|{token : given_token}|
|`/api/tracks/features/:ids`|Returns mood features for the given song `ids` (comma separated) |ids: `spotify track ids (comma separated)`|{token : given_token}|
|`/api/search/playlists/:l/:q`|Searches Spotify for playlists and returns playlist ids|l: `items limit(0 will be set to 10)` q: `search query`|{token : given_token}|
|`/api/playlist/:id/tracks`|Returns all the tracks in a the given Spotify playlist|id: `playlist id`|{token : given_token}|
