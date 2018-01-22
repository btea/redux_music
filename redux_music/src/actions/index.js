
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

// 当前正在播放的歌曲信息
export function playInfo(list){
    return {
        type: 'PLAY',
        info: list
    }
}

export function comments(comments) {
    return {
        type: 'COMMENTS',
        comments: comments
    }
}