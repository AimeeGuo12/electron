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

export const getParentNode = (node, parentClassName) => {
    let current = node
    while(current !== null) {
        // 如果包含的有指定目标中的class 则此dom就是需要的。否则继续往上找
        if (current.classList.contains(parentClassName)) {
            return current
        }
        current = current.parentNode
    }
    return false
}