import { componentTypes } from "@shared/model/componentTypes";

export const useScene = () => {
  const scene = {
    children: [],
  };

  const addSceneElement = (element) => scene.children.push(element);

  const removeSceneElement = (targetId) =>
    (scene.children = scene.children.filter((el) => targetId !== el.getId()));

  const clearScene = () =>
    (scene.children = scene.children.filter(
      (el) => el.getType() === componentTypes.GRID,
    ));

  const getSceneElements = () => [...scene.children];

  const getSceneElementById = (id) =>
    scene.children.find((el) => el.getId() === id);

  return {
    addSceneElement,
    removeSceneElement,
    getSceneElements,
    getSceneElementById,
    clearScene,
  };
};
