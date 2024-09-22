export type Command = "copy" | "share";

export interface CommandTextMessage {
  command: Command;
  text: string;
}
