// Self-contained knowledge base for the site chatbot (no external AI).
// Each entry is matched by keywords; the best-scoring answer is returned.
// Expand `KNOWLEDGE` later with more Q&A as more data is provided.

import { AUTHOR, BOOKS } from "./content";

export type Suggestion = string;

type Entry = {
  keywords: string[];
  answer: string;
};

const bookTitles = BOOKS.map((b) => b.title).join(", ");

export const KNOWLEDGE: Entry[] = [
  {
    keywords: ["who is", "who's", "bio", "biography", "patrick treacy", "himself", "his career", "background", "professor", "prof"],
    answer:
      "Professor Patrick Treacy is an Irish doctor, author, humanitarian and a globally recognised pioneer of regenerative aesthetic medicine. He founded the Ailesbury Clinic in Dublin, and over more than 40 years his research and teaching have reached physicians on six continents. He is also known as the friend and physician who became Michael Jackson's doctor, and is the author of fourteen books.",
  },
  {
    keywords: ["ailesbury", "clinic", "dublin", "practice", "where does he work"],
    answer:
      "Professor Treacy is the founder of the Ailesbury Clinic in Dublin, Ireland (David Lloyd Riverview, Beech Hill Rd, Clonskeagh, D04 AF10). It has been repeatedly named among Ireland's top aesthetic clinics.",
  },
  {
    keywords: ["research", "helpir", "plus technique", "photobiomodulation", "prp", "regenerative", "stem cell", "innovation"],
    answer:
      "His research spans seven frontiers of regenerative science — including the HELPIR technique, the PLUS Technique™, the DUBLiN Lift, photobiomodulation, platelet-rich plasma (PRP), high-dose hyaluronidase for filler complications, and vision-restoration research. Much of it centres on safer practice and complication management in aesthetic medicine.",
  },
  {
    keywords: ["book", "books", "written", "write", "titles", "read", "collection", "how many"],
    answer:
      `Professor Treacy has written fourteen books, spanning memoir, aesthetic medicine, regenerative science, pandemics, medical history, humanitarian memoir and the psychology of the face. Featured titles include: ${bookTitles}. Head to the Books section to flip through the covers — double-click any cover to find it on Amazon UK, US or IE.`,
  },
  {
    keywords: ["behind the mask", "mask", "memoir"],
    answer:
      "“Behind the Mask” is Dr Treacy's memoir — the extraordinary story of the Irishman who became Michael Jackson's doctor, spanning travel, adventure, politics and the birth of aesthetic medicine.",
  },
  {
    keywords: ["michael", "jackson", "mj", "singer", "friend", "friendship"],
    answer:
      "Dr Treacy met Michael Jackson in Ireland in 2006. What began as care became a genuine friendship, and he later served as Honorary Ambassador to the Michael Jackson Legacy Foundation. He tells the full story in his memoir, “Behind the Mask.”",
  },
  {
    keywords: ["aesthetic", "medicine", "pioneer", "hyaluronidase", "cosmetic", "field", "safety", "complication"],
    answer:
      "Professor Treacy is a pioneer of regenerative aesthetic medicine and an early international advocate for high-dose hyaluronidase in filler-related vascular emergencies. Much of his work centres on patient safety and complication management. His book “The Evolution of Aesthetic Medicine” charts how the discipline was built.",
  },
  {
    keywords: ["award", "awards", "recognition", "top", "world", "won", "prize", "honour", "honor", "lifetime"],
    answer:
      "Professor Treacy has received five Lifetime Achievement Awards — in China, Ireland, Italy, Pakistan and the UK — among 50+ distinctions. He has 150+ scientific publications, has lectured in 40+ countries and trained more than 10,000 physicians. Honours include Top Global Medical Practitioner (MyFaceMyBody, Las Vegas 2019) and the World Regenerative Medicine Innovation Award.",
  },
  {
    keywords: ["humanitarian", "africa", "orphanage", "orphanages", "charity", "hiv", "aids", "liberia", "haiti", "uganda", "pakistan", "malawi", "water"],
    answer:
      "Professor Treacy's humanitarian work spans nearly four decades: HIV/AIDS relief in South Africa (from 2001), earthquake relief and building an orphanage and two schools in Haiti (2010–13), an orphanage in Liberia (2012, with the Michael Jackson Legacy Organisation), hospital work in Malawi (2016), rural projects in Uganda (2019–26), physician training and clean-water pump projects in Pakistan (2023–24).",
  },
  {
    keywords: ["needle", "damage", "story", "started", "beginning", "northern ireland", "1987"],
    answer:
      "His story turned on a single moment in 1987 — a needlestick injury that set him on a path from Northern Ireland into humanitarian medicine in Africa and, ultimately, to the summit of aesthetic medicine.",
  },
  {
    keywords: ["contact", "email", "reach", "enquiry", "enquiries", "press", "speaking", "booking", "keynote", "get in touch", "talk"],
    answer:
      "For speaking engagements, faculty invitations, research collaborations and press, email patrick@drpatricktreacy.ie, or use the Contact section at the bottom of this page. The office is at Ailesbury Clinics Ltd, Clonskeagh, Dublin, Ireland.",
  },
  {
    keywords: ["buy", "purchase", "amazon", "order", "where", "shop", "get the book"],
    answer:
      "You can buy the books through Amazon UK, US and Ireland. Scroll to the Books section, then double-click any cover — a pop-up will let you pick your Amazon store for that title.",
  },
  {
    keywords: ["faces", "pathways", "ageing", "aging", "peptides", "pandemics", "regenerative", "destinations", "dreams", "living history"],
    answer:
      `That's one of Dr Treacy's books. His full collection includes ${bookTitles}. Open the Books section to see the covers and buy links.`,
  },
  {
    keywords: ["thanks", "thank you", "cheers", "great", "awesome", "helpful"],
    answer: "You're very welcome. Ask me anything else about Dr Treacy, his books or his work.",
  },
];

export const GREETING = `Hello! I'm Professor Treacy's assistant. Ask me about ${AUTHOR.name}, his fourteen books, his work in regenerative aesthetic medicine, his humanitarian missions, or his friendship with Michael Jackson.`;

export const SUGGESTIONS: Suggestion[] = [
  "Who is Patrick Treacy?",
  "What books has he written?",
  "Tell me about Michael Jackson",
  "How can I buy the books?",
];

const GREETING_WORDS = ["hi", "hey", "hello", "yo", "hiya", "howdy", "good morning", "good evening"];

export function answerQuestion(query: string): string {
  const q = query.toLowerCase().trim();
  if (!q) return "Ask me anything about Dr Patrick Treacy — his books, his career, or his story.";

  // greeting
  if (GREETING_WORDS.some((w) => q === w || q.startsWith(w + " "))) {
    return GREETING;
  }

  let best: Entry | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length; // longer keyword = stronger signal
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0) return best.answer;

  return "I don't have that in my notes yet — I'm still learning. Try asking about Dr Treacy's books, his work in aesthetic medicine, his humanitarian work, or his friendship with Michael Jackson.";
}
