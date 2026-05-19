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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/common/Editor";
import { blogAdd } from "@/services/blogServices";
import { useSelector } from "react-redux";
import errorHandler from "@/lib/errorHandler";
import { useNavigate } from "react-router-dom";
import { BlogRoute } from "@/routes/Route";
import { blogSchema } from "@/schema/blogSchema";

const BlogAdd = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [file, setFile] = useState(null);

  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { data } = useFetch(`${import.meta.env.VITE_API_URL}/category/show`, {
    method: "GET",
    credentials: "include",
  });

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      content: "",
    },
  });

  async function onSubmit(values) {
    try {
      const formData = new FormData();

      const payload = {
        author: auth.user._id,
        category: values.category,
        title: values.title,
        slug: values.slug,
        content: values.content,
      };

      if (file) {
        formData.append("file", file);
      }
      formData.append("data", JSON.stringify(payload));

      const response = await blogAdd(formData);
      if (response?.success) {
        toast.success(response.message);
        form.reset();
        navigate(BlogRoute);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log(errorHandler(error));
    }
  }

  const blogTitle = useWatch({
    control: form.control,
    name: "title",
  });

  useEffect(() => {
    if (blogTitle) {
      form.setValue(
        "slug",
        slugify(blogTitle, {
          lower: true,
          trim: true,
        }),
      );
    } else {
      form.setValue("slug", "");
    }
  }, [blogTitle, form]);

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setAvatarPreview(preview);
  };

  return (
    <section className="flex items-center justify-center w-full min-h-full p-5">
      <Card className="w-full py-5 px-2">
        <CardHeader className="mb-2 flex flex-col items-center justify-center">
          <CardTitle className="font-bold text-2xl mb-1">Create Blog</CardTitle>
          <CardDescription className="text-sm">
            Publish a new blog post with title, category and content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-6">
              <FieldGroup>
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="category" className="text-md">
                        Category
                      </FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="h-13 border shadow-none focus:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                          style={{ height: "52px" }}
                        >
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {data &&
                              data?.category?.length > 0 &&
                              data?.category.map((category, index) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title" className="text-md">
                        Blog Title
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter blog title"
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
                  name="slug"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="slug" className="text-md">
                        Blog Slug
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="slug"
                        aria-invalid={fieldState.invalid}
                        placeholder="blog-slug"
                        autoComplete="off"
                        className="h-13 border shadow-none focus:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Used in URLs. Example:
                        <span className="font-medium">
                          {" "}
                          /category/blog-slug
                        </span>
                      </p>
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
                  name="featuredImage"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="featuredImage" className="text-md">
                        Feature Image
                      </FieldLabel>
                      <Dropzone
                        onDrop={(acceptedFiles) =>
                          handleFileSelection(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()} className="max-w-max">
                              <input {...getInputProps()} />
                              <div className="flex items-center justify-center h-30 w-25 rounded-md border">
                                <img src={avatarPreview} alt="Preview" />
                              </div>
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
            <div className="mb-6">
              <FieldGroup>
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="content" className="text-md">
                        Blog Content
                      </FieldLabel>
                      <Editor value={field.value} onChange={field.onChange} />

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
              Publish Blog
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default BlogAdd;
