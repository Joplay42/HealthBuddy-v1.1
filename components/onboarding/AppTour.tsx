"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  EVENTS,
  Joyride,
  STATUS,
  type EventData,
  type Step,
} from "react-joyride";
import { useUserProfileContext } from "@/context/UserProfileContext";
import { useUserInformationContext } from "@/context/UserInformationContext";
import { useTheme } from "@/context/ThemeContext";
import { tourKey } from "@/types";
import {
  calorieFallbackSteps,
  calorieSteps,
  homeFallbackSteps,
  workoutFallbackSteps,
  workoutFullSteps,
} from "./tourSteps";

type ActiveTour = { key: tourKey; steps: Step[] } | null;

const AppTour = () => {
  const pathname = usePathname();
  const { profile, loading, completeTour } = useUserProfileContext();
  const {
    userGoal,
    userWorkoutObjectiveInfo,
    loading: infoLoading,
  } = useUserInformationContext();
  const { theme } = useTheme();

  const [activeTour, setActiveTour] = useState<ActiveTour>(null);
  const [ready, setReady] = useState(false);
  // Tours we've already auto-fired this mount, so we don't loop a finished tour.
  const firedRef = useRef<Set<tourKey>>(new Set());

  // TEMP DEBUG — remove once the tour is verified working
  console.log("[AppTour] render", {
    pathname,
    profileLoading: loading,
    profile,
    infoLoading,
    activeTour: activeTour?.key,
    ready,
  });

  // Decide which tour (if any) should run on this route.
  // We require both profile and info to be loaded so target elements exist.
  const nextTour: ActiveTour = useMemo(() => {
    if (!profile || loading || infoLoading) return null;

    const isCalorieEmpty = !userGoal || userGoal.calorie === 0;
    const hasPlan =
      !!userWorkoutObjectiveInfo &&
      userWorkoutObjectiveInfo.workoutPlan?.days?.length > 0;

    if (pathname === "/dashboard") {
      if (!profile.hasCompletedHomeFallbackTour && isCalorieEmpty) {
        return { key: "HomeFallback", steps: homeFallbackSteps };
      }
    }

    if (pathname === "/dashboard/calorie-tracking") {
      if (!profile.hasCompletedCalorieFallbackTour && isCalorieEmpty) {
        return { key: "CalorieFallback", steps: calorieFallbackSteps };
      }
      if (!profile.hasCompletedCalorieTour && !isCalorieEmpty) {
        return { key: "Calorie", steps: calorieSteps };
      }
    }

    if (pathname === "/dashboard/workout") {
      if (!profile.hasCompletedWorkoutFallbackTour && !hasPlan) {
        return { key: "WorkoutFallback", steps: workoutFallbackSteps };
      }
      if (!profile.hasCompletedWorkoutTour && hasPlan) {
        return { key: "Workout", steps: workoutFullSteps };
      }
    }

    return null;
  }, [
    pathname,
    profile,
    loading,
    infoLoading,
    userGoal,
    userWorkoutObjectiveInfo,
  ]);

  // Promote the eligible tour to active. The 350ms delay lets fade-in
  // animations settle so spotlight positions are accurate.
  // IMPORTANT: depend on the tour *key* only — Firestore snapshots make
  // `profile` (and therefore `nextTour`) a new object reference on every
  // fire, which would otherwise re-run the cleanup and cancel the timeout.
  const nextTourKey = nextTour?.key ?? null;
  useEffect(() => {
    if (!nextTourKey) {
      setActiveTour(null);
      setReady(false);
      return;
    }
    if (firedRef.current.has(nextTourKey)) return;

    setActiveTour(nextTour);
    setReady(false);
    const t = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextTourKey]);

  const handleEvent = (data: EventData) => {
    const { status, type } = data;

    if (
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      type === EVENTS.TARGET_NOT_FOUND
    ) {
      if (activeTour) {
        firedRef.current.add(activeTour.key);
        completeTour(activeTour.key);
      }
      setActiveTour(null);
      setReady(false);
    }
  };

  // Only mount Joyride when we have a tour and target DOM is ready.
  // Mounting fresh with run={true} avoids the run-toggle race in v3.
  if (!activeTour || !ready) return null;

  const isDark = theme === "dark";

  // Tag fixed-positioned targets so Joyride uses fixed positioning math.
  const stepsWithFixed: Step[] = activeTour.steps.map((step) => {
    const target = typeof step.target === "string" ? step.target : "";
    if (target === '[data-tour="sidebar"]') {
      return { ...step, isFixed: true };
    }
    return step;
  });

  return (
    <Joyride
      key={activeTour.key}
      steps={stepsWithFixed}
      run
      continuous
      scrollToFirstStep
      onEvent={handleEvent}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip tour",
      }}
      options={{
        primaryColor: "#AFF921",
        textColor: isDark ? "#F4F4F0" : "#2B2B2B",
        backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
        arrowColor: isDark ? "#1f1f1f" : "#ffffff",
        overlayColor: isDark ? "rgba(0, 0, 0, 0.55)" : "rgba(43, 43, 43, 0.45)",
        zIndex: 10000,
        showProgress: true,
        buttons: ["back", "skip", "primary"],
        overlayClickAction: false,
        skipBeacon: true,
        spotlightRadius: 12,
        spotlightPadding: 8,
        targetWaitTimeout: 4000,
      }}
      styles={{
        tooltip: {
          borderRadius: 16,
          padding: 16,
          maxWidth: "90vw",
        },
        tooltipTitle: {
          fontSize: 16,
          fontWeight: 700,
          margin: 0,
          marginBottom: 6,
        },
        tooltipContent: {
          fontSize: 14,
          padding: 6,
        },
        buttonPrimary: {
          backgroundColor: "#AFF921",
          color: "#2B2B2B",
          borderRadius: 12,
          padding: "8px 16px",
          fontWeight: 600,
        },
        buttonBack: {
          color: isDark ? "#F4F4F0" : "#2B2B2B",
          marginRight: 8,
        },
        buttonSkip: {
          color: isDark ? "rgba(255,255,255,0.55)" : "#797979",
        },
      }}
    />
  );
};

export default AppTour;
