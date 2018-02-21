import React, { Component } from "react"
import {string} from "prop-types"
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

    renderStory = (story) => {
        if(!story){
            return(
                <div>Loading</div>
            )
        }
        return(
            <div key={story._id}>
            <h1>{story.name}</h1>
            <h3>{story.text}</h3>
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