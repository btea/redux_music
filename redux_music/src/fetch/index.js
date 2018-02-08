import fetchData from './fetch'

// 歌单
export function playList(s){
    return fetchData('https://api.imjad.cn/cloudmusic/?type=search&search_type=1000&s='+s,'get');
}
// 歌单详情
export function songList(listId) {
    return fetchData('https://api.imjad.cn/cloudmusic/?type=playlist&search_type=1000&id=' + listId,'get');
}

// 获取歌曲详情
export function songDetail(id){
    return fetchData('https://api.imjad.cn/cloudmusic/?type=song&id=' + id + '&br=320000','get');
}
// 获取歌曲歌词
export function lyric(id) {
    return fetchData('https://api.imjad.cn/cloudmusic/?type=lyric&search_type=1006&id=' + id,'get');
}
// 获取歌曲评论(第一次获取评论offset为0，默认page为0，默认显示20条)
export function comment(id,page) {
    return fetchData('https://api.imjad.cn/cloudmusic/?type=comments&id=' + id + '&limit=20&offset=' + 20*page,'get');
}

// 获取用户信息，包括id、签名、性别等
// 请求得到的数据一般第一条为要请求的
export function user(name){
    return fetchData('https://api.imjad.cn/cloudmusic/?type=search&search_type=1002&s=' + name,'get');
}
// 请求用户的歌单(并不是所有获取到的数据都是目标用户创建，有些乱入，要精确还要做过滤)
export function userPlaylist(name){
    return fetchData('https://api.imjad.cn/cloudmusic/?type=search&search_type=1000&s=' + name + "&limit=100",'get');
}
// 一言  查看用户动态（查不到）
export function speak(){
    return fetchData('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=50&encode=json','get');
}
// 搜索，包括用户、单曲、歌单等等
export function search(search_type,word){
    return fetchData('https://api.imjad.cn/cloudmusic/?type=search' + '&search_type=' + search_type + '&s=' + word,'get');
}
