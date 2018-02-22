import React, { Component } from "react"
import ApiWrapper from "../ApiWrapper"

export default class extends Component {
    
    state = {
        name: "",
        text: "",
        rating: 3,
        flagged: false
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
        this.props.history.push("/")
    }

    

    render() {

        return (
            <div>
                <div className="topSubmit">
                    <img alt="" src="https://i.imgur.com/0x8LLvK.jpg"/>
                </div>
                <div className="middleSubmit">
                    
                    <div>
                        <input id="name" type="text" placeholder="Name" onChange={this.onChangeHandler}/>
                    </div>
                    <div>
                       <textarea id="text" placeholder="Story text goes here" className="textAreaSubmit" onChange={this.onChangeHandler}></textarea><br/>
                       <button className="button button2" onClick={this.clickHandler}>Submit</button>
                    </div>
                   
                </div>
            </div>
        )
    }
}