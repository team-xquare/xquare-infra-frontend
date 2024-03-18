import React, { InputHTMLAttributes, useState } from 'react';
import styled from '@emotion/styled';
import EyeImg from '@/assets/Eye.svg';
import EyeCloseImg from '@/assets/EyeClose.svg';
import { theme } from '@/style/theme';

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  width: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const Input = ({
  width,
  label,
  onChange = () => {
    console.log('change!');
  },
  ...props
}: InputType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Wrapper width={width} label={label}>
      {label && <Label>{label}</Label>}
      <InputBox {...props} onChange={onChange} type={props.type === 'password' && isOpen ? 'text' : props.type} />
      {props.type === 'password' && (
        <ViewInput
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img src={isOpen ? EyeImg : EyeCloseImg} />
        </ViewInput>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ width: number; label?: string }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ label }) => (!!label ? '74px' : '46px')};
  position: relative;
`;

const Label = styled.label`
  width: 100%;
  height: 22px;
  cursor: default;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.color.gray6};
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  margin-left: 6px;
`;

const InputBox = styled.input`
  border-radius: 4px;
  width: 100%;
  padding: 0 16px;
  height: 46px;
  background-color: ${theme.color.gray1};
  border: 1px solid ${theme.color.gray5};
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  &::placeholder {
    color: ${theme.color.gray5};
  }
`;

const ViewInput = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
  right: 40px;
  bottom: 34px;
  cursor: pointer;
`;
