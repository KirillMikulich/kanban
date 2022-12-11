import styled from "@emotion/styled";

const grid: number = 8;
const borderRadius: number = 2;

export const Header = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
  isDragging ? '#BAF3DB' : 'rgb(235, 236, 240)'};
  transition: background-color 0.2s ease;
  font-size: 16px;
  color: rgb(9, 30, 66);
  font-style: normal;
  font-weight: 400;
  
  &:hover {
    background-color: #BAF3DB;
  }
`;

export const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  min-width: 250px;
  width: auto;
  flex-direction: column;
`;

export const Title = styled.h4<{ isDragging: boolean }>`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;

  &:focus {
    outline: 2px solid #F3F0FF;
    outline-offset: 2px;
  }
`;