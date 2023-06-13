import { styled } from "styled-components";
import { TableDataType } from "./index";

type TableType = {
  tableData: TableDataType;
  tableHeader: string;
  removeData: (index: number) => void;
};
const StyledTable = styled.table`
  border: 1px solid #526d82;
  border-collapse: collapse;
`;
type StyledTableHeadProps = {
  width?: number;
};
const StyledTableHead = styled.th<StyledTableHeadProps>`
  border: 1px solid #526d82;
  border-collapse: collapse;
  padding: 4px 8px;
  text-align: left;
  font-weight: 600;
  color: #27374d;
  width: ${(props) => (props?.width ? props.width : "auto")};
`;
const StyledTableCell = styled.td`
  border: 1px solid #526d82;
  border-collapse: collapse;
  padding: 4px 8px;
  color: #27374d;
`;
const DeleteButton = styled.button`
  text-decoration: underline;
  color: red;
  outline: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TableTitle = styled.div`
  font-size: 20px;
  color: #27374d;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const Table = ({ tableData, tableHeader, removeData }: TableType) => {
  return (
    <TableContainer>
      <TableTitle>{tableHeader}</TableTitle>
      <StyledTable>
        <thead>
          <tr>
            <StyledTableHead>Task Title</StyledTableHead>
            <StyledTableHead width={200}>Time Required(in Hrs)</StyledTableHead>
            <StyledTableHead width={96}>Action</StyledTableHead>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ title, time }, index) => (
            <tr key={index}>
              <StyledTableCell>{title}</StyledTableCell>
              <StyledTableCell>{time}</StyledTableCell>
              <StyledTableCell>
                <DeleteButton onClick={() => removeData(index)}>
                  Delete
                </DeleteButton>
              </StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
