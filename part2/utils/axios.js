const get = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    return json
}

const post = async (url, data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    const json = await response.json()
    return json
}

const put = async (url, data) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    const json = await response.json()
    return json
}

const axios = {
    get,
    post,
    put
}

export default axios
