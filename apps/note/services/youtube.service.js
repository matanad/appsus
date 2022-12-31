'use strict'

const KEY = 'youtube'
const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet
&videoEmbeddable=true&type=video&key=AIzaSyCtI-wZyZo6o1w51sbzBHZQN5-7b2vndIQ&q=`
const gVideos = loadFromStorage(KEY) || {}

function getVideo(name) {
    const url = youtubeUrl + name
    if(gVideos[name]) return Promise.resolve(gVideos[name])

    return axios.get(url)
    .then((res) => res.data)
    .then((res) =>{
        gVideos[name] = res.items
        saveToStorage(KEY, gVideos)
       return res.items
    })
}