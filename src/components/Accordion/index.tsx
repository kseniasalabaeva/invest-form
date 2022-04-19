import styled from "@emotion/styled";
import { useState } from "react";
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import "./style.css";

type IAccordion = {
  title?: string;
  children: any;
}

export const Accordion: React.FC<IAccordion> = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordion = () => {
      setIsOpen(!isOpen);
  }

  return (
  <AccordionContainer>
    <TitleWrapper onClick={handleAccordion}>
      <Arrow className={isOpen ? "rotated-arrow" : ""} />
      <div>{title}</div>
    </TitleWrapper>
    {isOpen && (
      <ContentWrapper>
        {children}
      </ContentWrapper>
    )}
  </AccordionContainer>
  );
}

const AccordionContainer = styled.div`
  
`
const TitleWrapper = styled.div`
  
`
const ContentWrapper = styled.div`
    
`
