import {combineReducers} from 'redux'

function playlist(state = [],action){
    switch(action.type){
        case 'PLAYLIST_REFRESH':
            return [...state,action.list];
        default:
            return state;
    }
}

function songlist(state = {list: null},action) {
    switch(action.type){
        case 'SONGS_REFRESH':
            return Object.assign({},state,{
                list: action.song
            });
        default:
            return state;
    }
}
// 歌单封面信息默认隐藏
function coverStatus(state = false,action){
    switch (action.type){
        case 'COVER_STATUS':
            return !state;
        default:
            return state;
    }
}

// 保存当前正在播放歌曲信息
function playInfo(state = {
    picUrl: 'https://p1.music.126.net/8ltR3o9R8uJ9_5Cc71cDhA==/109951162951242154.jpg',
    url: 'https://m7.music.126.net/20180118164007/ee488669e88529598eeca3b9b7800d6d/ymusic/a201/7d78/e420/e12da94e22a825f422ddebdfc50e8520.mp3',
    name: '红昭愿',
    singer: '音阙诗听'
},action){
    switch (action.type){
        case 'PLAY':
            return Object.assign({},state,{
                picUrl: action.info.picUrl,
                url: action.info.url,
                name: action.info.name,
                singer: action.info.singer
            });
        default:
            return state;
    }
}
// 保存当前音乐的播放状态
function playStatus(state = false,action) {
    switch (action.type){
        case 'SWITCH':
            return !state;
        default:
            return state;
    }
}

let reducers = combineReducers({
    playlist,
    songlist,
    coverStatus,
    playInfo,
    playStatus
});
export default reducers