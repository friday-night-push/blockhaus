import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';

import { Text } from '@gravity-ui/uikit';

import { Container } from 'src/components/atoms/Container';
import type { InputProps } from 'src/components/atoms/Input';
import { Input } from 'src/components/atoms/Input';
import { validationSchema } from 'src/pages/ProfilePage/ProfilePage.constants';

type EditableTextProps = Omit<InputProps, 'onChange'> & {
  value: string;
  onChange: (name: string, newValue: string) => void;
};

export const EditableText = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    console.log('EditableText initial value:', value); // Debugging line
    setCurrentValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentValue !== value) {
      onChange(name, currentValue);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  return (
    <Container
      alignItems={'center'}
      gap={3}
      height={'50px'}
      width={'100%'}
      grow>
      <Text variant={'subheader-2'} style={{ whiteSpace: 'nowrap' }}>
        {label}
      </Text>
      {isEditing ? (
        <Input
          name={name}
          type={type}
          value={currentValue}
          view={'clear'}
          onChange={handleChange}
          onBlur={handleBlur}
          validationState={validationSchema[name] && 'invalid'}
          errorMessage={}
          autoFocus
        />
      ) : (
        <Text
          variant={'body-2'}
          color={'secondary'}
          onClick={() => setIsEditing(true)}>
          {currentValue || 'Click to edit'}
        </Text>
      )}
    </Container>
  );
};
