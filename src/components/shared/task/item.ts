import styled from "@emotion/styled";


type AuthorColors = {
  soft: string,
  hard: string,
};

const grid: number = 8;
const borderRadius: number = 2;
const imageSize: number = 40;

const getBorderColor = (isDragging: boolean, authorColors: AuthorColors) =>
  isDragging ? authorColors.hard : 'transparent';


export const Container = styled.a<{isDragging: boolean, colors: any, isGroupedOver: any, isClone: any}>`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${(props) => getBorderColor(props.isDragging, props.colors)};
  background-color: #FFFFFF;
  box-shadow: ${({ isDragging }) =>
  isDragging ? `2px 2px 1px #626F86` : 'none'};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: #2C3E5D;

  &:hover,
  &:active {
    color: #2C3E5D;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

export const Content = styled.div`
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
`;