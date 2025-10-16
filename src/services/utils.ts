const defaultImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"

const getDefaultImage = () => {
    return defaultImage
}

const getIdFromUrl = (url: string) => {
    let urlList = url.split('/')
    urlList.pop()
    return urlList.pop()
}

export default {
    getDefaultImage,
    getIdFromUrl
}