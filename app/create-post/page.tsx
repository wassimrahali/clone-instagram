'use client'
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { CreatePostValidation } from "@/lib/validation";
import { useCreateUserAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";
import PostUploader from "@/components/shared/PostUploader";
import { CircleFadingPlus } from "lucide-react";

const CreatePost = () => {
  const [loading, setLoading] = useState(false); // State to track loading status

  const { checkAuthUser } = useUserContext();
  const { mutateAsync: createUserAccount } = useCreateUserAccount();

  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      caption: "",
      location: "",
      tags: ""
    },
  });

  const handleCreatePost = async (post: z.infer<typeof CreatePostValidation>) => {
    setLoading(true); // Start loading

    // Your post creation logic here
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex flex-1 py-4 h-screen sm:h-fit flex-col space-y-2 px-4">
          <span className="font-bold text-3xl">
            <div className="flex items-center">
              <CircleFadingPlus />
              <span className="ml-2">Create Post</span>
            </div>
          </span>
          <form
            onSubmit={form.handleSubmit(handleCreatePost)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Caption</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Location</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Tags (separated by commas)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="NextJs, React, JS"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PostUploader />
          </form>
          <div className=" flex gap-4 items-center justify-end ">
            <Button
              type="button"
              className="bg-blue-400"
              disabled={loading}
              onClick={() => form.reset()} // Reset the form on cancel
            >
              Cancel
            </Button>{" "}
            <Button
              type="submit"
              className="shad-button_secondary"
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreatePost;
