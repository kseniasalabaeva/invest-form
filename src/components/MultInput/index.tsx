import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as CrossIcon } from '../../assets/cross.svg';
import { useOnClickOutside } from '../../utils/hooks/useClickOutside';
import { IMultInput } from '../../utils/types';
import "./style.scss";

export const MultInput: React.FC<IMultInput> = ({ min, max, defaultValue, errors }) => {
  const ref = useRef();
  const { register, setValue, watch } = useFormContext();
  const [isPopupOpen, setisPopupOpen] = useState<boolean>(false)
  const rangeValue = watch('sumInv');
  const multValue = watch('mult');
  const rangeBackgroundSize = (multValue - min) * 100 / (max - min);

  useEffect(() => {
    setValue('rangeValue', multValue);
  },[rangeValue, multValue]);

  useOnClickOutside(ref, () => setisPopupOpen(false));

  return (
    <>
      <div className="mult__wrapper">
        <CrossIcon className="mult__icon"/>
        <input
          {...register('mult', {
            valueAsNumber: true,
          })}
          type="number"
          defaultValue={defaultValue}
          className="mult__input"
          autoComplete='off'
          style={ errors ? {border: '1px solid rgb(177, 0, 0)'} : {}}
          onClick={() => setisPopupOpen(true)}
        />
        { errors &&
          <div className='error'>
            <span className='error-message'>{errors.message}</span>
          </div>
        }
      </div>
      { isPopupOpen && (
        <div ref={ref as any} className="popup__wrapper">
          <div className="popup__slider">
            <input
              {...register('rangeValue')}
              type="range"
              className="popup-slider__item"
              min={min}
              max={max}
              step={1}
              defaultValue={40}
              onChange={(event) => setValue('mult', event?.target.value)}
              style={{backgroundSize : rangeBackgroundSize + '%'}}
            />
            <div className="scale__container">
              <span className="scale__item">{min}</span>
              <span className="scale__item">{max / 8}</span>
              <span className="scale__item">{max / 2}</span>
              <span className="scale__item">{max}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}