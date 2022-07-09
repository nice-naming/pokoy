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
    positionSide === "bottom" ? `top: 100%` : `left: 100%`};
`

export const StyledTooltip = styled.span.attrs<Props>((props) => ({
  content: props.content,
  positionSide: props.positionSide || "top",
  wrapContent: props.wrapContent || false,
}))<Props>`
  position: relative;

  &::after {
    ${positionSnippet}
    content: "${({ content }) => content}";
    white-space: ${({ wrapContent }) => (wrapContent ? `normal` : `nowrap`)};
    position: absolute;
    display: block;
    padding: 1rem;
    margin: 1rem;
    font-size: 1.5rem;
    background-color: var(--c-foreground);
    color: var(--c-darken-gray);
    /* transform: translateX(-50%);
    left: 50%; */
    transition: opacity 0.1s ease-out, transform 0.1s ease-out;
    border-radius: 1rem;
    opacity: 0;
    z-index: 2;
    min-width: 10rem;
  }

  &:hover::after,
  &:active::after,
  &:focus::after {
    opacity: 1;
  }
`
