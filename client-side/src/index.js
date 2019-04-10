import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LoginButton } from './buttons/index';
import { ArtisticListing } from './listings/index';
import { HeadingText } from './headings/index';
import { Thumbnail } from './images/index';

import Cookies from 'universal-cookie';

import * as serviceWorker from './serviceWorker';


function login() {
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
        fetch('//localhost:3001/api/user/profile', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'spotify_auth': `${cookies.get('token')}`
            }
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    cookies.remove("token");
                    window.location = "//" + window.location.host + window.location.pathname;
                    console.log(data.error);
                }
                else {
                    //Do something
                    console.log(data);
                    document.getElementById('loginPage').remove();
                    renderProfileSection(data);
                    renderFavoriteSection(data);

                }
            })


    }
}
login();

function renderProfileSection(data) {
    ReactDOM.render(
        < Thumbnail
            img={data.image}
        />,
        document.getElementById('profileImage'));
    ReactDOM.render(
        <div>
            <HeadingText className="Welcome" text={"Hi " + data.name + ", "} color="rgba(30, 215, 96, 0.44)" fontSize="25px" />
            <HeadingText className="Welcome" text={"Check out your stats below"} color="rgba(254, 254, 254, 0.8)" fontSize="60px" margin="-10px 0" />
            <HeadingText className="Welcome" text={data.type} color="rgba(254, 254, 254, 0.2)" fontSize="37px"
                textTransform="uppercase" letterSpacing="-1px" opacity="0.8" /></div>,
        document.getElementById('profileText'));
}
function renderFavoriteSection(data) {
    ReactDOM.render(
        <ArtisticListing
            name="Eminem"
            nameSecondary="★★★★★"
            subname="detroit hip hop / rap"
            footer={<a target='blank' href='https://open.spotify.com/artist/7dGJo4pcD2V6oG8kP0tJRR'>Artist Radio</a>}
            img="https://i.scdn.co/image/60c4daa4721f666c6afaee82a39bd413979a0474"
        />, document.getElementById('favourites'));
}
serviceWorker.unregister();
