import Idea from "../data/Structs/Idea";

const addIdea = (state, activeId, dlId, idea) => {
    const ideasCopy = JSON.parse(JSON.stringify(state));


    if (!ideasCopy[activeId]) {
        ideasCopy[activeId] = {
            [dlId]: [Idea(idea)]
        }
    } else if (!ideasCopy[activeId][dlId]) {
        ideasCopy[activeId][dlId] = [Idea(idea)]
    } else {
        ideasCopy[activeId][dlId].push(Idea(idea));
    }
    return ideasCopy;
}

const removeIdea = (state, activeId, dlId, pos) => {

    const ideasCopy = JSON.parse(JSON.stringify(state));
    ideasCopy[activeId][dlId] = state[activeId][dlId].filter((val, ind) => {
        return(parseInt(ind) !== parseInt(pos))
    })

    return ideasCopy
}

export default function ideasReducer(state, action) {
    switch(action.type) {
        case "ADD":
            return addIdea(state, action.activeId, action.dlId, action.idea);
        case "REMOVE":
            return removeIdea(state, action.activeId, action.dlId, action.pos);
        default:
            return state;
    }
}