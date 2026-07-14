// ---------------------------------------------------------------------------
// Professor Patrick Treacy — full professional profile data
// Sourced & cross-verified from profpatricktreacy.ie (the reference site).
// Assets marked TODO are placeholders to be supplied later.
// ---------------------------------------------------------------------------

/* ------------------------------ Global Recognition ---------------------- */
export const GLOBAL = {
  eyebrow: "Global Recognition",
  title: "A voice heard across continents.",
  lead:
    "From Dublin to Dubai, Tokyo to São Paulo — keynote stages, training theatres and university auditoriums around the world.",
  stats: [
    { value: "150+", label: "Scientific publications" },
    { value: "40+", label: "Countries lectured" },
    { value: "10,000+", label: "Physicians trained" },
    { value: "5+", label: "Lifetime Achievement Awards" },
  ],
  regions: [
    "North America",
    "Europe",
    "Africa",
    "Middle East",
    "Asia",
    "Oceania",
    "South America",
  ],
  footprint: "Global Footprint · 2025",
};

/* --------------------------- Qualifications ----------------------------- */
export type Qualification = { abbr: string; body: string };
export const QUALIFICATIONS = {
  eyebrow: "Credentials",
  title: "Qualifications & Fellowships",
  count: "9 Distinctions",
  items: [
    { abbr: "MB.BCh", body: "Royal College of Surgeons in Ireland" },
    { abbr: "BSc (Hons) Biochemistry", body: "Queen's University Belfast" },
    { abbr: "H.Dip Dermatology (Hons)", body: "University College Dublin" },
    { abbr: "MICGP", body: "Irish College of General Practitioners" },
    { abbr: "FACSAM (Hon)", body: "Australian College of Cosmetic Surgery and Medicine" },
    { abbr: "BCAM", body: "British College of Aesthetic Medicine" },
    { abbr: "DCH", body: "Royal College of Physicians of Ireland" },
    { abbr: "DRCOG", body: "Royal College of Obstetricians and Gynaecologists" },
    { abbr: "DTM", body: "Royal College of Surgeons in Ireland" },
  ] as Qualification[],
};

/* --------------------------- Research & Innovation ---------------------- */
export type ResearchItem = { num: string; title: string; body: string };
export const RESEARCH = {
  eyebrow: "Research & Innovation",
  title: "Nine frontiers of regenerative science.",
  lead:
    "Each line of research reflects peer-reviewed work, original protocols and clinical teaching delivered to physicians across multiple continents.",
  items: [
    { num: "001", title: "Regenerative Medicine", body: "Developing biologically honest approaches to skin repair, tissue regeneration and aesthetic rejuvenation through PRP, autologous therapies and regenerative signalling." },
    { num: "002", title: "The HELPIR Technique", body: "An original multimodal regenerative protocol combining PRP, photobiomodulation, hyperbaric oxygen and regenerative signalling to support tissue recovery after aesthetic complications." },
    { num: "003", title: "Photobiomodulation", body: "Low-level red and near-infrared light therapy for regenerative dermatology, wound healing, inflammation control, hair restoration and post-procedure recovery." },
    { num: "004", title: "Stem Cell & Regenerative Signalling", body: "Translational research into adipose-derived cell biology, stromal vascular approaches and regenerative signalling for skin repair and aesthetic restoration." },
    { num: "005", title: "Methotrexate & Tissue Nodules", body: "Published work on selected delayed inflammatory nodules following injectable aesthetic treatments, exploring immune-mediated reactions and the role of methotrexate in complex complication management." },
    { num: "006", title: "High-Dose Hyaluronidase", body: "Structured, safety-focused use of hyaluronidase in dermal filler complications, distinguishing routine correction from urgent vascular compromise management." },
    { num: "007", title: "The DUBLiN Lift", body: "A signature regenerative rejuvenation approach integrating PRP, regenerative signalling and photobiomodulation to restore tissue quality and support long-term skin health." },
    { num: "008", title: "The PLUS Technique", body: "A signature regenerative protocol combining PRP, photobiomodulation, targeted tissue stimulation and stem-cell signalling to activate multiple regenerative pathways simultaneously." },
    { num: "009", title: "Blindness & Vision Restoration Research", body: "Research into regenerative medicine, cellular signalling, neuroprotection and photobiomodulation aimed at vision preservation, retinal health and future therapeutic approaches to blindness." },
  ] as ResearchItem[],
};

