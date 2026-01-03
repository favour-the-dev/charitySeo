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

interface ActiveWorkspace {
  id: number;
  user_id: number;
  name: string;
  slug: string;
  is_default: boolean;
  logo: string | null;
  created_at: string;
  updated_at: string;
}

interface SubscriptionDetails {
  end_date: string;
  id: string;
  limit: number;
  name: string;
  start_date: string;
  status: boolean;
  type: string;
}

interface Subscriptions {
  front_end: SubscriptionDetails;
  reseller: SubscriptionDetails;
  viralgenius_affiliate_offer: SubscriptionDetails;
  viralgenius_agency: SubscriptionDetails;
  viralgenius_media_studio: SubscriptionDetails;
  viralgenius_sales_converter: SubscriptionDetails;
  viralgenius_unlimited: SubscriptionDetails;
  [key: string]: SubscriptionDetails; // For any additional subscription types
}

export interface TeamMemberType {
  account_officer: string;
  active_workspace: ActiveWorkspace;
  added_by: string;
  admin_id: number;
  all_user_workspaces: UserWorkspace[];
  created_at: string;
  edit_access: boolean;
  email: string;
  email_verified_at: string | null;
  first_name: string;
  id: number;
  is_active: number; // or boolean if you want to normalize it
  last_name: string;
  name: string;
  parent_id: number;
  parsed_role: string;
  role: string;
  subscriptions: Subscriptions;
  token: string | null;
  updated_at: string;
  user_workspaces: number[];
  uuid: string | null;
}
