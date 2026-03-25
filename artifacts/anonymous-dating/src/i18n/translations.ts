import { useAppStore } from "@/store/use-app-store";

export type TKey =
  | "home.headline"
  | "home.subline"
  | "home.alias"
  | "home.alias_placeholder"
  | "home.i_am_a"
  | "home.male"
  | "home.female"
  | "home.interests"
  | "home.interests_placeholder"
  | "home.find_match"
  | "home.online_now"
  | "home.active_chats"
  | "matching.searching"
  | "matching.looking_for"
  | "matching.cancel"
  | "chat.live_chat"
  | "chat.skip_next"
  | "chat.type_message"
  | "chat.chat_ended"
  | "chat.partner_disconnected"
  | "chat.find_new"
  | "chat.back_home"
  | "chat.partner_typing"
  | "chat.session_timer"
  | "nav.about"
  | "nav.faq"
  | "nav.profile"
  | "common.report"
  | "common.cancel"
  | "common.send";

type Translations = Record<TKey, string>;

export const translations: Record<"en" | "te", Translations> = {
  en: {
    "home.headline": "Meet someone right now.",
    "home.subline": "Anonymous video & text chat. No signups. Just instant connections.",
    "home.alias": "Your Alias",
    "home.alias_placeholder": "Enter a cool name...",
    "home.i_am_a": "I am a",
    "home.male": "👨 Male",
    "home.female": "👩 Female",
    "home.interests": "Interests (optional)",
    "home.interests_placeholder": "music, travel, gaming...",
    "home.find_match": "Find a Match",
    "home.online_now": "Online",
    "home.active_chats": "Active Chats",
    "matching.searching": "Searching...",
    "matching.looking_for": "Looking for a",
    "matching.cancel": "Cancel Search",
    "chat.live_chat": "Live Chat",
    "chat.skip_next": "Skip & Next",
    "chat.type_message": "Type a message...",
    "chat.chat_ended": "Chat ended...",
    "chat.partner_disconnected": "Partner Disconnected",
    "chat.find_new": "Find New Match",
    "chat.back_home": "Back Home",
    "chat.partner_typing": "Partner is typing...",
    "chat.session_timer": "Session",
    "nav.about": "About",
    "nav.faq": "FAQ",
    "nav.profile": "Profile",
    "common.report": "Report",
    "common.cancel": "Cancel",
    "common.send": "Send",
  },
  te: {
    "home.headline": "ఇప్పుడే ఎవరైనా కలవండి.",
    "home.subline": "అనామక వీడియో & టెక్స్ట్ చాట్. సైన్‌అప్ అవసరం లేదు. తక్షణ కనెక్షన్లు.",
    "home.alias": "మీ పేరు",
    "home.alias_placeholder": "ఒక పేరు నమోదు చేయండి...",
    "home.i_am_a": "నేను",
    "home.male": "👨 పురుషుడు",
    "home.female": "👩 మహిళ",
    "home.interests": "ఆసక్తులు (ఐచ్ఛికం)",
    "home.interests_placeholder": "సంగీతం, ప్రయాణం, గేమింగ్...",
    "home.find_match": "మ్యాచ్ కనుగొనండి",
    "home.online_now": "ఆన్‌లైన్",
    "home.active_chats": "చురుకైన చాట్లు",
    "matching.searching": "వెతుకుతున్నాం...",
    "matching.looking_for": "కోసం వెతుకుతున్నాం",
    "matching.cancel": "రద్దు చేయండి",
    "chat.live_chat": "లైవ్ చాట్",
    "chat.skip_next": "దాటి వెళ్ళు",
    "chat.type_message": "సందేశం టైప్ చేయండి...",
    "chat.chat_ended": "చాట్ ముగిసింది...",
    "chat.partner_disconnected": "భాగస్వామి డిస్‌కనెక్ట్ అయ్యారు",
    "chat.find_new": "కొత్త మ్యాచ్ కనుగొనండి",
    "chat.back_home": "హోమ్‌కి తిరిగి వెళ్ళు",
    "chat.partner_typing": "భాగస్వామి టైప్ చేస్తున్నారు...",
    "chat.session_timer": "సెషన్",
    "nav.about": "గురించి",
    "nav.faq": "తరచు అడిగే ప్రశ్నలు",
    "nav.profile": "ప్రొఫైల్",
    "common.report": "నివేదించు",
    "common.cancel": "రద్దు",
    "common.send": "పంపు",
  },
};

export function useTranslation() {
  const language = useAppStore((s) => s.language) as "en" | "te";
  const t = (key: TKey): string => translations[language][key] ?? translations.en[key] ?? key;
  return { t, language };
}
