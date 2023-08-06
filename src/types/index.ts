import { type CopyLinkMethod, type ShareLinkMethod } from "..";

export interface commandTextMessage {
  command: string;
  text: string;
}

export interface methodStyle {
  title: string;
  caption?: string;
  key: CopyLinkMethod | ShareLinkMethod | "";
  copy?: CopyLinkMethod;
  share?: ShareLinkMethod;
  avatarColor: string;
  avatarIcon: string;
}
