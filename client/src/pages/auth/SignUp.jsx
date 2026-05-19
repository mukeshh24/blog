import GoogleLogin from "@/components/common/GoogleLogin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import errorHandler from "@/lib/errorHandler";
import { SignInRoute } from "@/routes/Route";
import { signUpSchema } from "@/schema/authSchema";
import { userRegister } from "@/services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const payload = {
        name: values.userName,
        email: values.userEmail,
        password: values.userPassword,
      };

      const response = await userRegister(payload);

      if (response?.success) {
        toast.success(response.message);
        navigate(SignInRoute);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log(errorHandler(error));
    }
  }

  return (
    <section className="flex items-center justify-center w-full h-screen p-5">
      <Card className="max-w-md w-full py-5 px-2">
        <CardHeader className="mb-2 flex flex-col items-center justify-center">
          <CardTitle className="font-bold text-2xl mb-1">
            Create Account
          </CardTitle>
          <CardDescription className="text-sm">
            Share your thoughts with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 flex flex-col items-center justify-center gap-8">
            <GoogleLogin />
            <div className="relative w-full h-0.5 bg-muted">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-8 text-center texl-md">
                Or
              </span>
            </div>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-6">
              <FieldGroup>
                <Controller
                  name="userName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="userName" className="text-md">
                        Full Name
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="userName"
                        aria-invalid={fieldState.invalid}
                        placeholder="John Doe"
                        autoComplete="off"
                        className="h-13 border shadow-none focus:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
            <div className="mb-6">
              <FieldGroup>
                <Controller
                  name="userEmail"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="userEmail" className="text-md">
                        Email Address
                      </FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        id="userEmail"
                        aria-invalid={fieldState.invalid}
                        placeholder="email@company.com"
                        autoComplete="off"
                        className="h-13 border shadow-none focus:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
            <div className="mb-6">
              <FieldGroup>
                <Controller
                  name="userPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="userPassword" className="text-md">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        id="userPassword"
                        aria-invalid={fieldState.invalid}
                        placeholder="########"
                        autoComplete="off"
                        className="h-13 border shadow-none focus:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
            <Button
              type="submit"
              className="w-full rounded-lg text-base font-medium h-11 bg-black/80 hover:bg-black transition-all duration-300 cursor-pointer"
            >
              Create Account
            </Button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              to={SignInRoute}
              className="text-black font-bold hover:underline hover:underline-offset-2 transition-all duration-300"
            >
              Sign in here
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignUp;