/* --------------------------- The PLUS Technique ------------------------- */
export const PLUS = {
  eyebrow: "Signature Protocols",
  title: "The PLUS Technique™",
  tagline: "A signature regenerative medicine protocol — Prof. Patrick Treacy",
  intro:
    "One of Prof. Treacy's signature regenerative protocols — often described as a precursor to many of the biologics-based and combination regenerative approaches now becoming mainstream. It was developed from the concept that successful tissue rejuvenation requires more than a single modality, and that multiple regenerative pathways should be activated simultaneously.",
  pillars: [
    { letter: "P", title: "Platelet-Rich Plasma (PRP)", body: "Concentrated platelet-derived growth factors support tissue repair, regeneration and rejuvenation." },
    { letter: "L", title: "Low-Level Light Therapy", sub: "Photobiomodulation", body: "Advanced light-based stimulation enhances cellular energy production and regenerative activity." },
    { letter: "U", title: "Ultrasound-Guided Tissue Stimulation", body: "Targeted regenerative activation through precise ultrasound-guided therapeutic intervention." },
    { letter: "S", title: "Stem-Cell Signalling", body: "Supports regenerative cellular communication and activates natural healing pathways throughout the tissue environment." },
  ],
  why: {
    title: "Multiple regenerative pathways, activated simultaneously.",
    body: "Rather than relying on a single treatment modality, the PLUS Technique simultaneously activates multiple regenerative pathways to optimise tissue healing, cellular repair and long-term rejuvenation outcomes.",
  },
};

/* --------------------- Patient Safety & Complications ------------------- */
export type SafetyItem = { num: string; title: string; body: string };
export const SAFETY = {
  eyebrow: "Patient Safety & Complication Management",
  title: "A defining body of work in safer aesthetic medicine.",
  lead:
    "Research, protocols and physician teaching centred on complication rescue, vascular compromise, regenerative recovery and responsible clinical standards.",
  items: [
    { num: "01", title: "High-Dose Hyaluronidase", body: "Among the early international advocates for high-dose hyaluronidase protocols in the emergency management of filler-related vascular compromise." },
    { num: "02", title: "The HELPIR Technique", body: "A multimodal regenerative protocol integrating hyperbaric oxygen, laser support, PRP and infrared photobiomodulation for compromised tissue recovery." },
    { num: "03", title: "Vascular Occlusion Protocols", body: "Structured clinical response pathways for recognising evolving ischaemia early and intervening rapidly to reduce tissue loss." },
    { num: "04", title: "Blindness Rescue Advocacy", body: "Sustained international teaching on ocular emergency awareness, escalation pathways and immediate inter-specialty response — including the supraorbital hyaluronidase injection method as a peri-ocular rescue technique." },
    { num: "05", title: "Methotrexate for Delayed Nodules", body: "Clinical advocacy and teaching around methotrexate-based approaches in selected delayed inflammatory nodules when conventional measures fail." },
    { num: "06", title: "Training Doctors in Safer Practice", body: "International physician education focused on anatomy, complications, ethical decision-making and safer regenerative and aesthetic practice." },
  ] as SafetyItem[],
};

