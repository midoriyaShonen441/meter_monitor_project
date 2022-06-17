<script>
import 'v-calendar/dist/style.css';


export default {
    data(){
        return{
            date: new Date(),
            typeDate:"",
            isDate:""
        }
    },
    methods:{
        setConvert(){
            const day = this.date.getDate();
            const month = this.date.getMonth()+1;
            const year = this.date.getFullYear();
            this.isDate = `${day}/${month}/${year}`;
        },
        haddleTypeDate(){
            const trimDate = this.typeDate.trim();
            console.log(trimDate);
        }
    },
    updated(){
        this.setConvert();
    }
}
</script>

<template>
    <div class="verify-container">
        <div class="filter-container">
            <div class="search-date-input">
                <input class="set-input-date" placeholder="01/01/1990"  v-model="typeDate"/>
                <button><i class="fa fa-search"></i></button>
            </div>
            <div class="calendar-container">
                <v-date-picker  style="border-radius: 30px;" v-model="date" />
            </div>
        </div>
        <div class="collection-container">
            <h1>debug ==> {{isDate}}</h1>
        </div>
    </div>
</template>

<style scoped>
.verify-container{
    display: grid;
    grid-template-columns: 1fr 5fr;
    height: 680px;
    margin-top: 10.9%; 
}
.search-date-input{
    margin-bottom: 20px;
}
.filter-container{
    margin-top: 30px;
    text-align: center;
    background-color: #EAEAEA33;
}
.set-input-date{
    width: 75%;
    height: 30px;
    border-radius: 4px;
    border: none;
    text-indent: 30px;
    box-shadow: rgba(112, 112, 168, 0.25) 0px 30px 60px -12px inset, rgba(60, 60, 60, 0.3) 0px 18px 36px -18px inset;
}

</style>