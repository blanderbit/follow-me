
<template >
    <div id="captch">
        <label>Enter captcha</label><br><br>
        <input name="captch" type="text" v-model="capch" :style="{border:border_data}" class="input" @keyup="getValidationCaptch" :placeholder="arg1 +'+'+ arg2" />

    </div>
</template>

<script>

    function getRandomInt(min,max){
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    export default{
        data(){
            return{
                capch:'',
                arg1: getRandomInt(1,10),
                arg2: getRandomInt(1,10),
                result:'',
                border_data:'1px solid #fff',
            }
        },
        methods:{
            getValidationCaptch:function(){
                this.result =  this.arg1 + this.arg2
                if(this.result == this.capch){
                    this.border_data = '1px solid green'
                }else if(this.capch == ''){
                    this.border_data = '1px solid #fff'

                }else{
                    this.border_data = '1px solid red'
                }
            }
        }
    }
</script>


