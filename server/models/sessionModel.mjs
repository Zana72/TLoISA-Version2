import mongoose from "mongoose";
import { activitySchema } from "./activityModel.mjs";
import { behaviorSchema } from "./behaviorModel.mjs";
import { HurdlesSchema } from "./HurdlesModel.mjs";
import { pairsSchema } from "./pairs.models.mjs";
import { motivatorsSchema } from "./motivatorsModel.mjs";
import { targetGroupSchema } from "./targetGroupModel.mjs";
import { synthesisSchema } from "./synthesisModel.mjs";
import { problemSchema } from "./problemModel.mjs";
import { ideaSchema } from "./ideaModel.mjs";
import { groupSchema } from "./groupModel.mjs";

const SessionSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  activities: [activitySchema],
  goal: String,
  metric: String,
  timestamp: String,
  behaviors: [behaviorSchema],
  hurdler: [HurdlesSchema],
  pairs: [pairsSchema],
  targetGroups: [targetGroupSchema],
  motivations: [motivatorsSchema],
  synthesis: [synthesisSchema],
  problems: [problemSchema],
  ideas: [ideaSchema],
  groups: [groupSchema],
  sessionTime: { m: Number, s: Number },
  ideaTime: { m: Number, s: Number },
  usersIn:0
});

const Session = mongoose.model("Session", SessionSchema);

export default Session;
