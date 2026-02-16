import FacebookSquareIcon from "@core/components/icons/facebook-square"
import InstagramIcon from "@core/components/icons/instagram"

export type CrmStatType = {
  title: string
  customer: number
  increased: boolean
  percentage: number
  lastMonth: number
}

export const conventionRateData = [
    {
      day: 'Sunday',
      sale: 2000,
      cost: 2400,
    },
    {
      day: 'Monday',
      sale: 3000,
      cost: 1398,
    },
    {
      day: 'Tuesday',
      sale: 2000,
      cost: 9800,
    },
    {
      day: 'Wednesday',
      sale: 2780,
      cost: 3908,
    },
    {
      day: 'Thursday',
      sale: 1890,
      cost: 4800,
    },
    {
      day: 'Friday',
      sale: 2390,
      cost: 3800,
    },
    {
      day: 'Saturday',
      sale: 3490,
      cost: 4300,
    },
  ];

export const crmStatData: CrmStatType[] = [
  {
    title: "Total Campaigns",
    customer: 12786,
    increased: true,
    percentage: 25.2,
    lastMonth: 10258,
  },
  {
    title: "Total Customers",
    customer: 8785,
    increased: false,
    percentage: 18.2,
    lastMonth: 10587,
  },
  {
    title: "Total Sales",
    customer: 4250,
    increased: true,
    percentage: 25.2,
    lastMonth: 3987,
  },
  {
    title: "Total Tickets",
    customer: 2777,
    increased: false,
    percentage: 25.2,
    lastMonth: 2846,
  },
]

export const revenueSummaryData = [
  {
    day: "Jan",
    revenue: 5000,
  },
  {
    day: "Feb",
    revenue: 8500,
  },
  {
    day: "Mar",
    revenue: 7000,
  },
  {
    day: "Apr",
    revenue: 3908,
  },
  {
    day: "May",
    revenue: 4890,
  },
  {
    day: "Jun",
    revenue: 8000,
  },
  {
    day: "Jul",
    revenue: 8500,
  },
  {
    day: "Aug",
    revenue: 7000,
  },
  {
    day: "Sep",
    revenue: 3908,
  },
  {
    day: "Oct",
    revenue: 4890,
  },
  {
    day: "Nov",
    revenue: 8000,
  },
  {
    day: "Dec",
    revenue: 8500,
  },
]

export const leadsChartData = [
  {
    month: "Jan",
    positive: 50,
    neutral: 10,
    negative: 10,
  },
  {
    month: "Feb",
    positive: 85,
    neutral: 16,
    negative: 57,
  },
  {
    month: "Mar",
    positive: 70,
    neutral: 83,
    negative: 30,
  },
  {
    month: "Apr",
    positive: 39,
    neutral: 17,
    negative: 67,
  },
  {
    month: "May",
    positive: 48,
    neutral: 25,
    negative: 15,
  },
  {
    month: "Jun",
    positive: 80,
    neutral: 32,
    negative: 78,
  },
  {
    month: "Jul",
    positive: 85,
    neutral: 25,
    negative: 25,
  },
  {
    month: "Aug",
    positive: 37,
    neutral: 39,
    negative: 99,
  },
  {
    month: "Sep",
    positive: 78,
    neutral: 28,
    negative: 85,
  },
  {
    month: "Oct",
    positive: 57,
    neutral: 19,
    negative: 72,
  },
  {
    month: "Nov",
    positive: 47,
    neutral: 19,
    negative: 29,
  },
  {
    month: "Dec",
    positive: 75,
    neutral: 30,
    negative: 90,
  },
]

export const recentActivitiesData = [
  {
    user: "@brayan47",
    action: "started following you",
    platform: "Instagram",
    time: "15 min ago",
    icon: InstagramIcon,
  },
  {
    user: "@mic15",
    action: "started following you",
    platform: "Facebook",
    time: "15 min ago",
    icon: FacebookSquareIcon,
  },
  {
    user: "@deva_14",
    action: "added a new photo",
    platform: "Instagram",
    time: "15 min ago",
    icon: InstagramIcon,
  },
  {
    user: "@brayan17",
    action: "started following you",
    platform: "Facebook",
    time: "15 min ago",
    icon: FacebookSquareIcon,
  },
  {
    user: "@mic15",
    action: "added a new photo",
    platform: "Instagram",
    time: "15 min ago",
    icon: InstagramIcon,
  },
  {
    user: "@brayan47",
    action: "started following you",
    platform: "Instagram",
    time: "15 min ago",
    icon: InstagramIcon,
  },
  {
    user: "@mic15",
    action: "started following you",
    platform: "Facebook",
    time: "15 min ago",
    icon: FacebookSquareIcon,
  },
  {
    user: "@deva_14",
    action: "added a new photo",
    platform: "Instagram",
    time: "15 min ago",
    icon: InstagramIcon,
  },
  {
    user: "@brayan17",
    action: "started following you",
    platform: "Facebook",
    time: "15 min ago",
    icon: FacebookSquareIcon,
  },
  {
    user: "@mic15",
    action: "added a new photo",
    platform: "Instagram",
    time: "15 min ago",
    icon: InstagramIcon,
  },
]
