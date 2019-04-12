import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LoginButton } from './buttons/index';
import { ArtisticListing } from './listings/index';
import { HeadingOne, HeadingTwo, HeadingThree } from './headings/index';
import { Thumbnail } from './images/index';
import { ListingCarousel, ListingCarouselStateFull } from './carousels';

import Cookies from 'universal-cookie';
import request from 'request-promise-native';

import * as serviceWorker from './serviceWorker';


async function login() {
    const cookies = new Cookies();
    console.log(cookies.get("token"));
    let hashParams = window.location.hash.substr(1).split("&")
        .map(v => v.split("="))
        .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});

    if (hashParams.access_token) {
        cookies.set('token', hashParams.access_token, { path: '/', maxAge: hashParams.expires_in });
        window.location = "//" + window.location.host + window.location.pathname;
    } else if (cookies.get("token") === undefined || cookies.get("token") === null) {
        document.getElementById('root').remove();
        ReactDOM.render(
            < LoginButton
                text='Login to Spotify'
                clickAction={() => { window.location = 'http://localhost:3001/api/user/authorize' }}
                img='https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fspotify-logo-png-open-2000.png&f=1'

            />,
            document.getElementById('loginPageContent'));
    } else {
        await fetch_retry({
            url: 'http://localhost:3001/api/user/profile',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'spotify_auth': `${cookies.get('token')}`
            }
        }, 5)
            .then(async data => {
                if (data.error) {
                    cookies.remove("token");
                    window.location = "//" + window.location.host + window.location.pathname;
                }
                else {
                    //Do something
                    let dataAPI = new Object();
                    document.getElementById('loginPage').remove();
                    renderProfileSection(data);
                    await Promise.all([
                        fetch_retry({
                            url: 'http://localhost:3001/api/user/artists/short_term',
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                                'spotify_auth': `${cookies.get('token')}`
                            }
                        }, 5),
                        fetch_retry({
                            url: 'http://localhost:3001/api/user/artists/long_term',
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
                            dataAPI.artists = data;
                        })
                        .catch(error => console.log(error))
                    await Promise.all([
                        fetch_retry({
                            url: 'http://localhost:3001/api/user/tracks/short_term',
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                                'spotify_auth': `${cookies.get('token')}`
                            }
                        }, 5),
                        fetch_retry({
                            url: 'http://localhost:3001/api/user/tracks/long_term',
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
                            dataAPI.tracks = data;
                            renderFavoriteSection(dataAPI);
                        })
                        .catch(error => console.log(error))
                }
            })


    }
}
let dataAPI = new Object();
login();

function renderProfileSection(data) {
    ReactDOM.render(
        < Thumbnail
            borderRadius="50% 0 50% 50%"
            img={data.image}
            alt={data.name}
        />,
        document.getElementById('profileImage'));
    ReactDOM.render(
        <div>
            <HeadingTwo text={"Hi " + data.name + ", "} />
            <HeadingOne text={"Check out your stats below"} />
            <HeadingThree text={data.type} /></div>,
        document.getElementById('profileText'));
}

function renderFavoriteSection(data) {
    let carousels = new Array();
    let itemsArtists = data.artists.map(x => x.artists.map(artist => createArtisticListingElement(artist, "Artist Radio")));
    let itemsTracks = data.tracks.map(x => x.tracks.map(track => createArtisticListingElement(track, "Track Radio")));

    for (let i in data.artists) carousels.push(createCarouselElement(itemsArtists[i], "Artists"));
    for (let i in data.tracks) carousels.push(createCarouselElement(itemsTracks[i], "Tracks"));

    ReactDOM.render(
        <ListingCarouselStateFull
            elements={carousels}
        />
        , document.getElementById('favourites'));
}
function createArtisticListingElement(data, text) {
    return <ArtisticListing
        key={Math.random().toString(36).substring(5)}
        alt={data.name}
        name={data.name}
        nameSecondary={"★".repeat(data.popularity)}
        subname={data.subheading}
        footer={<a target='blank' href={data.url}>{text}</a>}
        img={data.image.url}
    />

}
function createCarouselElement(data, text) {
    return <div key={Math.random().toString(36).substring(5)} className="CarouselWrapper">
        <HeadingTwo text={"Current Favourite " + text} margin="25px 5%" />
        <ListingCarousel elements={<div>{data}</div>} />
    </div >
}
async function fetch_retry(options, n) {
    return await request(options)
        .then(response => {
            return JSON.parse(response);
        })
        .catch(async (err) => {
            if (n === 1) throw err;
            return await fetch_retry(options, n - 1);
        });
};
serviceWorker.unregister();
