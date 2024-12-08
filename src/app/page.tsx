'use client';

import React from 'react';
import { SearchForm } from '../components/shared/SearchForm';

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <SearchForm />
    </div>
  );
}
