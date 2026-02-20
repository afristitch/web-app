export interface User {
    id?: string;
    _id?: string;
    name: string;
    email: string;
    role: "ORG_ADMIN" | "STAFF";
    photoUrl?: string;
}

export interface Organization {
    id?: string;
    _id?: string;
    name: string;
    logoUrl?: string;
}

export interface Client {
    _id: string;
    name: string;
    email?: string;
    phone: string;
    photoUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Order {
    _id: string;
    orderNumber: string;
    client: Client | string;
    status: "pending" | "in-progress" | "fitting" | "completed" | "delivered" | "cancelled";
    amount: number;
    amountPaid: number;
    dueDate: string;
    clothImageUrl?: string;
    clothSize?: string;
    createdAt?: string;
}

export interface MeasurementField {
    name: string;
    label: string;
    type: "number" | "text";
    unit?: string;
}

export interface MeasurementTemplate {
    _id: string;
    name: string;
    fields: MeasurementField[];
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    total?: number;
    message?: string;
}
