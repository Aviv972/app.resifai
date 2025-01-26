"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileUp, Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface TimelineEntry {
  id: string
  type: "status" | "note" | "media" | "assignment"
  content: string
  timestamp: string
}

interface RequestActionsProps {
  requestId: number
  currentStatus: string
  initialNotes?: string
}

export function RequestActions({ requestId, currentStatus, initialNotes = "" }: RequestActionsProps) {
  const [status, setStatus] = useState(currentStatus)
  const [notes, setNotes] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [timeline, setTimeline] = useState<TimelineEntry[]>([])
  const [assignee, setAssignee] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    setHasChanges(true)
  }

  const handleAssigneeChange = (newAssignee: string) => {
    setAssignee(newAssignee)
    setHasChanges(true)
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
    setHasChanges(true)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
    setHasChanges(true)
  }

  const handleSaveAll = () => {
    // Add status change to timeline if changed
    if (status !== currentStatus) {
      addTimelineEntry({
        type: "status",
        content: `סטטוס שונה ל-${status}`,
      })
    }

    // Add assignee change to timeline if changed
    if (assignee) {
      addTimelineEntry({
        type: "assignment",
        content: `הוקצה ל-${assignee}`,
      })
    }

    // Add notes to timeline if present
    if (notes.trim()) {
      addTimelineEntry({
        type: "note",
        content: notes,
      })
      setNotes("")
    }

    // Add files to timeline
    selectedFiles.forEach((file) => {
      addTimelineEntry({
        type: "media",
        content: `קובץ הועלה: ${file.name}`,
      })
    })

    // Reset changes flag
    setHasChanges(false)
  }

  const addTimelineEntry = (entry: Partial<TimelineEntry>) => {
    const newEntry: TimelineEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleString("he-IL"),
      ...entry,
    }
    setTimeline((prev) => [newEntry, ...prev])
  }

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex flex-col gap-4">
        {/* Status Row */}
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <div className="text-sm mb-2 text-right">עדכון סטטוס</div>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="flex flex-row-reverse justify-between text-right">
                <SelectValue placeholder="חדשה" className="text-right w-full" />
              </SelectTrigger>
              <SelectContent side="bottom" position="popper" align="end" className="min-w-[200px]">
                <SelectItem value="new" className="text-right">
                  חדשה
                </SelectItem>
                <SelectItem value="in-progress" className="text-right">
                  בטיפול
                </SelectItem>
                <SelectItem value="transferred" className="text-right">
                  הועברה לקבלן משנה
                </SelectItem>
                <SelectItem value="resolved" className="text-right">
                  טופלה
                </SelectItem>
                <SelectItem value="review" className="text-right">
                  נדרשת בדיקה נוספת
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 justify-end">
              <Badge variant="secondary" className="text-xs">
                new
              </Badge>
              <span className="text-sm">הקצאת אחראי</span>
            </div>
            <Select value={assignee} onValueChange={handleAssigneeChange}>
              <SelectTrigger className="flex flex-row-reverse justify-between text-right">
                <SelectValue placeholder="בחר אחראי" className="text-right w-full" />
              </SelectTrigger>
              <SelectContent side="bottom" position="popper" align="end" className="min-w-[200px]">
                <SelectItem value="john" className="text-right">
                  ג'ון דו
                </SelectItem>
                <SelectItem value="jane" className="text-right">
                  ג'יין דו
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notes Row */}
        <div>
          <div className="text-sm mb-2 text-right">הוספת הערות</div>
          <Textarea
            placeholder="נא לטפל בהקדם האפשרי"
            value={notes}
            onChange={handleNotesChange}
            className="text-right resize-none"
            rows={3}
            dir="rtl"
          />
        </div>

        {/* File Upload Row */}
        <div>
          <div className="text-sm mb-2 text-right">העלאת קבצים</div>
          <div className="border border-dashed rounded-lg p-4">
            <Input
              type="file"
              multiple
              accept="image/*,.pdf,.docx"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
              dir="rtl"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <Upload className="h-6 w-6 text-gray-400" />
              <span className="text-sm text-gray-500">לחץ להעלאת קבצים או גרור לכאן</span>
            </label>
          </div>
          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-6 gap-2 mt-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative aspect-square">
                  {file.type.startsWith("image/") ? (
                    <Image
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={file.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  ) : (
                    <div className="h-full border rounded-md flex items-center justify-center bg-muted">
                      <FileUp className="h-4 w-4" />
                    </div>
                  )}
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0"
                    onClick={() => {
                      setSelectedFiles((files) => files.filter((_, i) => i !== index))
                      setHasChanges(true)
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <Button onClick={handleSaveAll} disabled={!hasChanges} className="w-full">
          <Save className="h-4 w-4 ml-2" />
          שמור שינויים
        </Button>
      </div>

      <Separator />

      {/* Timeline Section */}
      <div className="space-y-2">
        <div className="text-sm text-right">היסטוריית פעולות</div>
        {timeline.length > 0 ? (
          <div className="space-y-2 text-sm">
            {timeline.map((entry) => (
              <div key={entry.id} className="flex items-center gap-2 text-gray-600 justify-end">
                <span className="text-gray-400">{entry.timestamp}</span>
                <span className="text-gray-400">•</span>
                <span>{entry.content}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-2">אין פעולות להצגה</div>
        )}
      </div>
    </div>
  )
}

