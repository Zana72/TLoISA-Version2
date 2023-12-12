import { v4 as uuidv4 } from 'uuid';

export default function Idea(name, id=uuidv4()) {
    return {
        id: id,
        name: name
    }
}