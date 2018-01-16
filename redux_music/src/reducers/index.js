import {combineReducers} from 'redux'

function playlist(state = [],action){
    switch(action.type){
        case 'PLAYLIST_REFRESH':
            return [...state,action.list];
        default:
            return state;
    }
}

function songlist(state = [],action) {
    switch(action.type){
        case 'SONGS_REFRESH':
            return [...state,action.song];
        default:
            return state;
    }
}

let reducers = combineReducers({
    playlist,
    songlist
});
export default reducers;