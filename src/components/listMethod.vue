<script setup lang="ts">
import { ref } from "vue";
import { copyLink, shareLink } from "..";
import { type methodStyle } from "../types";

defineProps<{
  methods: methodStyle[];
}>();

const option0 = ref("");

const doCopyOrShare = async (method: methodStyle): Promise<void> => {
  if (method.copy != null) {
    await copyLink(method.copy);
  }
  if (method.share != null) {
    await shareLink(method.share);
  }
};

const set = (opt: string): void => {
  option0.value = opt;
};

const get = (): string => {
  return option0.value;
};

const emit = defineEmits<{
  change: [key: string];
}>();

defineExpose({
  set,
  get,
});
</script>

<template>
  <q-list v-for="method in methods" :key="method.key" bordered>
    <q-item v-ripple clickable @click="doCopyOrShare(method)">
      <q-radio
        v-model="option0"
        :val="method.key"
        @update:model-value="emit('change', option0)"
      />
      <q-item-section avatar>
        <q-avatar
          :color="method.avatarColor"
          text-color="white"
          :icon="method.avatarIcon"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ method.title }}</q-item-label>
        <q-item-label caption>{{ method.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
