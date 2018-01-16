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
                list: action.list
            });
        default:
            return state;
    }
}

let reducers = combineReducers({
    playlist,
    songlist
});
export default reducers;