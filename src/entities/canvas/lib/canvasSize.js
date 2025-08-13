const contentContainer = {
  verticalPadding: 64,
  horizontalPadding: 80,
  gap: 16,
};

const headerHeight = 74;
const bufferContainerHeight = 150;

export const getCanvasSize = () => ({
  width: window.innerWidth - contentContainer.horizontalPadding,
  height:
    window.innerHeight -
    contentContainer.verticalPadding -
    contentContainer.gap -
    headerHeight -
    bufferContainerHeight,
});
