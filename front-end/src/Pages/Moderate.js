import React, { Component } from "react"

import ApiWrapper from "../ApiWrapper"

export default class extends Component {
    state = {
        stories: []
    }

    async componentDidMount() {
        await this.loadStories()
    }

    loadStories = async () =>{
        const storyResponse = await ApiWrapper.get("/story")
        console.log(storyResponse)
        this.setState({
            stories: storyResponse.stories
        })
    }

    storyDelete = async (e) => {
        console.log("Testing button", e.target)
        await ApiWrapper.delete(`/story/${e.target.id}`)
        await this.loadStories()
    }

    storyApprove = async (e) => {
        console.log("Testing button", e.target)
        await ApiWrapper.flag(`/story/${e.target.id}`)
        await this.loadStories()
    }

    renderStory = (story) => {
        if(!story){
            return(
                <div>Loading</div>
            )
        }
        return(
            <div className="moderate" key={story._id} id={story._id}>
                <div>User Name: <b>{story.name}</b></div>
                <div className="moderateText">
                    <div>
                        {story.text}
                    </div>
                    <div>
                        <button id={story._id} onClick={this.storyDelete}>Delete</button>
                        <button id={story._id} onClick={this.storyApprove}>Approve</button>
                    </div>
                    
                </div>
            </div>
        )
    }
    
    renderModStory = (stories) => {

        const storyElements = stories
            .filter((story, index, array) => {
                return (story.flagged === true)
            })
            .map(this.renderStory)
        return storyElements
    }

    render() {
        return (
            <div>
                <div className="topMod">
                    <img alt="" src="https://i.imgur.com/Ve2rh5S.jpg"/>
                </div>
                <div className="bottomMod">
                   {this.renderModStory(this.state.stories)}
                </div>
            </div>
        )
    }
}