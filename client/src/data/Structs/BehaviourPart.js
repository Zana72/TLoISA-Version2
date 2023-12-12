
export default function BehaviourPart(id, name, priority, motivations=[], hurdles=[], fitAnswers=[false, false, false, false]) {
    return {
        id: id,
        name: name,
        priority: priority,
        motivations: motivations,
        hurdles: hurdles,
        fitAnswers: fitAnswers
    }
}