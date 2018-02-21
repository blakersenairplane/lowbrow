import React, { Component } from "react"
import {string} from "prop-types"

export default class extends Component {
    
    state = {
        name: "",
        text: "",
        rating: 3,
        flagged: ""
    }

    onChangeHandler = (e) => {
        switch(e.target.id) {
            case "name":
                this.setState({ name: e.target.value })
                break
            case "text":
                this.setState({ text: e.target.value })
                break
            default:
                throw Error("Invalid Id")
        }
    }

    async postData(path, data) {
        const url = `https://back-end-aylmnnoafd.now.sh${path}`
        const response = await fetch(url, {
            method: 'POST',
            mode: 'CORS',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        return response
    }

    clickHandler = async () => {
        await this.postData("/story", this.state)
    }

    render() {

        return (
            <div>
                <div class="topSubmit">
                    <img alt="" src="https://i.imgur.com/0x8LLvK.jpg"/>
                </div>
                <div class="middleSubmit">
                    <div>Name: </div>
                    <div>
                        <input id="name" type="text" onChange={this.onChangeHandler}/><br/>
                    </div>
                    <div>
                       Story: 
                    </div>
                    <div>
                       <textarea id="text" class="textArea" onChange={this.onChangeHandler}></textarea><br/>
                       <button onClick={this.clickHandler}>Submit</button>
                    </div>
                   
                </div>
            </div>
        )
    }
}