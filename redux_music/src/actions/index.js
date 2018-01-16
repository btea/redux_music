
export function playlist(list){
    return {
        type: 'PLAYLIST_REFRESH',
        list: list
    }
}

export function songlist(songs) {
    return {
        type: 'SONGS_REFRESH',
        song: songs
    }
}