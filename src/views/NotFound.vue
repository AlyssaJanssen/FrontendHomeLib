<template>
  <div class="w-full">
    <h2>404: Page Not Found</h2>
  </div>
</template>
<script>
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Audiowide&display=swap');

html,
body {
  margin: 0px;
  overflow: hidden;
}

div {
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  background: radial-gradient(circle, #000000 0%, #252525 100%);
  overflow: hidden;
}

h2 {
  position: absolute;
  top: 40%;
  left: 50%;
  margin-top: 0px;
  font-size: 62px;
  text-transform: uppercase;
  transform: translate(-50%, -50%);
  display: block;
  color: #ffffff;
  font-weight: 100;
  font-family: Audiowide;
  text-shadow: 0px 0px 4px #eeeaec;
  animation: fadeInText 3s ease-in 1s forwards, flicker4 5s linear 7s infinite, hueRotate 6s ease-in-out 3s infinite;
}

@keyframes fadeInText {
  1% {
    color: #01a39b;
    text-shadow: 0px 0px 4px #12000a;
  }

  70% {
    color: #ff005d;
    text-shadow: 0px 0px 14px #ff005d;
  }

  100% {
    color: #ff005d;
    text-shadow: 0px 0px 4px #ff005d;
  }
}

@keyframes hueRotate {
  0% {
    filter: hue-rotate(0deg);
  }

  50% {
    filter: hue-rotate(-120deg);
  }

  100% {
    filter: hue-rotate(0deg);
  }
}</style>