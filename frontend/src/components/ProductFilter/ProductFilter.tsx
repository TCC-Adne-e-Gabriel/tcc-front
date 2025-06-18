import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Slider, 
  Checkbox, 
  FormControlLabel, 
  FormGroup,
  Collapse,
  IconButton
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Product, Category } from '../../types';

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  currentCategory?: Category;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  products, 
  onFilterChange,
  currentCategory
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [openBrands, setOpenBrands] = useState(true);
  
  useEffect(() => {
    const uniqueBrands = Array.from(new Set(products.map(p => p.brand)));
    setBrands(uniqueBrands);
    setSelectedBrands([]);
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map(p => p.price));
      setPriceRange([0, Math.ceil(maxPrice / 100) * 100]);
    }
  }, [products]);

  useEffect(() => {
    const filtered = products.filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1] &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    );
    onFilterChange(filtered);
  }, [priceRange, selectedBrands, products, onFilterChange]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <Box sx={{ 
      p: 2, 
      bgcolor: '#ffffff', 
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Filters
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1 }}>Price Range (${priceRange[0]} - ${priceRange[1]})</Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
          valueLabelDisplay="auto"
          min={0}
          max={priceRange[1] * 1.1}
          sx={{ color: '#804188' }}
        />
      </Box>
      
      <Box>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => setOpenBrands(!openBrands)}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Brands
          </Typography>
          <IconButton size="small">
            {openBrands ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={openBrands}>
          <FormGroup sx={{ maxHeight: 200, overflow: 'auto', pl: 1 }}>
            {brands.map(brand => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox 
                    size="small"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    sx={{ color: '#804188', '&.Mui-checked': { color: '#804188' } }}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </Collapse>
      </Box>
    </Box>
  );
};

export default ProductFilter;