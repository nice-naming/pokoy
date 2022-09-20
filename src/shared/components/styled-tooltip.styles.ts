import styled, { css } from "styled-components"

interface Props {
  content: string
  positionSide?: "bottom" | "right"
  wrapContent?: boolean
}

const positionSnippet = css<Props>`
  top: 0;
  left: 0;
  ${({ positionSide }) =>
    positionSide === "bottom" ? `top: 100%;` : `left: 100%;`};
`

export const StyledTooltip = styled.span.attrs<Props>((props) => ({
  content: props.content,
  positionSide: props.positionSide || "bottom",
  wrapContent: props.wrapContent || false
}))<Props>`
  position: relative;

  &:hover::after,
  &:active::after,
  &:focus::after {
    opacity: 1;
  }

  &::after {
    ${positionSnippet}
    content: "${({ content }) => content}";
    white-space: ${({ wrapContent }) => (wrapContent ? `normal` : `nowrap`)};
    margin: ${({ positionSide }) =>
      positionSide === "right" ? "0 1rem" : "1rem 0"};
    transition: opacity 0.1s ease-out, transform 0.1s ease-out;
    opacity: 0;
    position: absolute;
    display: inline-block;
    padding: 1rem;
    font-size: 1.5rem;
    background-color: var(--c-foreground);
    color: var(--c-darken-gray);
    border-radius: 1rem;
    z-index: 2;
    min-width: 10rem;
  }
`
