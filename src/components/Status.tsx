import { useMemo } from "react";
import { styled } from "styled-components";

type StatusType = {
  label: string;
  value: number | string;
};
const StatusContainer = styled.div`
  padding: 8px 2px;
  width: 256px;
  border: 2px solid #526d82;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const StatusLabel = styled.div`
  font-size: 16px;
  color: #27374d;
`;
const StatusValue = styled.div`
  font-size: 24px;
  color: #27374d;
  font-weight: 600;
`;
export const Status = ({ label, value }: StatusType) => {
  const transformedValue = useMemo(() => {
    if (typeof value === "string") {
      return value;
    }
    const val = value + "";
    if (val.length >= 3) return val;
    return new Array(3 - val.length).fill("0").join("") + val;
  }, [value]);
  return (
    <StatusContainer>
      <StatusLabel>{label}</StatusLabel>
      <StatusValue>{transformedValue}</StatusValue>
    </StatusContainer>
  );
};
