"use client";

import {
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  X
} from "lucide-react";
import { useState } from "react";

const stats = [
  {
    title: "Total Leads",
    value: "1,248",
    change: "+12.5%",
    icon: Target
  },
  {
    title: "New Clients",
    value: "186",
    change: "+8.2%",
    icon: Users
  },
  {
    title: "Open Deals",
    value: "74",
    change: "+5.4%",
    icon: TrendingUp
  },
  {
    title: "Follow-ups",
    value: "32",
    change: "Today",
    icon: Clock3
  }
];

const recentLeads = [
  {
    name: "Rahul Sharma",
    company: "Sharma Interiors",
    source: "WhatsApp",
    status: "New",
    value: "₹45,000"
  },
  {
    name: "Priya Verma",
    company: "PV Coaching",
    source: "Website",
    status: "Interested",
    value: "₹28,000"
  },
  {
    name: "Amit Patel",
    company: "Patel Realty",
    source: "Referral",
    status: "Follow-up",
    value: "₹75,000"
  },
  {
    name: "Neha Singh",
    company: "NS Salon",
    source: "WhatsApp",
    status: "Converted",
    value: "₹18,500"
  }
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Leads", icon: UserPlus },
  { label: "Clients", icon: Users },
  { label: "Deals", icon: TrendingUp },
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Tasks", icon: ClipboardList },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings }
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-slate-950 text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div>
            <div className="text-xl font-bold">
              <span className="text-blue-400">36</span>CodeHub
            </div>
            <div className="mt-1 text-xs text-slate-400">CRM Platform</div>
          </div>

          <button
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = index === 0;

            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="text-xs text-slate-400">Workspace</div>
            <div className="mt-1 font-semibold">My Business</div>
            <div className="mt-3 text-xs text-slate-400">
              Professional Plan
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-slate-200 p-2 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={21} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                Dashboard
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">
                Welcome back to 36CodeHub CRM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                36
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-slate-800">
                  Admin
                </div>
                <div className="text-xs text-slate-500">Owner</div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome */}
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Good morning 👋
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Here&apos;s what&apos;s happening with your business today.
              </p>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 md:w-auto">
              <Plus size={18} />
              Add New Lead
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                      <Icon size={21} />
                    </div>

                    <span className="text-xs font-semibold text-emerald-600">
                      {stat.change}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {stat.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Leads */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
              <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Recent Leads
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Latest enquiries from your sales channels
                  </p>
                </div>

                <button className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                  View all
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Lead</th>
                      <th className="px-5 py-3 font-semibold">Source</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3 font-semibold">Value</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {recentLeads.map((lead) => (
                      <tr key={lead.name} className="hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-800">
                            {lead.name}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            {lead.company}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {lead.source}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {lead.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 font-semibold text-slate-800">
                          {lead.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">Quick Actions</h3>
              <p className="mt-1 text-xs text-slate-500">
                Frequently used CRM actions
              </p>

              <div className="mt-5 space-y-3">
                <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <UserPlus size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Add Lead</div>
                    <div className="text-xs text-slate-500">
                      Create a new enquiry
                    </div>
                  </div>
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50">
                  <div className="rounded-lg bg-green-50 p-2 text-green-600">
                    <MessageCircle size={18} />
                  </div>
                 
