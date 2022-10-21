<template>
    <button type='button'
      class='break-inside text-white border-2 border-transparent rounded-3xl px-12 py-30 mb-2'>
        <div class='m-auto'>
            <div class='flex items-center justify-start flex-1 space-x-4'>    
                <slot />
            </div>
        </div>
    </button>
  </template>
  
  <script>
  export default {
    name: 'TButton',
  };
  </script>