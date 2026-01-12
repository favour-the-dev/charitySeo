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
export interface Workspace {
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
  is_active: number;
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

export interface CreateWorkspacePayload {
  name: string;
  slug: string;
  is_default: number;
  logo?: File | string;
}

export interface createWorkspaceResponse {
  status: string;
  message: string;
  workspace?: Workspace;
  errors?: {
    [key: string]: string[];
  };
}
export interface UpdateWorkspacePayload {
  id: number;
  name: string;
  slug: string;
  is_default: number;
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

export interface AddTeamMemberResponse {
  status: string;
  message: string;
  user?: TeamMemberType;
  errors?: {
    [key: string]: string[];
  };
}

// update user name
export interface UpdateUserNameResponse {
  status: string;
  message: string;
  user: User;
}

export interface UpdateUserPasswordResponse {
  status: string;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

// resellers
export interface getAllResellersResponse {
  status: string;
  page: string;
  workspace: Workspace;
  users: User[];
  sumOfUsers: number;
  sumOfUsersToday: number;
  sumOfUsersThisWeek: number;
}

export interface ResellerResponse {
  status: string;
  message: string;
  user: User;
}

// admin user types
export interface getAdminDashboardResponse {
  status: string;
  stats: {
    total_users: number;
    users_today: number;
    users_this_week: number;
  };
  users: {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

interface SubscriptionUserDetails {
  status: boolean;
  limit: number;
  start_date: string;
  end_date: string;
  type: string;
}

interface SubscriptionsNew {
  front_end: SubscriptionUserDetails;
  viralgenius_unlimited: SubscriptionUserDetails;
  viralgenius_affiliate_offer: SubscriptionUserDetails;
  viralgenius_sales_converter: SubscriptionUserDetails;
  viralgenius_media_studio: SubscriptionUserDetails;
  reseller: SubscriptionUserDetails;
  viralgenius_agency: SubscriptionUserDetails;
}

export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  is_active: boolean;
  subscriptions: SubscriptionsNew;
}

export interface CreateUserResponse {
  status: string;
  message: string;
  user?: User;
  errors?: {
    [key: string]: string[];
  };
}

export interface udpateUserPayload {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  role: string;
  is_active: boolean;
}

export interface UpdateUserResponse {
  status: string;
  message: string;
  user?: User;
  errors?: {
    [key: string]: string[];
  };
}

export interface UpdateUserSubscriptionsPayload {
  user_id: number;
  subscriptions: {
    front_end: {
      id: number;
      status: boolean;
      limit?: number;
    };
    viralgenius_unlimited: {
      id: number;
      status: boolean;
      limit?: number;
    };
    viralgenius_affiliate_offer?: {
      id: number;
      status: boolean;
      limit?: number;
    };
    viralgenius_sales_converter?: {
      id: number;
      status: boolean;
      limit?: number;
    };
    viralgenius_media_studio: {
      id: number;
      status: boolean;
      limit?: number;
    };
    reseller: {
      id: number;
      status: boolean;
      limit?: number;
    };
    viralgenius_agency: {
      id: number;
      status: boolean;
      limit?: number;
    };
  };
}

export interface updateUserPasswordPayload {
  user_id: number;
  password: string;
  password_confirmation: string;
}

export interface facebookPage {
  id: string;
  name: string;
  about: string;
  description: string;
  category: string;
  categrory_list: { id: string; name: string }[];
  phone: string;
  website: string;
  is_permanently_closed: boolean;
  verification_status: string;
  fan_count: number;
  followers_count: number;
  overall_star_rating: number;
  cover: {
    cover_id: string;
    offset_x: string;
    offset_y: string;
    source: string;
    id: string;
  };
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  access_token: string;
  user_token: string;
}
export interface getConnectedFacebookPagesResponse {
  message?: string;
  pages?: facebookPage[];
}

export interface saveFacbookCredentialsPayload {
  pages: facebookPage[];
}
