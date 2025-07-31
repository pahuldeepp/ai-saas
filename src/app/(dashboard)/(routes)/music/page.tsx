// src/app/(dashboard)/(routes)/music/page.tsx
"use client";

import React, { useState } from "react";
import Heading from "@/components/Heading";
import { Music } from "lucide-react";
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
import axios from "axios";
import { Empty } from "@/components/Empty";
import Loader from "@/components/loader";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      setDescription(undefined);

      const response = await axios.post("/api/music", values);

      if (!response.data.audio) {
        throw new Error("No audio URL returned");
      }

      setMusic(response.data.audio);
      setDescription(response.data.content);

      form.reset();
      router.refresh();
    } catch (error: any) {
      console.error("API error:", error?.response?.data || error.message);
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                      placeholder="e.g. Hindi love song with tabla and flute"
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
        {isLoading && (
          <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-300 text-sm italic flex items-center gap-2">
            <Loader />
            Generating your music...
          </div>
        )}

{music && (
  <div className="space-y-2">
    {description && (
      <p className="text-sm text-muted-foreground italic">
        {description}
      </p>
    )}
    <p className="text-xs text-blue-600 break-words">Audio URL: {music}</p>
    <audio controls className="w-full mt-4">
      <source src={music} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
)}


        {!music && !isLoading && (
          <div className="p-8 rounded-lg w-full flex flex-col items-center justify-center bg-muted">
            <Empty label="No music generated yet." imageSrc="/empty.png" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPage;
