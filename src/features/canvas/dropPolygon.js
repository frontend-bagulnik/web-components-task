import { Polygon } from "@entities/polygon/model/Polygon";
import { addSceneElement } from "@entities/scene/lib/scene";
import { publishEvent } from "@shared/lib/eventBus";
import { canvasEvents } from "@shared/model/canvasEvents";
import { polygonOptions } from "@entities/polygon/model/constants";

export function onPolygonDropped({ x, y, elementId }, bufferPolygons) {
  const elementData = bufferPolygons.find(({ id }) => id === elementId);

  if (!elementData) {
    return;
  }

  const { id, points } = elementData;

  const polygon = new Polygon({
    id,
    position: { x, y },
    points,
    borderWidth: polygonOptions.borderWidth,
  });

  addSceneElement(polygon);
  publishEvent(canvasEvents.RENDER_SCENE);
}
