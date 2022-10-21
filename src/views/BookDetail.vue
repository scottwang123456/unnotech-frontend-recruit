<template>
    <div class="p-2 flex flex-col items-right text-center right-0 group cursor-pointer bg-white font-medium"><ul id="B">
        <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" @click="back">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </li>
        <li style="width: 100%"><h1 v-show="isFound">{{this.$route.params.act ==='add' ? "新增書籍" : bookCard.title}}</h1></li>
        <li class="text-right">
            <svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" v-if="!isModify" @click="edit">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </li>
    </ul>
</div>
    <div v-if="isFound" class="p-2 flex flex-col items-left" >
        <ul class="p-2 flex flex-col items-left" >
            <li><input v-model="bookCard.title" placeholder="名稱" v-bind:disabled="!isModify"/></li>
            <li><input v-model="bookCard.author" placeholder="作者" v-bind:disabled="!isModify"/></li>
            <li>
                <textarea rows="6" class="p-2.5 w-full text-sm" v-model="bookCard.description" placeholder="備註" v-bind:disabled="!isModify"></textarea>
            </li>
        </ul>
        <div v-show="isModify">
            <TButton @click="cancel" class='bg-[#e5e5e5]'>{{"取消"}}</TButton>
            <TButton @click="save" class='bg-[#4aa9ee]'>{{this.$route.params.act ==='add' ? "新增" : "修改"}}</TButton>
        </div>
    </div>
    <div v-else>
        查無資料
    </div>
</template>
  
<script>
  import axios from "axios"
  import router from '@/router'  
  //import '@/assets/tailwind.css'  
  import TButton from '@/components/Button.vue';
  export default {
    name: 'BookDetail',
    components: {
        TButton
    },
    props: {
    },
    data() {
        return { 
            bookCard:{},
            isFound: true
        }
    },
    created() {
        if(this.$route.params.act !=='add') {
            let urlAPI = `https://fe-interview-api.unnotech.com/books/${this.$route.params.bookId}`
            this.getBook(urlAPI);
        }
    },
    methods:{ 
        getBook(url) {
            axios
                .get(url)
                .then((res) => {
                    this.bookCard = res.data
                })
                .catch((err) => {
                    console.log(err)
                    if(err.response.status === 404) {
                        this.isFound = false;
                    }
                })
        },
        save() {
            if(this.$route.params.act ==='add'){
                axios
                .post('https://fe-interview-api.unnotech.com/books/', this.bookCard)
                .then((res) => {
                    console.log(res)
                    router.push(`/books/${res.data.id}`)
                })
                .catch((err) => {
                    console.log(err)
                })
            } else {
                axios
                .patch(`https://fe-interview-api.unnotech.com/books/${this.$route.params.bookId}`, this.bookCard)
                .then((res) => {
                    console.log(res)
                    router.push(`/books/${res.data.id}`)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        },
        cancel() {
            if(this.$route.params.act ==='add'){
                router.push(`/books`)
            } else {
                router.push(`/books/${this.$route.params.bookId}`)
            }
        },
        edit() {
            router.push(`/books/${this.$route.params.bookId}/edit`)
        },
        back() {
            router.push(`/books`)
        },                        
    },
    computed: {
        isModify() {
            return this.$route.params.act ==='add' || this.$route.params.act ==='edit';
        }
    }
  }
  </script>
