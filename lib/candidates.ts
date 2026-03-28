export interface Candidate {
  id: number;
  /** URL slug — např. /kandidati/jan-novak */
  slug: string;
  name: string;
  /** Krátká srdcová priorita zobrazená na dlaždici */
  heartPriority: string;
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
    slug: 'kandidat-1',
    name: 'Kandidát 1',
    heartPriority: 'Transparentní hospodaření a otevřená radnice',
  },
  {
    id: 2,
    slug: 'kandidat-2',
    name: 'Kandidát 2',
    heartPriority: 'Bezpečné chodníky a opravené komunikace',
  },
  {
    id: 3,
    slug: 'kandidat-3',
    name: 'Kandidát 3',
    heartPriority: 'Podpora škol, školek a volnočasových aktivit',
  },
  {
    id: 4,
    slug: 'kandidat-4',
    name: 'Kandidát 4',
    heartPriority: 'Kultura, tradice a spolkový život',
  },
  {
    id: 5,
    slug: 'kandidat-5',
    name: 'Kandidát 5',
    heartPriority: 'Zeleň, veřejná prostranství a estetika obce',
  },
  {
    id: 6,
    slug: 'kandidat-6',
    name: 'Kandidát 6',
    heartPriority: 'Digitální služby a srozumitelná komunikace',
  },
  {
    id: 7,
    slug: 'kandidat-7',
    name: 'Kandidát 7',
    heartPriority: 'Senioři, dostupnost péče a komunitní projekty',
  },
  {
    id: 8,
    slug: 'kandidat-8',
    name: 'Kandidát 8',
    heartPriority: 'Sportoviště a zdravý životní styl',
  },
  {
    id: 9,
    slug: 'kandidat-9',
    name: 'Kandidát 9',
    heartPriority: 'Podpora podnikání a lokální ekonomiky',
  },
  {
    id: 10,
    slug: 'kandidat-10',
    name: 'Kandidát 10',
    heartPriority: 'Udržitelná energetika a úspory obce',
  },
  {
    id: 11,
    slug: 'kandidat-11',
    name: 'Kandidát 11',
    heartPriority: 'Sousedská soudržnost a participace občanů',
  },
  {
    id: 12,
    slug: 'kandidat-12',
    name: 'Kandidát 12',
    heartPriority: 'Dlouhodobá vize rozvoje do roku 2030',
  },
];

/** Pomocník: najde kandidáta podle slugu. */
export function getCandidateBySlug(slug: string): Candidate | undefined {
  return CANDIDATES.find((c) => c.slug === slug);
}