/* --------------------------- Lecture Topics ----------------------------- */
export const LECTURES = {
  eyebrow: "Signature Lecture Topics",
  title: "A programme designed for conference organisers.",
  lead:
    "High-level lectures spanning regenerative science, complication rescue, patient safety, ageing biology and the psychology of appearance.",
  topics: [
    "Biological Honesty in Regenerative Medicine",
    "Secretomes vs Exosomes",
    "The Future of PRP and Autologous Regeneration",
    "Patient Safety in Aesthetic Medicine",
    "The HELPIR Protocol",
    "High-Dose Hyaluronidase and Vascular Occlusion",
    "Photobiomodulation and Mitochondrial Medicine",
    "The Pathways of Ageing",
    "Psycholag and the Mind–Skin Axis",
  ],
};

/* --------------------------- Conferences -------------------------------- */
export type Engagement = { date: string; place: string; event: string; topic: string };
export const CONFERENCES = {
  eyebrow: "Conferences & Speaking",
  title: "Keynote stages from Monaco to Tokyo.",
  lead: "A regular faculty member at the world's defining medical aesthetic congresses.",
  featured: {
    label: "Featured Keynote",
    title: "“The Next Decade of Regenerative Aesthetics”",
    event: "AMWC Monaco 2025",
    meta: "42 min · Auditorium Prince Rainier III",
    video: "", // TODO: keynote video / link
  },
  upcoming: [
    { date: "May 2026", place: "Rome", event: "SIME Congress", topic: "Regenerative Medicine, PRP & Secretomes" },
    { date: "June 2026", place: "Bangkok", event: "IMCAS Asia", topic: "Secretomes & Regenerative Aesthetic Medicine" },
    { date: "July 2026", place: "Lahore", event: "PAADS", topic: "Aesthetic & Regenerative Medicine" },
    { date: "August 2026", place: "China", event: "IMCAS China", topic: "Regenerative Medicine & Patient Safety" },
    { date: "September 2026", place: "Oxford / Delhi", event: "World Regenerative Medicine / World Longevity Conference", topic: "Featured Lecturer" },
  ] as Engagement[],
};

/* --------------------------- Selected Publications ---------------------- */
export type Publication = { num: string; title: string; body: string; source: string };
export const PUBLICATIONS = {
  eyebrow: "Selected Publications",
  title: "Published work that gives the profile academic weight.",
  lead:
    "A selected reading list spanning complication management, regenerative medicine, combination therapies and patient safety.",
  items: [
    { num: "01", title: "Aesthetic Complications and Other Interesting Cases", body: "A clinically focused volume on adverse events, rescue strategies and practical lessons from complication management in aesthetic medicine.", source: "Austin Macauley Publishers · 2022" },
    { num: "02", title: "Combining Therapies for the Ageing Face — The Dublin Lift", body: "A published framework exploring combination treatment strategies for facial ageing, integrating regenerative and aesthetic approaches.", source: "PRIME International Magazine of Aesthetic and Anti-Ageing Medicine · 2012" },
    { num: "03", title: "Hyaluronidase in Filler Complication Management", body: "Internationally recognised teaching on rapid-response protocols for filler-related vascular compromise and tissue rescue.", source: "Selected lectures, training material and complication teaching" },
    { num: "04", title: "Methotrexate for Delayed Inflammatory Nodules", body: "Advocacy for structured management pathways in persistent inflammatory nodules, particularly where first-line approaches have failed.", source: "Complication management research and physician education" },
    { num: "05", title: "Photobiomodulation and Regenerative Recovery", body: "Work examining red and near-infrared photobiomodulation in wound healing, tissue recovery and post-procedure regeneration.", source: "Regenerative medicine teaching and published clinical commentary" },
    { num: "06", title: "Platelet-Rich Plasma and Autologous Regeneration", body: "Clinical and educational contributions on PRP, autologous signalling and biologically led rejuvenation strategies.", source: "Peer-reviewed and conference-led educational work" },
    { num: "07", title: "HELPIR and Compromised Tissue Rescue", body: "A multimodal framework for managing soft-tissue ischaemia and necrosis following aesthetic complications.", source: "Protocol development and international teaching" },
    { num: "08", title: "Patient Safety in Aesthetic Medicine", body: "Ongoing academic and public advocacy for safer standards, earlier recognition of complications and stronger physician education.", source: "Lectures, interviews and international congress presentations" },
  ] as Publication[],
};

