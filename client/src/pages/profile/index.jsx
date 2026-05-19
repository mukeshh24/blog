import Loading from "@/components/common/Loading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import errorHandler from "@/lib/errorHandler";
import { userProfileSchema } from "@/schema/authSchema";
import { userUpdate } from "@/services/authServices";
import { setAuth } from "@/store/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/get-user/${auth.user._id}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const form = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
      userBio: "",
    },
  });

  async function onSubmit(values) {
    try {
      const formData = new FormData();

      const payload = {
        name: values.userName,
        email: values.userEmail,
        password: values.userPassword,
        bio: values.userBio,
      };

      if (file) {
        formData.append("file", file);
      }
      formData.append("data", JSON.stringify(payload));

      const response = await userUpdate(data?.user?._id, formData);

      if (response?.success) {
        dispatch(setAuth(response.user));
        toast.success(response.message);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log(errorHandler(error));
    }
  }

  useEffect(() => {
    if (data && data?.success) {
      form.reset({
        userName: data?.user?.name,
        userEmail: data?.user?.email,
        userBio: data?.user?.bio,
      });
    }
  }, [data]);

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setAvatarPreview(preview);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="flex items-center justify-center w-full h-screen p-5">
      <Card className="max-w-md w-full py-5 px-2">
        <CardHeader className="mb-2 flex flex-col items-center justify-center">
          <CardTitle className="font-bold text-2xl mb-1">
            Update Profile
          </CardTitle>
          <CardDescription className="text-sm">
            Manage your personal information and account details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 flex flex-col items-center justify-center gap-8">
            <Dropzone
              onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Avatar className="w-20 h-20 relative group cursor-pointer">
                      <AvatarImage
                        src={avatarPreview ? avatarPreview : data?.user?.avatar}
                      />
                      <div className="hidden group-hover:flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black w-full h-full rounded-full">
                        <Camera fill="#ffffff" className="w-10 h-10" />
                      </div>
                    </Avatar>
                  </div>
                </section>
              )}
            </Dropzone>
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
            <div className="mb-6">
              <FieldGroup>
                <Controller
                  name="userBio"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="userBio" className="text-md">
                        Bio
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id="userBio"
                        aria-invalid={fieldState.invalid}
                        placeholder="bio"
                        autoComplete="off"
                        className="border shadow-none focus:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
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
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Profile;
