import request from '@/utils/request.js'

//查询页面内的所有数据
//修改头像
export const queryUserLikeLists = (userid) => {
    return request.get("/api/PlayList/UserLikelists?userid=" + userid)
}

export const queryUserCreateLists = (userid) => {
    return request.get("/api/PlayList/UserCreatelists?userid=" + userid)
}

export const queryUserLikeSong = (userid) => {
    console.log(userid)
    return request.get("/api/PlayList/UserlikedSong?userid=" + userid)
}

export const deleteLikeList = (currentlistid) => {
    return request.delete("/api/PlayList/deletelikelist?id=" + currentlistid)
}



export const addSongIntoList = (addcurrentsongid, addcurrentlistid) => {
    return request.post("/api/PlayList/addonesong?PlayListId=" + addcurrentlistid + "&songId=" + addcurrentsongid)
}

export const deleteSongFromList = (deletecurrentsongid, deletecurrentlistid) => {
    return request.delete("/api/PlayList/deleteonesong?PlayListId=" + deletecurrentlistid + "&songId=" + deletecurrentsongid)
}

export const getSongList = (playlistid) => {
    console.log(playlistid)
    return request.get("/api/PlayList/List/" + playlistid)
}

export const getLikeSongsAPI = (id) => {
    return request({
        url:'/api/PlayList/UserlikedSong',
        method: 'GET',
        params: {
            userid: id
        }
    })
}
export const getLikeListAPI = (id) => {
    return request({
        url:'/api/PlayList/UselistsrLike',
        method: 'GET',
        params: {
            userid: id
        }
    })
}
export const getCreateListAPI = (id) => {
    return request({
        url:'/api/PlayList/UserCreatelists',
        method: 'GET',
        params: {
            userid: id
        }
    })
}


export const deleteCreateListAPI = (id) => {
    return request({
        url:'/api/PlayList/deletelist',
        method: 'DELETE',
        params: {
            id: id
        }
    })
}

export const addCreateListAPI = (data) => {
    return request({
        url:'/api/PlayList/newlist',
        method: 'POST',
        data
    })
}