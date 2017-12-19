<template lang="html">

    <div class="">
        <div aria-busy="true" aria-label="Loading" role="progressbar" class="container-dots" >
          <div class="swing">
            <div class="swing-l"></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div class="swing-r"></div>
          </div>
         </div>
    </div>

</template>

<script>

    export default {
        name: 'dots',
        data() {
            return {
            }
        },

        mounted() {
        },

        methods: {
        }
    }
</script>

<style scoped>

.container-dots {
  left: 50%;
  margin: auto -50px;
  position: absolute;
  top: 50%;
}
.swing div {
  border-radius: 50%;
  float: left;
  height: 1em;
  width: 1em;
}
.swing div:nth-of-type(1) {
  background-color: #E11831;
}
.swing div:nth-of-type(2) {
  background-color: #FD8D32;
}
.swing div:nth-of-type(3) {
  background-color: #FDD94B;
}
.swing div:nth-of-type(4) {
  background-color: #00D343;
}
.swing div:nth-of-type(5) {
  background-color: #582499;
}
.swing div:nth-of-type(6) {
  background-color: #FFFFFF;
}
.swing div:nth-of-type(7) {
  background-color: #008CC6;
}


@-webkit-keyframes ball-l {
  0%, 50% {
    -webkit-transform: rotate(0) translateX(0);
    transform: rotate(0) translateX(0);
  }
  100% {
    -webkit-transform: rotate(50deg) translateX(-2.5em);
    transform: rotate(50deg) translateX(-2.5em);
  }
}
@keyframes ball-l {
  0%, 50% {
    -webkit-transform: rotate(0) translate(0);
    transform: rotate(0) translateX(0);
  }
  100% {
    -webkit-transform: rotate(50deg) translateX(-2.5em);
    transform: rotate(50deg) translateX(-2.5em);
  }
}
@-webkit-keyframes ball-r {
  0% {
    -webkit-transform: rotate(-50deg) translateX(2.5em);
    transform: rotate(-50deg) translateX(2.5em);
  }
  50%,
  100% {
    -webkit-transform: rotate(0) translateX(0);
    transform: rotate(0) translateX(0);
  }
}
@keyframes ball-r {
  0% {
    -webkit-transform: rotate(-50deg) translateX(2.5em);
    transform: rotate(-50deg) translateX(2.5em);
  }
  50%,
  100% {
    -webkit-transform: rotate(0) translateX(0);
    transform: rotate(0) translateX(0)
  }
}


.swing-l {
  -webkit-animation: ball-l .445s ease-in-out infinite alternate;
  animation: ball-l .445s ease-in-out infinite alternate;
}
.swing-r {
  -webkit-animation: ball-r .445s ease-in-out infinite alternate;
  animation: ball-r .445s ease-in-out infinite alternate;
}

</style>
