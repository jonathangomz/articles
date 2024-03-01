import styled, { keyframes } from 'styled-components';
import '../models/Article'

export default function Spinner() {
  return (
    <>
      <SpinnerSvg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Circle fill="none" strokeWidth="3" strokeLinecap="round" cx="12" cy="12" r="10"></Circle>
      </SpinnerSvg>
    </>
  );
}

export const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`

export const SpinnerSvg = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 24px;
  height: 24px;
`

export const Circle = styled.circle`
  stroke: #ffffff21;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
`
