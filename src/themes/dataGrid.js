import { useTheme } from '@mui/material/styles';
const DataGrid = () => {
  const theme = useTheme();
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 0,
          color: theme.palette.text.primary,
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none'
          }
        },
        toolbarContainer: {
          paddingRight: `${theme.spacing(5)} !important`,
          paddingLeft: `${theme.spacing(3.25)} !important`
        },
        columnHeaders: {
          maxHeight: '54px !important',
          minHeight: '54px !important',
          lineHeight: '24px !important',
          backgroundColor: '#edcdcd'
        },
        columnHeader: {
          // height: '54px',
          '&:not(.MuiDataGrid-columnHeaderCheckbox)': {
            // padding: theme.spacing(4),
            '&:first-of-type': {
              paddingLeft: theme.spacing(5)
            }
          },
          '&:last-of-type': {
            // paddingRight: theme.spacing(5)
          }
        },
        columnHeaderCheckbox: {
          maxWidth: '58px !important',
          minWidth: '58px !important'
        },
        columnHeaderTitleContainer: {
          padding: 0
        },
        columnHeaderTitle: {
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.17px',
          textTransform: 'uppercase'
        },
        columnSeparator: {
          color: theme.palette.divider
        },
        virtualScroller: {
          // marginTop: '54px !important'
        },
        virtualScrollerRenderZone: {
          '& .MuiDataGrid-row': {
            maxHeight: '50px !important',
            minHeight: '50px !important'
          }
        },
        row: {
          '&:last-child': {
            '& .MuiDataGrid-cell': {
              borderBottom: 0
            }
          }
        },
        cell: {
          maxHeight: '50px !important',
          minHeight: '50px !important',
          lineHeight: '20px !important',
          borderColor: theme.palette.divider,
          '&:not(.MuiDataGrid-cellCheckbox)': {
            // padding: theme.spacing(4),
            '&:first-of-type': {
              paddingLeft: theme.spacing(5)
            }
          },
          '&:last-of-type': {
            // paddingRight: theme.spacing(5)
          }
        },
        cellCheckbox: {
          maxWidth: '58px !important',
          minWidth: '58px !important'
        },
        editInputCell: {
          color: theme.palette.text.primary
        },
        footerContainer: {
          minHeight: '50px !important',
          borderTop: `1px solid ${theme.palette.divider}`,
          '& .MuiTablePagination-toolbar': {
            minHeight: '50px !important'
          },
          '& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel': {
            color: theme.palette.text.primary
          }
        }
      },
      defaultProps: {
        // rowHeight: 50,
        // headerHeight: 54
      }
    }
  };
};

export default DataGrid;
