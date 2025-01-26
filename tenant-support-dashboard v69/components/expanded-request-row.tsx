import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Clock, Flame } from "lucide-react"
import Image from "next/image"
import { RequestActions } from "./request-actions"

interface ExpandedRequestRowProps {
  request: {
    id: number
    status: string
    urgencyLevel: string
    submissionDate: string
    warrantyPeriod: string
    tenantName: string
    projectName: string
    apartmentNumber: string
    issueDescription: string
    category: string
    location: string
    images: string[]
    warrantyEndDate: string
    tenantComments: string
    assignedContractor: {
      name: string
      contact: string
    }
    estimatedResolutionDate: string
    additionalNotes: string
  }
}

export function ExpandedRequestRow({ request }: ExpandedRequestRowProps) {
  const getWarrantyBadge = (warranty: string) => {
    switch (warranty) {
      case "bedek":
        return <Badge variant="success">בדק</Badge>
      case "warranty":
        return <Badge variant="warning">אחריות</Badge>
      case "out-of-warranty":
        return <Badge variant="destructive">מחוץ לתקופה</Badge>
      default:
        return null
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <Flame className="h-5 w-5 text-red-500" />
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "normal":
        return <Clock className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }

  return (
    <Card className="m-2">
      <CardContent className="p-4">
        <div className="space-y-6" dir="rtl">
          {/* Request Details */}
          <div className="grid grid-cols-2 gap-8 text-right">
            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">שם דייר:</span>
                <span>{request.tenantName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">שם פרויקט:</span>
                <span>{request.projectName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">מספר דירה ובניין:</span>
                <span>{request.apartmentNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">קטגוריה:</span>
                <span>{request.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">חדר/מיקום:</span>
                <span>{request.location}</span>
              </div>
            </div>

            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">רמת דחיפות:</span>
                <div className="flex items-center gap-2">
                  {getUrgencyIcon(request.urgencyLevel)}
                  <span>
                    {request.urgencyLevel === "critical"
                      ? "קריטי"
                      : request.urgencyLevel === "urgent"
                        ? "דחוף"
                        : "רגיל"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">תאריך פתיחה:</span>
                <span>{request.submissionDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">סטטוס אחריות:</span>
                {getWarrantyBadge(request.warrantyPeriod)}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">תאריך סיום אחריות:</span>
                <span>{request.warrantyEndDate}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description and Images */}
          <div className="space-y-4 text-right">
            <div>
              <h3 className="font-medium mb-2">תיאור הבעיה:</h3>
              <p className="text-gray-600">{request.issueDescription}</p>
            </div>

            {request.images.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">תמונות:</h3>
                <div className="grid grid-cols-3 gap-4">
                  {request.images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`תמונה ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Actions Section */}
          <RequestActions
            requestId={request.id}
            currentStatus={request.status}
            initialNotes={request.additionalNotes}
          />
        </div>
      </CardContent>
    </Card>
  )
}

