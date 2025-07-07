import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Box, Button, Menu, MenuItem, IconButton, CircularProgress } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../services/categoryService';
import { CategoryResponse } from '../../types';

const CategoryMenu: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [visible, setVisible] = useState<CategoryResponse[]>([]);
  const [overflow, setOverflow] = useState<CategoryResponse[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllCategories().then(setCategories).catch(console.error);
  }, []);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;
    const maxWidth = container.offsetWidth;
    let used = 0;
    const vis: CategoryResponse[] = [];
    const ovf: CategoryResponse[] = [];

    categories.forEach(cat => {
      const label = cat.name.charAt(0) + cat.name.slice(1).toLowerCase();
      const approx = label.length * 8 + 32;
      if (used + approx < maxWidth - 40) {
        used += approx;
        vis.push(cat);
      } else {
        ovf.push(cat);
      }
    });

    setVisible(vis);
    setOverflow(ovf);
  }, [categories]);

  return (
    <Box ref={ref} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {categories.length === 0 ? (
        <CircularProgress size={24} sx={{ color: '#fff' }} />
      ) : (
        <>  
          {visible.map(cat => (
            <Button
              key={cat.id}
              onClick={() => navigate(`/products/${cat.name.toLowerCase()}`)}
              sx={{ color: theme.palette.text.secondary, textTransform: 'none', fontWeight: 'bold' }}
            >
              {cat.name.charAt(0) + cat.name.slice(1).toLowerCase()}
            </Button>
          ))}

          {overflow.length > 0 && (
            <>
              <IconButton onClick={e => setAnchorEl(e.currentTarget)} sx={{ color: theme.palette.text.secondary }}>
                <MoreHorizIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                {overflow.map(cat => (
                  <MenuItem
                    key={cat.id}
                    onClick={() => { setAnchorEl(null); navigate(`/products/${cat.name.toLowerCase()}`); }}
                  >
                    {cat.name.charAt(0) + cat.name.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default CategoryMenu;