"use client";

import React, { useState } from "react";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import { Empty } from "@/components/Empty";
import Loader from "@/components/loader";

const MusicPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userMessage: ChatCompletionRequestMessage = {
      role: "user",
      content: values.prompt,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      const assistantMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: response.data.content,
      };

      setMessages([...newMessages, assistantMessage]);
      form.reset();
      router.refresh();
    } catch (error: any) {
      console.error("API error:", error?.response?.data || error.message);
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Ask me anything..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Thinking..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="space-y-4 mt-4 px-4 lg:px-8">
        {/* Empty state */}
        {messages.length === 0 && !isLoading && (
          <div className="p-8 rounded-lg w-full flex flex-col items-center justify-center bg-muted">
            <Empty label="No messages yet." imageSrc="/empty.png" />
          </div>
        )}

        {/* Render conversation messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-lg border border-gray-300 text-sm"
          >
            <span className="font-semibold capitalize">{msg.role}: </span>
            {msg.content}
          </div>
        ))}

        {/* Show Genius is thinking... */}
        {isLoading && (
          <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-300 text-sm italic flex items-center gap-2">
            <Loader />
            Genius is thinking...
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPage;
