import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';

import PackagesHeader from './packagesHeader';
import PackagesList from './sortablePackageList';

PackagesTable.propTypes = {
  packageList: PropTypes.array,
  handleListChange: PropTypes.func,
  actions: PropTypes.object
};

function PackagesTable({ packageList, handleListChange, actions }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedList = packageList.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const widths = {
    dragIcon: { width: 60, flex: 0.5 },
    name: { width: 120, flex: 1.5 },
    price: { width: 100, flex: 1 },
    'self hosting': { width: 160, flex: 1 },
    status: { width: 140, flex: 1 },
    'last updated': { width: 200, flex: 1.5 },
    actions: { width: 100, flex: 1 }
  };

  return (
    <Stack>
      <Stack>
        <TableContainer>
          <PackagesHeader widths={widths} actions={actions} />
          {paginatedList && paginatedList.length > 0 ? (
            <PackagesList packageList={paginatedList} handleListChange={handleListChange} widths={widths} actions={actions} />
          ) : (
            <Typography align="center" mt={4}>
              No Package(s) Found
            </Typography>
          )}
        </TableContainer>
      </Stack>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={packageList.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
}

export default PackagesTable;
