import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

interface PaginationProps {
  page: number;
  count: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, count, onChange }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
    <MuiPagination
      page={page}
      count={count}
      onChange={(_, value) => onChange(value)}
      color="primary"
    />
  </Box>
);

export default Pagination;