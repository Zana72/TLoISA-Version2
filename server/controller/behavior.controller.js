import express from "express";
import AsyncHandler from "express-async-handler";
import Session from "../models/sessionModel.mjs";

//////////////////////////////////////////////////////////////////////
//createBehavior

const createBehavior = async (sender, data) => {
  const { pairsId, name, sessionId } = data;

  if (name && pairsId && sessionId) {
    console.log(data);
    const session = await Session.findOne({ _id: sessionId });
    const allBehaviorBefore = session.behaviors;
    session.behaviors.push({
      pairsId,
      name,
      motivations: [],
      hurdler: [],
      priority: allBehaviorBefore.length,
      fitAnswers: [false, false, false, false],
    });
    session.behaviors.sort((a, b) => {
      return a.priority - b.priority;
    });

    await session.save();
    const allBehavior = session.behaviors;
    console.log(allBehavior);
    sender.emit("allBehavior", { allBehavior, id: session._id });
  }
};

export default createBehavior;

//////////////////////////////////////////////////////
// delete behavior

export const deleteBehavior = async (sender, data) => {
  const { sessionId, behaviorId } = data;
  if (sessionId && behaviorId) {
    const session = await Session.findOne({ _id: sessionId });
    session.behaviors = session.behaviors.filter(
      ({ _id }) => _id != behaviorId
    );
    await session.save();

    let allBehavior = session.behaviors;

    sender.emit("allBehavior", { allBehavior, id: session._id });
  }
};

////////////////////////////////////////////////////////////////////////////////
//addMotivator

export const addMotivator = async (sender, data) => {
  const { id, name, sessionId } = data;
  if (id && name && sessionId) {
    // return   console.log(data)
    const session = await Session.findOne({ _id: sessionId });
    const behSelected = session.behaviors.find(({ _id }) => _id == id);

    behSelected.motivations.push(name);
    await session.save();

    let allBehavior = session.behaviors;

    sender.emit("allBehavior", { allBehavior, id: session._id });
  }
};

////////////////////////////////////////////////////////////////////////////////
//addHurdler
export const addHurdler = async (sender, data) => {
  const { id, name, sessionId } = data;
  if (id && name && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    const behSelected = session.behaviors.find(({ _id }) => _id == id);
    behSelected.hurdler.push(name);
    await session.save();

    let allBehavior = session.behaviors;

    sender.emit("allBehavior", { allBehavior, id: session._id });
  }
};

////////////////////////////////////////////////////////////////////////////////
//deleteMotivator

export const deleteMotivator = async (sender, data) => {
  const { id, name, sessionId } = data;
  if (id && name && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    const behSelected = session.behaviors.find(({ _id }) => _id == id);
    console.log(behSelected.motivations);
    behSelected.motivations = behSelected.motivations.filter(
      (mot) => mot !== name
    );

    await session.save();

    let allBehavior = session.behaviors;

    sender.emit("allBehavior", { allBehavior, id: session._id });
  }
};

////////////////////////////////////////////////////////////////////////////////
//deleteHurdle

export const deleteHurdle = async (sender, data) => {
  console.log(data);
  const { id, name, sessionId } = data;
  if (id && name && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    const behSelected = session.behaviors.find(({ _id }) => _id == id);
    behSelected.hurdler = behSelected.hurdler.filter(
      (hurdler) => hurdler !== name
    );
    await session.save();
    let allBehavior = session.behaviors;
    sender.emit("allBehavior", { allBehavior, id: session._id });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////
//updateBehaviorLeft

export const updateBehaviorLeft = async (sender, data) => {
  const { prio1, prio2, sessionId } = data;

  if (prio1 && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    const Behavior1 = session.behaviors.find(
      ({ priority }) => priority === prio1
    );
    const Behavior2 = session.behaviors.find(
      ({ priority }) => priority === prio2
    );
    Behavior1.priority = prio2;
    Behavior2.priority = prio1;
    session.behaviors.sort((a, b) => {
      return a.priority - b.priority;
    });
    await session.save();
    const allBehavior = session.behaviors;
    console.log(allBehavior);
    sender.emit("allBehavior", { allBehavior, id: session._id });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////
//updateBehaviorRight

export const updateBehaviorRight = async (sender, data) => {
  const { prio1, prio2, sessionId } = data;

  if (prio2 && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    const Behavior1 = session.behaviors.find(
      ({ priority }) => priority === prio1
    );
    const Behavior2 = session.behaviors.find(
      ({ priority }) => priority === prio2
    );
    Behavior1.priority = prio2;
    Behavior2.priority = prio1;
    session.behaviors.sort((a, b) => {
      return a.priority - b.priority;
    });
    await session.save();
    const allBehavior = session.behaviors;
    console.log(allBehavior);
    sender.emit("allBehavior", { allBehavior, id: session._id });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
//updateBeAnswer

export const updateBeAnswer = async (sender, data) => {
  const { id, index, sessionId } = data;
  if (id && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    const behSelected = session.behaviors.find(({ _id }) => _id == id);
    const valueNow = behSelected.fitAnswers[index];
    behSelected.fitAnswers[index] = !valueNow;
    await session.save();

    let allBehavior = session.behaviors;

    sender.emit("allBehavior", { allBehavior, id: session._id });
    sender.emit("blockChecked", { index, id: session._id });
  }
};


