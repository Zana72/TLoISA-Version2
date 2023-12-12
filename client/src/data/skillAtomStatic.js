import { Favorite, GolfCourse, Hiking, Kayaking, SettingsSuggest, ThumbUp } from "@mui/icons-material"

export const skillAtomStatic = {
    motivation: {
        title: "Motivation",
        info: "What motivations energize and direct the activity?",
        icon: <Favorite/>
    },
    goals: {
        title: "Goal",
        info: "How does my system articulate these inherent challenges in goals?", //(How might it articulate them to connect to the user's motivations?)
        icon: <GolfCourse/>
    },
    actions: {
        title: "Actions & Objects",
        info: "What actions can users take in my system to achieve these goals? What objects can the user act in my system on to achieve these goals?",
        icon: <Kayaking />
    },
    rules: {
        title: "Rules",
        info: "What rules does my system articulate that determine what actions are allowable and what system changes and feedback they result in?",
        icon: <SettingsSuggest />
    },
    feedback: {
        title: "Feedback",
        info: "What feedback does my system provide on how successful the user's actions were and how much progress she has made toward her goals? (How might I make this feedback clear, immediate, actionable, speaking to the user's motivations, affording a sense of competence?)",
        icon: <ThumbUp/>
    },
    challenges: {
        title: "Challenge",
        info: "What challenges are inherent in the activity? What challenges can be removed through automation or improving usability?",
        icon: <Hiking />
    }
}