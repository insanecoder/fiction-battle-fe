import { callAPI } from "../../common/utils/CommonUtils";

export type AnalyticsSummary = {
  battleStatus: {
    leadingUniverse: "HP" | "GOT";
    label: string;
    weeklyEngagementPct: number;
    comparedTo: "HP" | "GOT";
  };
  metrics: {
    postsToday: number;
    totalLikes: number;
    totalComments: number;
    topTag: string;
  };
  topCharacters: { name: string; posts: number; universe: "HP" | "GOT" }[];
  universeShare: { name: "HP" | "GOT"; value: number }[];
  engagement: { universe: "HP" | "GOT"; likes: number; comments: number }[];
  weeklyMomentum: { day: string; hp: number; got: number }[];
  liveActivity: {
    id: string;
    type: "POST" | "LIKE" | "COMMENT" | "TAG";
    text: string;
    universe?: "HP" | "GOT";
    time: string;
  }[];
};

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  return callAPI<AnalyticsSummary>("v1/analytics/summary");
}
