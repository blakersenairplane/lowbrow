let ConfigOverride
try{
    ConfigOverride = require("./config.json")
} catch (e) {
    // console.log(e)
}

const runConfig = () => {    
    this.config = {
        apiRoot: ConfigOverride 
                        ? ConfigOverride.apiRoot 
                        : process.env.REACT_APP_API_ROOT
    }
}
runConfig()

const postData = async (path, data) => {
    const url = `${this.config.apiRoot}${path}`
    const response = await fetch(url, {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    return response
}

const deleteFlagged = async (path) => {
    const url = `${this.config.apiRoot}${path}`
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    return response
}

const updateFlag = async (path, data) => {
    const url = `${this.config.apiRoot}${path}`
    const response = await fetch(url, {
        method: 'PATCH',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    return response
}

const updateApprove = async (path, data) => {
    const url = `${this.config.apiRoot}${path}`
    const response = await fetch(url, {
        method: 'PATCH',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    return response
}

const getData = async (path) => {
    const url = `${this.config.apiRoot}${path}`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export default {
    post: postData,
    get: getData,
    flag: updateFlag,
    delete: deleteFlagged,
    approve: updateApprove
}