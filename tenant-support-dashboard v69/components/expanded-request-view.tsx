import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Clock, Flame } from "lucide-react"
import Image from "next/image"

interface ExpandedRequestViewProps {
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
  }
}

export function ExpandedRequestView({ request }: ExpandedRequestViewProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive">חדש</Badge>
      case "in-progress":
        return <Badge variant="warning">בטיפול</Badge>
      case "transferred":
        return <Badge variant="destructive">הועבר</Badge>
      case "resolved":
        return <Badge variant="success">טופל</Badge>
      default:
        return null
    }
  }

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">פרטי בקשה #{request.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">סטטוס:</span>
              {getStatusBadge(request.status)}
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">רמת דחיפות:</span>
              {getUrgencyIcon(request.urgencyLevel)}
              <span>
                {request.urgencyLevel === "critical" ? "קריטי" : request.urgencyLevel === "urgent" ? "דחוף" : "רגיל"}
              </span>
            </div>
            <div>
              <span className="font-semibold">תאריך פתיחה:</span> {request.submissionDate}
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">סטטוס אחריות:</span>
              {getWarrantyBadge(request.warrantyPeriod)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>פרטי הבקשה</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">שם דייר:</span> {request.tenantName}
            </div>
            <div>
              <span className="font-semibold">שם פרויקט:</span> {request.projectName}
            </div>
            <div>
              <span className="font-semibold">מספר דירה ובניין:</span> {request.apartmentNumber}
            </div>
            <div>
              <span className="font-semibold">קטגוריה:</span> {request.category}
            </div>
            <div>
              <span className="font-semibold">חדר/מיקום:</span> {request.location}
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <span className="font-semibold">תיאור הבעיה:</span>
            <p className="mt-2">{request.issueDescription}</p>
          </div>
        </CardContent>
      </Card>

      {request.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>תמונות/מדיה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {request.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`תמונה ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md cursor-pointer"
                    onClick={() => {
                      /* TODO: Implement full-screen view */
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

