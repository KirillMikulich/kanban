import styled from "@emotion/styled";

const grid: number = 8;
const scrollContainerHeight: number = 250;

export const Container = styled.div``;

export const DropZone = styled.div`
  min-height: ${scrollContainerHeight}px;
  padding-bottom: ${grid}px;
`;

export const Wrapper = styled.div<{isDraggingOver: any, isDraggingFrom: any, isDropDisabled: any}>`
  background-color: ${(props) =>
  getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  min-width: 250px;
  width: auto;
`;

export const ScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;
export const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean,
): string => {
  if (isDraggingOver) {
    return '#EF5C48';
  }
  if (isDraggingFrom) {
    return '#37B4C3';
  }
  return '#DCDFE4';
};


