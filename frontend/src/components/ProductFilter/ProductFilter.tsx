import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { CategoryResponse, Product } from '../../types';

interface FilterProps {
  products: Product[];
  categories: CategoryResponse[];
  initialCategories: string[];  // from URL
  onFilterChange: (filtered: Product[]) => void;
}

const ProductFilter: React.FC<FilterProps> = ({
  products,
  categories,
  initialCategories,
  onFilterChange,
}) => {
  // compute price bounds
  const prices = products.map(p => p.price);
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedCats, setSelectedCats] = useState<string[]>(initialCategories);

  // update priceRange if product list changes
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  // run filter whenever inputs change
  useEffect(() => {
    const filtered = products.filter(p => {
      // price in range
      const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      // category match if any selected, else true
      const inCat =
        !selectedCats.length ||
        p.categories.some(c => selectedCats.includes(c.name));
      return inPrice && inCat;
    });
    onFilterChange(filtered);
  }, [products, priceRange, selectedCats, onFilterChange]);

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="cat-filter-label">Categories</InputLabel>
        <Select
          labelId="cat-filter-label"
          multiple
          value={selectedCats}
          label="Categories"
          renderValue={vals => vals.join(', ')}
          onChange={e => {
            const vals = e.target.value as string[];
            setSelectedCats(vals);
          }}
        >
          {categories.map(cat => (
            <MenuItem key={cat.id} value={cat.name}>
              <Checkbox checked={selectedCats.includes(cat.name)} />
              <ListItemText primary={cat.name.charAt(0) + cat.name.slice(1).toLowerCase()} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography gutterBottom>
        Price Range: R${priceRange[0].toFixed(2)} – R${priceRange[1].toFixed(2)}
      </Typography>
      <Slider
        value={priceRange}
        min={0}
        max={maxPrice}
        onChange={(_, v) => setPriceRange(v as [number, number])}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default ProductFilter;