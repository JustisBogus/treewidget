import React, { Component } from 'react';
import './Person.scss';

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

         /*
        let betweenSelected = false

        if (this.props.index > this.props.selectedIndex && this.props.index < this.props.selectedNextIndex) {
            betweenSelected = true;
        }
        */

        let hiddenLevels = Math.abs(this.props.levelWidth - this.props.highestLevel);

        let invisibleLevels = this.props.levelWidth - this.props.highestLevel;

        let n;
        if (invisibleLevels < 0) {
        n = this.props.level - hiddenLevels;
        }
        if (invisibleLevels >= 0) {
        n = this.props.level;    
        }

        let verticalLine;

        if (n>0) {
            verticalLine = [...Array(n)].map((e, i) => <div 
            className={(this.props.lastNode && i===0) || this.props.paginationButton ? 'person-lineVerticalLast' : 'person-lineVertical'}
            key={i}
            style={invisibleLevels < 0 ? {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40) 
                - (hiddenLevels * 60) - (i * 60) } :
            {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40) - (i * 60)}}>
            </div>)
        }

        let horizontalLine;

        if ((invisibleLevels < 0 && this.props.level - hiddenLevels > 0) 
            || (invisibleLevels >= 0 && this.props.level > 0)) {
            horizontalLine = <div className='person-lineHorizontal'
            style={this.props.levelWidth - this.props.highestLevel < 0 ? 
            {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40) 
                - (hiddenLevels * 60) } :
            {marginLeft:(this.props.level * 20) + ((this.props.level - 1) * 40)}}>
            <div className='person-lineHorizontalLevel'>{this.props.level + 1}</div>
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
                    this.props.selected,
                    this.props.invitedBy)}
                className={this.props.selected ? 'person-container-paginationSelected' : 
        (this.props.level === this.props.highestLevel ? 'person-container-paginationBlack' : 
        (this.props.level === this.props.highestLevel - 1 ? 'person-container-paginationGray' : 'person-container-paginationLightgray'))} 
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
                    this.props.selected,
                    this.props.invitedBy)}
                className={this.props.selected ? 'person-container-selected' : 
        (this.props.level === this.props.highestLevel ? 'person-container-black' : 
        (this.props.level === this.props.highestLevel - 1 ? 'person-container-gray' : 'person-container-lightgray'))} 
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

 /*
            const peopleLevel = visiblePeople.filter(people => {
                return people.level === level;
            });

            const peoplePrevLevel = visiblePeople.filter(people => {
                return people.level < level;
            });

            const maxLevelIndex = Math.max.apply(Math, peopleLevel.map(people => { 
                return people.index; 
                }));

            let nextIndex;
            if (index !== maxLevelIndex) {
                nextIndex = peopleLevel.find(people => {
                    return people.index > index;  
                });
            }
            if (index === maxLevelIndex) {
                nextIndex = peoplePrevLevel.find(people => {
                    return people.index > index;
                });
            }

            const selectedVisiblePeople = visiblePeople.filter(people => {
                return (people.level >= level && people.visible === true &&
                    (people.index > index || people.index < nextIndex.index)) 
            });

            const maxLevelVisibleIndex = Math.max.apply(Math, selectedVisiblePeople.map(people => { 
                return people.level; 
                }));

            const selectedNextIndex = nextIndex.index;
            */

            //this.props.onAddSelectedVisiblePeople(index, selectedNextIndex, maxLevelVisibleIndex);

            /*
            
            let lastNodeLevel

            if (lastNodeLevel) {
                let openedLastNodes = this.props.openedLastNodes;
                let lastNodeLevel = {
                    id: id,
                    index: index,
                    level: level,
                }
                openedLastNodes = openedLastNodes.concat(lastNodeLevel);
                this.props.onAddOpenedLastNodesLevel(openedLastNodes);
            }

            */

export default Person;
