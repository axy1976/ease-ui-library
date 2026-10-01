// Mock data for the example console. In a real app these come from your API.

export type ResourceStatus = "running" | "stopped" | "pending" | "error";

export interface Resource {
  id: string;
  name: string;
  type: string;
  region: string;
  status: ResourceStatus;
  vcpus: number;
  memory: string;
  createdAt: string;
}

export const resources: Resource[] = [
  {
    id: "res-001",
    name: "web-frontend",
    type: "Service",
    region: "us-east-1",
    status: "running",
    vcpus: 4,
    memory: "8 GiB",
    createdAt: "2026-05-14",
  },
  {
    id: "res-002",
    name: "api-gateway",
    type: "Service",
    region: "us-east-1",
    status: "running",
    vcpus: 2,
    memory: "4 GiB",
    createdAt: "2026-05-14",
  },
  {
    id: "res-003",
    name: "postgres-primary",
    type: "Database",
    region: "us-east-1",
    status: "running",
    vcpus: 8,
    memory: "32 GiB",
    createdAt: "2026-04-02",
  },
  {
    id: "res-004",
    name: "redis-cache",
    type: "Cache",
    region: "eu-west-1",
    status: "pending",
    vcpus: 1,
    memory: "2 GiB",
    createdAt: "2026-06-30",
  },
  {
    id: "res-005",
    name: "worker-queue",
    type: "Service",
    region: "eu-west-1",
    status: "error",
    vcpus: 2,
    memory: "4 GiB",
    createdAt: "2026-06-11",
  },
  {
    id: "res-006",
    name: "object-store",
    type: "Storage",
    region: "us-west-2",
    status: "running",
    vcpus: 0,
    memory: "—",
    createdAt: "2026-03-22",
  },
];

export interface Deployment {
  id: string;
  name: string;
  env: string;
  version: string;
  status: "success" | "failed" | "running" | "queued";
  duration: string;
  author: string;
  at: string;
}

export const deployments: Deployment[] = [
  {
    id: "dep-1042",
    name: "web-frontend",
    env: "production",
    version: "v2.18.0",
    status: "success",
    duration: "3m 12s",
    author: "ada",
    at: "2026-07-08 14:21",
  },
  {
    id: "dep-1041",
    name: "api-gateway",
    env: "production",
    version: "v5.4.1",
    status: "running",
    duration: "…",
    author: "grace",
    at: "2026-07-08 13:55",
  },
  {
    id: "dep-1040",
    name: "worker-queue",
    env: "staging",
    version: "v1.9.3",
    status: "failed",
    duration: "1m 04s",
    author: "ada",
    at: "2026-07-08 11:02",
  },
  {
    id: "dep-1039",
    name: "web-frontend",
    env: "staging",
    version: "v2.18.0-rc1",
    status: "success",
    duration: "2m 58s",
    author: "linus",
    at: "2026-07-07 19:40",
  },
];

export interface Metric {
  label: string;
  value: string;
  trend: string;
  direction: "up" | "down" | "flat";
  status?: "neutral" | "success" | "warning" | "danger" | "info";
}

export function getMetric(label: string): Metric {
  const metrics: Record<string, Metric> = {
    resources: {
      label: "Active resources",
      value: "24",
      trend: "+3 this week",
      direction: "up",
      status: "neutral",
    },
    running: {
      label: "Running",
      value: "19",
      trend: "79% healthy",
      direction: "flat",
      status: "success",
    },
    errors: {
      label: "Erroring",
      value: "2",
      trend: "+1",
      direction: "down",
      status: "danger",
    },
    spend: {
      label: "Monthly spend",
      value: "$4,820",
      trend: "+4.2% vs last month",
      direction: "up",
      status: "neutral",
    },
  };
  return metrics[label] ?? metrics.resources;
}

export function findResource(id: string | undefined) {
  return resources.find((r) => r.id === id);
}
