import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import config from './config/default';
import { LoginButton } from './buttons/index';
import { ArtisticListing } from './listings/index';
import { HeadingOne, HeadingTwo, HeadingThree } from './headings/index';
import { Thumbnail } from './images/index';
import { ListingCarousel, ListingCarouselStateFull } from './carousels';

import { fetch_retry, randomKey } from './functions/index';

import Cookies from 'universal-cookie';


import * as serviceWorker from './serviceWorker';

const apiPath = config.apiPath;
const cookies = new Cookies();
let renderQueue = [];
attemptLogin();

function attemptLogin() {
    let hashParams = window.location.hash.substr(1).split("&")
        .map(v => v.split("="))
        .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});
    if (hashParams.access_token) {
        // If access_token exists (meaning we just got redirected from Spotify)
        cookies.set('token', hashParams.access_token, { path: '/', maxAge: hashParams.expires_in });
        window.history.pushState({ urlPath: '/dashboard' }, 'dashboard', '/dashboard');
        getData();
    } else if (cookies.get("token") === undefined || cookies.get("token") === null) {
        // Token is not set or is expired
        loadLoginComponent();
    } else {
        // Token is valid
        getData();
    }
}
function loadLoginComponent() {
    document.getElementById('root').remove();
    ReactDOM.render(
        < LoginButton
            text='Login to Spotify'
            clickAction={() => { window.location = `${apiPath}/user/authorize` }}
            img='https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fspotify-logo-png-open-2000.png&f=1'

        />,
        document.getElementById('loginPageContent'));
}
async function getData() {
    await fetch_retry({
        url: `${apiPath}/user/profile`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'spotify_auth': `${cookies.get('token')}`
        }
    }, 5)
        .then(async data => {
            if (data.error) {
                // An error of that type can only be {auth_token_expired} 
                cookies.remove("token");
                window.location = "//" + window.location.host + window.location.pathname;
            }
            else {
                document.getElementById('loginPage').remove();
                renderQueue.push(constructProfileSection(data));
                await Promise.all([
                    fetch_retry({
                        url: `${apiPath}/user/artists/short_term`,
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'spotify_auth': `${cookies.get('token')}`
                        }
                    }, 5),
                    fetch_retry({
                        url: `${apiPath}/user/artists/long_term`,
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'spotify_auth': `${cookies.get('token')}`
                        }
                    }, 5),
                    fetch_retry({
                        url: `${apiPath}/user/tracks/short_term`,
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'spotify_auth': `${cookies.get('token')}`
                        }
                    }, 5),
                    fetch_retry({
                        url: `${apiPath}/user/tracks/long_term`,
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'spotify_auth': `${cookies.get('token')}`
                        }
                    }, 5)
                ])
                    .then(data => {
                        data.map(x => {
                            if (x.error) throw new Error(x.error);
                        });
                        return data;
                    }).then(data => {
                        renderQueue.push(constructFavoriteSection({ artists: data.slice(0, 2), tracks: data.slice(2) }));
                        return renderQueue;
                    })
                    .then(renderQueue => {
                        ReactDOM.render(<React.Fragment>{renderQueue}</React.Fragment>, document.getElementById('root'));
                        renderQueue = [];
                    })
                    .catch(error => console.log(error))
            }
        })
}

function constructProfileSection(data) {
    return <div id="profile" key={randomKey()}>
        <div id="profileImage">
            < Thumbnail
                borderRadius="50% 0 50% 50%"
                img={data.image}
                alt={data.name}
            />
        </div>
        <div id="profileText">
            <HeadingTwo text={"Hi " + data.name + ", "} />
            <HeadingOne text={"Check out your stats below"} />
            <HeadingThree text={data.type} />
        </div>
    </div>
}

function constructFavoriteSection(data) {
    let carousels = [];
    let itemsArtists = data.artists.map(x => x.artists.map(artist => createArtisticListingElement(artist, "Artist Radio")));
    let itemsTracks = data.tracks.map(x => x.tracks.map(track => createArtisticListingElement(track, "Track Radio")));
    let artistCarousels = [];
    let tracksCarousels = [];

    for (let i in data.artists) artistCarousels.push(createCarouselElement(itemsArtists[i], i == 0 ? "Current Favourite Artists" : "All-time Favourite Artists"));
    for (let i in data.tracks) tracksCarousels.push(createCarouselElement(itemsTracks[i], i == 0 ? "Current Favourite Tracks" : "All-time Favourite Tracks"));
    carousels.push({ button: "My Artists", element: artistCarousels });
    carousels.push({ button: "My Tracks", element: tracksCarousels });

    return <div id="favourites" key={randomKey()}>
        <ListingCarouselStateFull
            elements={carousels}
        /></div>
}
function createArtisticListingElement(data, text) {
    return <ArtisticListing
        key={randomKey()}
        alt={data.name}
        name={data.name}
        nameSecondary={"★".repeat(data.popularity)}
        subname={data.subheading}
        footer={<a target='blank' href={data.url}>{text}</a>}
        img={data.image.url}
    />
}

function createCarouselElement(data, text) {
    return <div key={randomKey()} className="CarouselWrapper">
        <HeadingTwo text={text} margin="25px 5%" />
        <ListingCarousel elements={<React.Fragment>{data}</React.Fragment>} />
    </div >
}


serviceWorker.unregister();
