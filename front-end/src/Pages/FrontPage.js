import React, { Component } from "react"
import {string} from "prop-types"

export default class extends Component {
    state = {
        stories: []
    }

    getData = async (path) => {
        const url = `http://localhost:3001${path}`
        const response = await fetch(url)
        const data = await response.json()

        return data
    }

    async componentDidMount() {
        const storyResponse = await this.getData("/story")
        this.setState({
            stories: storyResponse.story
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
                <div class="topFrontPage">
                    <img alt="" src="https://i.imgur.com/z4GRWr0.jpg"/>
                </div>
                <div class="middleFrontPage">
                    
                    {this.renderStory(this.state.stories[this.state.stories.length -1])}
                </div>
            </div>
        )
    }
}