import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPeople, addLevel, addLevelWidth, 
    addSelected, addSelectedVisiblePeople, addOpenedLastNodesLevel } 
    from '../store/actions/widget';
import Person from './Person/Person';
import './Main.scss';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = (e) => {
        const windowSize = window.innerWidth;
        const windowWidth = windowSize / 200;
        const levelWidth = Number((windowWidth).toFixed(0));
        this.props.onAddLevelWidth(levelWidth);
    };

    toggleAddAssociates = (id, index, clicked, firstClick, level, associates, maxIndex) => {
        const allPeople = this.props.people;
        let visiblePeople = [...this.props.visiblePeople];
        if (!clicked && firstClick) {
           
            const newAssociates = allPeople.filter(associate => {
                return associate.invitedBy === id;
            });
            for (let i = 0; i < newAssociates.length; i++) {
                newAssociates[i].index = index + i + 1;
                newAssociates[i].level = level + 1;
                newAssociates[i].firstClick = true;
                newAssociates[i].visible = true;
                newAssociates[i].paginationButton = false;
                newAssociates[i].depth = level + 1 - this.props.hiddenLevels;
                newAssociates[i].invitedBy = id;
                newAssociates[i].firstNode = false;
                newAssociates[i].lastNode = false;
                if (i === 0) {
                    newAssociates[i].firstNode = true;
                }
                if (i === newAssociates.length - 1 ) {
                    newAssociates[i].lastNode = true;
                }
            }

            for (let i = 0; i < visiblePeople.length; i++) {
                if (visiblePeople[i].id === id) {
                    visiblePeople[i].clicked = true;
                    visiblePeople[i].firstClick = false;
                    visiblePeople[i].selected = true;
                    if (newAssociates.length <= 10) {
                        visiblePeople[i].nextIndex = index + newAssociates.length;
                    }
                    if (newAssociates.length > 10) {
                        visiblePeople[i].nextIndex = index + 11;
                    }
                }
                if (visiblePeople[i].id === id && associates >= 1) {
                    visiblePeople[i].clicked = true;
                    visiblePeople[i].firstClick = false;
                    visiblePeople[i].selected = true;
                }
                if (visiblePeople[i].id !== id) {
                    visiblePeople[i].selected = false;
                }
            }

            const paginationAssociates = newAssociates.filter(associate => {
                return associate.index >= newAssociates[0].index && associate.index <= newAssociates[0].index + 9;
            });

            let paginationButton;
        
            if (newAssociates.length > 0) {
                paginationButton = {
                    id: newAssociates[0].id + 'p',
                    index: newAssociates[0].index + 10,
                    level: newAssociates[0].level,
                    name: 'Pagination',
                    associates: 0,
                    email: '',
                    tel: '',
                    enrolmentDate: '',
                    invitedBy: id,
                    paginationButton: true,
                    lastNode:true,
                    clicked: false,
                    selected: false,
                    visible: true,
                    firstClick: true,
                };
            }
          
            for (let i = 0; i < visiblePeople.length; i++) {
                /*
                if (visiblePeople[i].level < level && visiblePeople[i].visible 
                    && newAssociates.length <= 10) {
                    visiblePeople[i].nextIndex = visiblePeople[i].nextIndex + newAssociates.length;
                }
                if (visiblePeople[i].level < level && visiblePeople[i].visible && newAssociates.length > 10) {
                    visiblePeople[i].nextIndex = visiblePeople[i].nextIndex + 11;
                }
                */
                if (associates >= 1) {
                    if (visiblePeople[i].index > index && newAssociates.length <= 10) {
                        visiblePeople[i].index = visiblePeople[i].index + newAssociates.length;
                    }
                    if (visiblePeople[i].index > index && newAssociates.length > 10) {
                        visiblePeople[i].index = visiblePeople[i].index + 11;
                    }
                }
            }

            visiblePeople = visiblePeople.concat(paginationAssociates);

            if (newAssociates.length > 10) {
                visiblePeople = visiblePeople.concat(paginationButton);
            }
            this.props.onAddPeople(visiblePeople);
            this.props.onAddSelected(id, level);
            const highestLevel = level + 1;
            if (associates >= 1 && highestLevel > this.props.highestLevel) {
                this.props.onAddLevel(highestLevel);
            }
        }

        if (!clicked && !firstClick) {
            for (let i = 0; i < visiblePeople.length; i++) {
                if (visiblePeople[i].id === id) {
                    visiblePeople[i].clicked = true;
                    visiblePeople[i].selected = true;
                }
                if (visiblePeople[i].id !== id) {
                    visiblePeople[i].selected = false;
                }
                if (visiblePeople[i].invitedBy === id 
                    && visiblePeople[i].paginationButton === false) {
                    visiblePeople[i].visible = true;
                }
                if (visiblePeople[i].level === level + 1 
                    && visiblePeople[i].paginationButton === true
                    && visiblePeople[i].clicked === false ) {
                    visiblePeople[i].visible = true;
                }
            }
            this.props.onAddPeople(visiblePeople);
            if (level === this.props.highestLevel) {
                this.props.onAddLevel(level + 1);    
            }

            this.props.onAddSelected(id, level);
        }
    
        if (clicked) {
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
        
            const highestLevelPeople = visiblePeople.filter(people => {
                return (people.level > level && people.visible === true &&
                    (people.index < index || people.index > nextIndex.index)) 
            });
    
            const highestLevelVisiblePeople = Math.max.apply(Math, highestLevelPeople.map(people => { 
                return people.level; 
            }));

            for (let i = 0; i < visiblePeople.length; i++) {
                if (visiblePeople[i].id === id) {
                    visiblePeople[i].clicked = false;
                    visiblePeople[i].selected = true;
                }
                if (visiblePeople[i].id !== id) {
                    visiblePeople[i].selected = false;
                }
                if (visiblePeople[i].index > index
                    && visiblePeople[i].index < nextIndex.index
                    && visiblePeople[i].level > level) {
                    visiblePeople[i].visible = false;
                    if (!visiblePeople[i].paginationButton) {
                        visiblePeople[i].clicked = false;
                    }
                }
                
                if (visiblePeople[i].id === id ) {
                    visiblePeople[i].nextIndex = visiblePeople[i].nextIndex - (maxIndex - index);
                } 
            
            }
            if (associates >= 1 && level <= this.props.highestLevel - 1 
                && highestLevelPeople.length === 0) {
                const highestLevel = this.props.highestLevel - (this.props.highestLevel - level);
                this.props.onAddLevel(highestLevel);
            }
            if (associates >= 1 && highestLevelPeople.length >= 1) {
                this.props.onAddLevel(highestLevelVisiblePeople);
            };
            this.props.onAddSelected(id, level);
            this.props.onAddPeople(visiblePeople); 
        }
    }

    levelUp = () => {
        const visiblePeople = this.props.visiblePeople;
        for (let i = 0; i < visiblePeople.length; i++) {
            if (visiblePeople[i].level === this.props.highestLevel) {
                visiblePeople[i].visible = false;
            }
            if (visiblePeople[i].level === this.props.highestLevel - 1) {
                visiblePeople[i].clicked = false;
            }
        }
        const highestLevel = this.props.highestLevel - 1;
        this.props.onAddLevel(highestLevel);
        this.props.onAddPeople(visiblePeople);
    }

    loadMoreAssociates = (id, index, level, invitedBy) => {
        const allPeople = this.props.people;
        let visiblePeople = this.props.visiblePeople;

        for (let i = 0; i < visiblePeople.length; i++) {
            if (visiblePeople[i].id === id) {
                visiblePeople[i].visible = false;
                visiblePeople[i].clicked = true;
            }
        }
        const indexInvitedBy = visiblePeople.find(associate => {
            return associate.index === index - 1;
            });
        const allNewAssociates = allPeople.filter(associate => {
            return associate.invitedBy === indexInvitedBy.invitedBy;
        });
       
        const loadedAssociates = visiblePeople.filter(associate => {
            return associate.level === level && associate.index < index &&
            associate.index > index - 11;       
        });

        const maxLoadedIndex = Math.max.apply(Math, loadedAssociates.map(associates => { 
            return associates.index; 
        }));
  
        const newAssociates = allNewAssociates.filter( ( associate ) => !loadedAssociates.includes( associate ) );

        for (let i = 0; i < newAssociates.length; i++) {
            newAssociates[i].index = maxLoadedIndex + i + 1;
            newAssociates[i].level = level;
            newAssociates[i].firstClick = true;
            newAssociates[i].visible = true;
            newAssociates[i].paginationButton = false;
            newAssociates[i].invitedBy = indexInvitedBy.invitedBy;
        }

        const paginationAssociates = newAssociates.filter(associate => {
            return associate.index >= newAssociates[0].index && associate.index <= newAssociates[0].index + 9;
        });

        let paginationButton;
        if (newAssociates.length > 0) {
            paginationButton = {
                id: newAssociates[0].id + 'p',
                index: newAssociates[0].index + 10,
                level: newAssociates[0].level,
                name: 'Pagination',
                associates: 0,
                email: '',
                tel: '',
                enrolmentDate: '',
                invitedBy: id,
                paginationButton: true,
                lastNode:true,
                clicked: false,
                selected: false,
                visible: true,
                firstClick: true,
            };
        }

        for (let i = 0; i < visiblePeople.length; i++) {

            if (visiblePeople[i].index > index) {
                visiblePeople[i].index = visiblePeople[i].index + newAssociates.length;
            }
            if (visiblePeople[i].level < level && visiblePeople[i].visible && newAssociates.length <= 10) {
                visiblePeople[i].nextIndex = visiblePeople[i].nextIndex + newAssociates.length - 1 ;
            }
            if (visiblePeople[i].level < level && visiblePeople[i].visible && newAssociates.length > 10) {
                visiblePeople[i].nextIndex = visiblePeople[i].nextIndex + 11;
            }
        }

        visiblePeople = visiblePeople.concat(paginationAssociates);

        if (newAssociates.length > 10) {
            visiblePeople = visiblePeople.concat(paginationButton);
        }
        this.props.onAddPeople(visiblePeople);
    }

    render() {
        let levelDown;

        if (this.props.highestLevel > this.props.levelWidth) {
            levelDown = <div 
                className="main-levelDown"
                onClick={() => this.levelUp()}
            >
                <div> One branch up the Plum Tree </div>
            </div>
        }

        if (this.props.highestLevel <= this.props.levelWidth) {
            levelDown = <div 
                className="main-levelDownInactive">
                <div> One branch up the Plum Tree </div>
            </div>
        }

        return (
            <div className="main-container">
                <div className="main-treeContainer">
                    {
                        this.props.visiblePeople.sort((a,b)=>a.index > b.index)
                            .map(person => {
                                return <Person
                                        key={person.id}
                                        id={person.id}
                                        index={person.index}
                                        name={person.name}
                                        associates={person.associates}
                                        email={person.email}
                                        tel={person.tel}
                                        enrolmentDate={person.enrolmentDate}
                                        invitedBy={person.invitedBy}
                                        clicked={person.clicked}
                                        visible={person.visible}
                                        firstClick={person.firstClick}
                                        level={person.level}
                                        paginationButton={person.paginationButton}
                                        firstNode={person.firstNode}
                                        lastNode={person.lastNode}
                                        prevLastNodes={person.prevLastNodes}
                                        selected={person.selected}
                                        nextIndex={person.nextIndex}
                                        selectedIndex={this.props.selectedIndex}
                                        selectedNextIndex={this.props.selectedNextIndex}
                                        selectedId={this.props.selectedId}
                                        selectedLevel={this.props.selectedLevel}
                                        selectedMaxLevel={this.props.selectedMaxLevel}
                                        levelWidth={this.props.levelWidth}         
                                        highestLevel={this.props.highestLevel}
                                        openedLastNodes={this.props.openedLastNodes}
                                        addAssociates={this.toggleAddAssociates}
                                        loadMoreAssociates={this.loadMoreAssociates}
                                />
                        })
                    }
                </div>
                    <div className="main-levelDownContainer">
                {levelDown}
                </div>
            </div>
            );
        }
    }

const mapStateToProps = state => {
    return {
        people: state.widget.people,
        highestLevel: state.widget.highestLevel,
        hiddenLevels: state.widget.hiddenLevels,
        levelWidth: state.widget.levelWidth,
        selectedId: state.widget.selectedId,
        selectedLevel: state.widget.selectedLevel,
        selectedIndex: state.widget.selectedIndex,
        selectedNextIndex: state.widget.selectedNextIndex,
        selectedMaxLevel: state.widget.selectedMaxLevel,
        openedLastNodes: state.widget.openedLastNodes,
        visiblePeople: state.widget.visiblePeople
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPeople: (people) => dispatch(addPeople(people)),
        onAddLevel: (level) => dispatch(addLevel(level)),
        onAddSelected: (id, level) => dispatch(addSelected(id, level)),
        onAddOpenedLastNodesLevel: (level) => dispatch(addOpenedLastNodesLevel(level)),
        onAddSelectedVisiblePeople: (index, nextIndex, maxVisibleLevel) => dispatch(addSelectedVisiblePeople(index, nextIndex, maxVisibleLevel)),
        onAddLevelWidth: (levelWidth) => dispatch(addLevelWidth(levelWidth)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
