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

let reducers = combineReducers({
    playlist,
    songlist,
    coverStatus
});
export default reducers