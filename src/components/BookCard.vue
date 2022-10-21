<template>
  <div
      class="p-5 flex flex-col items-left text-left group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
        <div class="float-right items-right right-0"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" @click="doDelete(bookCard.id, bookCard.title)">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div  @click="showDetial(bookCard.id)">
      <p class="text-xl font-medium text-slate-700 mt-3">{{ bookCard.title }}</p>
      <p class="mt-2 text-sm text-slate-500">{{ bookCard.author }}</p>
      <p class="mt-2 text-sm text-slate-500 text-left">{{ bookCard.description }}</p> 
      </div>
  </div>
 
</template>
  
  <script>
  export default {
    name: 'BookCard',
    props: {
        bookCard: {
          type: Object
        },
        showDetial: {
          type: Function
        },
        doDelete: {
          type: Function
        },
    }
  };
  </script>