export type TeamType = 'CLUB' | 'TEAM_PROJECT' | 'PRIVATE_PROJECT' | 'ETC' | string;

export type TeamCreateType = {
  team_name_ko: string;
  team_name_en: string;
  team_type: TeamType;
  team_member_list: string[];
};
