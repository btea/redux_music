
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
// 评论保存
export function comments(comments) {
    return {
        type: 'COMMENTS',
        comments: comments
    }
}

// 主页面index状态数据保存
export function indexStatus(change){
    return {
        type: 'CHANGE',
        change: change
    }
}

// 用户信息保存
export function userInfo(info){
    return {
        type: 'USER',
        info: info
    }
}

// 搜索相关信息
export function search(list) {
    return {
        type: 'SEARCH',
        info: list
    }
}

// 用户信息显示状态
export function userStatus() {
    return {
        type: 'SWITCH'
    }
}