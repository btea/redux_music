export default function fetchData(url,type,data){
    if(type.toLowerCase() === 'get'){
        return  fetch(url,{
            headers: {
                'Accept': 'application/json,text/plain,*/*'
            }
        });
    }else{
        let dataList = "";
        for(let i in data){
            if(data.hasOwnProperty(i)){
                dataList += i + '=' + data[i] + "&"
            }
        }
        dataList.substring(0,-1);
        return fetch(url,{
            method: type,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: dataList
        })
    }
}