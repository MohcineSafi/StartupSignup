import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertWaitlistEntrySchema, type InsertWaitlistEntry } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function WaitlistForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(insertWaitlistEntrySchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: InsertWaitlistEntry) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Welcome aboard!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      });
      form.reset();
      // Invalidate count query to update stats
      queryClient.invalidateQueries({ queryKey: ["/api/waitlist/count"] });
    },
    onError: (error: any) => {
      if (error.message.includes("409")) {
        form.setError("email", {
          type: "manual",
          message: "This email is already registered"
        });
        toast({
          title: "Email already registered",
          description: "This email is already on our waitlist.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Oops!",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = (data: InsertWaitlistEntry) => {
    waitlistMutation.mutate(data);
  };

  return (
    <Card className="animate-slide-up bg-white rounded-2xl shadow-xl max-w-md mx-auto border border-slate-200">
      <CardContent className="p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Join the Waitlist</h2>
          <p className="text-slate-600">Get early access and exclusive updates</p>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </Label>
            <Input
              id="fullName"
              {...form.register("fullName")}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder-slate-400"
            />
            {form.formState.errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.fullName.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder-slate-400"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={waitlistMutation.isPending}
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {waitlistMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>
        
        <p className="text-xs text-slate-500 mt-4 text-center">
          By joining, you agree to receive updates about our launch. Unsubscribe anytime.
        </p>
      </CardContent>
    </Card>
  );
}
