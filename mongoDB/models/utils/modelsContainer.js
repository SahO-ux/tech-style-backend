// IMP: ALL MODELS ARE STORED HERE IN "models" OBJECT
// This acts as a global container for models
const models = {};

export function setModel(name, model) {
  models[name] = model;
}

export function getModel(name) {
  return models[name];
}

export function getAllModels() {
  return models;
}
