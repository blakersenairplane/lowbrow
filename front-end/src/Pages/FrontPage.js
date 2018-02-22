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

    // renderStory = (story) => {
    //     if(!story){
    //         return(
    //             <div><img src="https://i.imgur.com/MpKGrES.gif"/></div>
    //         )
    //     }
    //     return(
    //         <div key={story._id} id={story._id}>
    //         <div>{story.name}</div>
    //         <h3>{story.text}</h3>
    //         <button id={story._id} onClick={this.storyFlag}>Report</button>
    //         </div>
    //     )
    // }

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
                        <button id={story._id} onClick={this.storyFlag}>Report</button>
                    </div>
                    
                </div>
            </div>
        )
    }

    renderModStory = (stories) => {

        const storyElements = stories
            .filter((story, index, array) => {
                return (story.flagged === false) 
            })
            .map(this.renderStory)
        return storyElements
    }

    render() {
        return (
            <div>
                <div className="topFrontPage">
                    <img alt="" src="https://i.imgur.com/z4GRWr0.jpg"/>
                </div>
                <div className="middleFrontPage">      
                    {this.renderModStory(this.state.stories)}
                </div>
            </div>
        )
    }
}