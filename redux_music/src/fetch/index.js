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