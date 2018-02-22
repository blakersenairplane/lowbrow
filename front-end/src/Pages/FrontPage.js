import React, { Component } from "react"

import ApiWrapper from "../ApiWrapper"

export default class extends Component {
    state = {
        stories: []
    }



    async componentDidMount() {
        const storyResponse = await ApiWrapper.get("/story")
        console.log(storyResponse)
        this.setState({
            stories: storyResponse.stories
        })
    }

    storyFlag = async (e) => {
        console.log("Testing button", e.target)
        await ApiWrapper.flag(`/flag/${e.target.id}`)
        
    }

    renderStory = (story) => {
        if(!story){
            return(
                <div><img src="https://i.imgur.com/MpKGrES.gif"/></div>
            )
        }
        return(
            <div key={story._id} id={story._id}>
            <h1>{story.name}</h1>
            <h3>{story.text}</h3>
            <button id={story._id} onClick={this.storyFlag}>Report</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="topFrontPage">
                    <img alt="" src="https://i.imgur.com/z4GRWr0.jpg"/>
                </div>
                <div className="middleFrontPage">
                    
                    {this.renderStory(this.state.stories[this.state.stories.length - 1])}
                </div>
            </div>
        )
    }
}