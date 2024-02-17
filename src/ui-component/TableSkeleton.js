import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

const TableSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Skeleton variant="rectangular" width="210px" height="20px" animation="wave" />
          <Skeleton variant="rectangular" width="500px" height="20px" animation="wave" />
        </Stack>
      </CardContent>
      <CardContent>
        <Stack sx={{ gap: 2 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
            return (
              <Stack direction="row" sx={{ gap: 2 }} key={item}>
                {[1, 2, 3, 4, 5, 6].map((i) => {
                  return <Skeleton key={i} variant="rectangular" width="100%" height="20px" animation="wave" />;
                })}
              </Stack>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TableSkeleton;
