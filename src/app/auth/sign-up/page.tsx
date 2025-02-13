"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { formSchema } from "~/lib/auth-schema";
import { authClient } from "~/lib/auth-client";
import { toast } from "~/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    const router = useRouter();
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          toast({
            title: "Please wait...",
          });
        },
        onSuccess: () => {
          form.reset();
          router.push("/");
        },
        onError: (ctx) => {
          toast({ title: ctx.error.message, variant: "destructive" });
          form.setError("email", {
            type: "manual",
            message: ctx.error.message,
          });
        },
      },
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <h2 className="text-xl font-semibold">Untitled UI</h2>
          </div>
        </div>

        <Card className="border-none shadow-none">
          <CardHeader className="space-y-1 p-0 pb-8">
            <CardTitle className="text-3xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Let's get started with your 30 day trial.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className="h-11"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="h-11"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className="h-11"
                          type="password"
                          placeholder="Create a password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="h-11 w-full" type="submit">
                  Create account
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="h-11 w-full"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/",
                });
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                alt=""
                className="size-5"
              />
              Sign up with Google
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center p-0 pt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="text-primary hover:underline"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
