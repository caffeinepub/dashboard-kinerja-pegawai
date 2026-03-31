import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface PerformanceSummary {
    period: string;
    averageAchievement: number;
    employeeId: Principal;
    overallRating: bigint;
    totalObjectives: bigint;
}
export interface AdminFeedback {
    period: string;
    createdAt: bigint;
    feedbackText: string;
    employeeId: Principal;
    overallRating: bigint;
}
export interface PerformanceEntry {
    sasaranKinerja: string;
    period: string;
    indicatorList: Array<Indicator>;
    employeeId: Principal;
}
export interface Indicator {
    no: bigint;
    sumberDataEvaluasi: string;
    buktiDukung: string;
    capaianJumlah: number;
    capaianPersentase: number;
    uraian: string;
    targetJumlah: number;
    targetSatuan: string;
}
export interface EmployeeProfile {
    nip: string;
    kabupaten: string;
    nama: string;
    kecamatan: string;
    jabatan: string;
    lokasiKerja: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOrUpdateFeedback(employeeId: Principal, period: string, feedbackText: string, overallRating: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrUpdateEmployeeProfile(profile: EmployeeProfile): Promise<void>;
    createOrUpdatePerformanceEntry(period: string, entry: PerformanceEntry): Promise<void>;
    getAllEmployeeProfiles(): Promise<Array<EmployeeProfile>>;
    getAllEmployeesPerformanceSummary(period: string): Promise<Array<PerformanceSummary>>;
    getAllFeedback(): Promise<Array<AdminFeedback>>;
    getAllPerformanceEntries(): Promise<Array<PerformanceEntry>>;
    getCallerEmployeeProfile(): Promise<EmployeeProfile>;
    getCallerPerformanceEntries(): Promise<Array<PerformanceEntry>>;
    getCallerUserRole(): Promise<UserRole>;
    getFeedback(employeeId: Principal, period: string): Promise<AdminFeedback | null>;
    getFeedbackForEmployee(employeeId: Principal): Promise<Array<AdminFeedback>>;
    getPerformanceEntriesForEmployee(employeeId: Principal): Promise<Array<PerformanceEntry>>;
    getPerformanceEntry(employeeId: Principal, period: string): Promise<PerformanceEntry | null>;
    getPerformanceSummary(employeeId: Principal, period: string): Promise<PerformanceSummary | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    queryStatus(): Promise<{
        accessLevel: UserRole;
        approvalStatus: ApprovalStatus;
    }>;
    requestApproval(): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
}
