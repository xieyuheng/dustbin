<template>
  <div class="flex items-stretch">
    <div class="flex shrink-0 flex-col self-center pr-2 text-base md:pr-3">
      <slot name="metadata"></slot>
    </div>

    <div
      class="flex w-full flex-col justify-center overflow-x-auto border-l border-gray-900 pl-2 md:pl-3"
    >
      <slot></slot>
    </div>
  </div>
</template>