/* --------------------------- Honours & Awards --------------------------- */
export type LifetimeAward = { country: string; org: string; body: string };
export type AwardYear = { year: string; items: { title: string; place?: string }[] };
export const AWARDS = {
  eyebrow: "Honours & Awards",
  title: "Five nations. One lifetime of devotion.",
  lead:
    "An unprecedented constellation of recognitions across four and a half decades — research, humanitarian service and patient safety honoured by the world's leading medical bodies.",
  lifetimeHeadline: "5× Lifetime Achievement Awards",
  lifetimeNations: "China · Ireland · Italy · Pakistan · UK",
  lifetime: [
    { country: "China", org: "ZYLAN Congress", body: "Lifetime Achievement Award for exceptional contributions to aesthetic medicine and dermatology." },
    { country: "Ireland", org: "HiStyle Awards", body: "Honoured for vision, dedication, research, philanthropy and raising standards through education." },
    { country: "Italy", org: "IAPEM · Milan", body: "Recognition for pioneering work in regenerative medicine and humanitarian contributions across four continents." },
    { country: "Pakistan", org: "Isra University, Hyderabad", body: "Award of Appreciation at the 4th Aesthetic Anti-Aging Congress 2023, Karachi." },
    { country: "United Kingdom", org: "Private Healthcare Excellence Awards 2026", body: "Outstanding Contribution to the Industry — setting benchmarks for innovation in private healthcare." },
  ] as LifetimeAward[],
  rollHeadline: "Award Roll · 2016 – 2026",
  rollCount: "50+ Distinctions",
  roll: [
    { year: "2026", items: [
      { title: "M.A.M.I. Star Award for Excellence in Cosmetic Medicine" },
      { title: "Lifetime Achievement Award — All Ireland Excellence Awards", place: "Belfast" },
      { title: "Most Trusted Aesthetic Clinics — Ireland", place: "BTL Ireland" },
      { title: "Most Trusted Aesthetic Clinics — Ireland", place: "GHP Magazine" },
    ]},
    { year: "2025", items: [
      { title: "Lifetime Achievement Award — IAPEM", place: "Italy" },
      { title: "IAPEM Award for Humanitarianism in Africa", place: "Milan, Italy" },
      { title: "World Regenerative Medicine Innovation Award", place: "Cambridge University, London" },
      { title: "Top Cosmetic Dermatology Clinic in Ireland", place: "Private Healthcare Awards" },
      { title: "Top Medical Aesthetic Clinic", place: "HiStyle Awards · Cork" },
      { title: "Lifetime Achievement Award for Advances in Aesthetic Medicine", place: "Milan, Italy" },
      { title: "IMCAS China Award for Dedication to Science, Medicine and Patients", place: "Shanghai" },
      { title: "Best Aesthetic Clinic in Ireland", place: "Private Healthcare Excellence · Belfast" },
    ]},
    { year: "2024", items: [
      { title: "'Man of the Year' (Ireland) for Humanitarianism in Africa", place: "Cork" },
      { title: "Recognition of Excellence and Outstanding Contribution to Medicine", place: "Dubai, UAE" },
      { title: "Lifetime Achievement Award for Advances in Aesthetic Medicine", place: "Shenzhen, China" },
      { title: "HiStyle Award — Top Aesthetic Clinic in Ireland", place: "Cork" },
      { title: "Top Global Pioneer in Aesthetic Medicine", place: "Beauty Hair Award · Dublin" },
      { title: "Top UK & Ireland Aesthetic Clinic", place: "Aesthetic Awards · London" },
      { title: "Top UK & Ireland Aesthetic Doctor", place: "Aesthetic Awards · London" },
      { title: "Top Aesthetic Doctor (UK & Ireland)" },
    ]},
    { year: "2023", items: [
      { title: "Top Aesthetic Clinic (Ireland)" },
      { title: "Top Aesthetic Doctor (Ireland)" },
      { title: "Top Master Trainer in Aesthetic Medicine", place: "Karachi" },
      { title: "PAADS Award — Outstanding Contributions to Aesthetic Medicine", place: "Karachi" },
      { title: "Irish Healthcare Centre Award — Best Aesthetic Clinic in Ireland", place: "Dublin" },
      { title: "GHP Global Excellence Award — Best Aesthetic Clinic in Ireland", place: "London" },
      { title: "Tia Maria Lifetime Achievement Award", place: "Cork" },
      { title: "Tia Maria — Top Aesthetic Doctor in Ireland", place: "Cork" },
    ]},
    { year: "2022", items: [
      { title: "AIDA Trophy — Outstanding Contributions to Aesthetic Medicine", place: "Abu Dhabi" },
    ]},
    { year: "2019", items: [
      { title: "MyFaceMyBody — Top Global Medical Practitioner", place: "Las Vegas" },
      { title: "MyFaceMyBody — Top UK & Ireland Medical Practitioner", place: "Las Vegas" },
      { title: "AMEC Anti-aging & Beauty Trophy — Best Global Clinical Case", place: "Monaco" },
      { title: "Irish Healthcare Award — Best Medical Aesthetic Clinic", place: "Dublin" },
    ]},
    { year: "2017 – 2018", items: [
      { title: "MyFaceMyBody Specialist — Scientific Contributions to the Aesthetic Industry", place: "London 2018" },
      { title: "Irish Healthcare Award — Best Medical Research Award", place: "Dublin 2017" },
      { title: "MyFaceMyBody — Ultimate 100 Global Aesthetic Leaders", place: "Los Angeles 2017" },
      { title: "British College of Aesthetic Medicine — Quality & Research Award", place: "London 2017" },
      { title: "AIDA Trophy — Best Clinical Case in Dermatology & Aesthetics", place: "Abu Dhabi 2017" },
      { title: "AAAMC Trophy — Contribution to Development of Aesthetic Medicine", place: "Baku 2017" },
      { title: "John Bannon Award — Best Clinic in Ireland", place: "London 2017" },
    ]},
    { year: "2016", items: [
      { title: "Irish Health & Beauty Award — Best Cosmetic Surgery Clinic in Ireland", place: "Dublin" },
      { title: "Safety in Beauty Award — Aesthetic Doctor of 2016 (Highly Commended)", place: "London" },
      { title: "AMEC Anti-aging & Beauty Trophy — Best Clinical Research Case", place: "Paris" },
      { title: "CCME Mexican Congress Medal — Excellence in Medical Aesthetics", place: "Mexico" },
      { title: "MyFaceMyBody Award — Best Medical Research for Wound Healing", place: "London" },
    ]},
  ] as AwardYear[],
};

