import emojiUnicode from "emoji-unicode";
import fs from "fs";
import path from "path";
import {
  EmojiImage,
  FxEmojiImage,
  HasImage,
  Identifiers,
  NotoEmojiImage,
  TwEmojiImage,
} from "../../db";
import { Database, enumerateTable } from "../../db/database";

export function copyEmojiAssets(targetDir: string, database: Database) {
  const images = new Array<HasImage & Identifiers>().concat(
    enumerateTable(database.pets),
    enumerateTable(database.foods),
    enumerateTable(database.statuses)
  );
  images.forEach(({ id, image }) => {
    const assetPath = path.resolve(targetDir, `${id}.svg`);
    fs.copyFileSync(getEmojiPath(image), assetPath);
    console.log(`Wrote ${assetPath}`);
  });
}

function getEmojiPath(emoji: EmojiImage) {
  switch (emoji.source) {
    case "fxemoji":
      return getFxEmojiPath(emoji);
    case "noto-emoji":
      return getNotoEmojiPath(emoji);
    case "twemoji":
      return getTwEmojiPath(emoji);
    default:
      throw new Error("Unknown emoji source");
  }
}

function getFxEmojiPath(emoji: FxEmojiImage): string {
  let unicodeValues: string[] = emojiUnicode(emoji.unicodeCodePoint).split(" ");
  return path.resolve(
    __dirname,
    "../../emoji/fxemoji/svgs/FirefoxEmoji/",
    `u${unicodeValues.join("_")}-${emoji.name}.svg`
  );
}

function getNotoEmojiPath(emoji: NotoEmojiImage): string {
  let unicodeValues: string[] = emojiUnicode(emoji.unicodeCodePoint).split(" ");
  return path.resolve(
    __dirname,
    "../../emoji/noto-emoji/svg/",
    `emoji_u${unicodeValues.join("_")}.svg`
  );
}

function getTwEmojiPath(emoji: TwEmojiImage): string {
  let unicodeValues: string[] = emojiUnicode(emoji.unicodeCodePoint).split(" ");
  return path.resolve(
    __dirname,
    "../../emoji/twemoji/assets/svg/",
    `${unicodeValues.join("_")}.svg`
  );
}