import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type ApprovalStatus,
  type EmployeeProfile,
  type PerformanceEntry,
  UserRole,
} from "../backend";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

// ===== QUERY HOOKS =====

export function useQueryStatus() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["queryStatus"],
    queryFn: async () => {
      if (!actor || !identity) return null;
      return actor.queryStatus();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetAllEmployeeProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allEmployeeProfiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEmployeeProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerEmployeeProfile() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["callerEmployeeProfile"],
    queryFn: async () => {
      if (!actor || !identity) return null;
      try {
        return await actor.getCallerEmployeeProfile();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetAllPerformanceEntries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allPerformanceEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPerformanceEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerPerformanceEntries() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["callerPerformanceEntries"],
    queryFn: async () => {
      if (!actor || !identity) return [];
      try {
        return await actor.getCallerPerformanceEntries();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useListApprovals() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["approvals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listApprovals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllFeedback() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allFeedback"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFeedback();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllEmployeesPerformanceSummary(period: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["performanceSummary", period],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEmployeesPerformanceSummary(period);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeedbackForEmployee(employeeId: Principal | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["feedbackForEmployee", employeeId?.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return [];
      return actor.getFeedbackForEmployee(employeeId);
    },
    enabled: !!actor && !isFetching && !!employeeId,
  });
}

// ===== MUTATION HOOKS =====

export function useMutationSetApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      principal,
      status,
    }: { principal: Principal; status: ApprovalStatus }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.setApproval(principal, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
      queryClient.invalidateQueries({ queryKey: ["queryStatus"] });
    },
  });
}

export function useMutationAddFeedback() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      employeeId,
      period,
      feedbackText,
      overallRating,
    }: {
      employeeId: Principal;
      period: string;
      feedbackText: string;
      overallRating: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addOrUpdateFeedback(
        employeeId,
        period,
        feedbackText,
        BigInt(overallRating),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFeedback"] });
      queryClient.invalidateQueries({ queryKey: ["performanceSummary"] });
    },
  });
}

export function useMutationCreatePerformanceEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      period,
      entry,
    }: { period: string; entry: PerformanceEntry }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.createOrUpdatePerformanceEntry(period, entry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerPerformanceEntries"] });
      queryClient.invalidateQueries({ queryKey: ["allPerformanceEntries"] });
    },
  });
}

export function useMutationCreateEmployeeProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: EmployeeProfile) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.createOrUpdateEmployeeProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerEmployeeProfile"] });
      queryClient.invalidateQueries({ queryKey: ["allEmployeeProfiles"] });
    },
  });
}

export function useMutationRequestApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      await actor.requestApproval();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queryStatus"] });
    },
  });
}

export function useMutationAssignAdminRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.assignCallerUserRole(principal, UserRole.admin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queryStatus"] });
    },
  });
}
