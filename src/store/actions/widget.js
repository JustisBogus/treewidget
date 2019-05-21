import { ADD_PEOPLE, ADD_LEVEL, ADD_LEVEL_WIDTH, 
    ADD_SELECTED, ADD_SELECTED_VISIBLE_PEOPLE, ADD_OPENED_LAST_NODES_LEVEL } 
    from './actionTypes';

export const addPeople = (people) => {
    return {
        type:ADD_PEOPLE,
        people
    };
};

export const addLevel = (level) => {
    return {
        type:ADD_LEVEL,
        level
    };
};

export const addLevelWidth = (levelWidth) => {
    return {
        type:ADD_LEVEL_WIDTH,
        levelWidth
    };
};

export const addSelected = (id, level) => {
    return {
        type:ADD_SELECTED,
        id, level
    };
};

export const addSelectedVisiblePeople = (index, nextIndex, maxLevel) => {
    return {
        type:ADD_SELECTED_VISIBLE_PEOPLE,
        index, nextIndex, maxLevel 
    };
};

export const addOpenedLastNodesLevel = (level) => {
    return {
        type:ADD_OPENED_LAST_NODES_LEVEL,
        level
    };
};