/* --------------------------- Endorsements ------------------------------- */
export type Endorsement = { quote: string; name: string; award: string };
export const ENDORSEMENTS = {
  eyebrow: "In Recognition",
  title: "Peers, across five nations.",
  items: [
    { quote: "A defining voice in European aesthetic medicine — his contribution to patient safety and ethical practice has shaped a generation of clinicians.", name: "Prof. Aldo Bruno Giannì", award: "IAPEM Award, Milan 2025" },
    { quote: "Patrick has carried Ireland's name across the world with dignity. His humanitarian work and clinical leadership are a credit to our country.", name: "Mr. Michael Mulcahy", award: "Irish Lifetime Achievement Award" },
    { quote: "Professor Treacy's scientific rigour and respect for Asian aesthetic medicine have earned him a lasting place among our most honoured international colleagues.", name: "Prof. Yang RongYa", award: "Chinese Achievement Award, ZYLAN Congress" },
    { quote: "A lifetime devoted to teaching, safety and the dignity of the patient — Patrick has set the standard the rest of us aspire to.", name: "Pam Balintyne", award: "UK Lifetime Achievement Award" },
    { quote: "Professor Treacy's mentorship has transformed aesthetic and regenerative medicine across South Asia. A scholar, clinician and humanitarian of the highest order.", name: "Prof. Asher Mashhood", award: "Pakistan Achievement Award" },
  ] as Endorsement[],
};

