<template>
  <ListingPlaintext :link="link" :prefix="prefix" :text="text" />
</template>

<script setup>
import { Link } from "../../../models/link"

import ListingPlaintext from "./ListingPlaintext.vue"

defineProps({ link: Link, prefix: String, text: String })
</script>
