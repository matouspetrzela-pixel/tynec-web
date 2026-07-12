import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  CalendarDays,
  Ear,
  Handshake,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Trees,
  Users,
  Wallet,
} from 'lucide-react';

export type ProgramPriority = {
  title: string;
  intro: string;
  Icon: LucideIcon;
};

export type ProgramClosingBlock = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

export const PROGRAM_PAGE_HEADING = 'Naše priority pro Velký Týnec, Vsisko a Čechovice';

export const PROGRAM_CLOSING_BLOCKS: ProgramClosingBlock[] = [
  {
    title: 'Veřejné setkání s občany',
    text: 'Máme jasnou představu o tom, kam by se měl Velký Týnec v příštích letech posunout. Konkrétní opatření a priority našeho volebního programu vám rádi představíme osobně na veřejném setkání s občany, které proběhne na přelomu srpna a září (o přesném termínu a místu konání budete včas informováni).',
    Icon: CalendarDays,
  },
  {
    title: 'Otevřená debata o budoucnosti',
    text: 'Zveme vás tímto k otevřené debatě o budoucnosti naší obce. Přijďte se seznámit s našimi plány, položit otázky a říct nám svůj názor. Protože budoucnost Velkého Týnce vzniká společně a my budeme rádi, když u toho budete s námi.',
    Icon: MessageCircle,
  },
];

export const PROGRAM_PRIORITIES: ProgramPriority[] = [
  {
    title: 'PRO obec, která naslouchá',
    intro:
      'Chceme obec, která bude občanům naslouchat, otevřeně komunikovat a využívat moderní technologie pro jednodušší a dostupnější služby.',
    Icon: Ear,
  },
  {
    title: 'PRO odpovědné hospodaření',
    intro:
      'Prosazujeme odpovědné hospodaření s obecními financemi, dlouhodobé plánování investic a rozhodování, které bude promyšlené a transparentní.',
    Icon: Wallet,
  },
  {
    title: 'PRO děti, rodiny i seniory',
    intro:
      'Chceme vytvářet obec, ve které se bude dobře žít dětem, mladým lidem, rodinám i seniorům a kde nikdo nezůstane stranou.',
    Icon: Users,
  },
  {
    title: 'PRO živou obec',
    intro:
      'Budeme podporovat spolkový život, sport, kulturu i dobrovolnictví a vytvářet podmínky pro aktivní komunitu, která spojuje lidi.',
    Icon: HeartHandshake,
  },
  {
    title: 'PRO kvalitní služby',
    intro:
      'Naším cílem je rozvíjet kvalitní veřejný prostor a služby, které lidem usnadní každodenní život a zvýší komfort bydlení v obci.',
    Icon: Building2,
  },
  {
    title: 'PRO bezpečný Týnec',
    intro:
      'Chceme obec, která bude bezpečná, upravená a připravená řešit současné i budoucí výzvy s důrazem na prevenci.',
    Icon: ShieldCheck,
  },
  {
    title: 'PRO zelenou obec',
    intro:
      'Budeme podporovat rozvoj obce s respektem k přírodě, s důrazem na udržitelnost a odpovědnost vůči budoucím generacím.',
    Icon: Trees,
  },
  {
    title: 'PRO silnější budoucnost',
    intro:
      'Věříme, že spolupráce s občany, spolky, okolními obcemi i dalšími partnery přinese Velkému Týnci více příležitostí pro další rozvoj.',
    Icon: Handshake,
  },
];
