import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { SignUpRoute } from "@/routers/WebsiteRoutes";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required." })
    .email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "password is required." }),
});

const SignInPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <Card className="w-[400px] p-5">
          <CardHeader className="text-center font-semibold text-3xl">
            Login to Account
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full mt-3">
                Sign In
              </Button>
              <div className="flex gap-1 mt-3 justify-end text-sm">
                <p>Don't have Account ?</p>
                <Link
                  to={SignUpRoute}
                  className="font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default SignInPage;
