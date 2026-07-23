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
