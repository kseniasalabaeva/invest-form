import styled from "@emotion/styled";
import { useState } from "react";
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import { IAccordion } from "../../utils/types";
import "./style.scss";

export const Accordion: React.FC<IAccordion> = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordion = () => {
      setIsOpen(!isOpen);
  }

  return (
  <div className="accordion">
    <div className="accordion-title" onClick={handleAccordion}>
      <Arrow className="arrow" aria-expanded={isOpen}/>
      <span className="title">{title}</span>
    </div>
      <div className="accordion-content" aria-expanded={!isOpen}>
        {children}
      </div>
  </div>
  );
};
