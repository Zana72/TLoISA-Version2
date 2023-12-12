import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DoubleArrow } from "@mui/icons-material";
import SkillAtomPart from "./SkillAtomPart";
import { skillAtomStatic } from "../../data/skillAtomStatic";
import { socket } from "../../socket";
import ShowProfile from "./ShowProfile";

export default function SkillAtom(props) {
  console.log(props);
  /////////////////////////////////////////////////////////////////////////////////
  const [allSynt, setAllSynt] = useState([]);
  useEffect(() => {
    setAllSynt(
      props.activityPair
        ? props.synthesis.filter(
          (beh) => beh.pairsId === props.activityPair._id
        )
        : []
    );
  }, [props.activityPair, props.synthesis]);

  console.log(allSynt);

  //////////////////////////////////////////////////////////////////////////////////////

  const [activePart, setActivePart] = useState("Motivation");

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //motivation
  const [MotivatorDisabled, setMotivatorDisabled] = useState(false);
  const [MotivatorText, setMotivatorText] = useState("");
  const [MotivatorInputValue, setMotivatorInputValue] = useState("");
  const [MotivatorInputColor, setMotivatorInputColor] = useState("");
  const motivatorFocusHandler = () => {
    socket.emit("Motivator disable input", props.sessionId);
  };

  const motivatorBlurHandler = () => {
    socket.emit("Motivator enable input", props.sessionId);
  };

  const MotivatorChangeHandler = (e) => {
    setMotivatorText(e.target.value);
    socket.emit("Motivator typing", { message: e.target.value, id: props.sessionId });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Feedback
  const [FeedbackDisabled, setFeedbackDisabled] = useState(false);
  const [FeedbackText, setFeedbackText] = useState("");
  const [FeedbackInputValue, setFeedbackInputValue] = useState("");
  const [FeedbackInputColor, setFeedbackInputColor] = useState("");

  const FeedbackFocusHandler = () => {
    socket.emit("Feedback disable input", props.sessionId);
  };

  const FeedbackBlurHandler = () => {
    socket.emit("Feedback enable input", props.sessionId);
  };

  const FeedbackChangeHandler = (e) => {
    setFeedbackText(e.target.value);
    socket.emit("Feedback typing", { message: e.target.value, id: props.sessionId });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Goal
  const [GoalDisabled, setGoalDisabled] = useState(false);
  const [GoalText, setGoalText] = useState("");
  const [GoalInputValue, setGoalInputValue] = useState("");
  const [GoalInputColor, setGoalInputColor] = useState("");

  const GoalFocusHandler = () => {
    socket.emit("Goal disable input", props.sessionId);
  };

  const GoalBlurHandler = () => {
    socket.emit("Goal enable input", props.sessionId);
  };

  const GoalChangeHandler = (e) => {
    setGoalText(e.target.value);
    socket.emit("Goal typing", { message: e.target.value, id: props.sessionId });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Rules
  const [RulesDisabled, setRulesDisabled] = useState(false);
  const [RulesText, setRulesText] = useState("");
  const [RulesInputValue, setRulesInputValue] = useState("");
  const [RulesInputColor, setRulesInputColor] = useState("");

  const RulesFocusHandler = () => {
    socket.emit("Rules disable input", props.sessionId);
  };

  const RulesBlurHandler = () => {
    socket.emit("Rules enable input", props.sessionId);
  };

  const RulesChangeHandler = (e) => {
    setRulesText(e.target.value);
    socket.emit("Rules typing", { message: e.target.value, id: props.sessionId });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Challenge
  const [ChallengeDisabled, setChallengeDisabled] = useState(false);
  const [ChallengeText, setChallengeText] = useState("");
  const [ChallengeInputValue, setChallengeInputValue] = useState("");
  const [ChallengeInputColor, setChallengeInputColor] = useState("");

  const ChallengeFocusHandler = () => {
    socket.emit("Challenge disable input", props.sessionId);
  };

  const ChallengeBlurHandler = () => {
    socket.emit("Challenge enable input", props.sessionId);
  };

  const ChallengeChangeHandler = (e) => {
    setChallengeText(e.target.value);
    socket.emit("Challenge typing", { message: e.target.value, id: props.sessionId });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Action
  const [ActionDisabled, setActionDisabled] = useState(false);
  const [ActionText, setActionText] = useState("");
  const [ActionInputValue, setActionInputValue] = useState("");
  const [ActionInputColor, setActionInputColor] = useState("");

  const ActionFocusHandler = () => {
    socket.emit("Action disable input", props.sessionId);
  };

  const ActionBlurHandler = () => {
    socket.emit("Action enable input", props.sessionId);
  };

  const ActionChangeHandler = (e) => {
    setActionText(e.target.value);
    socket.emit("Action typing", { message: e.target.value, id: props.sessionId });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  


  useEffect(() => {
    socket.on("close motivation", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setMotivatorInputValue("");
      }
    });
    socket.on("close goals", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setGoalInputValue("");
      }
    });
    socket.on("close actions", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setActionInputValue("");
      }
    });
    socket.on("close challenges", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setChallengeInputValue("");
      }
    });
    socket.on("close feedback", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setFeedbackInputValue("");
      }
    });
    socket.on("close rules", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setRulesInputValue("");
      }
    });
    // emptyInput("close goals",setGoalInputValue)
    // emptyInput("close actions",setActionInputValue)
    // emptyInput("close rules",setRulesInputValue)
    // emptyInput("close feedback",setFeedbackInputValue)
    // emptyInput("close challenges",setChallengeInputValue)

    //Motivator
    socket.on("Motivator disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setMotivatorDisabled(true);
        setMotivatorInputColor("#90EE90")
      }

    });
    socket.on("Motivator enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setMotivatorDisabled(false);
        setMotivatorInputColor("");
      }
    });

    socket.on("Motivator typing", (data) => {
      console.log(data)
      if (data.id === localStorage.getItem("sessionId")) {
        setActivePart("Motivation")
        setMotivatorInputValue(data.message);
      }
    });
    // Feedback
    socket.on("Feedback disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setFeedbackDisabled(true);
        setFeedbackInputColor("#90EE90");
      }
    });

    socket.on("Feedback enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setFeedbackDisabled(false);
        setFeedbackInputColor("");
      }
    });

    socket.on("Feedback typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setActivePart("Feedback")
        setFeedbackInputValue(data.message);
      }
    });

    //Goal
    socket.on("Goal disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setGoalInputColor("#90EE90");
      }
    });
    socket.on("Goal enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setGoalDisabled(false);
        setGoalInputColor("");
      }
    });

    socket.on("Goal typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setActivePart("Goal")
        setGoalInputValue(data.message);
      }
    });
    //Rules

    socket.on("Rules disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setRulesDisabled(true);
        setRulesInputColor("#90EE90");
      }
    });
    socket.on("Rules enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setRulesDisabled(false);
        setRulesInputColor("");
      }
    });

    socket.on("Rules typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setActivePart("Rules")
        setRulesInputValue(data.message);
      }
    });

    //Challenge
    socket.on("Challenge disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setChallengeDisabled(true);
        setChallengeInputColor("#90EE90");
      }
    });
    socket.on("Challenge enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setChallengeDisabled(false);
        setChallengeInputColor("");
      }
    });

    socket.on("Challenge typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setActivePart("Challenge")
        setChallengeInputValue(data.message);
      }
    });
    //Action
    socket.on("Action disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setActionDisabled(true);
        setActionInputColor("#90EE90");
      }
    });
    socket.on("Action enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setActionDisabled(false);
        setActionInputColor("");
      }
    });

    socket.on("Action typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setActivePart("Actions & Objects")
        setActionInputValue(data.message);
      }
    });
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (allSynt) {
    const motivation = allSynt.filter((item) => item.type === "motivation");
    console.log(motivation);
    const goals = allSynt.filter((item) => item.type === "goals");
    console.log(goals);
    const actions = allSynt.filter((item) => item.type === "actions");
    const rules = allSynt.filter((item) => item.type === "rules");
    const feedback = allSynt.filter((item) => item.type === "feedback");
    const challenges = allSynt.filter((item) => item.type === "challenges");

    const addPoint = (type, text, setState) => {
      if (props.activityPair) {
        socket.emit("addSynthesis", {
          pairsId: props.activityPair._id,
          text: text,
          type: type,
          sessionId: props.sessionId,
        });
        socket.emit(`close ${type}`, props.sessionId);
        setState("");
      }
    };

    const removePoint = (id) => {
      socket.emit("deleteSynthesis", { id, sessionId: props.sessionId });
    };

    return (
      <Box>
        <Typography variant="h2" className="supTitleH2">Skill Atom</Typography>
        <Typography variant="h3" className="supTitleH3">
          Target Activity: {props.activityPair.activity} /{" "}
          {props.activityPair.targetGroup}
        </Typography>
        <ShowProfile top="1rem" right="2rem" profile={props.profile} />
        <Box className="skill-atom-box"
          sx={{
            position: "relative",
            m: 5,
            height: "50rem",
          }}
        >
          <SkillAtomPart
            isActive={activePart === skillAtomStatic.motivation.title}
            top="54%"
            left="0%"
            title={skillAtomStatic.motivation.title}
            info={skillAtomStatic.motivation.info}
            points={motivation}
            addPoint={() => {
              console.log("motivation");
              addPoint(
                "motivation",
                MotivatorInputValue,
                setMotivatorInputValue

              );
            }}
            removePoint={(id) => removePoint(id)}
            addPLaceholder="Add Motivation"
            icon={skillAtomStatic.motivation.icon}
            onClick={() => setActivePart("Motivation")}
            focus={motivatorFocusHandler}
            blur={motivatorBlurHandler}
            disabled={MotivatorDisabled}
            change={(e) => MotivatorChangeHandler(e)}
            value={MotivatorInputValue}
            groupText={MotivatorText}
            inputColor={MotivatorInputColor}
          />

          <DoubleArrow className="DoubleArrow"
            sx={{
              position: "absolute",
              top: "47%",
              left: "7%",
              transform: "rotate(-90deg)",
              fontSize: "36px",
            }}
          />
          <SkillAtomPart
            isActive={activePart === skillAtomStatic.goals.title}
            top="18%"
            left="0%"
            title={skillAtomStatic.goals.title}
            info={skillAtomStatic.goals.info}
            points={goals}
            addPoint={() =>
              addPoint("goals", GoalInputValue, setGoalInputValue)
            }
            removePoint={(id) => removePoint(id)}
            addPLaceholder="Add Goal"
            icon={skillAtomStatic.goals.icon}
            onClick={() => setActivePart("Goal")}
            focus={GoalFocusHandler}
            blur={GoalBlurHandler}
            disabled={GoalDisabled}
            change={(e) => GoalChangeHandler(e)}
            value={GoalInputValue}
            groupText={GoalText}
            inputColor={GoalInputColor}
          />
          <DoubleArrow className="DoubleArrow"
            sx={{
              position: "absolute",
              top: "16%",
              left: "23%",
              transform: "rotate(-16deg)",
              fontSize: "36px",
            }}
          />
          <SkillAtomPart
            isActive={activePart === skillAtomStatic.actions.title}
            top="0%"
            left="32%"
            title={skillAtomStatic.actions.title}
            info={skillAtomStatic.actions.info}
            points={actions}
            addPoint={() =>
              addPoint("actions", ActionInputValue, setActionInputValue)
            }
            removePoint={(id) => removePoint(id)}
            addPLaceholder="Add Action/Object"
            icon={skillAtomStatic.actions.icon}
            onClick={() => setActivePart("Actions & Objects")}
            focus={ActionFocusHandler}
            blur={ActionBlurHandler}
            disabled={ActionDisabled}
            change={(e) => ActionChangeHandler(e)}
            value={ActionInputValue}
            groupText={ActionText}
            inputColor={ActionInputColor}
          />
          <DoubleArrow className="DoubleArrow"
            sx={{
              position: "absolute",
              top: "24%",
              left: "56%",
              transform: "rotate(36deg)",
              fontSize: "36px",
            }}
          />
          <SkillAtomPart
            isActive={activePart === skillAtomStatic.rules.title}
            top="36%"
            left="64%"
            title={skillAtomStatic.rules.title}
            info={skillAtomStatic.rules.info}
            points={rules}
            addPoint={() =>
              addPoint("rules", RulesInputValue, setRulesInputValue)
            }
            removePoint={(id) => removePoint(id)}
            addPLaceholder="Add Rule"
            icon={skillAtomStatic.rules.icon}
            onClick={() => setActivePart("Rules")}
            focus={RulesFocusHandler}
            blur={RulesBlurHandler}
            disabled={RulesDisabled}
            change={(e) => RulesChangeHandler(e)}
            value={RulesInputValue}
            groupText={RulesText}
            inputColor={RulesInputColor}
          />
          <DoubleArrow className="DoubleArrow"
            sx={{
              position: "absolute",
              top: "70%",
              left: "56%",
              transform: "rotate(146deg)",
              fontSize: "36px",
            }}
          />
          <SkillAtomPart
            isActive={activePart === skillAtomStatic.feedback.title}
            top="72%"
            left="32%"
            title={skillAtomStatic.feedback.title}
            info={skillAtomStatic.feedback.info}
            points={feedback}
            addPoint={() =>
              addPoint("feedback", FeedbackInputValue, setFeedbackInputValue)
            }
            removePoint={(id) => removePoint(id)}
            addPLaceholder="Add Feedback"
            icon={skillAtomStatic.feedback.icon}
            onClick={() => setActivePart("Feedback")}
            focus={FeedbackFocusHandler}
            blur={FeedbackBlurHandler}
            disabled={FeedbackDisabled}
            change={(e) => FeedbackChangeHandler(e)}
            value={FeedbackInputValue}
            groupText={FeedbackText}
            inputColor={FeedbackInputColor}
          />
          <DoubleArrow className="DoubleArrow"
            sx={{
              position: "absolute",
              top: "79%",
              left: "23%",
              transform: "rotate(196deg)",
              fontSize: "36px",
            }}
          />
          <SkillAtomPart
            isActive={activePart === skillAtomStatic.challenges.title}
            top="36%"
            left="32%"
            title={skillAtomStatic.challenges.title}
            info={skillAtomStatic.challenges.info}
            points={challenges}
            addPoint={() =>
              addPoint(
                "challenges",
                ChallengeInputValue,
                setChallengeInputValue
              )
            }
            removePoint={(id) => removePoint(id)}
            addPLaceholder="Add Challenge"
            icon={skillAtomStatic.challenges.icon}
            onClick={() => setActivePart("Challenge")}
            focus={ChallengeFocusHandler}
            blur={ChallengeBlurHandler}
            disabled={ChallengeDisabled}
            change={(e) => ChallengeChangeHandler(e)}
            value={ChallengeInputValue}
            groupText={ChallengeText}
            inputColor={ChallengeInputColor}
          />
        </Box>
      </Box>
    );
  } else {
    return <Typography>Pick a target activity to proceed first</Typography>;
  }
}
