"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FiltersPanel() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [warranty, setWarranty] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="search">חיפוש</Label>
        <Input
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חפש לפי מספר בקשה, שם דייר..."
        />
      </div>
      <div>
        <Label htmlFor="status">סטטוס</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger id="status">
            <SelectValue placeholder="בחר סטטוס" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">פתוח</SelectItem>
            <SelectItem value="in-progress">בטיפול</SelectItem>
            <SelectItem value="closed">סגור</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="warranty">תקופת אחריות</Label>
        <Select value={warranty} onValueChange={setWarranty}>
          <SelectTrigger id="warranty">
            <SelectValue placeholder="בחר תקופת אחריות" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bedek">בדק</SelectItem>
            <SelectItem value="warranty">אחריות</SelectItem>
            <SelectItem value="out-of-warranty">מחוץ לתקופה</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full">החל מסננים</Button>
    </div>
  )
}

