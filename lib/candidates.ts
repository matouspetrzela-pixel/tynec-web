export interface Candidate {
  id: number;
  /** URL slug — např. /kandidati/jan-novak */
  slug: string;
  name: string;
  /** Krátká srdcová priorita zobrazená na dlaždici */
  heartPriority: string;
  /** Pohlaví — pro správné skloňování nadpisu profilu */
  gender: 'male' | 'female';
  /** Volitelná cesta k fotce v /public/images/kandidati/ */
  photo?: string;
  /* ── Pole pro budoucí doplnění ─────────────────────── */
  /** Pracovní pozice / profese */
  position?: string;
  /** Delší bio text */
  bio?: string;
  /** Seznam osobních priorit */
  priorities?: string[];
}

export const CANDIDATES: Candidate[] = [
  {
    id: 1,
    slug: 'michal-andrysek',
    name: 'Mgr. Michal Andrýsek',
    heartPriority: 'Transparentní hospodaření a otevřená radnice',
    gender: 'male',
  },
  {
    id: 2,
    slug: 'petra-andryskova',
    name: 'Ing. Petra Andrýsková',
    heartPriority: 'Bezpečné chodníky a opravené komunikace',
    gender: 'female',
  },
  {
    id: 3,
    slug: 'jiri-dvorak',
    name: 'Ing. Jiří Dvořák',
    heartPriority: 'Podpora škol, školek a volnočasových aktivit',
    gender: 'male',
  },
  {
    id: 4,
    slug: 'michaela-dvorakova',
    name: 'Michaela Dvořáková',
    heartPriority: 'Kultura, tradice a spolkový život',
    gender: 'female',
  },
  {
    id: 5,
    slug: 'drahomira-obsnajdrova',
    name: 'Drahomíra Obšnajdrová',
    heartPriority: 'Zeleň, veřejná prostranství a estetika obce',
    gender: 'female',
  },
  {
    id: 6,
    slug: 'katerina-parcova',
    name: 'Mgr. Bc. Kateřina Parčová',
    heartPriority: 'Digitální služby a srozumitelná komunikace',
    gender: 'female',
  },
  {
    id: 7,
    slug: 'filip-sklenar',
    name: 'Filip Sklenář',
    heartPriority: 'Senioři, dostupnost péče a komunitní projekty',
    gender: 'male',
  },
  {
    id: 8,
    slug: 'vaclav-sklenar',
    name: 'Ing. Václav Sklenář',
    heartPriority: 'Sportoviště a zdravý životní styl',
    gender: 'male',
  },
  {
    id: 9,
    slug: 'alena-sojakova',
    name: 'Alena Sojáková',
    heartPriority: 'Podpora podnikání a lokální ekonomiky',
    gender: 'female',
  },
  {
    id: 10,
    slug: 'michal-svitak',
    name: 'Michal Sviták',
    heartPriority: 'Udržitelná energetika a úspory obce',
    gender: 'male',
  },
  {
    id: 11,
    slug: 'pavlina-zlamalova',
    name: 'Mgr. Pavlína Zlámalová',
    heartPriority: 'Sousedská soudržnost a participace občanů',
    gender: 'female',
  },
  {
    id: 12,
    slug: 'jakub-zadnik',
    name: 'Jakub Žádník',
    heartPriority: 'Dlouhodobá vize rozvoje do roku 2030',
    gender: 'male',
  },
];

/** Pomocník: najde kandidáta podle slugu. */
export function getCandidateBySlug(slug: string): Candidate | undefined {
  return CANDIDATES.find((c) => c.slug === slug);
}
