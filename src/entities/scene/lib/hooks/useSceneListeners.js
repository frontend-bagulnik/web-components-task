import { canvasEvents } from "@shared/model/canvasEvents";
import { subscribe, publishEvent } from "@shared/lib/eventBus";
import { getSceneElementById, getSceneElements } from "../scene";
import { sceneEvents } from "../../model/events";
import { isGraphicalObjectIntersected } from "../intersection";

export const useSceneListeners = () => {
  const onSceneSelected = ({ x, y }) => {
    const res = getSceneElements().filter((el) =>
      isGraphicalObjectIntersected(x, y, el),
    );

    if (res.length) {
      publishEvent(sceneEvents.SELECTED_ELEMENT, res[0].getId());
    }
  };

  const onElementMove = ({ id, dx, dy }) => {
    const el = getSceneElementById(id);

    if (el) {
      el.translate(dx, dy);
    }
  };

  subscribe(canvasEvents.MOUSE_DOWN, onSceneSelected);
  subscribe(canvasEvents.MOVE_ELEMENT, onElementMove);
};
