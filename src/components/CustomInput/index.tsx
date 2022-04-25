import { ClassNames } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as CrossIcon } from '../../assets/cross.svg';
import "./style.scss";

type ICustomInput = {
  type?: string,
  value?: number,
  name: string,
  className?: string,
  defaultValue?: number,
  readOnly?: boolean,
  required?: boolean,
  pattern?: RegExp,
}

export const CustomInput: React.FC<ICustomInput> = ({ type, name, className, defaultValue, readOnly, required, pattern }) => {
  const { register, setValue, watch } = useFormContext();

  return (
    <>
      <div className={className + " input__wrapper"}>
          <span className='input-icon'>$</span>
          <input
            {...register(name, {
              valueAsNumber: true,
              required: required,
              pattern: pattern
            })}
            className='input'
            type={type}
            autoComplete="off"
            defaultValue={defaultValue}
            readOnly={readOnly}
          />
      </div>
    </>
  )
}