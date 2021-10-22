"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saladBowl = void 0;
exports.saladBowl = {
    name: "Salad Bowl",
    image: {
        source: "twemoji",
        unicodeCodePoint: "\u{1F957}",
    },
    tier: 3,
    packs: ["StandardPack", "ExpansionPack1"],
    ability: {
        description: "Give 2 random animals +1/+1.",
        triggeredBy: {
            kind: "Self",
        },
        trigger: "Buy" /* Buy */,
        effect: {
            kind: "ModifyStats",
            target: {
                kind: "RandomFriend",
                n: 2,
            },
            attackAmount: 1,
            healthAmount: 1,
            untilEndOfBattle: false,
        },
    },
};
