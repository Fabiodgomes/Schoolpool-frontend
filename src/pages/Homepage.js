import { Title } from "../styled"
import { Link } from "react-router-dom"
import { LinkWord } from "../styled"
import styled from "styled-components"

export const Homepage = () => {

  return (
    <Container>
     <h3>Hello there 👋</h3>
     <p>General information:</p>
     <ul>
      <li>Go to your backend and modify the config url</li>
      <li>Make sure you clicked on the <b>use template</b> button on github</li>
      <li>This template is using <a style={LinkWord} target="_blank" href="https://styled-components.com/">styled components</a>, you don't have to use it</li>
      <li>You don't have to follow the folder structure, feel free to adapt to your own</li>
      <li>Login and SignUp are already implemented</li>
      <li>Modify this page to create your own homeepage</li>
     </ul>
    </Container>
  )
}

const Container = styled.div`
  margin: 20px
`