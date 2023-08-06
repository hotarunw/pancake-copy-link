<script setup lang="ts">
import { ref } from "vue";
import { generateCopyLink, generateShareLink } from "../index";
import { type methodStyle } from "../types";
import listMethod from "./listMethod.vue";

const fraw =
  generateCopyLink.get("raw") ?? ((title: string, url: string) => "");
const fmarkdown =
  generateCopyLink.get("markdown") ?? ((title: string, url: string) => "");
const ftwitter =
  generateShareLink.get("twitter") ?? ((title: string, url: string) => "");
const copyMethods: methodStyle[] = [
  {
    title: "Raw",
    caption: fraw("title", "url"),
    key: "raw",
    copy: "raw",
    avatarColor: "primary",
    avatarIcon: "fa-regular fa-file-lines",
  },
  {
    title: "MarkDown",
    caption: fmarkdown("title", "url"),
    key: "markdown",
    copy: "markdown",
    avatarColor: "secondary",
    avatarIcon: "fa-brands fa-markdown",
  },
];

const shareMethods: methodStyle[] = [
  {
    title: "X (Twitter)",
    caption: ftwitter("title", "url"),
    key: "twitter",
    share: "twitter",
    avatarColor: "primary",
    avatarIcon: "fa-brands fa-twitter",
  },
];

const copyLinkMethodRef = ref<InstanceType<typeof listMethod>>();
const shareLinkMethodRef = ref<InstanceType<typeof listMethod>>();

void chrome.storage.local.get(["copy", "share"]).then((result) => {
  copyLinkMethodRef.value?.set(result.copy);
  shareLinkMethodRef.value?.set(result.share);
});

const onCopyLinkMethodChange = async (): Promise<void> => {
  await chrome.storage.local.set({ copy: copyLinkMethodRef.value?.get() });
};
const onShareLinkMethodChange = async (): Promise<void> => {
  await chrome.storage.local.set({ share: shareLinkMethodRef.value?.get() });
};
</script>

<template>
  <q-bar dark class="bg-primary text-white">
    <span>Copy Link</span>
  </q-bar>

  <listMethod
    ref="copyLinkMethodRef"
    :methods="copyMethods"
    @change="onCopyLinkMethodChange"
  ></listMethod>

  <q-bar dark class="bg-secondary text-white">
    <span>Share Link</span>
  </q-bar>

  <listMethod
    ref="shareLinkMethodRef"
    :methods="shareMethods"
    @change="onShareLinkMethodChange"
  ></listMethod>

  <div>
    Shortcut triggers
    <q-radio model-value="" val=""></q-radio>
  </div>
</template>
