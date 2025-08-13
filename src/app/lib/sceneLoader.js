import { addSceneElement } from "@entities/scene/lib/scene";
import { Polygon } from "@entities/polygon/model/Polygon";

const componentVariants = {
  POLYGON: Polygon,
};

export const loadSceneComponents = (components) => {
  components.forEach((componentData) => {
    const componentBuildFunction = componentVariants[componentData.type];

    if (!componentBuildFunction) {
      return;
    }

    const component = new componentBuildFunction(componentData);

    if (!component) {
      return;
    }

    addSceneElement(component);
  });
};
