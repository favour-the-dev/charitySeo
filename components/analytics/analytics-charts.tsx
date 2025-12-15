"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const reviewsOverTimeData = [
  { name: "Jan", reviews: 40 },
  { name: "Feb", reviews: 30 },
  { name: "Mar", reviews: 20 },
  { name: "Apr", reviews: 27 },
  { name: "May", reviews: 18 },
  { name: "Jun", reviews: 23 },
  { name: "Jul", reviews: 34 },
]

const ratingDistributionData = [
  { name: "5 Stars", count: 120 },
  { name: "4 Stars", count: 80 },
  { name: "3 Stars", count: 40 },
  { name: "2 Stars", count: 20 },
  { name: "1 Star", count: 10 },
]

const sentimentData = [
  { name: "Positive", value: 70 },
  { name: "Neutral", value: 20 },
  { name: "Negative", value: 10 },
]

const COLORS = ["#22c55e", "#eab308", "#ef4444"]

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Reviews Over Time</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={reviewsOverTimeData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reviews"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ratingDistributionData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                width={60}
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#adfa1d" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-3">
        <CardHeader>
          <CardTitle>Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {sentimentData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-muted-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
