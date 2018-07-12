
<template >
    <div id="my_footer">
        <div class="globalMyFooter">
            <div class="globalMyFooter_head">
                <div class="globalMyFooter_head_up">
                    <div>
                        <a href="https://vk.com" ><ion-icon name="logo-vk" ></ion-icon></a>
                        <a href="https://www.instagram.com/" ><ion-icon name="logo-instagram" ></ion-icon></a>
                        <a href="https://www.linkedin.com/" ><ion-icon name="logo-linkedin" ></ion-icon></a>
                        <a href="https://www.facebook.com/" ><ion-icon name="logo-facebook" ></ion-icon></a>
                    </div>
                </div>
                <hr>
                <div class="globalMyFooter_head_down">
                    <div class="globalMyFooter_head_down_left">© {{ year }} Fintegro Company.</div>
                    <div class="globalMyFooter_head_down_right"> All rights reserved.</div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
var date = new Date();

    export default{props:['ids'],
        data(){
            return{
                year: date.getFullYear(),
            }
        },
        methods:{

        }
    }
</script>

<style>
    .globalMyFooter{

        background: rgba(0, 153, 255);
        width: 100%;

    }
    .globalMyFooter_head{
        width: 900px;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
    }
  #my_footer  ion-icon {
        font-size: 34px;
        color: white;
    }
  #my_footer  ion-icon:hover{
        color: black;
    }
    .globalMyFooter_head_down{
        padding: 10px;
        color: white
    }
    .globalMyFooter_head_down_left{
        float: left;
    }
    .globalMyFooter_head_down_right{
        float: right;
    }
    .clear{
        clear: both;
    }
    hr{
        height: 2px;
        background: yellow;
    }
</style>