/* --------------------------- Media & Social ----------------------------- */
export const MEDIA = {
  eyebrow: "Media & Commentary",
  title: "A public profile shaped by media, commentary and interviews.",
  featured: {
    label: "Featured Film",
    title: "Prof Patrick Treacy — Journey",
    tagline: "A legacy of innovation. A vision for the future.",
    video: "", // TODO: film link
  },
  outlets: [
    { name: "BBC", kind: "Broadcast · Feature", note: "Medical commentary and public discussion on aesthetic medicine", href: "" },
    { name: "The Sunday Times", kind: "Press · Feature", note: "Interviews and commentary on medicine, leadership and public life", href: "" },
    { name: "Conference Media", kind: "Interview", note: "Congress interviews on regenerative medicine and patient safety", href: "" },
    { name: "Documentary & Book Media", kind: "Editorial", note: "Book-related interviews, public commentary and professional features", href: "" },
  ],
};

export type SocialChannel = {
  platform: string;
  handle: string;
  href: string;
  note: string;
  stats?: string;
  placeholder?: boolean;
};
export const SOCIAL = {
  eyebrow: "Media & Social Presence",
  title: "Follow the journey.",
  lead:
    "An educational, documentary-style presence weaving together regenerative medicine, ageing biology, global medical missions and four decades of lived experience.",
  channels: [
    { platform: "YouTube", handle: "@PatrickTreacyAilesbury", href: "https://www.youtube.com/@PatrickTreacyAilesbury", note: "Medicine · Science · Travel · Humanitarianism", stats: "9K+ subscribers · 1,000+ videos" },
    { platform: "Instagram", handle: "@ptreacy", href: "https://www.instagram.com/ptreacy", note: "Medicine, aesthetics and life beyond the clinic" },
    { platform: "LinkedIn", handle: "Prof Patrick Treacy", href: "https://www.linkedin.com/in/drpatricktreacy", note: "Research, congresses and professional updates" },
    { platform: "Ailesbury Clinic", handle: "ailesburyclinic.ie", href: "https://www.ailesburyclinic.ie", note: "The practice — Dublin, Ireland" },
  ] as SocialChannel[],
};

/* --------------------------- Live Feeds -------------------------------- */
// Auto-updating social previews. YouTube works out of the box (the "uploads"
// playlist always shows his newest videos/shorts). Instagram has no free no-auth
// live feed — paste an embed URL from a feed widget (Behold / LightWidget /
// SnapWidget, connect @ptreacy once) into `embedSrc` and it goes live.
export const FEEDS = {
  eyebrow: "Fresh from YouTube",
  title: "His latest films, updating on their own.",
  youtube: {
    handle: "@PatrickTreacyAilesbury",
    stats: "9K+ subscribers · 1,000+ videos",
    channelUrl: "https://www.youtube.com/@PatrickTreacyAilesbury",
    uploadsPlaylist: "UUOjsvhFd0OMzwZU0g8fhl6g", // channel UC… → uploads UU…
  },
};

/* --------------------------- Speaker Media Kit -------------------------- */
export const SPEAKER_KIT = {
  eyebrow: "Speaker Profile & Media Kit",
  title: "A clear next step for conference organisers.",
  included: [
    "Biography & credentials",
    "Signature lecture topics",
    "Awards & distinctions",
    "Booking and contact details",
  ],
  download: "", // TODO: speaker profile PDF
};
