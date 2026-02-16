import Box from '@/components/ui/box'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Flex, Text } from "rizzui"

export default function PieMeter({chartData, remaining}:any) {
  const t = useTranslations("crm")
  return (
    <Box className="relative h-80 w-full shrink-0 @sm:mt-8 !rounded-2xl">
        <h6 className="font-medium text-title pt-5 px-5">
          {t("text-lead-generation-target-this-year")}
        </h6>
        <ResponsiveContainer width="100%" height="100%">
         <PieChart
            margin={{
              top: 80,
            }}
            className="relative [&>.recharts-surface]:mx-auto [&>.recharts-surface]:max-w-md [&>.recharts-surface]:md:max-w-none md:w-80 max-w-[300px]"
          >
            <Pie
              data={chartData}
              stroke="none"
              endAngle={-10}
              startAngle={190}
              paddingAngle={1}
              dataKey="value"
              innerRadius={80}
              outerRadius={100}
              cornerRadius={10}
              label={({ name, value }) => `${name}: ${value}`}
            />
          </PieChart>
        </ResponsiveContainer>

        <Flex
          className="absolute inset-0 mt-16"
          justify="center"
          align="center"
          direction="col"
          gap="1"
        >
          <Text className="text-2xl font-bold text-gray-800 @2xl:text-3xl dark:text-gray-300">
            {remaining}
          </Text>
          <Text className="font-medium dark:text-gray-600">{t("text-remaining")}</Text>
        </Flex>
      </Box>
  )
}
