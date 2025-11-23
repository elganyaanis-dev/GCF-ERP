import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export interface UserRole {
  role: string; // "user", "chef_service", "rh", "manager", "director", "ceo", "admin"
  accreditationLevel: number; // 0 = employee, 1 = manager, 2 = admin, 3 = director, 4 = ceo, 5 = supreme
  poleServiceId?: string;
  subsidiaryId?: string;
  email?: string;
}

export function useRole(): UserRole & { isLoading: boolean } {
  const { user, isLoading: authLoading } = useAuth();
  
  const { data: profile, isLoading: profileLoading } = useQuery<any>({
    queryKey: ["/api/user/profile"],
    enabled: !!user,
  });

  const role = profile?.role || "user";
  const accreditationLevel = parseInt(profile?.accreditationLevel || "0", 10);
  const poleServiceId = profile?.poleServiceId;
  const subsidiaryId = profile?.subsidiaryId;
  const email = profile?.email || (typeof user === "object" && user ? (user as any)?.email : "");

  return {
    role,
    accreditationLevel,
    poleServiceId,
    subsidiaryId,
    email,
    isLoading: authLoading || profileLoading,
  };
}

export function canViewEmployees(role: string, level: number): boolean {
  return level >= 1; // Manager and above
}

export function canViewPayroll(role: string, level: number): boolean {
  return level >= 2; // Admin and above
}

export function canViewOrganization(role: string, level: number): boolean {
  return level >= 2; // Admin and above
}

export function getVisibleEmployees(role: string, level: number, userId: string, poleServiceId?: string, allEmployees: any[] = []): any[] {
  if (level === 0) {
    // Simple employee: sees only themselves
    return allEmployees.filter((emp) => emp.userId === userId);
  } else if (level === 1) {
    // Manager/Chef service: sees their service employees
    return allEmployees.filter((emp) => emp.poleServiceId === poleServiceId);
  } else if (level >= 2) {
    // Admin and above: sees all
    return allEmployees;
  }
  return [];
}
