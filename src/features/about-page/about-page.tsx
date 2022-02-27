import { AboutPageWrapper } from "./about-page.styles"
import { Outlet } from "react-router-dom"

export const AboutPage = () => {
  return (
    <AboutPageWrapper>
      <Outlet />
    </AboutPageWrapper>
  )
}
