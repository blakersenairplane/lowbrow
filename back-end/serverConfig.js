let ConfigOverride
try{
    ConfigOverride = require("./config.json")
} catch (e) {
    
}

const runConfig = () => {    
    this.config = {
        mongoConnString: ConfigOverride 
                        ? ConfigOverride.mongoConnString 
                        : process.env.MONGO_CONN_STRING
    }
    
}
runConfig()


module.exports = this.config