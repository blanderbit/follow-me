
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



    /*@media screen and (max-width: 500px){*/

    /*}*/
    /*@media screen and (max-width: 400px){*/

    /*}*/
    /*@media screen and (max-width: 360px){*/

    /*}*/
</style>