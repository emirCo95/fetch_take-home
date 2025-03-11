'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface BreedFilterBoxProps {
  breeds: string[];
  onFilterByBreed: (value: string) => void;
}

export function BreedFilterBox({
  breeds,
  onFilterByBreed,
}: BreedFilterBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleFilterByBreed = (currentBreed: string) => {
    onFilterByBreed(currentBreed);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? breeds.find((breed) => breed === value) : 'Filter By Breed'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search breeds..." />
          <CommandList>
            <CommandEmpty>No breeds found.</CommandEmpty>
            <CommandGroup>
              {breeds.map((breed) => (
                <CommandItem
                  key={breed}
                  value={breed}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    handleFilterByBreed(currentValue);
                    setOpen(false);
                  }}
                >
                  {breed}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === breed ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
