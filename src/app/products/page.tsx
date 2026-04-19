'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { PRODUCTS, CATEGORIES } from '@/data/mock';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default featured
    });
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSearchQuery('');
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${category}`} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label 
                htmlFor={`cat-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Filter */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm uppercase tracking-wider">Price Range</h3>
          <span className="text-xs font-mono text-muted-foreground">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <Slider 
          defaultValue={[0, 1000]} 
          max={1000} 
          step={10} 
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
      </div>

      <Separator />

      {/* Rating Filter (Mock) */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((star) => (
            <div key={star} className="flex items-center space-x-2">
              <Checkbox id={`star-${star}`} />
              <Label htmlFor={`star-${star}`} className="text-sm flex items-center gap-1 cursor-pointer">
                {star}+ Stars
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full rounded-xl" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 min-h-screen">
      <div className="flex flex-col gap-8">
        {/* Header & Controls */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold font-outfit">Explore Products</h1>
            <p className="text-muted-foreground">Showing {filteredProducts.length} results</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-muted/30 p-2 rounded-2xl border border-border/50">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search items..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background border-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex items-center border rounded-xl overflow-hidden bg-background">
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  className="rounded-none h-9 w-9"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  className="rounded-none h-9 w-9"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] rounded-xl bg-background border-none h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger 
                  render={
                    <Button variant="outline" size="icon" className="lg:hidden rounded-xl h-9 w-9">
                      <SlidersHorizontal className="w-4 h-4" />
                    </Button>
                  }
                />
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-4 h-4" />
                <h2 className="font-bold text-lg">Filters</h2>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className={
                    viewMode === 'grid' 
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                      : "flex flex-col gap-6"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold">No products found</h2>
                  <p className="text-muted-foreground max-w-xs mt-2">Try adjusting your filters or search query to find what you're looking for.</p>
                  <Button variant="link" onClick={clearFilters} className="mt-4">Clear all filters</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
