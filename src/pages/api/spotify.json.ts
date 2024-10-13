import type { APIRoute } from "astro";

// Spotify API credentials (make sure you load these securely from environment variables)
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const AUTH_ENDPOINT = `https://accounts.spotify.com/api/token`;
const CLIENT_ID = import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = import.meta.env.PUBLIC_SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = import.meta.env.PUBLIC_SPOTIFY_REFRESH_TOKEN!;

export const GET: APIRoute = async () => {
  try {
    // Step 1: Get Access Token
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64",
    );

    const tokenResponse = await fetch(AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
    });

    if (!tokenResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to authenticate with Spotify" }),
        {
          status: 500,
        },
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 2: Fetch Recently Played Data
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!nowPlayingResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch Spotify data" }),
        {
          status: 500,
        },
      );
    }

    const nowPlayingData = await nowPlayingResponse.json();

    // Step 3: Return the song data
    const song = {
      artist: nowPlayingData.items[0].track.artists[0].name,
      title: nowPlayingData.items[0].track.name,
      coverUrl: nowPlayingData.items[0].track.album.images[1].url,
      songUrl: nowPlayingData.items[0].track.external_urls.spotify,
      previewUrl: nowPlayingData.items[0].track.preview_url,
    };

    return new Response(JSON.stringify(song), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
