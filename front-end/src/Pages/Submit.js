import React, { Component } from "react"
import {string} from "prop-types"
import ApiWrapper from "../ApiWrapper"

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



    clickHandler = async () => {
        await ApiWrapper.post("/story", this.state)
    }

    render() {

        return (
            <div>
                <div className="topSubmit">
                    <img alt="" src="https://i.imgur.com/0x8LLvK.jpg"/>
                </div>
                <div className="middleSubmit">
                    <div>Name: </div>
                    <div>
                        <input id="name" type="text" onChange={this.onChangeHandler}/><br/>
                    </div>
                    <div>
                       Story: 
                    </div>
                    <div>
                       <textarea id="text" className="textArea" onChange={this.onChangeHandler}></textarea><br/>
                       <button onClick={this.clickHandler}>Submit</button>
                    </div>
                   
                </div>
            </div>
        )
    }
}