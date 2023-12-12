import { v4 as uuidv4 } from 'uuid';

export default function ClusterGroup(name, id=uuidv4(), x=0, y=0) {
    return {
        id: id,
        name: name,
        pos: {x: x, y: y}
    }
}