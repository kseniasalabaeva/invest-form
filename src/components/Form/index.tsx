import { useEffect, useState } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { ReactComponent as ButtonArrow } from '../../assets/button-arrow.svg';
import { Accordion } from "../Accordion";
import "./style.scss";
import { MultInput } from "../MultInput";
import { CustomInput } from "../CustomInput";

export const Form = () => {
  const formMethods = useForm();
  const { handleSubmit, watch, setValue } = formMethods;

  const [direction, setDirection] = useState<string>('')
  const [isPercent, setIsPercent] = useState<boolean>(false);
  const [isUSD, setIsUSD] = useState<boolean>(true);
  const [isProfit, setIsProfit] = useState<boolean>(false);
  const [isLoss, setIsLoss] = useState<boolean>(false);
  const [multiplierSum, setMultiplierSum] = useState<number>();

  const sumValue = watch('sumInv');
  const multValue = watch('mult');
  const takeProfit = watch('takeProfit');
  const stopLoss = watch('stopLoss');

  const valueForLimits = sumValue / 100 * 30;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data.direction = direction;
    delete data.rangeValue;
    console.log('data', data);
  };

  useEffect(() => {
    if (sumValue && multValue) {
      setMultiplierSum(sumValue * multValue);
    } else {
      setMultiplierSum(0);
    }
  },[sumValue, multValue]);

  useEffect(() => {
    setValue('takeProfit', isProfit ? valueForLimits : undefined);
    setValue('stopLoss', isLoss ? valueForLimits : undefined);
    // console.log('takeProfit', takeProfit, 'stopLoss', stopLoss)
  },[isProfit, isLoss, sumValue]);

  return (
    <FormProvider {...formMethods}>
      <div className="form__container">
        <Header>Инвестировать сейчас</Header>
        <Divider />
        <div className="form__wrapper">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <BlockContainer>
              <InputWrapper>
                <span>Сумма инвестиции</span>
                <CustomInput type="number" className="sum__input" name="sumInv" defaultValue={5000}/>
              </InputWrapper>
              <InputWrapper>
                <span>Мультипликатор</span>
                <div className="mult-input__container">
                  <MultInput defaultValue={40} min={1} max={40}/>
                  <span className="mult-sum"> = $ {multiplierSum}</span>
                </div>
              </InputWrapper>
            </BlockContainer>
              <Accordion title="Ограничить прибыль и убыток">
                <BlockContainer>
                  <div className="radio-buttons__container">
                    <span>Ограничения в</span>
                    <div className="radio-buttons__wrapper">
                      <div className="radio-buttons__item">
                        <input 
                          type="radio"
                          id="percent"
                          name="limit"
                          value="percent"
                          className="radio-button"
                          onChange={(event) => {
                            setIsPercent(true)
                            setIsUSD(false)
                          }}
                        />
                        <span >%</span>
                      </div>
                      <div className="radio-buttons__item">
                        <input 
                          type="radio"
                          id="usd"
                          name="limit"
                          value="usd"
                          className="radio-button"
                          checked={isUSD}
                          onChange={() => {
                            setIsPercent(false)
                            setIsUSD(true)
                          }}
                        />
                        <span >$</span>
                      </div>
                    </div>
                  </div>
                  <InputWrapper>
                    <div className="checkbox__wrapper">
                      <input 
                        type="checkbox"
                        id="profit"
                        name="limit-input"
                        value="profit"
                        className="checkbox__item"
                        onChange={() => setIsProfit(!isProfit)}
                      />
                      <span>Прибыль</span>
                    </div>
                    <CustomInput 
                      name="takeProfit" 
                      type="number"
                      readOnly={!isProfit}
                      />
                  </InputWrapper>
                  <InputWrapper>
                    <div className="checkbox__wrapper">
                      <input 
                        type="checkbox"
                        id="loss"
                        name="limit-input"
                        value="loss"
                        className="checkbox__item"
                        onChange={() => setIsLoss(!isLoss)}
                      />
                      <span>Убыток</span>
                    </div>
                    <CustomInput 
                      name="stopLoss" 
                      type="number" 
                      readOnly={!isLoss}
                  />
                  </InputWrapper>
                </BlockContainer>
              </Accordion>
              <ButtonsContainer>
                <button 
                  className="submit-button reduction"
                  id="reduction"
                  type="submit"
                  onClick={() => setDirection('reduction')}
                >
                  <div className="arrow__container reduction">
                    <ButtonArrow/>
                  </div>
                  <span className="submit-button__title">В снижение</span>
                </button>
                <button 
                  className="submit-button growth" 
                  id="growth" 
                  type="submit" 
                  onClick={() => setDirection('growth')}
                >
                  <div className="arrow__container growth">
                    <ButtonArrow className="arrow-growth"/>
                  </div>
                  <span className="submit-button__title">В рост</span>
                </button>
              </ButtonsContainer>
          </form>
        </div>
      </div>
      </FormProvider>
  );
}

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
const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 1.5em;
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.2em;
`
const ButtonsContainer = styled.div`
  display: flex;
  padding: 1em 1.5em;
  justify-content: space-around;
`