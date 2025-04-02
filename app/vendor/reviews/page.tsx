"use client"

import { useState } from "react"
import { Star, Search, Filter, MessageSquare, ThumbsUp, Flag } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import VendorNavigation from "@/components/vendor/vendor-navigation"

interface Review {
  id: string
  customer: string
  service: string
  date: string
  rating: number
  comment: string
  response?: string
  helpful: number
  reported: boolean
}

export default function VendorReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")
  const [serviceFilter, setServiceFilter] = useState("")
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [responseText, setResponseText] = useState("")
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false)
  const { toast } = useToast()

  // Mock data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "R001",
      customer: "John Smith",
      service: "City Tour",
      date: "2025-03-28",
      rating: 5,
      comment:
        "Excellent tour! Our guide was knowledgeable and friendly. We saw all the major attractions and learned so much about the city's history. Highly recommend this tour to anyone visiting the area.",
      response:
        "Thank you for your kind words, John! We're delighted you enjoyed the tour and learned about our city's rich history. We hope to see you again on your next visit!",
      helpful: 3,
      reported: false,
    },
    {
      id: "R002",
      customer: "Lisa Johnson",
      service: "Airport Transfer",
      date: "2025-03-25",
      rating: 4,
      comment:
        "On time and professional service. Very comfortable ride. The driver was courteous and helped with our luggage. Would use this service again.",
      helpful: 2,
      reported: false,
    },
    {
      id: "R003",
      customer: "Robert Wilson",
      service: "City Tour",
      date: "2025-03-20",
      rating: 5,
      comment:
        "Highly recommend this tour. We saw all the major attractions and learned so much! The guide was very knowledgeable and made the experience fun for everyone in our group.",
      response:
        "Thank you, Robert! We're thrilled you enjoyed your tour experience. Our guides take pride in sharing their knowledge while keeping things entertaining. We appreciate your recommendation!",
      helpful: 5,
      reported: false,
    },
    {
      id: "R004",
      customer: "Emily Davis",
      service: "Wine Tasting Tour",
      date: "2025-03-15",
      rating: 3,
      comment:
        "The vineyards were beautiful, but the tour felt a bit rushed. Would have liked more time at each location. The wine was excellent though.",
      helpful: 1,
      reported: false,
    },
    {
      id: "R005",
      customer: "Michael Brown",
      service: "City Tour",
      date: "2025-03-10",
      rating: 2,
      comment:
        "Disappointing experience. The tour bus was late, and we had to rush through several attractions. The guide seemed disinterested and was hard to understand at times.",
      helpful: 0,
      reported: false,
    },
    {
      id: "R006",
      customer: "Sarah Miller",
      service: "Airport Transfer",
      date: "2025-03-05",
      rating: 5,
      comment:
        "Perfect service! Driver was waiting for us when we arrived, even though our flight was delayed. Clean vehicle and professional service.",
      response:
        "Thank you for your review, Sarah! We always monitor flight times to ensure we're there when you need us, regardless of delays. We're glad you had a positive experience!",
      helpful: 4,
      reported: false,
    },
    {
      id: "R007",
      customer: "David Wilson",
      service: "Wine Tasting Tour",
      date: "2025-03-01",
      rating: 5,
      comment:
        "Amazing experience! The guide was knowledgeable about wines and the region. We visited three excellent vineyards and tasted some exceptional wines. Highly recommended!",
      helpful: 6,
      reported: false,
    },
  ])

  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length
    const percentage = (count / reviews.length) * 100
    return { rating, count, percentage }
  })

  const services = [...new Set(reviews.map((review) => review.service))]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleResponseSubmit = () => {
    if (!selectedReview || !responseText.trim()) return

    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === selectedReview.id) {
          return { ...review, response: responseText }
        }
        return review
      }),
    )

    toast({
      title: "Response submitted",
      description: "Your response has been published successfully.",
    })

    setIsResponseDialogOpen(false)
    setResponseText("")
  }

  const handleMarkHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === id) {
          return { ...review, helpful: review.helpful + 1 }
        }
        return review
      }),
    )

    toast({
      title: "Marked as helpful",
      description: "Thank you for your feedback.",
    })
  }

  const handleReportReview = (id: string) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === id) {
          return { ...review, reported: true }
        }
        return review
      }),
    )

    toast({
      title: "Review reported",
      description: "This review has been reported for moderation.",
    })
  }

  const openResponseDialog = (review: Review) => {
    setSelectedReview(review)
    setResponseText(review.response || "")
    setIsResponseDialogOpen(true)
  }

  // Filter reviews based on search query and filters
  const filteredReviews = reviews.filter((review) => {
    // Filter by search query
    if (
      searchQuery &&
      !review.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by rating
    if (ratingFilter && review.rating !== Number.parseInt(ratingFilter)) {
      return false
    }

    // Filter by service
    if (serviceFilter && review.service !== serviceFilter) {
      return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavigation />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
            <p className="text-muted-foreground">See what customers are saying about your services</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-5 w-5",
                            star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                  <Star className="h-6 w-6 fill-current" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Based on {reviews.length} reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Rating Distribution</p>
              </div>
              <div className="space-y-2">
                {ratingCounts.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-12">
                      <span className="text-sm">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                    </div>
                    <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-sm w-8 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-24 w-24">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200 stroke-current"
                      strokeWidth="10"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    ></circle>
                    <circle
                      className="text-red-600 stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={
                        251.2 - (251.2 * reviews.filter((review) => review.response).length) / reviews.length
                      }
                      transform="rotate(-90 50 50)"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {Math.round((reviews.filter((review) => review.response).length / reviews.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground mt-4">
                {reviews.filter((review) => review.response).length} of {reviews.length} reviews answered
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="w-40">
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Rating" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-40">
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Service" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="negative">Negative</TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    {filteredReviews.length} review{filteredReviews.length !== 1 ? "s" : ""} found
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredReviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No reviews found matching your filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setRatingFilter("")
                      setServiceFilter("")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{review.customer}</h4>
                          <div className="flex items-center">
                            <p className="text-sm text-muted-foreground">
                              {review.service} • {formatDate(review.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "h-4 w-4",
                                star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm mb-4">{review.comment}</p>

                      {review.response && (
                        <div className="bg-gray-50 p-3 rounded-md mb-4 border-l-2 border-red-600">
                          <p className="text-sm font-medium mb-1">Your Response:</p>
                          <p className="text-sm">{review.response}</p>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => handleMarkHelpful(review.id)}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                          {!review.reported && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs text-red-600"
                              onClick={() => handleReportReview(review.id)}
                            >
                              <Flag className="h-3 w-3 mr-1" />
                              Report
                            </Button>
                          )}
                        </div>
                        <Button
                          variant={review.response ? "outline" : "default"}
                          size="sm"
                          className={cn("h-8 text-xs", !review.response && "bg-red-600 hover:bg-red-700")}
                          onClick={() => openResponseDialog(review)}
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {review.response ? "Edit Response" : "Respond"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Button variant="outline">Load More Reviews</Button>
            </CardFooter>
          </Card>
        </Tabs>

        {/* Response Dialog */}
        <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedReview?.response ? "Edit Your Response" : "Respond to Review"}</DialogTitle>
              <DialogDescription>
                {selectedReview?.customer}'s review of {selectedReview?.service}
              </DialogDescription>
            </DialogHeader>

            {selectedReview && (
              <div className="grid gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{selectedReview.customer}</h4>
                      <div className="flex items-center">
                        <p className="text-sm text-muted-foreground">
                          {selectedReview.service} • {formatDate(selectedReview.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-4 w-4",
                            star <= selectedReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{selectedReview.comment}</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="response" className="text-sm font-medium">
                    Your Response
                  </label>
                  <Textarea
                    id="response"
                    placeholder="Write your response here..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your response will be visible to all customers. Be professional and helpful.
                  </p>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsResponseDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleResponseSubmit}
                    disabled={!responseText.trim()}
                  >
                    {selectedReview.response ? "Update Response" : "Submit Response"}
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

