import { Link } from "react-router-dom"
import styled from "styled-components"
import { ReactComponent as LogoWithName } from "shared/assets/svgs/logo-with-name.svg"

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  max-width: 66%;
  font-size: 2.5rem;
`

const AboutPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;
`

export const About = () => {
  return (
    <AboutPageWrapper>
      <LogoWithName width="9rem" style={{ marginBottom: "1rem" }} />
      <small style={{ marginBottom: "1rem", color: "var(--c-gray)" }}>
        Meditation for impulsive minds
      </small>

      <p style={{ marginBottom: "0" }}>
        It manipulates your "inner monkey" to help you meditate longer every
        day.
      </p>

      <StyledList>
        <li>
          <Link to="tutorial">Tutorial →</Link>
        </li>
        <li>
          <Link to="how-it-works">How it works →</Link>
        </li>
        <li>
          <a
            href="https://github.com/m0rtyn/pokoy/blob/HEAD/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Changelog
            {/* TODO: rework with it
              fetch("https://raw.githubusercontent.com/m0rtyn/pokoy/master/CHANGELOG.md").then(res => res.text()).then(console.log) 
            */}
          </a>
        </li>
      </StyledList>
    </AboutPageWrapper>
  )
}
