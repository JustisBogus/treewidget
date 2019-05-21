import React, { Component } from 'react';
import './Person.scss';

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const hiddenLevels = Math.abs(this.props.levelWidth - this.props.highestLevel);

        const invisibleLevels = this.props.levelWidth - this.props.highestLevel;
        /*
        let n;
        if (invisibleLevels < 0) {
        n = this.props.level - hiddenLevels;
        }
        if (invisibleLevels >= 0) {
        n = this.props.level;    
        }
         */

        /*
        let openedLastNodes = this.props.openedLastNodes;
        let visibleVerticalLines;
        if (openedLastNodes.length > 0){
        for (let i = 0; i < n; i++) {
            if (i === openedLastNodes[i].level && openedLastNodes.index < this.props.index) {
                n[i].level = 'invisible';
            }
            if (i !== openedLastNodes[i].level) {
                n[i].level = 'visible';
            }
        }
    }
    */
    /*
        if (n>0) {
            verticalLine = [...Array(n)].map((e, i) => 
            <div 
            className={this.props.lastNode && i===0 ? 'person-lineVerticalLast' : 'person-lineVertical'}
            key={i}
            style={invisibleLevels < 0 ? {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40) 
                - (hiddenLevels * 60) - (i * 60) } :
            {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40) - (i * 60)}}>
            </div>)
        }
        */
        let verticalLine;

        let verticalLineHeight;
        if (this.props.nextIndex) {
            verticalLineHeight = (this.props.nextIndex - this.props.index + 1) * 52 ;
        }
        if ((invisibleLevels < 0 && this.props.level - hiddenLevels > 0) 
         || (invisibleLevels >= 0 && this.props.level > 0)) {
            verticalLine = <div 
                className={this.props.lastNode ? 'person-lineVerticalLast' : 'person-lineVertical'}
                style={this.props.lastNode ? (invisibleLevels < 0 ? {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40) 
           - (hiddenLevels * 60) } :
                    {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40)})
                     : (invisibleLevels < 0 ? {height: verticalLineHeight, marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40) 
            - (hiddenLevels * 60) } :
                        {height: verticalLineHeight ,marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40)})}>
            </div>
        }
        
        let horizontalLine;

        if ((invisibleLevels < 0 && this.props.level - hiddenLevels > 0) 
            || (invisibleLevels >= 0 && this.props.level > 0)) {
            horizontalLine = <div className='person-lineHorizontal'
                style={this.props.levelWidth - this.props.highestLevel < 0 ? 
                    {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40) 
            - (hiddenLevels * 60) } :
                    {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40)}}>
                {this.props.firstNode || this.props.lastNode ? 
                    <div className='person-lineHorizontalLevel'>{this.props.level + 1}</div> : null }
            </div>
        }

        let content;

        if (this.props.paginationButton) {
            content = (<div
                className={this.props.visible ? (this.props.levelWidth - this.props.highestLevel < 0 
                    && hiddenLevels > this.props.level ?
                    'person-invisible' : 'person-visible') : 'person-invisible'}>
                     <div className='person-linesWrap'>
                    {verticalLine}
                    {horizontalLine}
                    <div className='person-contentContainer'>
                <div
                onClick={() => this.props.loadMoreAssociates(
                    this.props.id, 
                    this.props.index,
                    this.props.level,
                    this.props.invitedBy,
                    )}
                className={this.props.selected ? 'person-container-paginationSelected' : 
        (this.props.invitedBy === this.props.selectedId ? 'person-container-paginationBlack' : 
        (this.props.level === this.props.selectedLevel - 1 ? 'person-container-paginationGray' : 'person-container-paginationLightgray'))} 
                style={invisibleLevels < 0 ? {marginLeft:(this.props.level * 60) - (hiddenLevels * 60 ) } :
                    {marginLeft:(this.props.level * 60)}}>
                    <div 
                        className='person-wrap'>
                        <div 
                            className='person-associates'>
                        </div>
                        <div
                            className='person-name'>
                            Load 10 More
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }

        if (!this.props.paginationButton) {
            content = <div
                className={this.props.visible ? (this.props.levelWidth - this.props.highestLevel < 0 
                    && hiddenLevels > this.props.level ?
                    'person-invisible' : 'person-visible') : 'person-invisible'}>
                    <div className='person-linesWrap'>
                    {verticalLine}
                    {horizontalLine}
                    <div className='person-contentContainer'>
                <div
                 onClick={() => this.props.addAssociates(
                    this.props.id, 
                    this.props.index, 
                    this.props.clicked, 
                    this.props.firstClick,
                    this.props.level,
                    this.props.associates,
                    this.props.nextIndex)}
                className={this.props.selected ? 'person-container-selected' : 
        ( this.props.invitedBy === this.props.selectedId ? 'person-container-black' : 
        (this.props.level === this.props.selectedLevel ? 'person-container-gray' : 'person-container-lightgray'))} 
                style={invisibleLevels < 0 ? {marginLeft:(this.props.level * 60) - (hiddenLevels * 60 ) } :
                    {marginLeft:(this.props.level * 60)}}>
                    <div className='person-wrap'>
                        <div className='person-associates'>
                            
                            {this.props.associates}
                        </div>
                        <div className='person-name'>
                            {this.props.name}
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        }

        if (this.props.level === -1) {
            content = <div></div>
        }

        return <div> 
            {content}
        </div>;
    }
}

export default Person;
