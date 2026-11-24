/**
 * Duraspin & Fake PIN Shield Auth Engine
 * Protects users under duress (e.g. stalker, abuser, or mugger forcing them to unlock their phone).
 * Entering Decoy PIN "1111" opens an innocuous dummy shell with fake family photos and harmless chats.
 * Entering Real PIN "9999" (or configured PIN) unlocks the real safety vault, private emergency numbers,
 * audio recordings, and offline mesh logs.
 */

export interface VaultState {
  isUnlocked: boolean;
  isDecoyMode: boolean;
  errorMessage?: string;
}

export const DEFAULT_MASTER_PIN = '9999';
export const DEFAULT_DECOY_PIN = '1111';

export function authenticatePin(enteredPin: string, masterPin = DEFAULT_MASTER_PIN, decoyPin = DEFAULT_DECOY_PIN): VaultState {
  const clean = enteredPin.trim();
  if (clean === masterPin) {
    return {
      isUnlocked: true,
      isDecoyMode: false,
    };
  }
  if (clean === decoyPin) {
    return {
      isUnlocked: true,
      isDecoyMode: true,
    };
  }
  return {
    isUnlocked: false,
    isDecoyMode: false,
    errorMessage: 'Invalid security PIN. Please enter your 4-digit code.',
  };
}

export interface DecoyChat {
  id: string;
  sender: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export const DUMMY_DECOY_CHATS: DecoyChat[] = [
  {
    id: 'c1',
    sender: 'Amma (Mother)',
    avatar: '👵',
    lastMessage: 'Did you have lunch? Send vegetables list for dinner.',
    time: '12:45 PM',
    unread: 0,
  },
  {
    id: 'c2',
    sender: 'Ramesh Grocery Store',
    avatar: '🛒',
    lastMessage: 'Aashirvaad Atta and Sona Masoori rice delivered.',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: 'c3',
    sender: 'College Friends Group',
    avatar: '🎓',
    lastMessage: 'Happy Deepavali memories video posted!',
    time: '2 days ago',
    unread: 0,
  },
  {
    id: 'c4',
    sender: 'Rajan Office Cab',
    avatar: '🚖',
    lastMessage: 'Reached pickup point near Main Signal.',
    time: 'Monday',
    unread: 0,
  },
];

export const DUMMY_DECOY_PHOTOS = [
  { id: 'p1', title: 'Home Garden Flowers', date: 'Yesterday', color: 'bg-emerald-600' },
  { id: 'p2', title: 'Festival Sweets Thali', date: 'Last Sunday', color: 'bg-amber-600' },
  { id: 'p3', title: 'Grandmother 75th Birthday', date: '2 weeks ago', color: 'bg-rose-600' },
  { id: 'p4', title: 'Rameshwaram Temple Gopuram', date: 'Last Month', color: 'bg-indigo-600' },
];
