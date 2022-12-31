export function NoteVideo({ note }) {

    function youtubeParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
        var match = url.match(regExp)
        return (match && match[7].length == 11) ? match[7] : false
    }

    function getVideoUrl() {
        const embad = 'embed'
        const videoID = youtubeParser(note.info.url)
        const url = `https://www.youtube.com/embed/${videoID}`
        return url
    }

    return <div className="video-container">
        <iframe
            width="100%"
            src={getVideoUrl()}
        />
        <h4>{note.info.title}</h4>
    </div>
}