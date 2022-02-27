import { Link } from "react-router-dom"

export const About = () => {
  return (
    <div>
      <h1>About Pokoy App</h1>
      <p>
        The Pokoy manipulates your "inner monkey" to increase the length of your
        daily meditation.
      </p>
      <Link to="/how-it-works">How it works →</Link>
      <Link to="/tutorial">Tutorial →</Link>
    </div>
  )
}
