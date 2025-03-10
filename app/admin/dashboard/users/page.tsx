"use client"

import { useState } from "react"
import { Filter, MoreHorizontal, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+234 812 345 6789",
    type: "sender",
    status: "active",
    joinDate: "2023-05-12",
    transactions: 24,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+234 803 987 6543",
    type: "sender",
    status: "active",
    joinDate: "2023-06-18",
    transactions: 12,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+234 705 123 4567",
    type: "carrier",
    status: "active",
    joinDate: "2023-04-30",
    transactions: 56,
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily@example.com",
    phone: "+234 908 765 4321",
    type: "sender",
    status: "inactive",
    joinDate: "2023-07-05",
    transactions: 3,
  },
  {
    id: 5,
    name: "David Clark",
    email: "david@example.com",
    phone: "+234 814 789 0123",
    type: "carrier",
    status: "pending",
    joinDate: "2023-08-22",
    transactions: 0,
  },
]

export default function UsersManagement() {
  const [userType, setUserType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter users based on type and search query
  const filteredUsers = mockUsers.filter((user) => {
    const matchesType = userType === "all" || user.type === userType
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)

    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-gray-500">Manage all users on the platform</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs defaultValue="all" className="w-[300px]" onValueChange={setUserType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="sender">Senders</TabsTrigger>
            <TabsTrigger value="carrier">Carriers</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-full sm:w-[300px] pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Users</CardTitle>
          <CardDescription>{filteredUsers.length} users found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Joined</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Transactions</th>
                  <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${user.name.charAt(0)}`} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm">{user.phone}</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.type === "carrier" ? "outline" : "secondary"}>
                        {user.type === "carrier" ? "Carrier" : "Sender"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            user.status === "active"
                              ? "bg-green-500"
                              : user.status === "inactive"
                                ? "bg-gray-400"
                                : "bg-yellow-500"
                          }`}
                        ></span>
                        <span className="capitalize">{user.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm">{new Date(user.joinDate).toLocaleDateString()}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm">{user.transactions}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-red-500">Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-500">Activate</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

