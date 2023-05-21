import styled from "styled-components";
import Header from "./Banner/Header";
import ProfComponent from "./Banner/ProfComponent";
import Clients from "./Clients/Clients";
import Footer from "./Footer/Footer";
import Projects from "./Projects/Projects";
import Services from "./Service/Services";


export const Facepage= () => {

 
    return (
      <Container>
      <Banner>
        <Header />
        <ProfComponent />
      </Banner>
      <Services />
      <LightColor>
        <Projects />
      </LightColor>
      <Clients />
      <LightColor>
        <Footer />
      </LightColor>
    </Container>
    );
  };
  
  const Container = styled.div``;
  const Banner = styled.div`
    background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
    height: 100vh;
    @media (max-width: 640px) {
      height: 100%;
      padding-bottom: 2rem;
    }
  `;
  
  const LightColor = styled.div`
    background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  `;
  
  