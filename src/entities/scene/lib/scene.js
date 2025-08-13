import { useScene } from "./hooks/useScene";
import { useSceneListeners } from "./hooks/useSceneListeners";

export const {
  addSceneElement,
  removeSceneElement,
  getSceneElements,
  getSceneElementById,
  clearScene,
} = useScene();

useSceneListeners();
