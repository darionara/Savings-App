import * as React from 'react';
import Box from '@mui/material/Box';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import { EnhancedTableHead } from './components/EnhancedTableHead';
import { EnhancedTableToolbar } from './components/EnhancedTableToolbar';
import { Ledger } from '../../../api/services/LedgerService';

export type HeadCell = {
  id: string;
  label: string;
  renderCell: (row: Ledger) => React.ReactNode | string;
}

interface TableProps {
  headCells: HeadCell[];
  rows: Ledger[];
  getUniqueId: (row: Ledger) => string;
  deleteRecords: (selectedRows: string[]) => void;
  page: number;
  perPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalRows: number;
}

export const Table = ({ headCells, rows, getUniqueId, deleteRecords, page, perPage, onPageChange, onPerPageChange, totalRows }: TableProps) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? rows.map((n: Ledger) => getUniqueId(n)) : []);   
  };

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement>, id: string) => {   
    setSelected(
      selected.includes(id)
        ? selected.filter((selectedId: string) => selectedId !== id)
        : [...selected, id],
    );
  };

  const onDelete = () => {
    deleteRecords(selected);
    setSelected([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <EnhancedTableToolbar selected={selected} onDelete={onDelete} />
      <TableContainer>
        <MuiTable aria-labelledby="tableTitle" size="medium">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {rows.map((row, index) => {
                const uniqueId = getUniqueId(row);
                const isItemSelected = selected.includes(uniqueId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    key={uniqueId}
                    onClick={(event: React.MouseEvent<HTMLTableRowElement>) => handleClick(event, uniqueId)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {headCells.map((head) => {
                      const renderedRow = head.renderCell(row) || '';

                      return (
                        <TableCell key={head.id} align="left">
                          {renderedRow}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none'
              }}}
              >
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50]}
                colSpan={6}
                count={totalRows}
                rowsPerPage={perPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onPerPageChange}
                showFirstButton={true}
                showLastButton={true}
                data-test='table-pagination'
              />
            </TableRow>
          </TableFooter>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};
