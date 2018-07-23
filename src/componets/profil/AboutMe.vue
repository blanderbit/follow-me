<template >
              <div class="AboutMe">
                <ul class="beads">
                    <li><a href="#">Age</a>:</li>
                    <li><a href="#">Name and Surname</a>:</li>
                    <li><a href="#">number of subscription</a>:</li>
                </ul>
              </div>

</template>

<style>
/*Информация обо мне*/
.AboutMe{
margin:0%;
padding:0%;
position:relative;
left:400px;
top: 100px;
border-style:solid;
border-color:blue;
border-radius:15px;
height:114px;
width:387px;


}

.beads {
list-style: none;
background: #F0F8FF;
margin: 0;
padding-left: 40px;
border-radius: 5px;
}
.beads li {
text-transform: uppercase;
font-family: 'Montserrat', sans-serif;
line-height: 40px;
border-bottom: 1px solid #D4D7D6;
position: relative;
}
.beads a {
text-decoration: none;
color: black;
display: block;
line-height: 40px;
position: relative;
}
/*.beads a:before {*/
/*content:"";*/
/*position: absolute;*/
/*left: -20px;*/
/*top: 6px;*/
/*width: 6px;*/
/*height: 6px;*/
/*border-radius: 50%;*/
/*background: #00008B;*/
/*}*/
.beads li:last-child {border-bottom: none;}
.beads li:before,
.beads li:after {
content:"";
position: absolute;
border-radius: 50%;
}
.beads li:before {
top: calc(50% - 5px);
background: #00CED1;
left: -22px;
width: 10px;
height: 10px;
transition: 0.5s linear;
}
/*.beads li:after {*/
/*bottom: 6px;*/
/*left: -20px;*/
/*width: 6px;*/
/*height: 6px;*/
/*background: #00008B;*/
/*}*/
.beads li:hover:before {background: #FFCE08;} 

</style>

<script>

</script>