import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Product } from '../../types';

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filtered: Product[]) => void;
  currentCategory?: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products, onFilterChange, currentCategory }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [openBrands, setOpenBrands] = useState(true);

  useEffect(() => {
    const unique = Array.from(new Set(products.map(p => p.brand)));
    setBrands(unique);
    setSelectedBrands([]);
  }, [products]);

  useEffect(() => {
    if (products.length) {
      const max = Math.max(...products.map(p => p.price));
      setPriceRange([0, Math.ceil(max / 100) * 100]);
    }
  }, [products]);

  useEffect(() => {
    let filtered = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedBrands.length) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }
    if (currentCategory) {
      filtered = filtered.filter(p => p.categories.some(c => c.name === currentCategory));
    }
    onFilterChange(filtered);
  }, [priceRange, selectedBrands, products, currentCategory, onFilterChange]);

  return (
    <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Filters</Typography>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1 }}>
          Price Range (${priceRange[0]} - ${priceRange[1]})
        </Typography>
        <Slider
          value={priceRange}
          onChange={(_, v) => setPriceRange(v as [number, number])}
          valueLabelDisplay="auto"
          min={0}
          max={priceRange[1] * 1.1}
          sx={{ color: '#804188' }}
        />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setOpenBrands(o => !o)}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Brands</Typography>
          <IconButton size="small">{openBrands ? <ExpandLess /> : <ExpandMore />}</IconButton>
        </Box>
        <Collapse in={openBrands}>
          <FormGroup sx={{ maxHeight: 200, overflow: 'auto', pl: 1 }}>
            {brands.map(b => (
              <FormControlLabel
                key={b}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedBrands.includes(b)}
                    onChange={() => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])}
                    sx={{ color: '#804188', '&.Mui-checked': { color: '#804188' } }}
                  />
                }
                label={b}
              />
            ))}
          </FormGroup>
        </Collapse>
      </Box>
    </Box>
  );
};

export default ProductFilter;