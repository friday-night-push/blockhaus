export type TLeaderboard = {
  cursor: number;
  limit: number;
  ratingFieldName: string;
};

export type TAddLeaderboard = {
  data: unknown;
  ratingFieldName: string;
  teamName: string;
};
