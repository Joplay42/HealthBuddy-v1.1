import {
  DeltaDirection,
  GoalDirection,
  OnTrackStatus,
  userWeightProps,
  WeightDeltaResult,
  WeightProjectionResult,
  WeightStreakResult,
} from "@/types";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const dayKey = (date: Date): number => startOfDay(date).getTime();

const daysBetween = (a: Date, b: Date): number =>
  Math.round((dayKey(a) - dayKey(b)) / MS_PER_DAY);

export const goalDirection = (
  startWeight: number,
  objectiveWeight: number
): GoalDirection => {
  const diff = objectiveWeight - startWeight;
  if (Math.abs(diff) < 0.5) return "maintain";
  return diff > 0 ? "gain" : "lose";
};

export const isAlignedWithGoal = (
  delta: number,
  direction: GoalDirection
): boolean => {
  if (direction === "maintain") return Math.abs(delta) < 1;
  if (direction === "gain") return delta > 0;
  return delta < 0;
};

export const computeStreak = (
  weights: userWeightProps[],
  today: Date = new Date(),
  graceDays: number = 1
): WeightStreakResult => {
  if (!weights.length) {
    return { current: 0, longest: 0, lastLogDate: null };
  }

  // Unique calendar days, sorted ascending.
  const uniqueDays = Array.from(
    new Set(
      weights
        .filter((w) => w.date instanceof Date && !isNaN(w.date.getTime()))
        .map((w) => dayKey(w.date))
    )
  ).sort((a, b) => a - b);

  if (!uniqueDays.length) {
    return { current: 0, longest: 0, lastLogDate: null };
  }

  // Longest streak: walk forward, allowing gap of up to graceDays.
  let longest = 1;
  let run = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const gap = (uniqueDays[i] - uniqueDays[i - 1]) / MS_PER_DAY;
    if (gap <= graceDays + 1) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  // Current streak: walk backwards from most recent day.
  const lastDayKey = uniqueDays[uniqueDays.length - 1];
  const todayKey = dayKey(today);
  const sinceLast = (todayKey - lastDayKey) / MS_PER_DAY;

  let current = 0;
  if (sinceLast <= graceDays + 1) {
    current = 1;
    for (let i = uniqueDays.length - 2; i >= 0; i--) {
      const gap = (uniqueDays[i + 1] - uniqueDays[i]) / MS_PER_DAY;
      if (gap <= graceDays + 1) {
        current += 1;
      } else {
        break;
      }
    }
  }

  return {
    current,
    longest,
    lastLogDate: new Date(lastDayKey),
  };
};

export const computeDelta = (
  filteredWeights: userWeightProps[]
): WeightDeltaResult => {
  if (filteredWeights.length < 2) {
    return { delta: 0, percent: 0, direction: "flat" };
  }

  const sorted = [...filteredWeights].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  const first = sorted[0].number;
  const last = sorted[sorted.length - 1].number;
  const delta = last - first;
  const percent = first !== 0 ? (delta / first) * 100 : 0;

  let direction: DeltaDirection = "flat";
  if (Math.abs(delta) >= 0.2) direction = delta > 0 ? "up" : "down";

  return { delta, percent, direction };
};

export type ProjectionInput = {
  weights: userWeightProps[];
  startDate: Date | null | undefined;
  startWeight: number | null | undefined;
  objectiveWeight: number;
  months: number;
  today?: Date;
};

const ON_TRACK_THRESHOLD = 1.5;
const BEHIND_THRESHOLD = 3;
const ACHIEVED_TOLERANCE = 0.5;

export const computeProjection = ({
  weights,
  startDate,
  startWeight,
  objectiveWeight,
  months,
  today = new Date(),
}: ProjectionInput): WeightProjectionResult => {
  const sorted = [...weights]
    .filter((w) => w.date instanceof Date && !isNaN(w.date.getTime()))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const earliest = sorted[0];
  const latest = sorted[sorted.length - 1];

  const baselineDate = startDate ?? earliest?.date ?? null;
  const baselineWeight =
    startWeight !== null && startWeight !== undefined && startWeight > 0
      ? startWeight
      : earliest?.number ?? null;

  const totalDays = Math.max(1, Math.round(months * 30.44));
  const plannedEnd = baselineDate
    ? new Date(baselineDate.getTime() + totalDays * MS_PER_DAY)
    : null;
  const daysRemainingPlanned = plannedEnd
    ? Math.max(0, daysBetween(plannedEnd, today))
    : totalDays;

  if (!latest || baselineWeight === null || !baselineDate) {
    return {
      etaDate: null,
      daysRemainingPlanned,
      daysRemainingProjected: null,
      onTrack: "on_track",
      expectedNow: null,
      deviation: null,
    };
  }

  const direction = goalDirection(baselineWeight, objectiveWeight);
  const currentWeight = latest.number;

  // Achieved? — within tolerance OR crossed past the objective in the goal direction.
  const reached =
    Math.abs(currentWeight - objectiveWeight) <= ACHIEVED_TOLERANCE ||
    (direction === "lose" && currentWeight <= objectiveWeight) ||
    (direction === "gain" && currentWeight >= objectiveWeight);

  const daysElapsed = Math.max(0, daysBetween(today, baselineDate));
  const elapsedFraction = Math.min(1, daysElapsed / totalDays);
  const expectedNow =
    baselineWeight + (objectiveWeight - baselineWeight) * elapsedFraction;
  const rawDeviation = currentWeight - expectedNow;

  // Signed deviation against goal direction:
  // positive => ahead of plan, negative => behind plan.
  let signedDeviation = 0;
  if (direction === "lose") signedDeviation = -rawDeviation;
  else if (direction === "gain") signedDeviation = rawDeviation;
  else signedDeviation = -Math.abs(rawDeviation);

  let onTrack: OnTrackStatus;
  if (reached) onTrack = "achieved";
  else if (Math.abs(signedDeviation) <= ON_TRACK_THRESHOLD) onTrack = "on_track";
  else if (signedDeviation > ON_TRACK_THRESHOLD) onTrack = "ahead";
  else if (signedDeviation < -BEHIND_THRESHOLD) onTrack = "wrong_direction";
  else onTrack = "behind";

  // ETA via current rate (lb/day).
  let etaDate: Date | null = null;
  let daysRemainingProjected: number | null = null;
  if (!reached && daysElapsed > 0) {
    const rate = (currentWeight - baselineWeight) / daysElapsed;
    const remaining = objectiveWeight - currentWeight;
    if (rate !== 0 && Math.sign(rate) === Math.sign(remaining)) {
      const days = Math.ceil(remaining / rate);
      if (days > 0 && days < 365 * 5) {
        daysRemainingProjected = days;
        etaDate = new Date(today.getTime() + days * MS_PER_DAY);
      }
    }
  } else if (reached) {
    daysRemainingProjected = 0;
    etaDate = today;
  }

  return {
    etaDate,
    daysRemainingPlanned,
    daysRemainingProjected,
    onTrack,
    expectedNow,
    deviation: signedDeviation,
  };
};
