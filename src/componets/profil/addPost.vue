<template>
   <div>

   </div>
</template>
<script>

    export default{
        data(){
            return{
                postPhoto:[],
                postText:null,
                error:''
            }
        },
        methods:{
            post:function(){
                console.log(this.postText)
                console.log(this.postPhoto)
                debugger
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });

                instance.post('posts', {
                    text:this.postText,
                    media: this.postPhoto
                })
                .then(response => {
                    console.log('create posts!!')

                    console.log(response)
                    this.posts = response.data.posts
                    window.location.reload()
                })
                .catch(response => {
                    this.error = response.response
                    console.log("no")
                    console.log(response.response)
                    console.log(response)
                    debugger
                    this.errored = true;
                    event.preventDefault()

                })
            },
            uploadPhoto:function(e){
                console.log(validToken())
                this.image = e.target.files[0];
                let data = new FormData()
                data.append('UploadForm[imageFile]', this.image)
                axios({
                    url: 'http://restapi.fintegro.com/upload',
                    method: 'POST',
                    headers: {
                        bearer: validToken()
                    },
                    data:data,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                })
                    .then(response => {
                        console.log(response)
                        console.log(response.data.link)
                        this.postPhoto.push({url:response.data.link})
                        console.log(this.postPhoto)

                    })
                    .catch(error => {
                        console.log('error')
                        console.log(error.response)
                    })
            }
        }
    }
</script>
<style>

</style>
