import './App.css'
import Contextmain from './componants/Contextmain'
import Container from '@mui/material/Container';
function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: "100vh" }} >
      <Container maxWidth="sx">
        <Contextmain />
      </Container>
    </div>
  )
}
export default App