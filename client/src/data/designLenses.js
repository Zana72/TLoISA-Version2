
export const lensesData = {
    challenges: [
        {
            title: "Scaffolded Complexity",
            motivator: "CO",
            description: "To neither bore nor frustrate, good challenges grow with the user's skills.",
            questions: [
                "How might you track the user's skill growth?",
                "How can you increase the difficulty and choice of available goals and actions with the user's skill?",
                "How might you turn 'more of the same' into 'different', 'more complex'?",
                "How might you automate away what the user has mastered?"
            ]
        },
        {
            title: "Varied Challenge",
            motivator: "CO",
            description: "Good challenges vary to give the user experiences of mastery and not become boring.",
            questions: [
                "How might you vary the challenge - in used elements, themes, constraints, or way of doing things?",
                "How might you give the user moments of excelling at something?"
            ]
        },
        {
            title: "Onboarding",
            motivator: "CO",
            description: "Good challenges make learning the system intentional part of the experience for newcomers",
            questions: [
                "How might you create a strong want in the user to start?",
                "How might the user experience success in the first minute?",
                "What is the core goal-action-feedback loop of your system? How might the user learn it by doing it in the first minute?"
            ]
        },
        {
            title: "General challenge",
            motivator: "ANY",
            description: "Anything that does not fit the proposed design lenses but fits into challenge",
            questions: []
        }
    ],
    motivation: [
        {
            title: "Intrinsic Rewards",
            motivator: "MO",
            description: "To avoid coercing users or devaluing the activity, rewards should support intrinsic needs.",
            questions: [
                "How might you reward the user's success with more possibilities & choices",
                "How might you reward the user's success with a sense of social connection?",
                "How might you reward the user's success with a palpable growth of skills?",
                "How might you reward the user's success with more potent tools & content?",
                "How might you reward the user's success with in general, satisfying the driving motivation & emotion?"
            ]
        },
        {
            title: "General motivation",
            motivator: "ANY",
            description: "Anything that does not fit the proposed design lenses but fits into motivation",
            questions: []
        }
    ],
    goals: [
        {
            title: "Interim Goals",
            motivator: "CO",
            description: "To support a sense of progress and direction, structure the user's path with clear interim goals.",
            questions: [
                "How might you show the path to mastering the core challenge through explicit or implicit goals?",
                "How might you break down over-sized tasks with interim goals?",
                "How might you give the user a sense of freedom of choice what goal to pursure when?"
            ]
        },
        {
            title: "Viral calls to action",
            motivator: "RE",
            description: "Good games use A's actions to call B to action - and vice versa.",
            questions: [
                "What actions by other users would prompt a user to act?",
                "How might you make these actions of others visible to the user?",
                "How might you offer to the user to directly react to that in response?"
            ]
        },
        {
            title: "Next best action",
            motivator: "AA",
            description: "To maintain flow, good goals suggest the next best actions.",
            questions: [
                "In the given context, what would be the next best actions to take?",
                "How might you suggest these actions to the user - without taking away interesting choice?"
            ]
        },
        {
            title: "Secrets",
            motivator: "CU",
            description: "Good calls to action stoke curiosity by hinting at something hidden.",
            questions: [
                "What would your user be genuinely interested in?",
                "How might you hide that - and then hint at its existence?",
                "How might you leave open how something works, such that the user can find it out through exploration, without becoming frustrated?"
            ]
        },
        {
            title: "Templates",
            motivator: "CO",
            description: "Things to adapt are easy invitations that ease over the fear of the blank page.",
            questions: [
                "Can you provide a construction manual?",
                "Can you provide some randomly generated starting point?",
                "Can you provide a constrained set as starting point?",
                "Can you offer something half-done?",
                "Can you offer something to adapt?"
            ]
        },
        {
            title: "Traces of others",
            motivator: "CO",
            description: "Traces of what other people did are inspiring invitations to follow them.",
            questions: [
                "How might you show what other users did?",
                "How might you allow users to take and adapt what others did?"
            ]
        },
        {
            title: "General goal",
            motivator: "ANY",
            description: "Anything that does not fit the proposed design lenses but fits into goal",
            questions: []
        }
    ],
    actions: [
        {
            title: "Bite sized actions",
            motivator: "CO",
            description: "Well-designed actions are split into an immediately doable size that gives the good feeling of having accomplished something.",
            questions: [
                "How might you split activities into immediately doable chunks?",
                "How might you reduce actions into single clicks/swipes?"
            ]
        },
        {
            title: "Interesting choices",
            motivator: "CO, AA",
            description: "Well-designed actions provide only interesting choices.",
            questions: [
                "Does the action have a real impact on future events relevant to the user?",
                "Are there trivial, mindless, routine decisions or steps you can hide or automate away?",
                "Can you offer multiple different ways to the same result that differ meaningfully?"
            ]
        },
        {
            title: "Limited choice",
            motivator: "CO",
            description: "Well-designed actions do not overwhelm users with too much choice.",
            questions: [
                "How might we limit the number of actions offered?", 
                "How might we highlight important actions?"
            ]
        },
        {
            title: "Micro-flow",
            motivator: "CO, AA",
            description: "Well-designed actions form an uninterrupted loop of immediate action and feedback.",
            questions: [
                "Is there a small repeated activity in your application or service?",
                "How could you reduce it to a tight loop of one click/swipe and one immediate feedback comprising congratulation and next suggested action?"
            ]
        },
        {
            title: "Small pieces, loosely joined",
            motivator: "AU",
            description: "Resources inviting exploration and creativity are like Lego bricks: They can be easily assembled, reassembled, and disassembled.",
            questions: [
                "What is your 'Lego brick'?",
                "How might you enable users to easily (re)assemble it?"
            ]
        },
        {
            title: "Expressive objects",
            motivator: "ID",
            description: "With good resources, users can express who they are, want to be, and belong to",
            questions: [
                "How might your users create something that is definitely them?",
                "How might your users create something unique?",
                "How might your users create something that shows who they belong to?"
            ]
        },
        {
            title: "Under-determination",
            motivator: "AU",
            description: "To invite exploration and creativity, good resources have no clearly prescribed space of possible uses and configurations.",
            questions: [
                "How might you leave blanks to fill out for your users?",
                "How might you design resources so that you cannot fully predict what users will do with them?"
            ]
        },
        {
            title: "Sensual objects",
            motivator: "CO",
            description: "With good resources, exploring their (pseudo-)physical properties is a joy",
            questions: [
                "Digital: How might you make clicking, swiping, typing 'tactile'?",
                "Physical: How might out object be a joy to touch, listen to, look at?"
            ]
        },
        {
            title: "General actions & objects",
            motivator: "ANY",
            description: "Anything that does not fit the proposed design lenses but fits into actions & objects",
            questions: []
        }
    ],
    rules: [
        {
            title: "General rules",
            motivator: "ANY",
            description: "Anything that fits into rules",
            questions: []
        }
    ],
    feedback: [
        {
            title: "Immediate",
            motivator: "CO",
            description: "To reduce friction and not break flow, good feedback occurs right where and when the action occurs.",
            questions: [
                "How might you provide feedback immediately after the action?",
                "How might you provide feedback right where the action occurs?"
            ]
        },
        {
            title: "Juicy",
            motivator: "CO",
            description: "Excessive, varied sensual positive feedback can instil competence, curiosity and surprise.",
            questions: [
                "What are the small steps of the action?, When does a user achieve some goal with that action?",
                "How might you exaggerate the auditory, visual, and tactile feedback at these moments - without getting in the way of a user's goal pursuit?",
                "Is there a material or creature with enjoyable sensual properties that might inspire your feedback?"
            ]
        },
        {
            title: "Actionable",
            motivator: "CO",
            description: "To foster learning and competence, good feedback tells users how successful they were - and how to improve.",
            questions: [
                "How might you vary feedback based on the users degree of success?",
                "How might you include tips for improvement in feedback?"
            ]
        },
        {
            title: "Appeal to motives",
            motivator: "MO",
            description: "Good feedback elicits the emotions and motivations that drive the activity.",
            questions: [
                "What motivations and emotions driver your users to engage in your target activity?",
                "How can you appeal to them in image, sound, text?"
            ]
        },
        {
            title: "Glanceable",
            motivator: "CO",
            description: "To not break flow, good feedback does not get in the way of taking the next action.",
            questions: [
                "How can you give feedback without covering the main object of attention?",
                "How can you give feedback without getting in the way of the user taking the next action?"
            ]
        },
        {
            title: "Varied",
            motivator: "CU",
            description: "To remain interesting, good feedback varies without being unlearnably or confusingly inconsistent.",
            questions: [
                "How can you create meaningful variation in feedback with minimum effort?",
                "How might you make the variation juicy, actionable, and informative?"
            ]
        },
        {
            title: "Surprising",
            motivator: "CU",
            description: "To stoke curiosity, good feedback is surprising.",
            questions: [
                "Are there pleasant unexpected surprises you can integrate?",
                "How might you vary feedback using a probability distribution?",
                "How might you hide some easter eggs to drive exploration?",
                "How might you pleasantly supersede expectations to induce amazement?"
            ]
        },
        {
            title: "Graspable progress",
            motivator: "CO",
            description: "Good feedback makes the current status and progress of the user graspable.",
            questions: [
                "How might you make sensual, tactile what the user has already achieved?",
                "How might you use progress indicators to suggest next goals to the user?"
            ]
        },
        {
            title: "General feedback",
            motivator: "ANY",
            description: "Anything that does not fit the proposed design lenses but fits into feedback",
            questions: []
        }
    ]
}