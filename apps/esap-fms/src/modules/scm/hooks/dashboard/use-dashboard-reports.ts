"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";



import { DashboardReportsService } from "@/modules/scm/service/dashboard/dashboard-reports.service";
import { InvoiceMaterialCost } from "@/modules/scm/types/dashboard/invoice-material-cost-types";
import { MainStaticCard } from "@/modules/scm/types/dashboard/main-static-card-types";
import { MonthlyForecast, MonthlyForecastQueryOptions } from "@/modules/scm/types/dashboard/monthly-forecast-types";
import { MostProducedProducts } from "@/modules/scm/types/dashboard/most-produced-products";
import { OtherStaticCard } from "@/modules/scm/types/dashboard/other-static-card";
import { TopSupplier } from "@/modules/scm/types/dashboard/top-supplier-types";


const DASHBOARD_REPORT_KEYS = {
  all: "dashboard-report",
  forecast: "monthly-forecast",
  invoice: "invoice-material-cost",
  topSupplier: "top-supplier",
  mostProduced: "most-produced-products",
  mainStatic: "main-static-card",
  otherStatic: "other-static-card",
}


export function useMonthlyForecast(options?: Partial<MonthlyForecastQueryOptions>) {
  const queryKey = [DASHBOARD_REPORT_KEYS.forecast, options];

  return useQuery<MonthlyForecast[], Error>({
    queryKey,
    queryFn: () => DashboardReportsService.getMonthlyForecast(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useInvoiceMaterialCost(options?: Partial<any>) {
  const queryKey = [DASHBOARD_REPORT_KEYS.invoice, options];

  return useQuery<InvoiceMaterialCost, Error>({
    queryKey,
    queryFn: () => DashboardReportsService.getInvoiceMaterialCost(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useTopSupplier(options?: Partial<any>) {
  const queryKey = [DASHBOARD_REPORT_KEYS.topSupplier, options];

  return useQuery<TopSupplier[], Error>({
    queryKey,
    queryFn: () => DashboardReportsService.getTopSupplier(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useMostProducedProducts(options?: Partial<any>) {
  const queryKey = [DASHBOARD_REPORT_KEYS.mostProduced, options]

  return useQuery<MostProducedProducts[], Error>({
    queryKey,
    queryFn: () =>
      DashboardReportsService.getMostProducedProducts(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useMainStaticCard(options?: Partial<any>) {
  const queryKey = [DASHBOARD_REPORT_KEYS.mainStatic, options]

  return useQuery<MainStaticCard, Error>({
    queryKey,
    queryFn: () => DashboardReportsService.getMainStaticCard(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useOtherStaticCard(options?: Partial<any>) {
  const queryKey = [DASHBOARD_REPORT_KEYS.otherStatic, options]

  return useQuery<OtherStaticCard, Error>({
    queryKey,
    queryFn: () => DashboardReportsService.getOtherStaticCard(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}