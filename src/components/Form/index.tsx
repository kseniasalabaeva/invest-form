import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "@emotion/styled";
import "./style.css";
import { Accordion } from "../Accordion";

type Inputs = {
  sumInv: number,
  mult: number,
};

export const Form = () => {
  const [isGrowth, setIsGrowth] = useState(false)
  const [isReduction, setIsReduction] = useState(false)
  const [multiplierSum, setMultiplierSum] = useState<number>()
  const { register, handleSubmit, watch } = useForm();

  const sumValue = watch('sumInv');
  const multValue = watch('mult');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  }
  const handleGrowth = () => {
    setIsGrowth(true);
    setIsReduction(false);
  }

  const handleReduction = () => {
    setIsReduction(true);
    setIsGrowth(false);
  }

  useEffect(() => {
    setMultiplierSum(sumValue * multValue)
  },[sumValue, multValue])

  return (
      <FormContainer>
        <Header>Инвестировать сейчас</Header>
        <Divider />
        <FormWrapper>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FirstBlockContainer>
              <InputWrapper>
                <span>Сумма инвестиции</span>
                <input className="sum-input" {...register('sumInv')} autoComplete="off" />
              </InputWrapper>
              <InputWrapper>
                <span>Мультипликатор</span>
                <div className="mult-input__wrapper">
                  <input className="mult-input" {...register('mult')} autoComplete="off" />
                  <span className="mult-input-sum"> = $ {multiplierSum}</span>
                </div>
              </InputWrapper>
            </FirstBlockContainer>
            <Accordion title="Ограничить прибыль и убыток">
              <button type="submit" onClick={handleReduction}>В снижение</button>
              <button type="submit" onClick={handleGrowth}>В рост</button>
            </Accordion>
          </form>
        </FormWrapper>
      </FormContainer>
  );
}

const FormContainer = styled.div `
  width: 316px;
  height: 368px;
  background-color: white;
`
const Header = styled.div `
  font-weight: 500;
  font-size: 16px;
  padding: 0.7em 1.5em;
`
const Divider = styled.div `
  width: 100%;
  height: 1px;
  background-color: #D7DDE1;
`
const FormWrapper = styled.div `
  display: flex;
  padding: 1em 1.5em;
`
const FirstBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.2em;
`