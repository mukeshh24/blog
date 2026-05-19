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
import { categorySchema } from "@/schema/categorySchema";
import { categoryAdd } from "@/services/categoryServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";

const CategoryAdd = () => {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  async function onSubmit(values) {
    try {
      const payload = {
        name: values.name,
        slug: values.slug,
      };
      const response = await categoryAdd(payload);
      if (response?.success) {
        toast.success(response.message);
        form.reset();
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log(errorHandler(error));
    }
  }

  const categoryName = useWatch({
    control: form.control,
    name: "name",
  });

  useEffect(() => {
    if (categoryName) {
      form.setValue(
        "slug",
        slugify(categoryName, {
          lower: true,
          trim: true,
        }),
      );
    } else {
      form.setValue("slug", "");
    }
  }, [categoryName, form]);

  return (
    <section className="flex items-center justify-center w-full min-h-full p-5">
      <Card className="max-w-md w-full py-5 px-2">
        <CardHeader className="mb-2 flex flex-col items-center justify-center">
          <CardTitle className="font-bold text-2xl mb-1">
            Create Category
          </CardTitle>
          <CardDescription className="text-sm">
            Add a new category with a unique name and SEO-friendly slug
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-6">
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name" className="text-md">
                        Category Name
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="name"
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Technology"
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
                        Category Slug
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="slug"
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. technology"
                        autoComplete="off"
                        className="h-13 border shadow-none focus:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Used in URLs. Example:
                        <span className="font-medium">
                          {" "}
                          /category/technology
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
            <Button
              type="submit"
              className="w-full rounded-lg text-base font-medium h-11 bg-black/80 hover:bg-black transition-all duration-300 cursor-pointer"
            >
              Create Category
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default CategoryAdd;
