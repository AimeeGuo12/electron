// 拍平

export const flattenArr = (arr) => {
    return arr.reduce((map, item) => { // map为pre item是当前的数组元素
        map[item.id] = item
        return map
    }, {})
}

export const objToArr = (obj) => {
    return Object.keys(obj).map(key => obj[key])
}