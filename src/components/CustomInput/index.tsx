import { useFormContext } from 'react-hook-form';
import { ICustomInput } from '../../utils/types';
import "./style.scss";

export const CustomInput: React.FC<ICustomInput> = ({ 
  type,
  min,
  max,
  name,
  className,
  defaultValue,
  readOnly,
  errors
}) => {
  const { register } = useFormContext();

  return (
    <>
      <div className={className + " input__wrapper"}>
          <span className='input-icon'>$</span>
          <input
            {...register(name, {
              valueAsNumber: true,
            })}
            className="input"
            style={ errors ? {border: '1px solid rgb(177, 0, 0)'} : {}}
            type={type}
            autoComplete="off"
            defaultValue={defaultValue}
            readOnly={readOnly}
            min={min}
            max={max}
          />
          { errors &&
          <div className='error'>
            <span className='error-message'>{errors.message}</span>
          </div>
          }
      </div>
    </>
  )
};
