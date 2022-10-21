<template>
    <div class="p-2 flex flex-col items-right text-right right-0 group hover:bg-slate-50 cursor-pointer bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" @click="showAdd">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    </div>
    <div class="grid grid-cols-2 md:lg:xl:grid-cols-3 group bg-white shadow-xl shadow-neutral-100 border">
        <BookCard v-for="item in booksList" :key="item.id" :bookCard="item" :showDetial="showDetial" :doDelete="doDelete"/>
    </div>
  </template>
  
  <script>
  import { Vue } from 'vue'
  import axios from "axios"
  import router from '@/router'  
  import BookCard from '@/components/BookCard.vue';  
  const urlAPI = "https://fe-interview-api.unnotech.com/books/"
  export default {
    name: 'Books',
    props: {
      
    },
    components: {
        BookCard
    },
    data() {
        return { 
            booksList:{} 
        }
    },
    created() {
        this.getBooksList(urlAPI);
    },
    methods:{ 
        getBooksList(url) {
            axios
                .get(url)
                .then((res) => {
                    this.booksList = res.data
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        showDetial(id) {
            router.push(`/books/${id}`)
        },
        showAdd() {
            router.push(`/books/0/add`)
        },
        doDelete(id, name) {
            if (confirm(`確定要刪除[${name}]?`)) {
                let delAPI = `https://fe-interview-api.unnotech.com/books/${id}`
                axios
                .delete(delAPI)
                .then((res) => {
                    this.getBooksList(urlAPI);
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        },                
    }
  }
  </script>