<template>
  <div :class="$style.modalBody">
    <slot />
  </div>
</template>

<style module>
.modalBody {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  background: var(--bg-1);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  flex: 1;
  min-height: 0;
}

@media (min-width: 640px) {
  .modalBody {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .modalBody {
    padding: 32px;
  }
}
</style>
