export type ID = string;

export interface User {
  _id: ID;
  name: string;
  email: string;
  phone?: string;
  role: "ORG_ADMIN" | "STAFF" | "SUPER_ADMIN";
  photoUrl?: string;
  organizationId?: ID;
  createdAt?: string;
}

export interface Organization {
  _id: ID;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  currency?: string;
  logoUrl?: string;
  subscriptionPlan?: string;
  subscriptionStatus?: "active" | "inactive" | "trial";
  subscriptionEndsAt?: string;
  isPremium?: boolean;
  portfolioUrls?: string[];
  paymentInstructions?: {
    momo?: { network: string; number: string; name: string }[];
    bank?: { bankName: string; accountNumber: string; accountName: string; branch?: string }[];
  };
  createdAt?: string;
}

export interface Client {
  _id: ID;
  name: string;
  phone: string;
  email?: string;
  photoUrl?: string;
  address?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateClientRequest = Omit<Client, "_id" | "createdAt" | "updatedAt">;
export type UpdateClientRequest = Partial<CreateClientRequest>;

export type OrderStatus = "pending" | "in-progress" | "fitting" | "completed" | "delivered" | "cancelled";
export type OrderPriority = "low" | "medium" | "high" | "urgent";
export type PaymentStatus = "unpaid" | "partial" | "paid";

export interface OrderItem {
  _id?: ID;
  name: string;
  clientId?: ID;
  client?: Client;
  measurementsId?: ID;
  notes?: string;
  status?: OrderStatus;
  amount?: number;
}

export interface Order {
  _id: ID;
  orderNumber: string;
  client: Client;
  measurementsId?: ID;
  amount: number;
  amountPaid: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  priority?: OrderPriority;
  orderType?: "single" | "bulk";
  dueDate: string;
  notes?: string;
  clothImageUrl?: string;
  clothSize?: string;
  assignedToId?: ID;
  assignedTo?: User;
  groupId?: ID;
  items?: OrderItem[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateOrderRequest {
  clientId: ID;
  measurementsId?: ID;
  amount: number;
  amountPaid: number;
  status?: OrderStatus;
  priority?: OrderPriority;
  orderType?: "single" | "bulk";
  dueDate: string;
  notes?: string;
  clothImageUrl?: string;
  clothSize?: string;
  assignedToId?: ID;
  groupId?: ID;
  items?: Omit<OrderItem, "_id">[];
}

export type UpdateOrderRequest = Partial<CreateOrderRequest>;

export interface MeasurementField {
  name: string;
  unit: string;
  description?: string;
}

export interface MeasurementTemplate {
  _id: ID;
  name: string;
  description?: string;
  iconUrl?: string;
  organizationId?: string;
  fields: MeasurementField[];
}

export interface Measurement {
  _id: ID;
  clientId: ID;
  templateId?: ID;
  template?: MeasurementTemplate;
  values: Record<string, string>;
  notes?: string;
  createdAt?: string;
}

export interface CreateMeasurementRequest {
  clientId: ID;
  templateId?: ID;
  values: Record<string, string>;
  notes?: string;
}

export interface Group {
  _id: ID;
  name: string;
  description?: string;
  organizationId?: ID;
  memberCount?: number;
  createdAt?: string;
}

export interface GroupMember {
  _id: ID;
  groupId: ID;
  clientId: ID;
  client?: Client;
  joinedAt?: string;
}

export interface Invoice {
  _id: ID;
  invoiceNumber: string;
  orderId: ID;
  order?: Order;
  client: Client;
  amount: number;
  amountPaid: number;
  balanceDue: number;
  status: "unpaid" | "partial" | "paid" | "overdue";
  dueDate: string;
  issueDate: string;
  notes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  message?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Notification types (matching mobile notification.service.ts)
export interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  data?: Record<string, any>;
  createdAt: string;
}

export interface NotificationHistoryResponse {
  notifications: NotificationItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Style / Outfit Catalog types (matching mobile style types)
export interface Style {
  _id: ID;
  name: string;
  description?: string;
  gender?: "male" | "female" | "unisex";
  imageUrls: string[];
  organizationId?: ID;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStyleRequest {
  name: string;
  description?: string;
  gender?: "male" | "female" | "unisex";
  imageUrls: string[];
}

export type UpdateStyleRequest = Partial<CreateStyleRequest>;

// Template CRUD types (matching mobile measurement types)
export interface CreateTemplateRequest {
  name: string;
  description?: string;
  iconUrl?: string;
  fields: MeasurementField[];
}

export type UpdateTemplateRequest = Partial<CreateTemplateRequest>;

// Team / Staff User types (matching mobile user types)
export interface TeamUser {
  _id: ID;
  name: string;
  email: string;
  phone?: string;
  role: "ORG_ADMIN" | "STAFF";
  photoUrl?: string;
  organizationId?: ID;
  isActive?: boolean;
  createdAt?: string;
}

export interface CreateTeamUserRequest {
  name: string;
  email: string;
  phone?: string;
  role: "STAFF";
  password: string;
}

export type UpdateTeamUserRequest = Partial<Omit<CreateTeamUserRequest, "password">>;

// Payment Settings types (matching mobile payment-settings.tsx)
export interface MomoPaymentMethod {
  network: string;
  number: string;
  name: string;
}

export interface BankPaymentMethod {
  bankName: string;
  accountNumber: string;
  accountName: string;
  branch?: string;
}

export interface PaymentInstructions {
  momo?: MomoPaymentMethod[];
  bank?: BankPaymentMethod[];
}

// Subscription Plan types (matching mobile payment.service.ts)
export interface Plan {
  _id: string;
  name: string;
  price: number;
  currency: string;
  interval: "monthly" | "yearly";
}

export interface DiscountTier {
  minMonths: number;
  discount: number;
  label: string;
}

export interface PriceBreakdown {
  planName: string;
  basePrice: number;
  months: number;
  baseTotal: number;
  discountedTotal: number;
  savings: number;
  discountPercentage: number;
  currency: string;
}

// Upload types
export interface UploadResult {
  url: string;
  publicId: string;
}

// Avatar preset types (matching mobile profile.service.ts)
export interface AvatarPreset {
  _id: string;
  url: string;
  name: string;
}
