import ClusterGroup from "../data/Structs/ClusterGroup";
import { v4 as uuidv4 } from 'uuid';
import ClusterIdea from "../data/Structs/ClusterIdea";

const initCanvas = (state, activeId) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (activeId) {
        if (!canvasCopy[activeId]) {
            canvasCopy[activeId] = {
                ideas: {},
                groups: {}
            }
        }
    }

    return canvasCopy;
}

const updateIdeas = (state, activeId, ideas) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (canvasCopy[activeId]) {

        for (let idea of ideas) {
            if (!canvasCopy[activeId].ideas[idea.id]) {
                canvasCopy[activeId].ideas[idea.id] = ClusterIdea();
            }
        }
    }

    return canvasCopy;
}

const moveIdea = (state, activeId, ideaId, newPos) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (canvasCopy[activeId]) {
        if (canvasCopy[activeId].ideas[ideaId]) {
            canvasCopy[activeId].ideas[ideaId].pos = newPos
        }
    }

    return canvasCopy;
}

const addDot = (state, activeId, ideaId) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (canvasCopy[activeId]) {
        if (canvasCopy[activeId].ideas[ideaId]) {
            canvasCopy[activeId].ideas[ideaId].dots = 1
        }
    }

    return canvasCopy;
}

const removeDot = (state, activeId, ideaId) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (canvasCopy[activeId]) {
        if (canvasCopy[activeId].ideas[ideaId]) {
            canvasCopy[activeId].ideas[ideaId].dots = 0
        }
    }

    return canvasCopy;
}

const addGroup = (state, activeId, groupTitle) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (canvasCopy[activeId]) {
        let newId = uuidv4();
        let length = Object.keys(canvasCopy[activeId].groups).length;
        console.log(-length*208);
        canvasCopy[activeId].groups[newId] = ClusterGroup(groupTitle, newId, -length*208);
    }

    return canvasCopy;
}

const removeGroup = (state, activeId, groupId) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (canvasCopy[activeId]) {
        delete canvasCopy[activeId].groups[groupId];
    }

    return canvasCopy;
}

const moveGroup = (state, activeId, groupId, newPos) => {
    const canvasCopy = JSON.parse(JSON.stringify(state))

    if (canvasCopy[activeId]) {
        if (canvasCopy[activeId].groups[groupId]) {
            canvasCopy[activeId].groups[groupId] = 
                ClusterGroup(
                    canvasCopy[activeId].groups[groupId].name,
                    groupId, newPos.x, newPos.y) 
        }
    }

    return canvasCopy;
}

export default function canvasReducer(state, action) {
    switch(action.type) {
        case "INIT":
            return initCanvas(state, action.activeId);
        case "MOVE":
            if (action.elem === "group") {
                return moveGroup(state, action.activeId, action.id, action.newPos)
            } else if (action.elem === "idea") {
                return moveIdea(state, action.activeId, action.id, action.newPos)
            } else return state;
        case "ADDDOTT":
            return addDot(state, action.activeId, action.id);
        case "REMOVEDOT":
            return removeDot(state, action.activeId, action.id);
        case "UPDATE":
            return updateIdeas(state, action.activeId, action.list)
        case "ADDGROUP":
            return addGroup(state, action.activeId, action.groupTitle);
        case "REMOVEGROUP":
            return removeGroup(state, action.activeId, action.groupId);
        default:
            return state;
    }
}