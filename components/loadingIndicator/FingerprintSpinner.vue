<template>
  <div :class="['fingerprint-spinner']">
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
  </div>
</template>

<style>
/* Fingerprint-Spinner */
.fingerprint-spinner, .fingerprint-spinner * {
  box-sizing: border-box;
  overflow: hidden;
}

.fingerprint-spinner {
  height: 10px;
  width: 10px;
  overflow: hidden;
}

.fingerprint-spinner .spinner-ring {
  position: absolute;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: white;
  animation: fingerprint-spinner-animation 3000ms cubic-bezier(0.680, -0.750, 0.265, 1.750) infinite forwards;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}

.fingerprint-spinner .spinner-ring:nth-child(1) {
  height: calc(1000px / 9 + 0 * 1000px / 9);
  width: calc(1000px / 9 + 0 * 1000px / 9);
  animation-delay: calc(50ms * 1);
}

.fingerprint-spinner .spinner-ring:nth-child(2) {
  height: calc(1000px / 9 + 1 * 1000px / 9);
  width: calc(1000px / 9 + 1 * 1000px / 9);
  animation-delay: calc(50ms * 2);
}

.fingerprint-spinner .spinner-ring:nth-child(3) {
  height: calc(1000px / 9 + 2 * 1000px / 9);
  width: calc(1000px / 9 + 2 * 1000px / 9);
  animation-delay: calc(50ms * 3);
}

.fingerprint-spinner .spinner-ring:nth-child(4) {
  height: calc(1000px / 9 + 3 * 1000px / 9);
  width: calc(1000px / 9 + 3 * 1000px / 9);
  animation-delay: calc(50ms * 4);
}

.fingerprint-spinner .spinner-ring:nth-child(5) {
  height: calc(1000px / 9 + 4 * 1000px / 9);
  width: calc(1000px / 9 + 4 * 1000px / 9);
  animation-delay: calc(50ms * 5);
}

.fingerprint-spinner .spinner-ring:nth-child(6) {
  height: calc(1000px / 9 + 5 * 1000px / 9);
  width: calc(1000px / 9 + 5 * 1000px / 9);
  animation-delay: calc(50ms * 6);
}

.fingerprint-spinner .spinner-ring:nth-child(7) {
  height: calc(1000px / 9 + 6 * 1000px / 9);
  width: calc(1000px / 9 + 6 * 1000px / 9);
  animation-delay: calc(50ms * 7);
}

.fingerprint-spinner .spinner-ring:nth-child(8) {
  height: calc(1000px / 9 + 7 * 1000px / 9);
  width: calc(1000px / 9 + 7 * 1000px / 9);
  animation-delay: calc(50ms * 8);
}

.fingerprint-spinner .spinner-ring:nth-child(9) {
  height: calc(1000px / 9 + 8 * 1000px / 9);
  width: calc(1000px / 9 + 8 * 1000px / 9);
  animation-delay: calc(50ms * 9);
}

@keyframes fingerprint-spinner-animation {
  100% {
    transform: rotate( 360deg );
  }
}

</style>
