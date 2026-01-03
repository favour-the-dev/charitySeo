export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  token: string | null;
  is_active: number;
  parent_id: number | null;
  admin_id: number;
  uuid: string | null;
  added_by: string;
  created_at: string;
  updated_at: string;
  edit_access: boolean;
  first_name: string;
  last_name: string;
  parsed_role: string;
  user_workspaces: number[];
  all_user_workspaces: {
    id: number;
    user_id: number;
    work_space_id: number;
    role: string;
    created_at: string;
    updated_at: string;
    user_role: string;
    user_count: number;
    workspace: {
      id: number;
      user_id: number;
      name: string;
      slug: string;
      is_default: boolean;
      logo: string | null;
      created_at: string;
      updated_at: string;
    };
  }[];
  active_workspace: {
    id: number;
    user_id: number;
    name: string;
    slug: string;
    is_default: boolean;
    logo: string | null;
    created_at: string;
    updated_at: string;
  };
  subscriptions: {
    front_end: {
      id: string;
      status: boolean;
      limit: number;
      start_date: string;
      end_date: string;
      type: string;
      name: string;
    };
    viralgenius_media_studio: {
      id: string;
      status: boolean;
      limit: number;
      start_date: string;
      end_date: string;
      type: string;
      name: string;
    };
    viralgenius_affiliate_offer: {
      id: string;
      status: boolean;
      limit: number;
      start_date: string;
      end_date: string;
      type: string;
      name: string;
    };
    viralgenius_sales_converter: {
      id: string;
      status: boolean;
      limit: number;
      start_date: string;
      end_date: string;
      type: string;
      name: string;
    };
    viralgenius_agency: {
      id: string;
      status: boolean;
      limit: number;
      start_date: string;
      end_date: string;
      type: string;
      name: string;
    };
    reseller: {
      id: string;
      status: boolean;
      limit: number;
      start_date: string;
      end_date: string;
      type: string;
      name: string;
    };
    viralgenius_unlimited: {
      id: string;
      status: boolean;
      limit: number;
      start_date: string;
      end_date: string;
      type: string;
      name: string;
    };
  };
  account_officer: string;
};

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// worspace
interface Workspace {
  created_at: string;
  id: number;
  is_default: boolean;
  logo: string | null;
  name: string;
  slug: string;
  updated_at: string;
  user_id: number;
}

export interface UserWorkspace {
  created_at: string;
  id: number;
  role: string;
  updated_at: string;
  user_count: number;
  user_id: number;
  user_role: string;
  work_space_id: number;
  workspace: Workspace;
}
