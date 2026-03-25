// Basic profanity filter — client side is a courtesy;
// the real filter runs on the server in matchmaking.ts
const BLOCKED: string[] = [
  "fuck", "shit", "asshole", "bitch", "bastard", "cunt", "dick", "pussy",
  "faggot", "nigger", "whore", "slut", "retard",
];

const re = new RegExp(`\\b(${BLOCKED.join("|")})\\b`, "gi");

export function filterProfanity(text: string): string {
  return text.replace(re, (match) => match[0] + "*".repeat(match.length - 1));
}

export function hasProfanity(text: string): boolean {
  return re.test(text);
}
