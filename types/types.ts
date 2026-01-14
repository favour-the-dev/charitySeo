export interface ConnectedAccount {
  id: string;
  name: string;
  email?: string;
  active: boolean;
  dateConnected: string;
  platformId: string;
}

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

// integrations types
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

export interface saveFacebookPagesResponse {
  status: string;
  message: string;
}

export interface facebookDataType {
  id: number;
  user_id: number;
  workspace_id: number;
  platform_id: string;
  token_type: string;
  expires_at: string | null;
  scopes: string[];
  metadata: {
    name: string;
    page_id: string;
    picture: string;
    fan_count: number;
    rating_count: number;
    followers_count: number;
    page_access_token: string;
    overall_star_rating: number;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface getUserIntegrationsResponse {
  facebook_data?: facebookDataType[];
  errors?: {
    [key: string]: string[];
  };
}

export interface integrationStatusChangePayload {
  integration_id: number;
}

export interface integrationStatusChangeResponse {
  message: string;
  is_active: boolean;
}

// user location types
export interface locationDataType {
  name: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  primary_category?: string;
  categories?: string[];
  business_hours?: {
    [key: string]: string[]; // exapmle "mon": ["09:00-17:00"]
  } | null;
}

export interface locationDataDetailsType extends locationDataType {
  status: string;
  created_at: string;
  updated_at: string;
  id: number;
}
export interface createLocationResponse {
  status?: string;
  message: string;
  location?: locationDataType;
  errors?: {
    [key: string]: string[];
  };
}

export interface getLocationsResponse {
  message?: string;
  data?: locationDataDetailsType[];
}

export interface getSingleLocationResponse {
  message?: string;
  data?: locationDataDetailsType;
  errors?: {
    [key: string]: string[];
  };
}

export interface updateLocationResponse {
  message?: string;
  data?: locationDataDetailsType;
  errors?: {
    [key: string]: string[];
  };
}

export interface bulkCreateLocationPayload {
  locations: locationDataType[];
}

export interface bulkCreateLocationResponse {
  status?: string;
  message: string;
  data?: {
    imported: number;
  };
  errors?: {
    [key: string]: string[];
  };
}

export interface deleteBulkLocationsPayload {
  ids: number[];
}

export interface deleteBulkLocationsResponse {
  status?: string;
  message?: string;
  data?: {
    deleted: number;
  };
  errors?: {
    [key: string]: string[];
  };
}

// listings types
export interface listingDataType {
  id: number;
  location_id: number;
  platform: string;
  externalId: string;
  status: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  position: string | null;
  postal_code: string | null;
  country: string | null;
  phone: string | null;
  website: string;
  categories: { id: string; name: string }[];
  business_hours: string[] | null;
  description: string;
  latitude: number | null;
  longitude: number | null;
  attributes: {
    fan_count: number;
    rating_count: number;
    followers_count: number;
    overall_star_rating: number;
    verification_status: string;
  };
  discrepancies: { [key: string]: { local: string; platform: string } }[];
  has_discrepancies: boolean;
  last_synced_at: string | null;
  last_published_at: string | null;
  error_message: string | null;
  location: locationDataDetailsType;
  created_at: string;
  updated_at: string;
}

export interface getAllListingsResponse {
  message?: string;
  data?: listingDataType[];
}

export interface getListingsStatsResponse {
  data?: {
    total_listings: number;
    by_platform: {
      facebook: number;
      google: number;
      bing: number;
    };
    by_status: {
      pending: number;
      active: number;
      synced: number;
      error: number;
    };
    with_discrepancies: number;
    recentyly_synced: number;
  };
}

export interface getSingleListingResponse {
  message: string;
  data?: listingDataType;
}

export interface syncListByLocationPayload {
  location_id: number; // id of an activated integration of that platfrom e.g facebook
  platforms: string;
}

export interface syncListByLocationResponse {
  message?: string;
  data?: listingDataType;
  errors?: {
    [key: string]: string[];
  };
}

export interface syncFacebookListingsPayload {
  location_id: number; // location Id
  credential_id: number; // id of svaed facebook page
}

export interface syncFacebookListingsResponse {
  message?: string;
  listing?: listingDataType;
  errors?: {
    [key: string]: string[];
  };
}

export interface syncAllInWorkspacePayload {
  location_id: number;
}
export interface syncAllInWorkspaceResponse {
  message?: string;
  data?: {
    synced_count: number;
    platforms: string[]; // e.g facebook
  };
  errors?: {
    [key: string]: string[];
  };
}

// export interface syncAllIntegrationsPayload {
//   location_id: number;
// }

// export interface syncAllIntegrationsResponse {
//   message?: string;
//   data?: {
//     synced_count: number;
//     platforms: string[]; // e.g facebook
//   };
//   errors?: {
//     [key: string]: string[];
//   };
// }
