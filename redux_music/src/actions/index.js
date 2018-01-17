
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

// 歌单封面详情是否显示
export function listCover(){
    return {
        type: 'COVER_STATUS'
    }
}