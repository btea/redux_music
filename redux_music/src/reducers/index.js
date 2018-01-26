import {combineReducers} from 'redux'

// 保存封面各组件的状态
function indexStatus(state = {
    index: 1, /*封面顶部高亮显示的字体图标下标*/
    sidebar: false /*侧边栏个人资料是否显示*/
},action) {
    switch (action.type){
        case 'CHANGE':
            return Object.assign({},state,action.change);
        default:
            return state;
    }
}

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
    $lyric: null, /*需要翻译的歌词，翻译之后*/
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
    id: null,
    total: null,
    hotComments: null,
    comments: null,
    page: 0,
    loading: false,  /*是否正在加载*/
    more: true /*是否还有更多评论*/
},action) {
    switch(action.type){
        case 'COMMENTS':
            return Object.assign({},state,action.comments);
        default:
            return state;
    }
}

let province = {
    110000: '北京市',
    120000: '天津市',
    130000: '河北省',
    140000: '山西省',
    150000: '内蒙古自治区',
    210000: '辽宁省',
    220000: '吉林省',
    230000: '黑龙江省',
    310000: '上海市',
    320000: '江苏省',
    330000: '浙江省',
    340000: '安徽省',
    350000: '福建省',
    360000: '江西省',
    370000: '山东省',
    410000: '河南省',
    420000: '湖北省',
    430000: '湖南省',
    440000: '广东省',
    450000: '广西壮族自治区',
    460000: '海南省',
    500000: '重庆市',
    510000: '四川省',
    520000: '贵州省',
    530000: '云南省',
    540000: '西藏自治区',
    610000: '陕西省',
    620000: '甘肃省',
    630000: '青海省',
    640000: '宁夏回族自治区',
    650000: '新疆维吾尔族自治区',
    710000: '台湾省',
    810000: '香港特别行政区',
    820000: '澳门特别行政区'
};

// 获取用户信息  _index底部显示的用户信息下标
function userInfo(state = {provinces:province,_index: 0,marginLeft: 0} , action) {
    switch (action.type){
        case 'USER':
            return Object.assign({},state,action.info);
        default:
            return state;
    }
}


let reducers = combineReducers({
    playlist,
    songlist,
    coverStatus,
    playInfo,
    comments,
    indexStatus,
    userInfo
});
export default reducers