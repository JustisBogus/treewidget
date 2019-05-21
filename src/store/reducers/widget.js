import { ADD_PEOPLE, ADD_LEVEL, ADD_LEVEL_WIDTH, ADD_SELECTED, ADD_SELECTED_VISIBLE_PEOPLE, ADD_OPENED_LAST_NODES_LEVEL } from '../actions/actionTypes';
import { peopleData, visiblePeopleData } from './peopleData';

const initialState = {
    people: peopleData,
    highestLevel: 0,
    hiddenLevels: 0,
    selectedIndex: null,
    selectedNextIndex: null,
    selectedMaxLevel: 0,
    selectedId: null,
    selectedLevel: null,
    levelWidth: 2,
    openedLastNodes: [], 
    visiblePeople: visiblePeopleData,    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PEOPLE:
            return { 
                ...state,
                visiblePeople: action.people    
            };
        case ADD_LEVEL:
            return { 
                ...state,
                highestLevel: action.level   
            };
        case ADD_SELECTED:
            return { 
                ...state,
                selectedId: action.id,
                selectedLevel: action.level,
            };
        case ADD_LEVEL_WIDTH:
            return {
                ...state,
                levelWidth: action.levelWidth
            };
        case ADD_SELECTED_VISIBLE_PEOPLE :
            return {
                ...state,
                selectedIndex: action.index,
                selectedNextIndex: action.nextIndex,
                selectedMaxLevel: action.maxLevel,
            };
        case ADD_OPENED_LAST_NODES_LEVEL :
            return {
                ...state,
                openedLastNodes: action.level,
            };
        default:
            return state;
    }
};

export default reducer;