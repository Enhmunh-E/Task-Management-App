"use client";
import { Status, Table, TableDataType } from "@/components";
import { Modal } from "@/components/Modal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FormEvent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 2px solid #526d82;
  margin: 40px;
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  font-size: 20px;
  color: #27374d;
  font-weight: 600;
  margin-bottom: 16px;
`;
const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;
const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 64px 0px;
  gap: 32px;
  align-items: flex-end;
`;
const StyledLabel = styled.label`
  font-size: 12px;
  color: #27374d;
  font-weight: 600;
`;
const StyledInput = styled.input`
  font-size: 16px;
  padding: 8px 12px;
  border: 1px solid #526d82;
  color: #27374d;
  width: 256px;
  border-radius: 4px;
  outline-color: #526d82;
`;
const StyledButton = styled.button`
  height: 36.5px;
  background-color: #2196f3;
  border: 0px;
  border-radius: 4px;
  padding: 8px 12px;
  color: white;
  cursor: pointer;
`;

export const Home = () => {
  const [localList, setLocalList] = useLocalStorage<TableDataType>("list", []);
  const [list, setList] = useState<TableDataType>([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const totalDays = useMemo(() => {
    return (list.reduce((acc, { time }) => acc + time, 0) / 8).toFixed(2);
  }, [list]);
  const totalHours = useMemo(() => {
    return list.reduce((acc, { time }) => acc + time, 0);
  }, [list]);
  const addList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (time <= 0 || time >= 24) {
      setOpen(true);
      setErrorMessage("Time must be between 1 and 24");
      return;
    }
    if (title === "") {
      setOpen(true);
      setErrorMessage("Title should not be empty");
      return;
    }
    const newList = [
      ...list,
      {
        title,
        time,
      },
    ];
    setList(newList);
    setLocalList(newList);
  };
  const onModalClose = () => {
    setErrorMessage("");
  };
  const removeListItem = (index: number) => {
    const newList = list.filter((_, i) => i !== index);
    setList(list.filter((_, i) => i !== index));
    setLocalList(newList);
  };

  useEffect(() => {
    setList(localList);
  }, [localList]);

  return (
    <Container>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Error"
        description={errorMessage}
        onClose={onModalClose}
      />
      <div>
        <Header>Task Management App</Header>
        <StatusRow>
          <Status label="Total Tasks" value={list.length} />
          <Status label="Total Days" value={totalDays} />
          <Status label="Total Hours" value={totalHours} />
        </StatusRow>
      </div>
      <StyledForm onSubmit={addList}>
        <FormInputContainer>
          <StyledLabel>Task title</StyledLabel>
          <StyledInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // maxLength={128}
            // required
          />
        </FormInputContainer>
        <FormInputContainer>
          <StyledLabel>Time Required(in Hrs)</StyledLabel>
          <StyledInput
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            // max={24}
            // min={1}
            // required
          />
        </FormInputContainer>
        <StyledButton type="submit">Add</StyledButton>
      </StyledForm>
      <Table
        tableHeader="Todo list"
        tableData={list}
        removeData={removeListItem}
      />
    </Container>
  );
};
export default Home;
