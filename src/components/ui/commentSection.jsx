"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CommentSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Initial consultation completed with client. Need to schedule a follow-up demo next week.",
      timestamp: "06/12/2024",
    },
    {
      id: 2,
      author: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Enhanced due diligence required. Source of funds documentation needs clarification. please request additional bank statements for the past 24 months.",
      timestamp: "12/9/2024",
    },
    {
      id: 3,
      author: "Carol White",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Initial KYC documentation received from investor",
      timestamp: "25/7/2024",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment,
        timestamp: "Just now",
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-2xl  p-4 bg-background">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2"
        />
        <Button type="submit">Post Comment</Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{comment.author}</h3>
                <span className="text-sm text-muted-foreground">
                  {comment.timestamp}
                </span>
              </div>
              <p className="mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/leadManagement")}>
          Back
        </Button>
        <Button onClick={() => navigate("/leadManagement")}>Update</Button>
      </div> */}
    </div>
  );
}
