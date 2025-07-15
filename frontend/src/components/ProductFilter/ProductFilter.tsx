import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Checkbox,
  ListItemText,
  Button,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { CategoryResponse, Product } from '../../types';

interface ProductFilterProps {
  products: Product[];
  categories: CategoryResponse[];
  initialCategories: string[];
  onFilterChange: (filtered: Product[]) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  categories,
  initialCategories,
  onFilterChange,
}) => {
  const theme = useTheme();
  const prices = products.map((p) => p.price);
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const [rawMin, rawMax] = priceRange;
    const min = Math.max(0, Math.min(rawMin, rawMax));
    const max = Math.max(min, rawMax);

    onFilterChange(
      products.filter((p) => {
        const matchesPrice = p.price >= min && p.price <= max;
        const matchesCategory =
          !selectedCategories.length ||
          p.categories.some((c) => selectedCategories.includes(c.name));
        const matchesSearch =
          !searchTerm ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPrice && matchesCategory && matchesSearch;
      })
    );
  };

  const toggleCategory = (name: string) =>
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );

  const toggleAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((c) => c.name));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={applyFilters}
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Filters
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Search
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          mb: categoriesOpen ? 1 : 2,
        }}
        onClick={() => setCategoriesOpen((o) => !o)}
      >
        <Typography variant="subtitle1">Categories</Typography>
        <IconButton size="small">
          {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {categoriesOpen && (
        <Box sx={{ mb: 2, pl: 1 }}>
          {categories.length ? (
            <>
              <Button
                size="small"
                onClick={toggleAll}
                sx={{ mb: 1, ml: 1, textTransform: 'none', color: theme.palette.primary.main }}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Box
                  key={cat.id}
                  sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      color: theme.palette.primary.main,
                      '&.Mui-checked': { color: theme.palette.primary.main },
                      '&:hover': { backgroundColor: 'transparent' },
                    }}
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => toggleCategory(cat.name)}
                  />
                  <ListItemText
                    primary={
                      cat.name[0].toUpperCase() + cat.name.slice(1).toLowerCase()
                    }
                  />
                </Box>
              ))}
            </>
          ) : (
            <Typography align="center">No available categories.</Typography>
          )}
        </Box>
      )}

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Price
      </Typography>
      <Typography>
        R${priceRange[0].toFixed(2)} – R${priceRange[1].toFixed(2)}
      </Typography>
      <Slider
        value={priceRange}
        min={0}
        max={maxPrice}
        onChange={(_, v) => setPriceRange(v as [number, number])}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" fullWidth>
        Apply
      </Button>
    </Box>
  );
};

export default ProductFilter;
