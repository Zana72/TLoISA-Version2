import { v4 as uuidv4 } from 'uuid';

export default function ClusterIdea(id=uuidv4(), x=0, y=0, dots=0) {
    return {
        id: id,
        pos: {x: x, y: y},
        dots: dots
    }
}