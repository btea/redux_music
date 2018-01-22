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

// 保存当前正在播放歌曲信息  底部播放栏和跳转之后播放页面引用同一数据源（包括url以时间、显示状态等）
function playInfo(state = {
    picUrl: 'https://p1.music.126.net/Nd86SOcyCxU5Qu7jdZn_MQ==/7725168696876736.jpg',
    url: '',
    name: '牵丝戏',
    singer: '银临',
    id: 30352891,
    cur: 0,
    play: false, // 播放状态
    time: 239128, //歌曲时间
    isShow: true, //底部播放栏是否显示
    buffered: 0, // 缓冲进度
    currentTime: 0, //当前播放时间
    lyricShow: false, /*是否显示歌词*/
    lyric: null, /*获取的歌词*/
    tlyric: null, /*需要翻译的歌词，翻译之后*/
    volume: 0.5, /*歌曲音量大小*/
    // marginTop: 235, /*歌词展示默认位置*/
    zIndex: false, /*显示歌词还是显示动画*/
    commentTotal: null, /*评论数*/
    comments: null, /*评论内容*/
    favorite: false, /*是否喜欢*/
    commentShow: false, /*是否展示评论*/
    startTop: [], /*存放歌词每一行的滚动高度*/
    containerHeight: 0, /*滚动歌词展示栏高度*/
    lyricTime: null, /*歌曲时间分布*/
    barWidth: 0, /*进度条长度*/
    playIndex: null
},action){
    switch (action.type){
        case 'PLAY':
            return Object.assign({},state,action.info);
        default:
            return state;
    }
}
// 获取评论
function comments(state = {
    total: null,
    hotComments: null,
    comments: null,
    page: 0
},action) {
    switch(action.type){
        case 'COMMENTS':
            return Object.assign({},state,action.comments);
        default:
            return state;
    }
}



let reducers = combineReducers({
    playlist,
    songlist,
    coverStatus,
    playInfo,
    comments
});
export default reducers