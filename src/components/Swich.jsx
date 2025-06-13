import React, { useState } from 'react';
import styled from 'styled-components';

const SwitchWrapper = styled.div`
  width: 50px;
  height: 26px;
  border-radius: 999px;
  background-color: ${props => (props.checked ? '#8fd36e' : '#ccc')};
  display: flex;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const SwitchCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
  transform: ${props => (props.checked ? 'translateX(24px)' : 'translateX(0)')};
`;

function ToggleSwitch({ checked, onToggle }) {
  return (
    <SwitchWrapper checked={checked} onClick={() => onToggle?.(!checked)}>
      <SwitchCircle checked={checked} />
    </SwitchWrapper>
  );
}

export default ToggleSwitch;

