export type TeamType = 'CLUB' | 'TEAM_PROJECT' | 'PRIVATE_PROJECT' | 'ETC';
export type MemberRoleType = 'ADMINISTRATOR' | 'MEMBER';

export type TeamListType = {
  team_id: string;
  team_name_ko: string;
  team_name_en: string;
  administrator_name: string;
  team_type: TeamType;
  deploy_list: string[];
};

export type TeamCheckType = {
  data: TeamListType[];
};

export type TeamCreateType = {
  team_name_ko: string;
  team_name_en: string;
  team_type: TeamType | '';
  team_member_list: string[];
};

export type MemberType = {
  member_name: string;
  member_number: string;
  member_role: MemberRoleType;
  user_id: string;
};

export type TeamDetailType = {
  team_name_ko: string;
  team_name_en: string;
  member_count: number;
  admin_name: string;
  created_at: string;
  member_list: MemberType[];
  is_admin: boolean;
};
