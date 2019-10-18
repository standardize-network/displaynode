<template>
  <div :class="['fulfilling-square-spinner', 'loadingIndicatorBox']">
    <div class="spinner-inner"></div>
  </div>
</template>
<style>

.loadingIndicatorBox {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8em;
  margin-bottom: 10em;
}

.fulfilling-square-spinner , .fulfilling-square-spinner * {
    box-sizing: border-box;
  }

.fulfilling-square-spinner {
  height: 300px;
  width: 300px;
  position: relative;
  border: 8px solid #424e60;
  animation: fulfilling-square-spinner-animation 4s infinite ease;
}

.fulfilling-square-spinner .spinner-inner {
  vertical-align: top;
  display: inline-block;
  background-color: #845050;
  width: 100%;
  opacity: 1;
  animation: fulfilling-square-spinner-inner-animation 4s infinite ease-in;
}

@keyframes fulfilling-square-spinner-animation {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fulfilling-square-spinner-inner-animation {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}
</style>
